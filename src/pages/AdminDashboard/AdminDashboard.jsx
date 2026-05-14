import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Users, UserCheck, TrendingUp, Activity, AlertTriangle, 
  Sparkles, Clock, LayoutDashboard,
  ShieldCheck, Server, Globe, Cpu
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';

const deptData = [
  { name: 'CS', performance: 88, color: '#6366F1' },
  { name: 'AI', performance: 82, color: '#06B6D4' },
  { name: 'ECE', performance: 65, color: '#F59E0B' },
  { name: 'MECH', performance: 58, color: '#EF4444' },
  { name: 'CIVIL', performance: 52, color: '#A855F7' },
];

const topStudents = {
  CS: [
    { name: 'Arjun Mehta', rank: 1, streak: 12, xp: 8400, improve: 15 },
    { name: 'Priya Rai', rank: 2, streak: 8, xp: 7900, improve: 12 },
  ],
  AI: [
    { name: 'Ananya Joshi', rank: 1, streak: 21, xp: 9200, improve: 18 },
    { name: 'Dev Das', rank: 2, streak: 5, xp: 7100, improve: 10 },
  ]
};

const activityFeed = [
  { text: "Institutional sync active", time: "2 min ago", type: "info" },
  { text: "52 nodes finalized OS session", time: "15 min ago", type: "check" },
  { text: "17 nodes in MECH: Sync lag", time: "1h ago", type: "warn" },
];

export default function AdminDashboard() {
  const s = (i) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: i * 0.05 }
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Header */}
      <motion.header {...s(0)} style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', marginBottom: '8px' }}>
            <ShieldCheck size={18} />
            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em' }}>COMMAND CENTER</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800 }}>Institutional Intelligence</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 800 }}>UPTIME</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-success)' }}>99.98%</div>
          </div>
          <Badge color="primary">1,242 LIVE NODES</Badge>
        </div>
      </motion.header>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Minds', val: '8,402', icon: Users, color: '#6366F1' },
          { label: 'Faculty Nodes', val: '314', icon: UserCheck, color: '#06B6D4' },
          { label: 'Sync Cohesion', val: '92%', icon: Clock, color: '#F59E0B' },
          { label: 'Live Sessions', val: '42', icon: Activity, color: '#EF4444' },
        ].map((kpi, i) => (
          <motion.div key={i} {...s(i + 1)}>
            <GlassCard elevated style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <kpi.icon size={18} color={kpi.color} />
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800 }}>{kpi.val}</div>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 800, marginTop: '12px' }}>{kpi.label.toUpperCase()}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Performance Chart */}
          <motion.div {...s(5)}>
            <GlassCard elevated style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Domain Performance</h3>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 700 }} />
                    <Bar dataKey="performance" radius={[0, 4, 4, 0]} barSize={20}>
                      {deptData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          {/* High Performers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {Object.entries(topStudents).map(([dept, students], i) => (
              <motion.div key={dept} {...s(6 + i)}>
                <GlassCard elevated style={{ padding: '20px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '16px' }}>{dept} ELITE</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {students.map((st, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '6px', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '12px' }}>{st.name[0]}</div>
                        <div style={{ flex: 1, fontSize: '14px', fontWeight: 700 }}>{st.name}</div>
                        <div style={{ color: 'var(--accent-success)', fontSize: '12px', fontWeight: 800 }}>+{st.improve}%</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <motion.div {...s(10)}>
            <GlassCard elevated style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '20px' }}>Live Stream</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activityFeed.map((act, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: 4, height: '32px', background: act.type === 'warn' ? '#EF4444' : '#6366F1', borderRadius: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{act.text}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '4px' }}>{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div {...s(11)}>
            <GlassCard elevated style={{ padding: '24px', border: '1px solid rgba(239,68,68,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <AlertTriangle size={16} color="#EF4444" />
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#EF4444' }}>System Alerts</h3>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                8 MECH students at risk. <br/>
                Exam node 04 latency high.
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
