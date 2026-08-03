from dotenv import load_dotenv
import openai
import json
import re
from typing import List, Tuple
from .models import Resume, MatchResult
from .prompts import (
    SYSTEM_GRILL, SYSTEM_MATCH, SYSTEM_OPTIMIZE, USER_MATCH_TEMPLATE, USER_OPTIMIZE_TEMPLATE
)

load_dotenv()  # Load environment variables from .env file




# openai.api_key = os.getenv("OPENAI_API_KEY")
# openai.api_base = os.getenv("OPENAI_API_BASE", "https://api.openai.com/v1")
model_name = "gpt-oss:20b"  # 或者使用其他模型，如 gpt-4

client = openai.OpenAI(
    api_key="ollama",  # os.environ.get("OPENAI_API_KEY"),
    # This is the default and can be omitted
    base_url="http://localhost:11434/v1/",
)


def _create_chat_completion(
    messages: List[dict],
    *,
    temperature: float = 0.7,
    max_tokens: int | None = None,
    response_format: dict | None = None,
) -> openai.types.chat.chat_completion.ChatCompletion:
    """Safely call the Ollama/OpenAI compatible endpoint and fallback when the server rejects unsupported params."""
    payload = {
        "model": model_name,
        "messages": messages,
        "temperature": temperature,
    }
    if max_tokens is not None:
        payload["max_tokens"] = min(max_tokens, 6000)
    if response_format is not None:
        payload["response_format"] = response_format

    try:
        return client.chat.completions.create(**payload)
    except Exception as exc:
        # Ollama's OpenAI-compatible endpoint can reject some newer chat-completion fields.
        if getattr(exc, "status_code", None) == 422:
            payload.pop("response_format", None)
            payload.pop("max_tokens", None)
            return client.chat.completions.create(**payload)
        raise


# completion = client.completions.create(model=model_name, prompt="Hello, world!", max_tokens=5)
def get_next_question(messages: List[dict], resume: Resume) -> str:
    """根据对话历史和已有简历，生成下一个要问的问题"""
    prompt = SYSTEM_GRILL + "\n当前简历信息：\n" + resume.model_dump_json(indent=2)
    messages_with_context = [{"role": "system", "content": prompt}] + messages
    response = _create_chat_completion(
        messages_with_context,
        temperature=0.7,
        max_tokens=150,
    )
    return response.choices[0].message.content

def analyze_match(jd: str, resume: Resume) -> MatchResult:
    """分析简历与JD的匹配度，返回分数和关键词建议"""
    prompt = SYSTEM_MATCH
    user_content = USER_MATCH_TEMPLATE.format(jd=jd, resume=resume.model_dump_json(indent=2))
    response = _create_chat_completion(
        [
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_content}
        ],
        temperature=0.3,
        response_format={"type": "json_object"},
    )
    # 解析返回的JSON（可加异常处理）
    try:
        data = json.loads(response.choices[0].message.content)
        return MatchResult(
            score=data.get("score", 50),
            skill_score=data.get("skill_score", 50),
            matched_keywords=data.get("matched_keywords", []),
            missed_keywords=data.get("missed_keywords", []),
            suggestions=data.get("suggestions", [])
        )
    except Exception:
        # 降级处理
        return MatchResult(score=50, skill_score=50, matched_keywords=[], missed_keywords=[], suggestions=["请重新尝试"])


def parse_resume_payload(raw_text: str, fallback_resume: Resume | None = None) -> Resume:
    """Parse a JSON-string resume payload into a Resume object."""
    fallback_resume = fallback_resume or Resume()
    cleaned_text = raw_text.strip()

    if cleaned_text.startswith("```"):
        cleaned_text = re.sub(
            r"^```(?:json)?\s*|\s*```$",
            "",
            cleaned_text,
            flags=re.IGNORECASE | re.DOTALL,
        )

    data = json.loads(cleaned_text)
    if isinstance(data, str):
        data = json.loads(data)

    return Resume.model_validate(data)


def optimize_resume(jd: str, resume: Resume, match_result: MatchResult) -> Resume:
    """生成优化后的简历文本"""
    prompt = SYSTEM_OPTIMIZE
    user_content = USER_OPTIMIZE_TEMPLATE.format(
        jd=jd,
        resume=resume.model_dump_json(indent=2),
        match=match_result.model_dump_json(indent=2)
    )
    response = _create_chat_completion(
        [
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_content}
        ],
        temperature=0.5,
        max_tokens=3000,
    )
    raw_text = response.choices[0].message.content
    print(f"Raw optimized resume response: {raw_text}")

    try:
        return parse_resume_payload(raw_text, resume)
    except Exception:
        # return an empty Resume object if parsing fails
        print("Failed to parse optimized resume JSON. Returning empty Resume.")
        return Resume()
