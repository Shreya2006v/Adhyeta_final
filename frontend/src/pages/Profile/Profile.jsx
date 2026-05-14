import { motion } from 'framer-motion';
import { Zap, Flame, Award, Target, BrainCircuit, Activity, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/axios';

export default function Profile() {
  const user = useAuthStore(state => state.user);
  
  const { data: overview, isLoading } = useQuery({
    queryKey: ['dashboard-overview'],
    queryFn: async () => {
      const res = await api.get('/dashboard/overview/');
      return res.data.data;
    }
  });

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-dim)' }}>Loading profile...</div>;
  }

  const name = user?.full_name || user?.username || 'Student';
  const initials = name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Absolute Minimal Header */}
      <GlassCard elevated style={{ 
        padding: '32px', marginBottom: '32px', 
        display: 'flex', alignItems: 'center', gap: '32px',
        background: 'rgba(30, 41, 59, 0.5)',
        border: '1px solid rgba(99, 102, 241, 0.2)'
      }}>
        <div style={{
          width: 100, height: 100, borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 800, color: '#FFFFFF', fontSize: '32px'
        }}>
          {initials}
        </div>
        
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
            {name}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', fontWeight: 600 }}>
            {user?.role?.toUpperCase()} Domain
            {user?.college && ` • ${user.college.name}`}
            {user?.branch && ` • ${user.branch.name}`}
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <Badge color="primary">RANK #{overview?.rank || '-'}</Badge>
            <Badge color="success">LEVEL {overview?.level || 1}</Badge>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-primary)' }}>{overview?.total_xp || 0}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 800 }}>XP</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-warn)' }}>{overview?.current_streak || 0}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 800 }}>STREAK</div>
          </div>
        </div>
      </GlassCard>

      {/* Basic Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <GlassCard elevated style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Performance Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
             {[
               { label: 'Avg Accuracy', val: '84%', color: 'var(--accent-success)' },
               { label: 'Sessions This Week', val: overview?.sessions_this_week || 0, color: 'var(--accent-primary)' },
               { label: 'Study Minutes', val: overview?.total_study_minutes || 0 + 'm', color: 'var(--accent-secondary)' },
             ].map(s => (
               <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                 <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{s.label}</span>
                 <span style={{ fontSize: '14px', fontWeight: 800, color: s.color }}>{s.val}</span>
               </div>
             ))}
          </div>
        </GlassCard>

        <GlassCard elevated style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>Knowledge Nodes</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Algorithms', 'Data Structures', 'System Design'].map(s => (
              <div key={s} style={{ padding: '8px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '100px', fontSize: '13px', color: 'var(--accent-success)', fontWeight: 700 }}>{s}</div>
            ))}
            {['Quantum Computing', 'Advanced Physics'].map(s => (
              <div key={s} style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '100px', fontSize: '13px', color: 'var(--accent-danger)', fontWeight: 700 }}>{s}</div>
            ))}
          </div>
          <Button variant="ghost" size="sm" style={{ width: '100%', marginTop: '24px' }}>Analyze DNA</Button>
        </GlassCard>
      </div>
    </div>
  );
}
