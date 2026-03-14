
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import BloodSugarChart from '../components/BloodSugarChart';
import CustomizeDashboardModal, { WidgetConfig } from '../components/CustomizeDashboardModal';
import { MOCK_DASHBOARD_STATS, MOCK_BLOOD_SUGAR_READINGS } from '../constants';
import { Bell, Droplet, Pill, Footprints, Flame, ChevronRight, Settings2, Flame as FlameIcon, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  colorClass: string;
  bgClass: string;
  onClick?: () => void;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, colorClass, bgClass, onClick, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: "easeOut" }}
    className={`bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl flex flex-col justify-between items-start transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-slate-800 hover:border-slate-600 hover:shadow-lg hover:-translate-y-1' : ''}`}
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    aria-label={`${label}: ${value}`}
  >
    <div className={`p-2.5 rounded-xl mb-4 ${bgClass}`}>
      <Icon className={`w-5 h-5 ${colorClass}`} />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-400 mb-1" id={`${label.replace(/\s+/g, '-').toLowerCase()}-label`}>{label}</p>
      <p className="text-lg font-bold text-white tracking-tight" aria-labelledby={`${label.replace(/\s+/g, '-').toLowerCase()}-label`}>{value}</p>
    </div>
  </motion.div>
);

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: 'eaten', title: 'Eaten Summary', visible: true },
  { id: 'water', title: 'Water Intake', visible: true },
  { id: 'glucose', title: 'Glucose Stat', visible: true },
  { id: 'pills', title: 'Pills Stat', visible: true },
  { id: 'activity', title: 'Activity Stat', visible: true },
  { id: 'carbs', title: 'Carbs Stat', visible: true },
  { id: 'chart', title: 'Blood Sugar Chart', visible: true },
];

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, waterIntake, setWaterIntake, medicationEntries } = useAppContext();
  const stats = MOCK_DASHBOARD_STATS;
  const bloodSugarData = MOCK_BLOOD_SUGAR_READINGS;

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  // ⚡ Bolt: Defer synchronous localStorage read to useEffect to avoid blocking initial render
  const [widgets, setWidgets] = useState<WidgetConfig[]>(DEFAULT_WIDGETS);

  useEffect(() => {
    const saved = localStorage.getItem('dashboardWidgets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setWidgets(parsed);
        }
      } catch (e) {
        console.error('Failed to parse dashboard widgets from local storage:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Only save if it's different from initial or after loading
    if (widgets !== DEFAULT_WIDGETS) {
      localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
    }
  }, [widgets]);

  const widgetMap = useMemo(() => {
    // ⚡ Bolt: Replaced inefficient .reduce() with a faster for loop
    const acc: Record<string, WidgetConfig> = {};
    const len = widgets.length;
    for (let i = 0; i < len; i++) {
      const widget = widgets[i];
      acc[widget.id] = widget;
    }
    return acc;
  }, [widgets]);

  const eatenPercentage = (stats.eatenGL / stats.totalGL) * 100;

  const today = new Date();
  // ⚡ Bolt: Cache year, month, and date for manual integer comparison inside the filter loop to improve performance over date-fns isSameDay
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  const pillsTakenToday = medicationEntries.filter(e => {
    const entryDate = new Date(e.takenAt);
    return entryDate.getFullYear() === currentYear &&
           entryDate.getMonth() === currentMonth &&
           entryDate.getDate() === currentDay;
  }).length;

  const handleWaterAdd = () => setWaterIntake(waterIntake + 1);
  const handleWaterRemove = () => setWaterIntake(Math.max(0, waterIntake - 1));

  const renderWidget = (widget: WidgetConfig, delay: number) => {
    if (!widget.visible) return null;

    switch (widget.id) {
      case 'eaten':
        return (
          <motion.div
            key="eaten"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
            className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-800/30 p-6 rounded-3xl shadow-lg relative overflow-hidden mb-6"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Eaten</h2>
                <p className="text-sm font-medium text-emerald-200/70">{stats.eatenGL} GL of {stats.totalGL} GL</p>
              </div>
              <div className="relative w-20 h-20" role="progressbar" aria-valuenow={Math.round(eatenPercentage)} aria-valuemin={0} aria-valuemax={100} aria-label={`Nutritional goal ${Math.round(eatenPercentage)}% complete`}>
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800/80"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <motion.path
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: `${eatenPercentage}, 100` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="text-emerald-400"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{Math.round(eatenPercentage)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'water':
        return (
          <motion.div
            key="water"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
            className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mb-6 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <Droplet className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400">Water Intake</h3>
                <p className="text-xl font-bold text-white tracking-tight">{waterIntake} <span className="text-sm text-blue-400">glasses</span></p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleWaterRemove} className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors" aria-label="Remove Water">
                <Minus className="w-5 h-5" />
              </button>
              <button onClick={handleWaterAdd} className="w-10 h-10 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95" aria-label="Add Water">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        );
      case 'glucose':
        return (
          <StatCard
            key="glucose"
            icon={Droplet}
            label="Glucose"
            value={`${stats.glucose} mg/dL`}
            colorClass="text-rose-400"
            bgClass="bg-rose-400/10"
            onClick={() => navigate('/daily-meals')}
            delay={delay}
          />
        );
      case 'pills':
        return (
          <StatCard
            key="pills"
            icon={Pill}
            label="Pills"
            value={`${pillsTakenToday} taken`}
            colorClass="text-cyan-400"
            bgClass="bg-cyan-400/10"
            onClick={() => navigate('/medications')}
            delay={delay}
          />
        );
      case 'activity':
        return (
          <StatCard
            key="activity"
            icon={Footprints}
            label="Activity"
            value={`${stats.activitySteps} steps`}
            colorClass="text-amber-400"
            bgClass="bg-amber-400/10"
            delay={delay}
          />
        );
      case 'carbs':
        return (
          <StatCard
            key="carbs"
            icon={Flame}
            label="Carbs"
            value={`${stats.carbsIntake} cal`}
            colorClass="text-orange-400"
            bgClass="bg-orange-400/10"
            delay={delay}
          />
        );
      case 'chart':
        return (
          <motion.div
            key="chart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="bg-slate-900 border border-slate-800 p-5 rounded-3xl mt-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Blood Sugar</h3>
              <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300">View All</button>
            </div>
            <BloodSugarChart data={bloodSugarData} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header
          title={
            <div className="flex items-center gap-2">
              <span>Hi, {userProfile.name}!</span>
              <div className="flex items-center gap-1 bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs font-bold">
                <FlameIcon className="w-3 h-3" />
                <span>7 Day Streak</span>
              </div>
            </div>
          }
          rightContent={
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCustomizeOpen(true)}
                className="relative p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-all duration-200"
                aria-label="Customize Dashboard"
              >
                <Settings2 className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-all duration-200" aria-label="Notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
              </button>
            </div>
          }
        />
        <main className="flex-1 overflow-y-auto p-5 pb-24 md:pb-5">

          {widgetMap['eaten'] && renderWidget(widgetMap['eaten'], 0.1)}
          {widgetMap['water'] && renderWidget(widgetMap['water'], 0.2)}

          {/* Grid Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['glucose', 'pills', 'activity', 'carbs']
              .map(id => widgetMap[id])
              .filter(Boolean)
              .map((widget, index) => renderWidget(widget, 0.1 * (index + 3)))}
          </div>

          {widgetMap['chart'] && renderWidget(widgetMap['chart'], 0.6)}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="space-y-3 mt-6"
          >
            <button className="w-full bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl text-left hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-200 group-hover:text-white">Select a day</span>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
            </button>
            <button className="w-full bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl text-left hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-200 group-hover:text-white">Yesterday</span>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
            </button>
          </motion.div>
        </main>
      </div>
      <BottomNav />
      <CustomizeDashboardModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        widgets={widgets}
        onSave={setWidgets}
      />
    </div>
  );
};

export default DashboardScreen;