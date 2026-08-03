import { useEffect, useState } from 'react';
import { api } from './api/client';
import Step1_JDInput from './components/Step1_JDInput';
import Step2_ResumeStatus from './components/Step2_ResumeStatus';
import Step3_GrillChat from './components/Step3_GrillChat';
import Step4_MatchAnalysis from './components/Step4_MatchAnalysis';
import Step5_Result from './components/Step5_Result';

type Step = 1 | 2 | 3 | 4 | 5;

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(1);
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [matchResult, setMatchResult] = useState<any>(null);

  useEffect(() => {
    api.getResume().then(data => setResume(data));
  }, []);

  return (
    <div className="app">
      {step === 1 && <Step1_JDInput onNext={(jd) => { setJd(jd); setStep(2); }} />}
      {step === 2 && <Step2_ResumeStatus resume={resume} onUseExisting={() => setStep(4)} onStartGrill={() => setStep(3)} />}
      {step === 3 && <Step3_GrillChat resume={resume} chatHistory={chatHistory} setChatHistory={setChatHistory} onComplete={() => setStep(4)} />}
      {step === 4 && <Step4_MatchAnalysis jd={jd} resume={resume} onMatch={(result) => { setMatchResult(result); setStep(5); }} />}
      {step === 5 && <Step5_Result jd={jd} resume={resume} matchResult={matchResult} onReset={() => { setStep(1); setJd(''); setMatchResult(null); setChatHistory([]); }} />}
    </div>
  );
};

export default App;
