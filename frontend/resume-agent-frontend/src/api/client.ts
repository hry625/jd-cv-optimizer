import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export const api = {
    getResume: () => axios.get(`${API_BASE}/api/resume`).then(res => res.data),
    updateResume: (resume: any) => axios.post(`${API_BASE}/api/resume`, resume),
    grill: (messages: any[], currentResume: any) =>
        axios.post(`${API_BASE}/api/grill`, { messages, current_resume: currentResume }).then(res => res.data),
    match: (jd: string, resume: any) =>
        axios.post(`${API_BASE}/api/match`, { jd, resume }).then(res => res.data),
    optimize: (jd: string, resume: any, matchResult: any) =>
        axios.post(`${API_BASE}/api/optimize`, {
            jd,
            resume,
            match_result: matchResult,
        }).then(res => res.data),
};