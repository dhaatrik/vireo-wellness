import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { TrendingUp, Activity, Clock } from 'lucide-react';

const mockWeeklyData = [
  { day: 'Mon', avgGlucose: 110, inRange: 85 },
  { day: 'Tue', avgGlucose: 105, inRange: 90 },
  { day: 'Wed', avgGlucose: 120, inRange: 75 },
  { day: 'Thu', avgGlucose: 115, inRange: 80 },
  { day: 'Fri', avgGlucose: 130, inRange: 60 },
  { day: 'Sat', avgGlucose: 100, inRange: 95 },
  { day: 'Sun', avgGlucose: 108, inRange: 88 },
];

const InsightsScreen: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-950 flex-1 w-full overflow-hidden">
      <div className="flex flex-col flex-1 w-full overflow-hidden order-1 md:order-2">
        <Header title="Insights" />
        <main className="flex-1 overflow-y-auto p-5 space-y-6 pb-24 md:pb-5">
          
          {/* Timeframe Toggle */}
          <div className="flex bg-slate-900 rounded-2xl p-1 border border-slate-800">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${timeframe === 'weekly' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${timeframe === 'monthly' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Monthly
            </button>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 p-4 rounded-3xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-400">Time in Range</span>
              </div>
              <div className="text-2xl font-bold text-white">82%</div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +5% from last week
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-900 border border-slate-800 p-4 rounded-3xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-rose-500/20 rounded-lg text-rose-400">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-400">Highest Spike</span>
              </div>
              <div className="text-2xl font-bold text-white">After Dinner</div>
              <div className="text-xs text-slate-500 mt-1">Avg 145 mg/dL</div>
            </motion.div>
          </div>

          {/* Average Glucose Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
            <h3 className="text-sm font-bold text-white mb-4">Average Glucose</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 20', 'dataMax + 20']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Line type="monotone" dataKey="avgGlucose" stroke="#10b981" strokeWidth={3} dot={{ fill: '#0f172a', stroke: '#10b981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Time in Range Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
            <h3 className="text-sm font-bold text-white mb-4">Time in Range (%)</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    cursor={{ fill: '#1e293b' }}
                  />
                  <Bar dataKey="inRange" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default InsightsScreen;
