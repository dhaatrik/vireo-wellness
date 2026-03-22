import React from 'react';
import { motion } from 'motion/react';

export interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  colorClass: string;
  bgClass: string;
  onClick?: () => void;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, colorClass, bgClass, onClick, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
    className={`bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl flex flex-col justify-between items-start transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-slate-800 hover:border-slate-600 hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900' : ''}`}
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    aria-label={`${label}: ${value}`}
  >
    <div className={`p-2.5 rounded-xl mb-4 ${bgClass}`}>
      <Icon className={`w-5 h-5 ${colorClass}`} />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-400 mb-1" id={`${label.replace(/\s+/g, '-').toLowerCase()}-label`}>{label}</p>
      <p className="text-lg font-bold text-white tracking-tight" aria-labelledby={`${label.replace(/\s+/g, '-').toLowerCase()}-label`}>{value}</p>
    </div>
  </motion.div>
);

export default StatCard;
