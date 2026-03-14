import { Activity } from 'lucide-react';

interface DiabetesTypeStepProps {
  diabetesType: string;
  setDiabetesType: (type: string) => void;
}

export const DiabetesTypeStep = ({ diabetesType, setDiabetesType }: DiabetesTypeStepProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-2">What is your diabetes type?</h1>
      <p className="text-slate-400 mb-8">This helps us personalize your insights and recommendations.</p>

      <div className="space-y-3">
        {['Type 1', 'Type 2', 'Gestational', 'Prediabetes', 'None (Just tracking)'].map((type) => (
          <button
            key={type}
            onClick={() => setDiabetesType(type)}
            className={`w-full p-4 rounded-2xl border text-left transition-all ${diabetesType === type ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
          >
            <div className="flex items-center gap-3">
              <Activity className={`w-5 h-5 ${diabetesType === type ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="font-medium">{type}</span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};
