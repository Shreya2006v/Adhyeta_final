import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard';
import { leaderboardData } from '../../lib/mockData';

const medalGradients = {
  1: ['#FFD700', '#F59E0B'],
  2: ['#C0C0C0', '#94A3B8'],
  3: ['#CD7F32', '#92400E'],
};

export default function LeaderboardCard() {
  const top3 = leaderboardData.slice(0, 3);
  const rest  = leaderboardData.slice(3, 6);

  return (
    <GlassCard elevated style={{ height: '100%', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={18} color="var(--accent-warn)" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800 }}>Institutional Rank</span>
        </div>
        <Link to="/leaderboard" style={{ fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 700, textDecoration: 'none' }}>All Nodes →</Link>
      </div>

      {/* Mini podium */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '12px', marginBottom: '24px' }}>
        {[top3[1], top3[0], top3[2]].map((s) => {
          const g = medalGradients[s.rank];
          const isFirst = s.rank === 1;
          return (
            <motion.div
              key={s.rank}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: s.rank * 0.1, type: 'spring', stiffness: 120, damping: 18 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}
            >
              {isFirst && <span style={{ fontSize: '16px', marginBottom: '4px' }}>👑</span>}
              <motion.div
                animate={{ boxShadow: [`0 0 10px ${g[0]}40`, `0 0 20px ${g[0]}60`, `0 0 10px ${g[0]}40`] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  width: isFirst ? 52 : 42, height: isFirst ? 52 : 42,
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: isFirst ? '14px' : '11px', fontWeight: 900, color: '#000',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  marginBottom: '8px'
                }}
              >
                {s.name.split(' ').map(n => n[0]).join('')}
              </motion.div>
              <span style={{ fontSize: '11px', fontWeight: 800, textAlign: 'center', maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '2px' }}>
                {s.name.split(' ')[0]}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: g[0], fontWeight: 700 }}>
                {(s.xp / 1000).toFixed(1)}k XP
              </span>
              <div style={{
                width: '100%', height: isFirst ? 32 : 20,
                marginTop: '8px', borderRadius: '6px 6px 0 0',
                background: `rgba(99,102,241,0.2)`, border: `1px solid rgba(99,102,241,0.2)`, borderBottom: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 900, color: g[0],
              }}>#{s.rank}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Rest of list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {rest.map((s, i) => (
          <motion.div
            key={s.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 14px', borderRadius: '12px',
              background: s.isCurrentUser ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255,255,255,0.02)',
              border: s.isCurrentUser ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 800, color: 'var(--text-dim)', width: '24px' }}>
              #{s.rank}
            </span>
            <div style={{
              width: 28, height: 28, borderRadius: '8px', flexShrink: 0,
              background: s.isCurrentUser ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 900, color: s.isCurrentUser ? '#FFFFFF' : 'var(--text-secondary)',
            }}>
              {s.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span style={{ flex: 1, fontSize: '13px', fontWeight: s.isCurrentUser ? 800 : 500, color: s.isCurrentUser ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
              {s.name.split(' ')[0]}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>
              {(s.xp / 1000).toFixed(1)}k
            </span>
            <div style={{ width: 24, display: 'flex', justifyContent: 'center' }}>
              {s.change > 0 && <ArrowUp size={12} color="var(--accent-success)" />}
              {s.change < 0 && <ArrowDown size={12} color="var(--accent-danger)" />}
              {s.change === 0 && <Minus size={12} color="var(--text-dim)" />}
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
