import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Award, ArrowRight, Home, Sparkles, BrainCircuit } from 'lucide-react';
import Button from '../ui/Button';
import { useConfetti } from '../../hooks/useAnimations';
import { useEffect } from 'react';

export default function SessionComplete({ stats, onRestart }) {
  const { particles, trigger } = useConfetti();

  useEffect(() => {
    trigger(80);
  }, [trigger]);

  if (!stats) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{
        position: 'fixed', inset: 0, zIndex: 2000, 
        background: 'rgba(3, 7, 18, 0.98)',
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px'
      }}
    >
      {/* Confetti Particles (ADHYETA-Indigo themed) */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: `${p.x}vw`, y: '100vh', opacity: 1, rotate: 0 }}
            animate={{ 
              x: `${p.x + p.vx}vw`, 
              y: '-10vh', 
              opacity: 0, 
              rotate: p.rotation + 360 
            }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: '2px',
              pointerEvents: 'none',
              boxShadow: `0 0 10px ${p.color}`
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }} 
        style={{ 
          textAlign: 'center', 
          position: 'relative', 
          zIndex: 2,
          maxWidth: '560px',
          width: '100%'
        }}
      >
        <div style={{ position: 'relative', width: 'fit-content', margin: '0 auto 32px' }}>
          <div style={{
            width: '96px', height: '96px', borderRadius: '24px',
            background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--glow-primary)'
          }}>
            <Award size={48} color="var(--accent-primary)" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: -10, borderRadius: '32px', border: '2px dashed rgba(99,102,241,0.2)', opacity: 0.5 }}
          />
        </div>

        <h1 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '44px', 
          fontWeight: 950, 
          marginBottom: '16px',
          letterSpacing: '-0.03em'
        }}>
          Sync <span className="text-gradient-primary">Achieved</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', fontSize: '18px', fontWeight: 500, lineHeight: 1.6 }}>
          Your Learning immersion was elite. Your ADHYETA landscape has been successfully expanded.
        </p>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1px', background: 'rgba(255,255,255,0.05)', 
          borderRadius: '24px', overflow: 'hidden', 
          marginBottom: '48px', border: '1px solid var(--border-subtle)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          {[
            { value: `${stats.duration}M`, label: 'IMMERSION', color: 'var(--accent-primary)' },
            { value: `${stats.flowAverage}%`, label: 'FLOW COHESION', color: 'var(--accent-secondary)' },
            { value: `+${stats.xpEarned}`, label: 'ADHYETA XP', color: 'var(--accent-success)' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.02)', padding: '32px 16px' }}>
              <div style={{ 
                fontFamily: 'var(--font-mono)', fontSize: '28px', 
                fontWeight: 900, color: s.color, marginBottom: '6px',
                letterSpacing: '-0.05em'
              }}>
                {s.value}
              </div>
              <div style={{ 
                fontSize: '10px', fontWeight: 800, 
                color: 'var(--text-dim)', letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', 
          justifyContent: 'center', marginBottom: '56px',
          background: 'rgba(245,158,11,0.08)', padding: '12px 24px',
          borderRadius: '100px', width: 'fit-content', margin: '0 auto 56px',
          border: '1px solid rgba(245,158,11,0.15)'
        }}>
          <Flame size={20} color="var(--accent-warn)" />
          <span style={{ 
            fontFamily: 'var(--font-mono)', fontWeight: 800, 
            color: 'var(--accent-warn)', fontSize: '15px', letterSpacing: '0.02em'
          }}>
            23 DAY ADHYETA STREAK UNLOCKED
          </span>
          <Sparkles size={16} color="var(--accent-warn)" />
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Button variant="glow" size="lg" onClick={onRestart} icon={<ArrowRight size={20} />} style={{ flex: 1, height: '60px' }}>
            Next Node
          </Button>
          <Link to="/dashboard" style={{ flex: 1, textDecoration: 'none' }}>
            <Button variant="ghost" size="lg" icon={<Home size={20} />} style={{ width: '100%', height: '60px' }}>
              Core Interface
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
