from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import JDInput, Resume, GrillRequest, MatchRequest, OptimizeRequest
from .resume_store import load_resume, save_resume
from .agent import get_next_question, analyze_match, optimize_resume

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import JDInput, Resume, GrillRequest, MatchRequest, OptimizeRequest
from .resume_store import load_resume, save_resume
from .agent import get_next_question, analyze_match, optimize_resume

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/api/resume")
def get_resume():
    return load_resume()

@app.post("/api/resume")
def update_resume(resume: Resume):
    save_resume(resume)
    return {"status": "ok"}

@app.post("/api/grill")
def grill(request: GrillRequest):
    # 保存当前简历
    save_resume(request.current_resume)
    # 调用LLM生成下一个问题
    messages = [{"role": m.role, "content": m.content} for m in request.messages]
    question = get_next_question(messages, request.current_resume)
    return {"question": question}

@app.post("/api/match")
def match(request: MatchRequest):
    result = analyze_match(request.jd, request.resume)
    return result

@app.post("/api/optimize")
def optimize(request: OptimizeRequest):
    optimized = optimize_resume(request.jd, request.resume, request.match_result)
    return {
        "optimized_text": optimized.model_dump_json(indent=2),
        "resume": optimized.model_dump(),
    }

