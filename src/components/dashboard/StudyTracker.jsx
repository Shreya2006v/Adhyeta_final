import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const urgencyConfig = {
  high:   { color: 'var(--accent-danger)', bg: 'rgba(239,68,68,0.08)',  label: 'Urgent' },
  medium: { color: 'var(--accent-warn)', bg: 'rgba(245,158,11,0.08)',  label: 'Soon' },
  low:    { color: 'var(--accent-primary)', bg: 'rgba(99,102,241,0.06)',   label: 'Routine' },
  none:   { color: 'var(--text-dim)', bg: 'rgba(255,255,255,0.02)', label: '' },
};

export default function StudyTracker({ tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const pending = tasks.filter(t => !t.done);
  const done    = tasks.filter(t => t.done);

  return (
    <GlassCard elevated style={{ height: '100%', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800 }}>
          Learning Agenda
        </h3>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-primary)',
          background: 'rgba(99,102,241,0.1)', padding: '4px 12px', borderRadius: '12px',
          fontWeight: 700
        }}>
          {done.length}/{tasks.length} SYNCED
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.03)', marginBottom: '24px', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${(done.length / tasks.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 12 }}
          style={{ height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', boxShadow: 'var(--glow-primary)' }}
        />
      </div>

      {/* Pending tasks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <AnimatePresence>
          {pending.map((task) => {
            const u = urgencyConfig[task.urgency];
            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30, scale: 0.9 }}
                whileHover={{ x: 6, background: `rgba(99,102,241,0.2)` }}
                onClick={() => toggle(task.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 14px', borderRadius: '12px',
                  background: u.bg, border: `1px solid rgba(99,102,241,0.2)`,
                  cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Circle size={18} color={u.color} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{task.icon} {task.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <Clock size={12} color="var(--text-dim)" />
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{task.dueIn}</span>
                  </div>
                </div>
                {task.urgency !== 'none' && (
                  <span style={{
                    fontSize: '10px', fontWeight: 800, color: u.color,
                    background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: '10px',
                    textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>
                    {u.label}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Done tasks */}
        <AnimatePresence>
          {done.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => toggle(task.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 14px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
              }}
            >
              <CheckCircle size={18} color="var(--accent-success)" />
              <div style={{ fontSize: '13px', textDecoration: 'line-through', color: 'var(--text-dim)', fontWeight: 500 }}>
                {task.icon} {task.title}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
