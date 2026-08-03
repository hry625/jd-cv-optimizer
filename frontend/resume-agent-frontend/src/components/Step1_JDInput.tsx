// frontend/src/components/Step1_JDInput.tsx
import React, { useState } from 'react';

interface Props {
    onNext: (jd: string) => void;
    initialValue?: string; // 用于重置后恢复示例
}

const Step1_JDInput: React.FC<Props> = ({ onNext, initialValue = '' }) => {
    const [jd, setJd] = useState(initialValue);
    const [error, setError] = useState('');

    // 示例职位描述（方便测试）
    const demoJD = `资深前端工程师

我们正在寻找一位资深前端工程师加入我们的核心团队。

岗位职责：
• 负责公司核心产品的前端架构设计与开发
• 与产品、设计、后端紧密协作，交付高质量的用户体验
• 持续优化前端性能，提升页面加载速度和交互流畅度
• 参与技术选型与团队技术分享

任职要求：
• 本科及以上学历，计算机相关专业优先
• 3年以上前端开发经验
• 精通 React、TypeScript，熟悉 Next.js 框架
• 熟悉 CSS 预处理器（Sass/Less）和现代 CSS 布局
• 了解 Webpack、Vite 等构建工具
• 有良好的代码习惯和团队协作精神`;

    const handleSubmit = () => {
        if (jd.trim().length < 5) {
            setError('职位描述至少需要 5 个字符，请仔细填写。');
            return;
        }
        setError('');
        onNext(jd.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Ctrl+Enter 或 Cmd+Enter 快捷提交
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            handleSubmit();
        }
    };

    return (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ marginBottom: '8px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>📋 职位描述</h2>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                    粘贴你感兴趣的职位描述，AI 将帮你微调简历以匹配该职位。
                </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '14px' }}>
                    职位描述 <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                    value={jd}
                    onChange={(e) => setJd(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="请将职位描述粘贴到这里...&#10;例如：我们正在寻找一名资深前端工程师，要求精通 React、TypeScript..."
                    style={{
                        width: '100%',
                        minHeight: '200px',
                        padding: '14px 18px',
                        border: `2px solid ${error ? '#ef4444' : '#e2e8f0'}`,
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontFamily: 'inherit',
                        lineHeight: '1.7',
                        resize: 'vertical',
                        transition: 'border-color 0.2s',
                        background: 'white',
                    }}
                />
                {error && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{error}</div>}
                <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
                    建议包含职位名称、职责要求、技能要求、学历经验等关键信息。按 Ctrl+Enter 快速提交。
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                    type="button"
                    onClick={() => setJd(demoJD)}
                    style={{
                        padding: '10px 20px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#475569',
                        transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = '#4f6ef7'}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                    📥 填入示例
                </button>
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '10px 32px',
                        border: 'none',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #4f6ef7, #3a56d4)',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(79, 110, 247, 0.3)',
                        transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    分析职位 →
                </button>
            </div>
        </div>
    );
};

export default Step1_JDInput;