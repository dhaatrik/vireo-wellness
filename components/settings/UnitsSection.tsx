import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Scale } from 'lucide-react';

const UnitsSection: React.FC = () => {
  // Placeholder state for unit preferences - in a real app, this would come from context or persistent storage.
  const [glucoseUnit, setGlucoseUnit] = useState<'mg/dL' | 'mmol/L'>('mg/dL');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Units & Measurements</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <label htmlFor="glucoseUnit" className="text-sm font-medium text-white">
              Blood Glucose
            </label>
          </div>
          <select
            id="glucoseUnit"
            name="glucoseUnit"
            value={glucoseUnit}
            onChange={(e) => setGlucoseUnit(e.target.value as 'mg/dL' | 'mmol/L')}
            className="bg-slate-800 border-none text-slate-300 text-sm font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/50 py-2 pl-3 pr-8 appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="mg/dL">mg/dL</option>
            <option value="mmol/L">mmol/L</option>
          </select>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-xl">
              <Scale className="w-5 h-5 text-sky-400" />
            </div>
            <label htmlFor="weightUnit" className="text-sm font-medium text-white">
              Body Weight
            </label>
          </div>
          <select
            id="weightUnit"
            name="weightUnit"
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')}
            className="bg-slate-800 border-none text-slate-300 text-sm font-medium rounded-xl focus:ring-2 focus:ring-emerald-500/50 py-2 pl-3 pr-8 appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </div>
      </div>
    </motion.section>
  );
};

export default UnitsSection;
