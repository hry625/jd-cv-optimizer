from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class Resume(BaseModel):
    name: str = ""
    email: str = ""
    phone: str = ""
    city: str = ""
    degree: str = ""
    school: str = ""
    major: str = ""
    graduation_year: str = ""
    work_experience: str = ""
    skills: List[str] = []
    projects: str = ""
    other: str = ""

class JDInput(BaseModel):
    jd_text: str

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class GrillRequest(BaseModel):
    messages: List[ChatMessage]
    current_resume: Resume

class MatchRequest(BaseModel):
    jd: str
    resume: Resume

class MatchResult(BaseModel):
    score: int
    skill_score: int
    matched_keywords: List[str]
    missed_keywords: List[str]
    suggestions: List[str]

class OptimizeRequest(BaseModel):
    jd: str
    resume: Resume
    match_result: MatchResult