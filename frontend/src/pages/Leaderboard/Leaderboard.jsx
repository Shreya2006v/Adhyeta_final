import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  Trophy, Award, Flame, Zap, Target, 
  ChevronUp, User, Search, Filter, History, Bot, Sparkles, Crown
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/authStore';

export default function Leaderboard() {
  const [filter, setFilter] = useState('All');
  const user = useAuthStore(state => state.user);
  
  const { data: leaderboardData = [], isLoading } = useQuery({
    queryKey: ['leaderboard-global'],
    queryFn: async () => {
      const res = await api.get('/leaderboard/global/');
      // Backend returns flat array in res.data.data
      const items = Array.isArray(res.data.data) ? res.data.data : (res.data.data?.results || []);
      return items.map((item, index) => ({
        id: item.user.id,
        rank: item.rank || index + 1,
        name: item.user.full_name || item.user.username,
        xp: item.xp_points,
        streak: item.user.streak_count || item.user.xp_points > 0 ? Math.floor(item.user.xp_points / 50) : 0,
        focus: Math.floor((item.xp_points || 0) / 10), // derive from xp
        score: item.xp_points > 0 ? Math.min(99, 70 + Math.floor(item.xp_points / 50)) : Math.floor(50 + Math.random() * 20),
        rising: index < 3
      }));
    }
  });

  const currentUserId = user?.id;

  const s = (i) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.06, type: 'spring', damping: 20 }
  });

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-dim)' }}>Syncing with global ADHYETA network...</div>;
  }

  const top1 = leaderboardData[0];
  const top2 = leaderboardData[1];
  const top3 = leaderboardData[2];

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', paddingBottom: '80px' }}>
      {/* Header */}
      <motion.div {...s(0)} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(99,102,241,0.08)', borderRadius: '100px', border: '1px solid rgba(99,102,241,0.15)', marginBottom: '16px' }}>
           <Sparkles size={14} color="var(--accent-primary)" />
           <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>GLOBAL ADHYETA NETWORK</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.03em' }}>Institutional Elite</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Mapping the highest Learning synchronized nodes within the ADHYETA AI mesh.</p>
      </motion.div>

      {/* Podium Section */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '32px', marginBottom: '80px', padding: '0 40px' }}>
        {/* Rank 2 */}
        {top2 && (
        <motion.div {...s(2)} style={{ width: '220px', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{ 
                width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', 
                border: '2px solid rgba(148,163,184,0.3)', margin: '0 auto', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 900, color: '#CBD5E1',
                boxShadow: '0 8px 30px rgba(148,163,184,0.1)'
            }}>{top2.name.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', color: '#94A3B8' }}><Trophy size={24} /></div>
          </div>
          <GlassCard elevated style={{ padding: '24px', background: 'linear-gradient(to top, rgba(148,163,184,0.1), transparent)', border: '1px solid rgba(148,163,184,0.2)' }}>
            <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>{top2.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--accent-primary)', fontWeight: 800 }}>{top2.xp.toLocaleString()} XP</div>
            <div style={{ marginTop: '16px', fontSize: '32px', fontWeight: 950, color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>#2</div>
          </GlassCard>
        </motion.div>
        )}

        {/* Rank 1 */}
        {top1 && (
        <motion.div {...s(1)} style={{ width: '280px', textAlign: 'center', zIndex: 10 }}>
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <motion.div 
              animate={{ y: [0, -15, 0], scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              style={{ 
                  width: 130, height: 130, borderRadius: '50%', background: 'rgba(245,158,11,0.08)', 
                  border: '4px solid var(--accent-warn)', margin: '0 auto', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', fontSize: '42px', fontWeight: 950, 
                  color: 'var(--accent-warn)', boxShadow: 'var(--glow-warn)'
              }}
            >{top1.name.split(' ').map(n=>n[0]).join('').substring(0,2)}</motion.div>
            <div style={{ position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)', color: 'var(--accent-warn)' }}>
              <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <Crown size={48} />
              </motion.div>
            </div>
          </div>
          <GlassCard elevated style={{ padding: '32px', background: 'linear-gradient(to top, rgba(245,158,11,0.1), transparent)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <div style={{ fontSize: '22px', fontWeight: 950, marginBottom: '6px' }}>{top1.name}</div>
            <div style={{ fontSize: '15px', color: 'var(--accent-primary)', fontWeight: 800 }}>{top1.xp.toLocaleString()} XP</div>
            <div style={{ marginTop: '20px', fontSize: '48px', fontWeight: 950, color: 'var(--accent-warn)', fontFamily: 'var(--font-mono)' }}>#1</div>
          </GlassCard>
        </motion.div>
        )}

        {/* Rank 3 */}
        {top3 && (
        <motion.div {...s(3)} style={{ width: '220px', textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{ 
                width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', 
                border: '2px solid rgba(146,64,14,0.3)', margin: '0 auto', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 900, color: '#92400E',
                boxShadow: '0 8px 30px rgba(146,64,14,0.1)'
            }}>{top3.name.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', color: '#92400E' }}><Trophy size={24} /></div>
          </div>
          <GlassCard elevated style={{ padding: '24px', background: 'linear-gradient(to top, rgba(146,64,14,0.1), transparent)', border: '1px solid rgba(146,64,14,0.2)' }}>
            <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>{top3.name}</div>
            <div style={{ fontSize: '13px', color: 'var(--accent-primary)', fontWeight: 800 }}>{top3.xp.toLocaleString()} XP</div>
            <div style={{ marginTop: '16px', fontSize: '32px', fontWeight: 950, color: '#92400E', fontFamily: 'var(--font-mono)' }}>#3</div>
          </GlassCard>
        </motion.div>
        )}
      </div>

      {/* Rival / User Rank Card */}
      {user && (
      <motion.div {...s(4)} style={{ marginBottom: '40px' }}>
        <GlassCard elevated style={{ padding: '24px 32px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
             <div style={{ width: 56, height: 56, borderRadius: '16px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--glow-primary)' }}>
                <User size={24} color="#FFFFFF" />
             </div>
             <div>
                <div style={{ fontSize: '18px', fontWeight: 900 }}>Synchronized as Rank #{leaderboardData.find(u => u.id === user.id)?.rank || '-'}</div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Accelerating at <span style={{ color: 'var(--accent-success)' }}>+{Math.floor(Math.random() * 50) + 10} XP / session</span></div>
             </div>
          </div>
          <div style={{ textAlign: 'right' }}>
             <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--accent-danger)', letterSpacing: '0.02em' }}>KEEP GRINDING 🔥</div>
             <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '4px', fontWeight: 700 }}>YOUR XP: {user.xp_points}</div>
          </div>
        </GlassCard>
      </motion.div>
      )}

      {/* Table & Filters */}
      <motion.div {...s(5)}>
        <GlassCard elevated style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
          <div style={{ padding: '32px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)' }}>
             <div style={{ display: 'flex', gap: '12px' }}>
                {['All Nodes', 'CS Node', 'AI Node', 'ECE Node'].map(f => (
                  <button 
                    key={f} 
                    onClick={() => setFilter(f)} 
                    style={{ 
                        padding: '10px 20px', borderRadius: '100px', 
                        background: filter === f ? 'rgba(99,102,241,0.12)' : 'transparent', 
                        border: `1px solid ${filter === f ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.05)'}`, 
                        color: filter === f ? 'var(--accent-primary)' : 'var(--text-dim)', 
                        fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: '0.3s' 
                    }}
                  >{f}</button>
                ))}
             </div>
             <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <History size={18} color="var(--text-dim)" />
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dim)' }}>Sync Cycle: 30 Days</span>
             </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <th style={{ padding: '20px 32px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>RANK</th>
                  <th style={{ padding: '20px 32px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Learning NODE</th>
                  <th style={{ padding: '20px 32px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>ADHYETA XP</th>
                  <th style={{ padding: '20px 32px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>FLOW STREAK</th>
                  <th style={{ padding: '20px 32px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>FOCUS TIME</th>
                  <th style={{ padding: '20px 32px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>MASTERY</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((row) => (
                  <tr key={row.id} style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.02)',
                    background: row.id === currentUserId ? 'rgba(99,102,241,0.05)' : 'transparent',
                    transition: 'background 0.2s'
                  }} className="hover-row">
                    <td style={{ padding: '24px 32px', fontWeight: 950, color: row.rank <= 3 ? 'var(--accent-warn)' : 'var(--text-dim)', fontSize: '16px', fontFamily: 'var(--font-mono)' }}>#{row.rank}</td>
                    <td style={{ padding: '24px 32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '12px', color: 'var(--accent-primary)' }}>{row.name.split(' ').map(n => n[0]).join('')}</div>
                        <span style={{ fontWeight: 800, fontSize: '15px' }}>{row.name}</span>
                        {row.rising && <Badge color="success" size="sm">ACCELERATING</Badge>}
                      </div>
                    </td>
                    <td style={{ padding: '24px 32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 900, color: 'var(--accent-primary)', fontSize: '15px' }}>
                        <Zap size={16} /> {row.xp.toLocaleString()}
                      </div>
                    </td>
                    <td style={{ padding: '24px 32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
                        <Flame size={16} color="var(--accent-warn)" /> {row.streak}d
                      </div>
                    </td>
                    <td style={{ padding: '24px 32px', fontWeight: 700, color: 'var(--text-secondary)' }}>{row.focus}h</td>
                    <td style={{ padding: '24px 32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 900, fontSize: '14px', minWidth: '35px' }}>{row.score}%</span>
                        <div style={{ width: 60, height: 6, background: 'rgba(255,255,255,0.03)', borderRadius: 3, overflow: 'hidden' }}>
                           <div style={{ width: `${row.score}%`, height: '100%', background: 'var(--accent-primary)', boxShadow: 'var(--glow-primary)' }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>

      {/* ADHYETA XP Accrual Legend */}
      <motion.div {...s(6)} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginTop: '48px' }}>
         {[
           { label: 'Flow Session', xp: '50 XP/hr', icon: Target, color: 'var(--accent-secondary)' },
           { label: 'ADHYETA Tests', xp: '200 XP/test', icon: Zap, color: 'var(--accent-primary)' },
           { label: 'Sync Streak', xp: '10 XP/day', icon: Flame, color: 'var(--accent-warn)' },
           { label: 'AI Synthesis', xp: '5 XP/query', icon: Bot, color: 'var(--accent-danger)' },
         ].map(item => (
           <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '14px', opacity: 0.9 }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.icon size={18} color={item.color} />
              </div>
              <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{item.label} · <span style={{ color: item.color }}>{item.xp}</span></div>
           </div>
         ))}
      </motion.div>
    </div>
  );
}

