import { motion } from 'framer-motion';

// ── FocusScoreRing: SVG arc ring ──
export function FocusScoreRing({ score = 78, size = 100 }) {
  const r = (size - 14) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const color = score >= 80 ? 'var(--accent-success)' : score >= 60 ? 'var(--accent-warn)' : 'var(--accent-danger)';

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={10}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ filter: `drop-shadow(0 0 10px rgba(99,102,241,0.2))` }}
        />
      </svg>
      {/* Center text */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.05em' }}>
          {score}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>
          FOCUS
        </span>
      </div>
    </div>
  );
}

// ── StreakDots: 7-day bubble grid ──
export function StreakDots({ streak = 23 }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const activeCount = Math.min(streak, 7);

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {days.map((d, i) => {
          const active = i < activeCount;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '10px',
                background: active
                  ? 'linear-gradient(135deg, var(--accent-warn), #FB923C)'
                  : 'rgba(255,255,255,0.03)',
                border: active ? '1px solid rgba(245,158,11,0.3)' : '1px solid var(--border-subtle)',
                boxShadow: active ? '0 4px 12px rgba(245,158,11,0.2)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', transition: 'all 0.3s'
              }}>
                {active ? '🔥' : ''}
              </div>
              <span style={{ fontSize: '10px', color: active ? 'var(--text-primary)' : 'var(--text-dim)', fontWeight: active ? 700 : 500 }}>{d}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
