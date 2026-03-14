import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const SignOutSection: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserProfile } = useAppContext();

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
      <button
        onClick={handleSignOut}
        className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 p-4 rounded-3xl flex items-center justify-center gap-2 text-rose-500 font-bold transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>

      <p className="text-center text-xs font-medium text-slate-600 mt-6">
        App Version 2.0.0 (Build 42)
      </p>
    </motion.section>
  );
};

export default SignOutSection;
