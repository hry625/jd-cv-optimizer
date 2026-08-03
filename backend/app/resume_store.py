import json
import os
from typing import Optional
from .models import Resume

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STORAGE_FILE = os.path.join(BASE_DIR, "resume_data.json")

def load_resume() -> Resume:
    if os.path.exists(STORAGE_FILE):
        print(f"Loading resume from {STORAGE_FILE}")
        try:
            with open(STORAGE_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return Resume(**data)
        except UnicodeDecodeError:
            with open(STORAGE_FILE, "r", encoding="utf-8", errors="replace") as f:
                data = json.load(f)
                return Resume(**data)
    print(f"No resume data found at {STORAGE_FILE}")
    return Resume()

def save_resume(resume: Resume):
    print(f"Saving resume to {STORAGE_FILE}")
    with open(STORAGE_FILE, "w", encoding="utf-8") as f:
        json.dump(resume.model_dump(), f, indent=2, ensure_ascii=False)