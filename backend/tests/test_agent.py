from app.agent import parse_resume_payload
from app.models import Resume


def test_parse_resume_payload_parses_fenced_json_into_resume_model():
    raw_text = '''```json
{
  "name": "陈思远",
  "email": "siyuan.chen@example.com",
  "phone": "+86 138-0000-8888",
  "city": "上海",
  "degree": "硕士",
  "school": "复旦大学",
  "major": "计算机科学与技术",
  "graduation_year": "2018",
  "work_experience": "字节跳动 · 前端开发工程师",
  "skills": ["React", "TypeScript"],
  "projects": "简历微调助手",
  "other": "PMP 认证"
}
```'''

    parsed = parse_resume_payload(raw_text)

    assert isinstance(parsed, Resume)
    assert parsed.name == '陈思远'
    assert parsed.email == 'siyuan.chen@example.com'
    assert parsed.skills == ['React', 'TypeScript']
