
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Wifi, BatteryFull } from 'lucide-react';

interface HeaderProps {
  title: React.ReactNode;
  showBackButton?: boolean;
  backPath?: string | number;
  rightContent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, backPath = -1, rightContent }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof backPath === 'string') {
      navigate(backPath);
    } else {
      navigate(backPath as number);
    }
  };

  return (
    <header className="px-6 py-5 flex items-center justify-between bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800/50 transition-colors duration-300">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button 
            onClick={handleBack} 
            className="p-2 -ml-2 rounded-full bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700 transition-all duration-200"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
        {rightContent ? rightContent : (
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full md:hidden">
            <span>11:10</span>
            <Wifi className="w-4 h-4" />
            <BatteryFull className="w-4 h-4" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;