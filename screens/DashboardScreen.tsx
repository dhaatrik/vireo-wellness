
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import BloodSugarChart from '../components/BloodSugarChart';
import CustomizeDashboardModal from '../components/CustomizeDashboardModal';
import StatCard from '../components/StatCard';
import { EatenWidget, WaterWidget, ChartWidget } from '../components/widgets';
import { MOCK_DASHBOARD_STATS, MOCK_BLOOD_SUGAR_READINGS } from '../constants';
import { Bell, Droplet, Pill, Footprints, Flame, ChevronRight, Settings2, Flame as FlameIcon, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { WidgetConfig } from '../types';
import { isValidWidgetConfigArray } from '../utils/validators';

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
        if (isValidWidgetConfigArray(parsed)) {
          setWidgets(parsed);
        } else {
          console.warn('Dashboard widgets in local storage did not match expected schema');
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

  // ⚡ Bolt: Wrap the filter operation in useMemo to prevent unnecessary array iteration on unrelated state changes (e.g. water intake)
  const pillsTakenToday = useMemo(() => {
    return medicationEntries.filter(e => {
      const entryDate = new Date(e.takenAt);
      return entryDate.getFullYear() === currentYear &&
             entryDate.getMonth() === currentMonth &&
             entryDate.getDate() === currentDay;
    }).length;
  }, [medicationEntries, currentYear, currentMonth, currentDay]);

  const handleWaterAdd = () => setWaterIntake(waterIntake + 1);
  const handleWaterRemove = () => setWaterIntake(Math.max(0, waterIntake - 1));

  const renderWidget = (widget: WidgetConfig, delay: number) => {
    if (!widget.visible) return null;

    switch (widget.id) {
      case 'eaten':
        return <EatenWidget key="eaten" stats={stats} eatenPercentage={eatenPercentage} delay={delay} />;
      case 'water':
        return <WaterWidget key="water" waterIntake={waterIntake} onAdd={handleWaterAdd} onRemove={handleWaterRemove} delay={delay} />;
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
        return <ChartWidget key="chart" data={bloodSugarData} delay={delay} />;
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
                className="relative p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                aria-label="Customize Dashboard"
              >
                <Settings2 className="w-5 h-5" />
              </button>
              <button className="relative p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900" aria-label="Notifications">
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