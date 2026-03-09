import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { LogOut } from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';
import UnitsSection from '../components/settings/UnitsSection';
import RemindersSection from '../components/settings/RemindersSection';
import ExportSection from '../components/settings/ExportSection';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // In a real app, clear auth tokens/state here
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header title="Settings" showBackButton backPath="/dashboard" />
        <main className="flex-1 overflow-y-auto p-5 space-y-8 pb-24 md:pb-5">

          <ProfileSection />

          <UnitsSection />

          <RemindersSection />

          <ExportSection />

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

        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default SettingsScreen;