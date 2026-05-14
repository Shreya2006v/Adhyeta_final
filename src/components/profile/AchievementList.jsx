import { motion } from 'framer-motion';
import { Lock, Sparkles, Trophy } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { achievements } from '../../lib/mockData';

export default function AchievementList() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <GlassCard elevated style={{ padding: '28px', border: '1px solid rgba(99,102,241,0.15)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Trophy size={18} color="var(--accent-primary)" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900 }}>Milestones</h3>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 800, background: 'rgba(99,102,241,0.1)', padding: '4px 10px', borderRadius: '100px' }}>
          {unlockedCount}/{achievements.length} SYNCED
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {achievements.slice(0, 5).map((a, i) => (
          <motion.div 
            key={i} 
            whileHover={a.unlocked ? { x: 6, background: 'rgba(255,255,255,0.04)' } : {}}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '12px 16px', borderRadius: '14px',
              background: a.unlocked ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.01)',
              border: `1px solid ${a.unlocked ? 'rgba(99,102,241,0.15)' : 'var(--border-subtle)'}`,
              opacity: a.unlocked ? 1 : 0.5,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: a.unlocked ? 'pointer' : 'default'
            }}
          >
            <div style={{ 
                width: '40px', height: '40px', borderRadius: '10px', 
                background: a.unlocked ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px'
            }}>
              {a.unlocked ? a.emoji : <Lock size={18} color="var(--text-dim)" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: a.unlocked ? '#FFFFFF' : 'var(--text-dim)' }}>{a.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 600, marginTop: '2px' }}>{a.desc}</div>
            </div>
            {a.unlocked && <Sparkles size={14} color="var(--accent-secondary)" opacity={0.6} />}
          </motion.div>
        ))}
      </div>
      
      <button style={{ 
          width: '100%', marginTop: '24px', padding: '12px', borderRadius: '12px',
          background: 'none', border: '1px solid var(--border-subtle)', color: 'var(--text-dim)',
          fontSize: '12px', fontWeight: 800, cursor: 'pointer', transition: '0.2s'
      }}
      onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
      onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
      >
        VIEW ALL MILESTONES
      </button>
    </GlassCard>
  );
}
