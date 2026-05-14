import { useRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

// Pure CSS/SVG animated sphere fallback - no Three.js dependency
// This ensures the hero works on ALL systems regardless of WebGL support

function FloatingDot({ delay, size, x, y, color }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        filter: 'blur(0.5px)',
      }}
    />
  );
}

export default function HeroSphere() {
  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      // Distribute in a circular pattern
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 30;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;
      arr.push({
        id: i,
        x, y,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3,
        color: i % 3 === 0 ? '#6366f1' : i % 3 === 1 ? '#06b6d4' : '#a855f7',
      });
    }
    return arr;
  }, []);

  // Connection lines
  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      const angle1 = Math.random() * Math.PI * 2;
      const r1 = 15 + Math.random() * 30;
      const angle2 = angle1 + (Math.random() - 0.5) * 1.5;
      const r2 = 15 + Math.random() * 30;
      arr.push({
        id: i,
        x1: 50 + Math.cos(angle1) * r1,
        y1: 50 + Math.sin(angle1) * r1,
        x2: 50 + Math.cos(angle2) * r2,
        y2: 50 + Math.sin(angle2) * r2,
      });
    }
    return arr;
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Central glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%', height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Rotating container for the ADHYETA network */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* SVG connection lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {lines.map(l => (
            <line
              key={l.id}
              x1={`${l.x1}%`} y1={`${l.y1}%`}
              x2={`${l.x2}%`} y2={`${l.y2}%`}
              stroke="#6366f1"
              strokeOpacity={0.08}
              strokeWidth={1}
            />
          ))}
        </svg>

        {/* ADHYETA dots */}
        {dots.map(d => (
          <FloatingDot key={d.id} {...d} />
        ))}
      </motion.div>

      {/* Inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55%', height: '55%',
          border: '1px solid rgba(99,102,241,0.1)',
          borderRadius: '50%',
        }}
      />

      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '75%', height: '75%',
          border: '1px dashed rgba(6,182,212,0.08)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}
