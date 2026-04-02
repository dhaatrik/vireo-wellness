import React from 'react';
import { motion } from 'motion/react';
import { Download, ChevronRight } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const ExportSection: React.FC = () => {
  const { userMeals, medicationEntries } = useAppContext();

  const handleGenerateReport = () => {
    const headers = ['Type', 'Name', 'Date', 'Details', 'Calories'];
    const rows: string[][] = [];

    // Add meals
    userMeals.forEach(group => {
      group.entries.forEach(entry => {
        rows.push([
          'Meal',
          `"${entry.foodItem.name}"`,
          new Date(entry.loggedAt).toLocaleDateString(),
          `"${entry.quantity} serving(s)"`,
          (entry.foodItem.calories * entry.quantity).toString()
        ]);
      });
    });

    // Add medications
    medicationEntries.forEach(entry => {
      rows.push([
        'Medication',
        `"${entry.medication.name}"`,
        new Date(entry.takenAt).toLocaleDateString(),
        `"${entry.medication.dosage} (${entry.medication.form})"`,
        '0'
      ]);
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'health_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          type="button"
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
