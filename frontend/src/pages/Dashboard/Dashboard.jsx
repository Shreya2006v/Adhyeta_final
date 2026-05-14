import { motion } from 'framer-motion';
import { Flame, Zap, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import GlassCard from '../../components/ui/GlassCard';
import WeeklyChart from '../../components/charts/WeeklyChart';
import SubjectRadar from '../../components/charts/SubjectRadar';
import { FocusScoreRing } from '../../components/dashboard/AnalyticsCards';
import AIInsights from '../../components/dashboard/AIInsights';
import LeaderboardCard from '../../components/dashboard/LeaderboardCard';
import StudyTracker from '../../components/dashboard/StudyTracker';
import FocusHeatmap from '../../components/dashboard/FocusHeatmap';
import { useCountUp, useInView } from '../../hooks/useAnimations';
import { mockResults, upcomingTasks, examCountdown } from '../../lib/mockData';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/axios';

export default function Dashboard() {
  const user = useAuthStore(state => state.user);
  
  const { data: overview, isLoading } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: async () => {
      const res = await api.get('/dashboard/overview/');
      return res.data.data;
    }
  });

  const { count: xpCount } = useCountUp(overview?.total_xp || 0, 1200);
  const { count: streakCount } = useCountUp(overview?.current_streak || 0, 800);
  const [ref] = useInView();

  const stagger = (i) => ({ 
    initial: { opacity: 0, y: 15 }, 
    animate: { opacity: 1, y: 0 }, 
    transition: { delay: i * 0.05, type: 'spring', stiffness: 100, damping: 20 } 
  });

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-dim)' }}>Loading dashboard analytics...</div>;
  }

  return (
    <div ref={ref} style={{ maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header Section */}
      <motion.div {...stagger(0)} style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Welcome back, {user?.full_name?.split(' ')[0] || user?.username || 'Student'}.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '6px' }}>
            Your ADHYETA mesh is <span style={{ color: 'var(--accent-success)', fontWeight: 700 }}>82% synchronized</span> today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'rgba(99,102,241,0.08)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.15)' }}>
              <Sparkles size={16} color="var(--accent-primary)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-primary)' }}>AI MENTOR ONLINE</span>
           </div>
        </div>
      </motion.div>

      {/* Exam Countdown Strip */}
      <motion.div {...stagger(1)} style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {examCountdown.map((exam) => (
          <div key={exam.name} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 20px', borderRadius: '14px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            fontSize: '14px',
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: exam.urgency === 'high' ? 'var(--accent-danger)' : exam.urgency === 'medium' ? 'var(--accent-warn)' : 'var(--accent-success)',
              boxShadow: `0 0 10px ${exam.urgency === 'high' ? 'var(--accent-danger)' : exam.urgency === 'medium' ? 'var(--accent-warn)' : 'var(--accent-success)'}`
            }} />
            <span style={{ fontWeight: 700 }}>{exam.name}</span>
            <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600 }}>{exam.daysLeft}d left</span>
          </div>
        ))}
      </motion.div>

      {/* Bento Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: 'auto',
        gap: '16px',
      }}>

        {/* Row 1: Primary Stats */}
        <motion.div {...stagger(2)} style={{ gridColumn: 'span 2' }}>
          <GlassCard elevated style={{ padding: '28px', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
               <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Learning Landscape</h3>
               <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>ADHYETA Map</span>
            </div>
            <div style={{ height: '220px' }}>
              <SubjectRadar />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div {...stagger(3)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <GlassCard elevated style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={24} color="var(--accent-warn)" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>{streakCount}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>DAY STREAK</div>
          </GlassCard>
          <GlassCard elevated style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={24} color="var(--accent-primary)" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>{xpCount.toLocaleString()}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>TOTAL XP</div>
          </GlassCard>
        </motion.div>

        <motion.div {...stagger(4)}>
          <GlassCard elevated style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
            <FocusScoreRing score={85} />
          </GlassCard>
        </motion.div>

        {/* Row 2: Charts & Insights */}
        <motion.div {...stagger(5)} style={{ gridColumn: 'span 3' }}>
          <GlassCard elevated style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Weekly Learning Load</h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                 <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>AVG FOCUS</div>
                    <div style={{ fontSize: '16px', fontWeight: 800 }}>74.2%</div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>STUDY TIME</div>
                    <div style={{ fontSize: '16px', fontWeight: 800 }}>{Math.floor((overview?.total_study_minutes || 0) / 60)}h</div>
                 </div>
              </div>
            </div>
            <WeeklyChart />
          </GlassCard>
        </motion.div>

        <motion.div {...stagger(6)}>
          <AIInsights />
        </motion.div>

        {/* Row 3: Results & Tasks */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <motion.div {...stagger(7)}>
            <GlassCard elevated style={{ padding: '28px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Recent Mock Performance</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mockResults.map(r => {
                   const color = r.subject === 'OS' ? 'var(--accent-danger)' : r.subject === 'DBMS' ? 'var(--accent-warn)' : 'var(--accent-success)';
                   return (
                    <div key={r.subject} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '13px', width: '40px', fontWeight: 800 }}>{r.subject}</span>
                      <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${r.score}%`, background: color, boxShadow: `0 0 10px ${color}40` }} />
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 800, minWidth: '40px', textAlign: 'right' }}>{r.score}%</span>
                    </div>
                   );
                })}
              </div>
            </GlassCard>
          </motion.div>
          <motion.div {...stagger(9)}>
            <StudyTracker tasks={upcomingTasks} />
          </motion.div>
        </div>

        {/* Row 3 Right: Leaderboard & Heatmap */}
        <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <motion.div {...stagger(8)}>
            <LeaderboardCard />
          </motion.div>
          <motion.div {...stagger(10)}>
            <GlassCard elevated style={{ padding: '28px', height: '100%' }}>
              <FocusHeatmap />
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
