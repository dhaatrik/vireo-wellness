import React, { useState } from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import { Shield, Key, Eye, Lock, Smartphone, ChevronRight } from 'lucide-react';

const PrivacySecurityScreen: React.FC = () => {
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [dataSharingEnabled, setDataSharingEnabled] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header title="Privacy & Security" showBackButton backPath="/settings" />
      <main className="flex-1 overflow-y-auto p-5 space-y-8 pb-24 md:pb-5">
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center mb-6 mt-4">
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield className="w-10 h-10 text-indigo-400" />
            </div>
          </div>
          <p className="text-center text-slate-400 text-sm mb-8 px-4">
            Manage your security preferences and control how your data is used.
          </p>

          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Security</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <button className="w-full p-4 border-b border-slate-800/50 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-xl">
                  <Key className="w-5 h-5 text-slate-300" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-medium text-white">Change Password</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Last changed 3 months ago</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>

            <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-xl">
                  <Smartphone className="w-5 h-5 text-slate-300" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-medium text-white">Biometric Login</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Face ID / Touch ID</span>
                </div>
              </div>
              <button 
                type="button"
                role="switch"
                aria-checked={biometricsEnabled}
                aria-label="Toggle Biometric Login"
                onClick={() => setBiometricsEnabled(!biometricsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${biometricsEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${biometricsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-xl">
                  <Lock className="w-5 h-5 text-slate-300" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-medium text-white">Two-Factor Auth</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Extra layer of security</span>
                </div>
              </div>
              <button 
                type="button"
                role="switch"
                aria-checked={twoFactorEnabled}
                aria-label="Toggle Two-Factor Authentication"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-12 h-6 rounded-full transition-colors duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Privacy</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-4 border-b border-slate-800/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-xl">
                  <Eye className="w-5 h-5 text-slate-300" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-medium text-white">Data Sharing</span>
                  <span className="block text-xs text-slate-500 mt-0.5">Help improve the app</span>
                </div>
              </div>
              <button 
                type="button"
                role="switch"
                aria-checked={dataSharingEnabled}
                aria-label="Toggle Data Sharing"
                onClick={() => setDataSharingEnabled(!dataSharingEnabled)}
                className={`w-12 h-6 rounded-full transition-colors duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${dataSharingEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
              >
                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${dataSharingEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <button className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <span className="block text-sm font-medium text-white">Privacy Policy</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </button>
            
            <button className="w-full p-4 border-t border-slate-800/50 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <span className="block text-sm font-medium text-rose-500">Delete Account</span>
                </div>
              </div>
            </button>
          </div>
        </motion.section>
      </main>
      </div>
    </div>
  );
};

export default PrivacySecurityScreen;
