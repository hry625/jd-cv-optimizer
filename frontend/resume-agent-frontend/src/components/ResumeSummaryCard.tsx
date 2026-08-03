import React from 'react';

export interface Resume {
    name: string;
    email: string;
    phone: string;
    city: string;
    degree: string;
    school: string;
    major: string;
    graduation_year: string;
    work_experience: string;
    skills: string[];
    projects: string;
    other: string;
}

interface Props {
    resume: Resume | null;
}

const isResumeEmpty = (resume: Resume | null): boolean => {
    if (!resume) return true;
    const { name, email, phone, school, work_experience } = resume;
    return !name && !email && !phone && !school && !work_experience;
};

const ResumeSummaryCard: React.FC<Props> = ({ resume }) => {
    if (!resume || isResumeEmpty(resume)) {
        return null;
    }

    const renderField = (label: string, value: string | string[] | undefined, multiline = false) => {
        const content = Array.isArray(value)
            ? value.join(', ')
            : value || '未填写';

        return (
            <div style={{ marginBottom: '10px' }}>
                <div style={{ color: '#64748b', fontWeight: 500, marginBottom: '2px' }}>{label}</div>
                <div
                    style={{
                        whiteSpace: multiline ? 'pre-wrap' : 'normal',
                        wordBreak: 'break-word',
                        color: '#1e293b',
                    }}
                >
                    {content}
                </div>
            </div>
        );
    };

    return (
        <div
            style={{
                background: '#f8fafc',
                borderRadius: '14px',
                padding: '18px 22px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                lineHeight: '1.8',
                marginBottom: '16px',
            }}
        >
            {renderField('姓名', resume.name)}
            {renderField('邮箱', resume.email)}
            {renderField('电话', resume.phone)}
            {renderField('城市', resume.city)}
            {renderField('学历', resume.degree)}
            {renderField('学校', resume.school)}
            {renderField('专业', resume.major)}
            {renderField('毕业年份', resume.graduation_year)}
            {renderField('工作经历', resume.work_experience, true)}
            {renderField('项目经历', resume.projects, true)}
            {renderField('其他信息', resume.other, true)}
            {renderField('技能', resume.skills)}
        </div>
    );
};

export default ResumeSummaryCard;
