import React, { useState, useEffect } from 'react';
import { api } from '../api/client';

const Step4_MatchAnalysis: React.FC<{ jd: string; resume: any; onMatch: (result: any) => void }> = ({ jd, resume, onMatch }) => {
    const [result, setResult] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.match(jd, resume).then(data => {
            setResult(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>正在分析匹配度...</div>;
    if (!result) return <div>分析失败，请稍后重试。</div>;

    return (
        <div>
            <h2>匹配分析结果</h2>
            <div>整体匹配度: {result.score}%</div>
            <div>技能匹配度: {result.skill_score}%</div>
            <div>匹配关键词: {result.matched_keywords.join(', ')}</div>
            <div>缺失关键词: {result.missed_keywords.join(', ')}</div>
            <div>建议: <ul>{result.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul></div>
            <button onClick={() => onMatch(result)}>生成微调简历</button>
        </div>
    );
};

export default Step4_MatchAnalysis;