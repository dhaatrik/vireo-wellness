
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import BloodSugarChart from '../components/BloodSugarChart';
import { MOCK_USER, MOCK_DASHBOARD_STATS, MOCK_BLOOD_SUGAR_READINGS } from '../constants';
import { BellIcon, DropletIcon, PillIcon, ShoeIcon, CubeIcon, ChevronRightIcon } from '../components/Icons';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColorClass: string; 
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, bgColorClass, onClick }) => (
  <div 
    className={`bg-slate-700 p-3 rounded-lg shadow flex flex-col justify-between items-start transition-colors duration-300 ${onClick ? 'cursor-pointer hover:bg-slate-600' : ''}`}
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    aria-label={`${label}: ${value}`}
  >
    <div className={`p-2 rounded-full mb-3 ${bgColorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-400" id={`${label.replace(/\s+/g, '-').toLowerCase()}-label`}>{label}</p>
      <p className="text-lg font-semibold text-slate-100" aria-labelledby={`${label.replace(/\s+/g, '-').toLowerCase()}-label`}>{value}</p>
    </div>
  </div>
);


const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const user = MOCK_USER;
  const stats = MOCK_DASHBOARD_STATS;
  const bloodSugarData = MOCK_BLOOD_SUGAR_READINGS;

  const eatenPercentage = (stats.eatenGL / stats.totalGL) * 100;

  return (
    <div className="flex flex-col h-full">
      <Header 
        title={`Hi, ${user.name}!`}
        rightContent={null}
      />
      <main className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-800 transition-colors duration-300">
        {/* Eaten Stats Card */}
        <div className="bg-slate-700 p-4 rounded-lg shadow transition-colors duration-300">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-semibold text-slate-100">Eaten</h2>
              <p className="text-sm text-slate-400">{stats.eatenGL} GL of {stats.totalGL} GL</p>
            </div>
            <div className="relative w-16 h-16" role="progressbar" aria-valuenow={Math.round(eatenPercentage)} aria-valuemin={0} aria-valuemax={100} aria-label={`Nutritional goal ${Math.round(eatenPercentage)}% complete`}>
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-slate-600" // Adjusted from zinc-700
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-emerald-400" // Was green-500
                  strokeDasharray={`${eatenPercentage}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold text-emerald-400">{Math.round(eatenPercentage)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            icon={<DropletIcon className="w-5 h-5 text-amber-400" />} // Was red-400
            label="Glucose" 
            value={`${stats.glucose} mg/dL`} 
            bgColorClass="bg-amber-400/20" // Was red-500/20
            onClick={() => navigate('/daily-meals')}
          />
          <StatCard 
            icon={<PillIcon className="w-5 h-5 text-cyan-400" />} // Was blue-400
            label="Pills" 
            value={`${stats.pillsTaken} taken`} 
            bgColorClass="bg-cyan-400/20" // Was blue-500/20
          />
          <StatCard 
            icon={<ShoeIcon className="w-5 h-5 text-orange-400" />} // Kept orange for variety, could be amber-500
            label="Activity" 
            value={`${stats.activitySteps} steps`} 
            bgColorClass="bg-orange-400/20" // Kept orange-500/20
          />
          <StatCard 
            icon={<CubeIcon className="w-5 h-5 text-yellow-400" />} // Kept yellow for variety, could be amber-300
            label="Carbs" 
            value={`${stats.carbsIntake} cal`}
            bgColorClass="bg-yellow-400/20" // Kept yellow-500/20
          />
        </div>
        
        <BloodSugarChart data={bloodSugarData} />

      </main>
      <BottomNav />
    </div>
  );
};

export default DashboardScreen;