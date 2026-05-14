import { motion } from 'framer-motion';

export default function LearningMap() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      position: 'relative', 
      background: 'rgba(255,255,255,0.02)',
      borderRadius: '20px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Simple animated "ADHYETA" mesh background using SVG */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        
        {/* Animated grid lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${(i / 12) * 100}%`} y1="0"
            x2={`${(i / 12) * 100}%`} y2="100%"
            stroke="var(--accent-primary)"
            strokeOpacity={0.1}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </svg>

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ 
          width: '120px', height: '120px', borderRadius: '50%', 
          background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
          boxShadow: '0 0 60px rgba(99,102,241,0.4)',
          margin: '0 auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse 3s infinite ease-in-out'
        }}>
          <img src="/logo.png" alt="Logo" style={{ width: '60px', opacity: 0.8 }} />
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>Sync Active</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '8px' }}>Optimizing Learning load...</p>
      </div>
    </div>
  );
}
