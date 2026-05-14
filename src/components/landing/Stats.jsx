import { motion } from 'framer-motion';
import { useCountUp, useInView } from '../../hooks/useAnimations';

function CounterItem({ value, suffix, label, delay }) {
  const [ref, inView] = useInView();
  const { count } = useCountUp(value, 2000, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      style={{ textAlign: 'center', flex: 1 }}
    >
      <div style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: '52px', 
        fontWeight: 800, 
        color: 'var(--text-primary)',
        lineHeight: 1,
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        letterSpacing: '-0.02em'
      }}>
        <span>{count.toLocaleString()}</span>
        <span style={{ color: 'var(--accent-primary)', fontSize: '32px', marginLeft: '4px' }}>{suffix}</span>
      </div>
      <div style={{ 
        fontSize: '11px', 
        fontWeight: 700, 
        color: 'var(--text-dim)', 
        textTransform: 'uppercase',
        letterSpacing: '0.2em'
      }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const stats = [
    { value: 24000, suffix: '+', label: 'Active Learners' },
    { value: 96, suffix: '%', label: 'Retention Rate' },
    { value: 52, suffix: 'M+', label: 'Sessions Processed' },
    { value: 250, suffix: '+', label: 'Partner Institutions' },
  ];

  return (
    <section style={{ 
      padding: '100px 0', 
      background: 'rgba(99,102,241,0.03)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'relative'
    }}>
      {/* Decorative Line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1px', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.1), transparent)'
      }} />

      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 60px',
        position: 'relative',
        zIndex: 1
      }}>
        {stats.map((s, i) => (
          <CounterItem 
            key={i} 
            value={s.value} 
            suffix={s.suffix} 
            label={s.label} 
            delay={i * 0.1} 
          />
        ))}
      </div>
    </section>
  );
}
