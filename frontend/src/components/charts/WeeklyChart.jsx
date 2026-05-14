import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { weeklyStudyData } from '../../lib/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(3,7,18,0.98)', backdropFilter: 'blur(16px)',
      border: '1px solid rgba(99,102,241,0.3)', borderRadius: '14px',
      padding: '14px 18px', boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
    }}>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', marginBottom: '8px', color: '#FFFFFF' }}>{label}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
         <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '15px', fontWeight: 900 }}>{payload[0].value}h ADHYETA STUDY</p>
         {payload[0].payload.focus && (
           <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)', fontSize: '13px', fontWeight: 800 }}>SYNC INDEX: {payload[0].payload.focus}%</p>
         )}
      </div>
    </div>
  );
};

export default function WeeklyChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={weeklyStudyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradBio" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
        <XAxis 
            dataKey="day" 
            tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 700 }} 
            axisLine={false} 
            tickLine={false} 
            dy={10}
        />
        <YAxis 
            tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 700 }} 
            axisLine={false} 
            tickLine={false} 
            unit="h" 
            dx={-10}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--accent-primary)', strokeWidth: 1 }} />
        <ReferenceLine 
            y={5} 
            stroke="var(--accent-primary)" 
            strokeDasharray="8 4" 
            strokeOpacity={0.4} 
            label={{ value: 'SYNC GOAL', fill: 'var(--accent-primary)', fontSize: 9, fontWeight: 900, position: 'right', offset: 10 }} 
        />
        <Area 
            type="monotone" 
            dataKey="hours" 
            stroke="var(--accent-primary)" 
            strokeWidth={4} 
            fill="url(#gradBio)" 
            animationDuration={1500} 
            animationEasing="ease-out" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
