import { motion } from 'framer-motion';
import { Zap, Flame, Award, Target, Calendar, Sparkles, BrainCircuit } from 'lucide-react';
import Badge from '../ui/Badge';
import GlassCard from '../ui/GlassCard';
import { studentProfile } from '../../lib/mockData';

export default function ProfileHeader() {
  return (
    <GlassCard elevated style={{ 
      padding: '48px', marginBottom: '32px', 
      display: 'flex', alignItems: 'center', gap: '48px',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
      position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(99, 102, 241, 0.2)'
    }}>
      {/* Immersive Background Glow */}
      <div style={{
        position: 'absolute', top: '-150px', right: '-150px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative' }}>
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 2 }}
          style={{
            width: 140, height: 140, borderRadius: '40px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 950, color: '#FFFFFF', fontSize: '48px',
            boxShadow: 'var(--glow-primary)',
            position: 'relative', overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />
          <span style={{ position: 'relative', zIndex: 1 }}>{studentProfile.avatarInitials}</span>
        </motion.div>
        <div style={{
          position: 'absolute', bottom: -12, right: -12,
          background: '#030712', padding: '4px', borderRadius: '14px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
        }}>
          <Badge color="success" size="lg">RANK #{studentProfile.rank}</Badge>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', fontWeight: 950, letterSpacing: '-0.03em' }}>{studentProfile.name}</h1>
          <div style={{ padding: '6px', background: 'rgba(245,158,11,0.1)', borderRadius: '10px' }}>
            <Award size={24} color="var(--accent-warn)" />
          </div>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' }}>
          {studentProfile.year} Academic Year · {studentProfile.branch} Domain
        </p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '24px', color: 'var(--text-dim)', fontSize: '14px', fontWeight: 700 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Target size={16} color="var(--accent-primary)" /> Goal: {studentProfile.goal}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BrainCircuit size={16} color="var(--accent-secondary)" /> Synchronized: {studentProfile.joinedDate}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '48px', padding: '0 32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', fontSize: '36px', fontWeight: 900, 
            color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '10px',
            letterSpacing: '-0.05em'
          }}>
            <Zap size={26} fill="var(--accent-primary)" /> {studentProfile.xp.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.15em', marginTop: '6px', textTransform: 'uppercase' }}>ADHYETA XP</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', fontSize: '36px', fontWeight: 900, 
            color: 'var(--accent-warn)', display: 'flex', alignItems: 'center', gap: '10px',
            letterSpacing: '-0.05em'
          }}>
            <Flame size={26} fill="var(--accent-warn)" /> {studentProfile.streak}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.15em', marginTop: '6px', textTransform: 'uppercase' }}>SYNC STREAK</div>
        </div>
      </div>
    </GlassCard>
  );
}
