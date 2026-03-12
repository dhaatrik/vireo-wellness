import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Utensils, Activity, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleAction = (path: string) => {
    onClose();
    if (path) {
      navigate(path);
    } else {
      alert("Feature coming soon!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 md:bottom-auto md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-[90%] max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Quick Add</h2>
              <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors" aria-label="Close Quick Add">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleAction('/add-meal')}
                className="flex flex-col items-center justify-center p-4 bg-slate-800/50 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/50 rounded-2xl transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-emerald-400">Meal</span>
              </button>

              <button 
                onClick={() => handleAction('')}
                className="flex flex-col items-center justify-center p-4 bg-slate-800/50 hover:bg-blue-500/20 border border-slate-700 hover:border-blue-500/50 rounded-2xl transition-all group"
              >
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-blue-400">Glucose</span>
              </button>

              <button 
                onClick={() => handleAction('')}
                className="flex flex-col items-center justify-center p-4 bg-slate-800/50 hover:bg-purple-500/20 border border-slate-700 hover:border-purple-500/50 rounded-2xl transition-all group"
              >
                <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Pill className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-purple-400">Meds</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickAddModal;
