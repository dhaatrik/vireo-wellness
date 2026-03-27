import React from 'react';
import { motion } from 'motion/react';
import { Droplet, Plus, Minus } from 'lucide-react';

interface WaterWidgetProps {
  waterIntake: number;
  onAdd: () => void;
  onRemove: () => void;
  delay: number;
}

const WaterWidget: React.FC<WaterWidgetProps> = ({ waterIntake, onAdd, onRemove, delay }) => {
  return (
    <motion.div
      key="water"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-6 flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-500/10 rounded-2xl">
          <Droplet className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-400">Water Intake</h3>
          <p className="text-xl font-bold text-white tracking-tight">{waterIntake} <span className="text-sm text-blue-400">glasses</span></p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onRemove} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900" aria-label="Remove Water">
          <Minus className="w-5 h-5" />
        </button>
        <button type="button" onClick={onAdd} className="w-10 h-10 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900" aria-label="Add Water">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default WaterWidget;
