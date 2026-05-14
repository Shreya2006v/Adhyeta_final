import { motion } from 'framer-motion';

export default function FocusTimer({ timer, color = 'var(--accent-primary)', size = 400 }) {
  const radius = (size - 60) / 2;
  const strokeWidth = 16;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - timer.progress);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress ring with gradient */}
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="var(--accent-secondary)" />
          </linearGradient>
        </defs>
        
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#timerGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: "linear" }}
          style={{
            filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.3))',
          }}
        />
      </svg>

      {/* Timer content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
      }}>
        <motion.div 
          key={timer.timeStr}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '96px',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.06em',
            lineHeight: 1,
            textShadow: '0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          {timer.timeStr}
        </motion.div>
        <div style={{
          fontSize: '12px',
          fontWeight: 800,
          color: 'var(--text-dim)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '12px'
        }}>
          Sync LOCK
        </div>
      </div>

      {/* Decorative pulse when active */}
      {timer.isRunning && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            inset: 30,
            borderRadius: '50%',
            border: `2px solid ${color}`,
            zIndex: 0
          }}
        />
      )}
    </div>
  );
}
