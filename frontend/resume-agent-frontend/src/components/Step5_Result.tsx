import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import ResumeSummaryCard from './ResumeSummaryCard';

const Step5_Result: React.FC<{ jd: string; resume: any; matchResult: any; onReset: () => void }> = ({ jd, resume, matchResult, onReset }) => {
    const [optimizedResume, setOptimizedResume] = useState<any>(resume);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        api.optimize(jd, resume, matchResult)
            .then(data => {
                if (!isMounted) return;

                const returnedResume = data?.resume ?? data;

                setOptimizedResume(typeof returnedResume === 'object' ? returnedResume : resume);
                setLoading(false);
            })
            .catch(() => {
                if (!isMounted) return;
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [jd, resume, matchResult]);

    if (loading) return <div>正在生成优化简历...</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2>微调后的简历</h2>
            <ResumeSummaryCard resume={optimizedResume} />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                <button onClick={() => {
                    const blob = new Blob([JSON.stringify(optimizedResume, null, 2)], { type: 'application/json' });
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = 'optimized_resume.json';
                    a.click();
                }}>下载简历</button>
                <button onClick={onReset}>重新开始</button>
            </div>
        </div>
    );
};

export default Step5_Result;