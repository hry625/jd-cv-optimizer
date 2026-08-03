import React, { useState, useEffect, useRef } from 'react';
import { api } from '../api/client';

interface Props {
    resume: any;
    chatHistory: any[];
    setChatHistory: (history: any[]) => void;
    onComplete: () => void;
}

const Step3_GrillChat: React.FC<Props> = ({ resume, chatHistory, setChatHistory, onComplete }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user', content: input };
        const newHistory = [...chatHistory, userMsg];
        setChatHistory(newHistory);
        setInput('');
        setLoading(true);

        try {
            const response = await api.grill(newHistory, resume);
            if (response.question === 'COMPLETE') {
                setChatHistory([...newHistory, { role: 'assistant', content: '✅ 简历信息已收集完毕！' }]);
                onComplete();
            } else {
                setChatHistory([...newHistory, { role: 'assistant', content: response.question }]);
            }
        } catch (e) {
            alert('请求失败，请检查后端服务');
        }
        setLoading(false);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    // 初始加载时，如果历史为空，自动触发第一个问题
    useEffect(() => {
        if (chatHistory.length === 0) {
            // 发送系统初始消息
            setChatHistory([{ role: 'assistant', content: '你好！我是你的简历顾问。让我们逐步完善你的简历吧。' }]);
            // 调用grill获取第一个问题
            api.grill([], resume).then(res => {
                if (res.question !== 'COMPLETE') {
                    setChatHistory(prev => [...prev, { role: 'assistant', content: res.question }]);
                }
            });
        }
    }, []);

    return (
        <div className="grill-container">
            <div className="chat-box">
                {chatHistory.map((msg, idx) => (
                    <div key={idx} className={msg.role === 'user' ? 'user-msg' : 'agent-msg'}>
                        {msg.content}
                    </div>
                ))}
                {loading && <div className="typing">AI 正在思考...</div>}
                <div ref={bottomRef} />
            </div>
            <div className="input-area">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入你的回答..." />
                <button onClick={sendMessage} disabled={loading}>发送</button>
            </div>
        </div>
    );
};

export default Step3_GrillChat;