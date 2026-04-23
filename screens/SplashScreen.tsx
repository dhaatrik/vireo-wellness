
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-8 bg-slate-950 text-center relative overflow-hidden flex-1 w-full">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500/20 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="shrink-0 mt-12 relative z-10"
      > 
        <h1 className="text-4xl font-black text-white tracking-tighter">
          Vireo<span className="text-emerald-500">.</span>
        </h1>
      </motion.div>
      
      <div className="flex flex-col items-center justify-center flex-1 relative z-10">
        <div className="relative flex items-center justify-center w-80 h-80">
          {/* Large Circle */}
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-[280px] h-[280px] text-emerald-500/20" 
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 8" 
            />
          </motion.svg>

          {/* Small Circle */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute w-[220px] h-[220px] text-emerald-400/30" 
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 6"
            />
          </motion.svg>
          
          {/* Center Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
            className="w-32 h-32 flex items-center justify-center relative z-10"
          >
            <img src="/favicon.png" alt="Vireo Logo" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full mb-8 relative z-10 max-w-md mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Thrive Daily</h2>
          <p className="text-slate-400 text-sm">Monitor your health, track your meals, and stay connected with your devices.</p>
        </div>
        <button
          onClick={handleContinue}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
