import { motion } from 'framer-motion';
import { Users, BrainCircuit, Activity, Zap } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function TeacherStats() {
  const stats = [
    { icon: Users, label: 'Linked Minds', value: '34', color: 'var(--accent-primary)' },
    { icon: BrainCircuit, label: 'Cohort Accuracy', value: '71%', color: 'var(--accent-secondary)' },
    { icon: Activity, label: 'Cohesion', value: '69%', color: 'var(--accent-success)' },
    { icon: Zap, label: 'Active Syncs', value: '12', color: 'var(--accent-warn)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
      {stats.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: 'spring', damping: 20 }}
          >
            <GlassCard elevated style={{ padding: '28px', borderLeft: `4px solid ${c.color}`, background: 'rgba(255,255,255,0.01)' }}>
              <Icon size={20} color={c.color} style={{ marginBottom: '16px' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '36px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1 }}>{c.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '10px' }}>{c.label}</div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
