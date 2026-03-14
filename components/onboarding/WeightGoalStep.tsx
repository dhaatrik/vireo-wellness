import { Scale } from 'lucide-react';

interface WeightGoalStepProps {
  weightGoal: string;
  setWeightGoal: (goal: string) => void;
}

export const WeightGoalStep = ({ weightGoal, setWeightGoal }: WeightGoalStepProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-2">What's your weight goal?</h1>
      <p className="text-slate-400 mb-8">We'll adjust your daily calorie and GL targets accordingly.</p>

      <div className="space-y-3">
        {[
          { id: 'lose', label: 'Lose Weight', desc: 'Caloric deficit' },
          { id: 'maintain', label: 'Maintain Weight', desc: 'Maintenance calories' },
          { id: 'gain', label: 'Gain Weight', desc: 'Caloric surplus' }
        ].map((goal) => (
          <button
            key={goal.id}
            onClick={() => setWeightGoal(goal.id)}
            className={`w-full p-4 rounded-2xl border text-left transition-all ${weightGoal === goal.id ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'}`}
          >
            <div className="flex items-center gap-3">
              <Scale className={`w-5 h-5 ${weightGoal === goal.id ? 'text-emerald-400' : 'text-slate-500'}`} />
              <div>
                <div className="font-medium">{goal.label}</div>
                <div className={`text-xs mt-0.5 ${weightGoal === goal.id ? 'text-emerald-500/70' : 'text-slate-500'}`}>{goal.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};
