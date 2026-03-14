import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { DiabetesTypeStep } from '../components/onboarding/DiabetesTypeStep';
import { TargetGlucoseStep } from '../components/onboarding/TargetGlucoseStep';
import { WeightGoalStep } from '../components/onboarding/WeightGoalStep';

const OnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [diabetesType, setDiabetesType] = useState('');
  const [targetGlucose, setTargetGlucose] = useState([80, 130]);
  const [weightGoal, setWeightGoal] = useState('');

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/dashboard');
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 p-6 relative overflow-hidden flex-1 w-full">
      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto mt-8 mb-8 flex justify-between items-center relative z-10">
        <div className="flex gap-2 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-emerald-500' : 'bg-slate-800'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative z-10 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <DiabetesTypeStep
                diabetesType={diabetesType}
                setDiabetesType={setDiabetesType}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <TargetGlucoseStep
                targetGlucose={targetGlucose}
                setTargetGlucose={setTargetGlucose}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <WeightGoalStep
                weightGoal={weightGoal}
                setWeightGoal={setWeightGoal}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto mb-8 flex gap-3">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="p-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={(step === 1 && !diabetesType) || (step === 3 && !weightGoal)}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold py-4 px-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {step === 3 ? 'Finish Setup' : 'Continue'}
            {step < 3 && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
