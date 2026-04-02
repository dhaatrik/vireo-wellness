import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const SignOutSection: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserProfile } = useAppContext();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSignOut = () => {
    updateUserProfile({ name: '', email: '', phone: '', countryCode: 'US' });
    navigate('/');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {!isConfirming ? (
          <motion.button
            key="signout-btn"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setIsConfirming(true)}
            className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 p-4 rounded-3xl flex items-center justify-center gap-2 text-rose-500 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </motion.button>
        ) : (
          <motion.div
            key="signout-confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full bg-slate-900 border border-rose-500/50 p-4 rounded-3xl flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2 text-rose-500">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold text-sm">Are you sure?</span>
            </div>
            <div className="flex w-full gap-2">
              <button onClick={() => setIsConfirming(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-2xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                Cancel
              </button>
              <button onClick={handleSignOut} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-2xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs font-medium text-slate-600 mt-6">
        App Version 2.0.0 (Build 42)
      </p>
    </motion.section>
  );
};

export default SignOutSection;
