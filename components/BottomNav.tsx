
import { useState, ElementType } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Plus, TabletSmartphone, Settings, LineChart } from 'lucide-react';
import { motion } from 'motion/react';
import QuickAddModal from './QuickAddModal';

interface NavItemProps {
  to: string;
  icon: ElementType;
  label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === "/dashboard" && location.pathname === "/");

  return (
    <NavLink
      to={to}
      className={`relative flex flex-col md:flex-row md:justify-start md:px-6 items-center justify-center flex-1 md:flex-none py-3 md:py-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-xl ${
        isActive ? 'text-emerald-400 md:bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300 md:hover:bg-slate-800/50'
      }`}
    >
      {isActive && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute top-0 md:top-auto md:left-0 w-8 h-1 md:w-1 md:h-full bg-emerald-500 rounded-b-full md:rounded-b-none md:rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <Icon className={`w-6 h-6 mb-1 md:mb-0 md:mr-4 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
      <span className="text-[10px] md:text-sm font-medium tracking-wide">{label}</span>
    </NavLink>
  );
};

const BottomNav = () => {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-900/90 backdrop-blur-xl sticky bottom-0 z-40 border-t border-slate-800/50 pb-safe md:static md:w-64 md:border-t-0 md:border-r md:h-full md:flex-shrink-0 order-2 md:order-1">
        <div className="max-w-md md:max-w-none mx-auto flex md:flex-col justify-around md:justify-start items-center md:items-stretch px-2 md:px-0 relative md:pt-8 md:gap-2 h-full">
          <div className="hidden md:flex items-center px-6 mb-8">
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Vireo</span>
          </div>

          <NavItem to="/dashboard" icon={Home} label="Home" />
          <NavItem to="/insights" icon={LineChart} label="Insights" />
          <NavItem to="/daily-meals" icon={ClipboardList} label="Meals" />
          
          <div className="flex-1 md:flex-none flex justify-center md:justify-start md:px-6 -mt-6 md:mt-4 md:mb-4">
            <button
              type="button"
              onClick={() => setIsQuickAddOpen(true)}
              className="flex items-center justify-center md:justify-start md:px-4 w-14 h-14 md:w-full md:h-12 bg-emerald-500 rounded-2xl text-white shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              aria-label="Quick Add"
            >
              <Plus className="w-7 h-7 md:w-5 md:h-5 stroke-[2.5px] md:mr-2" />
              <span className="hidden md:inline font-semibold">Quick Add</span>
            </button>
          </div>

          <NavItem to="/devices" icon={TabletSmartphone} label="Devices" />
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </div>
      </div>
      <QuickAddModal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} />
    </>
  );
};

export default BottomNav;