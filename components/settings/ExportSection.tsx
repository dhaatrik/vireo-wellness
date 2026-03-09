import React from 'react';
import { motion } from 'motion/react';
import { Download, ChevronRight } from 'lucide-react';

const ExportSection: React.FC = () => {
  const handleGenerateReport = () => {
    // In a real app, this would generate a CSV or PDF and trigger a download
    alert("Generating your health report for the last 30 days...");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Export Data</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <button
          onClick={handleGenerateReport}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <Download className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-white">
                Generate Report
              </span>
              <span className="text-xs text-slate-500">
                Export last 30 days of data (CSV)
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </button>
      </div>
    </motion.section>
  );
};

export default ExportSection;
