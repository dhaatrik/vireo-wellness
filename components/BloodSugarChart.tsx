
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BloodSugarReading } from '../types';

interface BloodSugarChartProps {
  data: BloodSugarReading[];
}

const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' });

const BloodSugarChart: React.FC<BloodSugarChartProps> = ({ data }) => {
  const formattedData = data.map(reading => ({
    ...reading,
    time: timeFormatter.format(new Date(reading.timestamp)),
    beforeMeal: reading.type === 'before_meal' ? reading.value : null,
    afterMeal: reading.type === 'after_meal' ? reading.value : null,
  }));

  return (
    <div className="w-full">
      <p className="text-xs text-slate-400 mb-4">Avg this week: <span className="text-emerald-400 font-bold">120 mg/dL</span></p>
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 10, left: -25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              tick={{ fill: '#64748b', fontSize: 11 }} 
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#64748b" 
              tick={{ fill: '#64748b', fontSize: 11 }} 
              domain={[60, 180]} 
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderColor: '#334155',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                color: '#f8fafc',
                fontSize: '12px',
                padding: '8px 12px'
              }}
              itemStyle={{ color: '#f8fafc', fontWeight: 500 }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '15px', color: '#94a3b8' }} 
              iconType="circle"
              iconSize={8}
            />
            <Line 
              type="monotone" 
              dataKey="beforeMeal" 
              name="Before Meal" 
              stroke="#34d399" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} 
              activeDot={{ r: 6, fill: '#34d399', stroke: '#0f172a', strokeWidth: 2 }} 
              connectNulls 
            />
            <Line 
              type="monotone" 
              dataKey="afterMeal" 
              name="After Meal" 
              stroke="#38bdf8" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} 
              activeDot={{ r: 6, fill: '#38bdf8', stroke: '#0f172a', strokeWidth: 2 }} 
              connectNulls 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BloodSugarChart;