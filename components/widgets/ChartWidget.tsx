import React from 'react';
import { motion } from 'motion/react';
import BloodSugarChart from '../BloodSugarChart';

interface ChartWidgetProps {
  data: Array<{
    time: string;
    value: number;
    meal: string;
  }>;
  delay: number;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({ data, delay }) => {
  return (
    <motion.div
      key="chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mt-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Blood Sugar</h3>
        <button type="button" className="text-xs font-medium text-emerald-400 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded px-2 py-1">View All</button>
      </div>
      <BloodSugarChart data={data} />
    </motion.div>
  );
};

export default ChartWidget;
