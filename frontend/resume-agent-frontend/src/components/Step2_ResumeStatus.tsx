// frontend/src/components/Step2_ResumeStatus.tsx
import React from 'react';
import ResumeSummaryCard, { type Resume } from './ResumeSummaryCard';

interface Props {
    resume: Resume | null;
    onUseExisting: () => void;   // 使用现有简历，直接进入匹配
    onStartGrill: () => void;    // 重新填写/开始问答
}

// 辅助函数：判断简历是否为空（没有任何有效信息）
const isResumeEmpty = (resume: Resume | null): boolean => {
    if (!resume) return true;
    const { name, email, phone, school, work_experience } = resume;
    return !name && !email && !phone && !school && !work_experience;
};

const Step2_ResumeStatus: React.FC<Props> = ({ resume, onUseExisting, onStartGrill }) => {
    const empty = isResumeEmpty(resume);

    return (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ marginBottom: '8px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>🔍 简历状态</h2>
                <p style={{ color: '#64748b', fontSize: '14px' }}>
                    {empty
                        ? '📭 未找到简历档案，让我们从零开始建立。'
                        : '✅ 已找到你的简历档案，信息如下：'}
                </p>
            </div>

            {!empty && resume ? (
                <>
                    <ResumeSummaryCard resume={resume} />

                    {/* 状态提示 & 按钮 */}
                    <div
                        style={{
                            background: '#f0fdf4',
                            borderRadius: '12px',
                            padding: '16px 20px',
                            borderLeft: '5px solid #22c55e',
                            marginBottom: '20px',
                        }}
                    >
                        <div style={{ fontWeight: 600, color: '#166534' }}>📌 已有简历档案</div>
                        <div style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>
                            你可以直接使用现有简历进行匹配分析，或重新填写更新信息。
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                        <button
                            onClick={onStartGrill}
                            style={{
                                padding: '10px 24px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '12px',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#475569',
                                transition: 'all 0.2s',
                            }}
                        >
                            🔄 重新填写
                        </button>
                        <button
                            onClick={onUseExisting}
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
                        >
                            使用现有简历 →
                        </button>
                    </div>
                </>
            ) : (
                <>
                    {/* 空状态 */}
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '48px 20px',
                            background: '#f8fafc',
                            borderRadius: '16px',
                            border: '2px dashed #e2e8f0',
                            marginBottom: '20px',
                        }}
                    >
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
                        <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '6px' }}>还没有简历信息</h3>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>
                            点击下方按钮，我会通过问答方式帮你建立完整的简历档案。
                        </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={onStartGrill}
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
                        >
                            开始填写简历 →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Step2_ResumeStatus;