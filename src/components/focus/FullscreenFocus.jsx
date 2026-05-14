import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, X, Volume2, VolumeX, Flame, BrainCircuit, Activity } from 'lucide-react';
import FocusTimer from './FocusTimer';
import Button from '../ui/Button';
import { useState } from 'react';

export default function FullscreenFocus({ timer, mode, topic, flowScore, getTimerColor, onEnd }) {
  const [muted, setMuted] = useState(false);
  const color = getTimerColor();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#030712',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        overflow: 'hidden'
      }}
    >
      {/* Immersive ADHYETA Background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15,
        background: `radial-gradient(circle at center, rgba(99,102,241,0.2) 0%, transparent 70%)`,
        zIndex: 0
      }} />
      
      {/* Decorative Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{ position: 'absolute', top: '10%', right: '15%', width: '400px', height: '400px', borderRadius: '50%', background: color, filter: 'blur(100px)', zIndex: 0 }}
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.15, 0.05],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{ position: 'absolute', bottom: '10%', left: '15%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--accent-secondary)', filter: 'blur(120px)', zIndex: 0 }}
      />

      {/* Header Info */}
      <div style={{ 
        position: 'absolute', top: '80px', 
        display: 'flex', flexDirection: 'column', 
        alignItems: 'center', zIndex: 1 
      }}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(255,255,255,0.03)', padding: '8px 20px',
            borderRadius: '100px', border: `1px solid rgba(99,102,241,0.2)`,
            marginBottom: '24px', backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ position: 'relative', width: 10, height: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
            <motion.div 
              animate={{ scale: [1, 2], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }}
            />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 800, color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {mode.label}
          </span>
        </motion.div>
        
        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '42px', 
          fontWeight: 900,
          color: '#FFFFFF',
          textAlign: 'center',
          letterSpacing: '-0.03em'
        }}>
          {topic || 'SyncHRONIZATION'}
        </h1>
      </div>

      {/* Main Timer */}
      <div style={{ position: 'relative', zIndex: 1, margin: '60px 0' }}>
        <FocusTimer timer={timer} color={color} size={440} />
      </div>

      {/* Stats and Meters */}
      <div style={{ 
        display: 'flex', gap: '64px', 
        zIndex: 1, marginBottom: '80px' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', fontSize: '32px', 
            fontWeight: 900, color: 'var(--accent-primary)',
            letterSpacing: '-0.05em'
          }}>
            {flowScore}%
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
            Flow Consistency
          </div>
        </div>
        
        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />

        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', fontSize: '32px', 
            fontWeight: 900, color: 'var(--accent-warn)',
            display: 'flex', alignItems: 'center', gap: '8px',
            letterSpacing: '-0.05em'
          }}>
            <Flame size={24} /> 23
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
            ADHYETA Streak
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', alignItems: 'center', 
        gap: '40px', zIndex: 1 
      }}>
        <button 
          onClick={() => setMuted(!muted)}
          style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', 
            color: 'var(--text-dim)', cursor: 'pointer',
            width: '56px', height: '56px', borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: '0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
        >
          {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => timer.isRunning ? timer.pause() : timer.start()}
          style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: timer.isRunning ? 'rgba(255,255,255,0.05)' : color,
            border: timer.isRunning ? `2px solid rgba(99,102,241,0.2)` : 'none',
            color: timer.isRunning ? color : '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: timer.isRunning ? 'none' : `0 0 40px rgba(99,102,241,0.2)`
          }}
        >
          {timer.isRunning ? <Pause size={40} /> : <Play size={40} fill="currentColor" />}
        </motion.button>

        <button 
          onClick={onEnd}
          style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', 
            color: 'var(--accent-danger)', cursor: 'pointer',
            width: '56px', height: '56px', borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: '0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
        >
          <X size={24} />
        </button>
      </div>

      {/* Bottom Hint */}
      <div style={{ 
        position: 'absolute', bottom: '60px', 
        color: 'var(--text-dim)', fontSize: '13px', fontWeight: 600,
        display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        <BrainCircuit size={16} color="var(--accent-primary)" />
        Press <span style={{ color: '#FFFFFF', padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', margin: '0 4px' }}>ESC</span> to exit immersion
      </div>
    </motion.div>
  );
}
