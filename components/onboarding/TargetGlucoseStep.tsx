interface TargetGlucoseStepProps {
  targetGlucose: number[];
  setTargetGlucose: (range: number[]) => void;
}

export const TargetGlucoseStep = ({ targetGlucose, setTargetGlucose }: TargetGlucoseStepProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-2">Target Glucose Range</h1>
      <p className="text-slate-400 mb-8">Set your ideal fasting blood sugar range (mg/dL).</p>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-slate-400 font-medium">Min</span>
          <span className="text-2xl font-bold text-emerald-400">{targetGlucose[0]}</span>
        </div>
        <input
          type="range"
          min="60" max="100"
          value={targetGlucose[0]}
          onChange={(e) => setTargetGlucose([parseInt(e.target.value), targetGlucose[1]])}
          className="w-full accent-emerald-500 mb-8"
        />

        <div className="flex justify-between items-center mb-6">
          <span className="text-slate-400 font-medium">Max</span>
          <span className="text-2xl font-bold text-rose-400">{targetGlucose[1]}</span>
        </div>
        <input
          type="range"
          min="100" max="200"
          value={targetGlucose[1]}
          onChange={(e) => setTargetGlucose([targetGlucose[0], parseInt(e.target.value)])}
          className="w-full accent-rose-500"
        />
      </div>
    </>
  );
};
