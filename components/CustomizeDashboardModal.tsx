import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, EyeOff } from 'lucide-react';

export interface WidgetConfig {
  id: string;
  title: string;
  visible: boolean;
}

interface CustomizeDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  widgets: WidgetConfig[];
  onSave: (newWidgets: WidgetConfig[]) => void;
}

const CustomizeDashboardModal = ({ isOpen, onClose, widgets, onSave }: CustomizeDashboardModalProps) => {
  const [localWidgets, setLocalWidgets] = useState<WidgetConfig[]>(widgets);

  // Simple move up/down for reordering without a complex dnd library
  const moveWidget = (index: number, direction: -1 | 1) => {
    if (index + direction < 0 || index + direction >= localWidgets.length) return;
    const newWidgets = [...localWidgets];
    const temp = newWidgets[index];
    newWidgets[index] = newWidgets[index + direction];
    newWidgets[index + direction] = temp;
    setLocalWidgets(newWidgets);
  };

  const toggleVisibility = (index: number) => {
    const newWidgets = [...localWidgets];
    newWidgets[index].visible = !newWidgets[index].visible;
    setLocalWidgets(newWidgets);
  };

  const handleSave = () => {
    onSave(localWidgets);
    onClose();
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
            className="fixed bottom-0 md:bottom-auto md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90%] max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl md:rounded-3xl p-6 shadow-2xl z-50 max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h2 className="text-xl font-semibold text-white">Customize Dashboard</h2>
              <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors" aria-label="Close modal">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-2">
              {localWidgets.map((widget, index) => (
                <div key={widget.id} className="flex items-center justify-between bg-slate-800/50 border border-slate-700 p-3 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => moveWidget(index, -1)} 
                        disabled={index === 0}
                        className="text-slate-500 hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-slate-500"
                        aria-label="Move widget up"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                      </button>
                      <button 
                        onClick={() => moveWidget(index, 1)} 
                        disabled={index === localWidgets.length - 1}
                        className="text-slate-500 hover:text-emerald-400 disabled:opacity-30 disabled:hover:text-slate-500"
                        aria-label="Move widget down"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </button>
                    </div>
                    <span className={`font-medium ${widget.visible ? 'text-white' : 'text-slate-500'}`}>{widget.title}</span>
                  </div>
                  <button 
                    onClick={() => toggleVisibility(index)}
                    className={`p-2 rounded-xl transition-colors ${widget.visible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}
                    aria-label={widget.visible ? "Hide widget" : "Show widget"}
                  >
                    {widget.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={handleSave}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl transition-colors shrink-0"
            >
              Save Changes
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomizeDashboardModal;
