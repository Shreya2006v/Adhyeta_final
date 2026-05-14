import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import GlassCard from '../ui/GlassCard';
import { LearningRiskData } from '../../lib/mockData';
import { Activity } from 'lucide-react';

export default function RiskScatterPlot() {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: 'spring', damping: 20 }}>
      <GlassCard elevated style={{ padding: '32px', border: '1px solid rgba(99,102,241,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
           <Activity size={20} color="var(--accent-primary)" />
           <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900 }}>Risk Analysis</h3>
        </div>
        <div style={{ height: '320px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis 
                type="number" 
                dataKey="engagement" 
                name="Engagement" 
                unit="%" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 700 }} 
                label={{ value: 'Learning ENGAGEMENT %', position: 'bottom', fill: 'var(--text-dim)', fontSize: 10, fontWeight: 800, offset: 0 }} 
              />
              <YAxis 
                type="number" 
                dataKey="performance" 
                name="Performance" 
                unit="%" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 700 }} 
                label={{ value: 'ADHYETA PERFORMANCE %', angle: -90, position: 'left', fill: 'var(--text-dim)', fontSize: 10, fontWeight: 800, offset: 10 }} 
              />
              <ZAxis type="number" range={[100, 500]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3', stroke: 'var(--accent-primary)', strokeWidth: 1 }}
                contentStyle={{ background: 'rgba(3,7,18,0.98)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '14px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                itemStyle={{ fontWeight: 800 }}
              />
              <Scatter name="Students" data={LearningRiskData}>
                {LearningRiskData.map((entry, index) => {
                  const color = entry.risk === 'high' ? 'var(--accent-danger)' : entry.risk === 'medium' ? 'var(--accent-warn)' : 'var(--accent-success)';
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={color} 
                      style={{ filter: `drop-shadow(0 0 8px rgba(99,102,241,0.2))` }}
                    />
                  );
                })}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '32px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>
            <div style={{ width: 10, height: 10, borderRadius: '3px', background: 'var(--accent-success)', boxShadow: '0 0 8px var(--accent-success)40' }} /> Synced
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>
            <div style={{ width: 10, height: 10, borderRadius: '3px', background: 'var(--accent-warn)', boxShadow: '0 0 8px var(--accent-warn)40' }} /> Latency
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>
            <div style={{ width: 10, height: 10, borderRadius: '3px', background: 'var(--accent-danger)', boxShadow: '0 0 8px var(--accent-danger)40' }} /> At Risk
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
