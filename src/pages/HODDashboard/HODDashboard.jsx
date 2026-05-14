import { motion } from 'framer-motion';
import { 
  Users, AlertTriangle, 
  BookOpen, Calendar, Activity, Zap, 
  Download, Filter, ChevronRight, LayoutDashboard,
  BarChart3, BrainCircuit, Users2
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

const teachers = [
  { name: 'Dr. Aruna Kumar', score: 88, engagement: 94, uploads: 12, status: 'Active' },
  { name: 'Prof. Rajesh M.', score: 76, engagement: 82, uploads: 8, status: 'Active' },
  { name: 'Dr. S. Meena', score: 92, engagement: 88, uploads: 15, status: 'Away' },
  { name: 'Prof. Vikas P.', score: 64, engagement: 71, uploads: 4, status: 'Meeting' },
  { name: 'Dr. Ananya S.', score: 81, engagement: 85, uploads: 10, status: 'Active' },
];

const atRiskStudents = [
  { name: 'Sameer Shah', score: 42, risk: 85, flag: 'Declining Performance' },
  { name: 'Karan Mehra', score: 38, risk: 78, flag: 'Low Focus Levels' },
  { name: 'Neha Gupta', score: 45, risk: 72, flag: 'Critical Attendance' },
  { name: 'Aditya Rao', score: 41, risk: 65, flag: 'Learning Decline' },
];

export default function HODDashboard() {
  const s = (i) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.05, type: 'spring', damping: 20 }
  });

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <motion.header {...s(0)} style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ padding: '6px', background: 'rgba(99,102,241,0.1)', borderRadius: '8px' }}>
              <Users2 size={16} color="var(--accent-primary)" />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.12em' }}>DEPARTMENTAL COMMAND</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 900, letterSpacing: '-0.02em' }}>Computer Science & Engineering</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '4px' }}>Overview of faculty performance and student risk assessments.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="ghost" size="md" icon={<Download size={18} />}>Export Audit</Button>
          <Button variant="glow" size="md" icon={<Zap size={18} />}>Sync</Button>
        </div>
      </motion.header>

      {/* Stats Summary Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Students', value: '482', icon: Users, color: 'var(--accent-primary)' },
          { label: 'Avg Attendance', value: '84.2%', icon: Activity, color: 'var(--accent-success)' },
          { label: 'Syllabus Coverage', value: '62%', icon: BookOpen, color: 'var(--accent-secondary)' },
          { label: 'Active Faculty', value: '18/22', icon: LayoutDashboard, color: 'var(--accent-warn)' },
        ].map((stat, i) => (
          <motion.div key={i} {...s(i + 1)}>
            <GlassCard elevated style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '14px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={22} color={stat.color} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 900 }}>{stat.value}</div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section 1: Teacher Monitoring */}
          <motion.div {...s(5)}>
            <GlassCard elevated style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BarChart3 size={20} color="var(--accent-primary)" />
                  <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Faculty Intelligence</h3>
                </div>
                <Button variant="ghost" size="sm" icon={<Filter size={16} />}>Filter</Button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <th style={{ padding: '16px 12px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>FACULTY NAME</th>
                      <th style={{ padding: '16px 12px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>STUDENT PERFORMANCE</th>
                      <th style={{ padding: '16px 12px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ENGAGEMENT</th>
                      <th style={{ padding: '16px 12px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>UPLOADS</th>
                      <th style={{ padding: '16px 12px', fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', transition: 'background 0.2s' }} className="hover-row">
                        <td style={{ padding: '18px 12px', fontWeight: 700, fontSize: '15px' }}>{t.name}</td>
                        <td style={{ padding: '18px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontWeight: 800, fontSize: '14px', minWidth: '35px' }}>{t.score}%</span>
                            <div style={{ flex: 1, maxWidth: '100px', height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${t.score}%`, height: '100%', background: 'var(--accent-primary)', boxShadow: 'var(--glow-primary)' }} />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '18px 12px', fontWeight: 700, fontSize: '14px' }}>{t.engagement}%</td>
                        <td style={{ padding: '18px 12px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>{t.uploads} Modules</td>
                        <td style={{ padding: '18px 12px' }}>
                           <div style={{ 
                              display: 'inline-flex', alignItems: 'center', gap: '8px', 
                              padding: '6px 12px', borderRadius: '100px',
                              background: t.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                              border: `1px solid ${t.status === 'Active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`
                           }}>
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: t.status === 'Active' ? 'var(--accent-success)' : 'var(--accent-warn)', boxShadow: `0 0 8px ${t.status === 'Active' ? 'var(--accent-success)' : 'var(--accent-warn)'}` }} />
                              <span style={{ fontSize: '11px', fontWeight: 800, color: t.status === 'Active' ? 'var(--accent-success)' : 'var(--accent-warn)', textTransform: 'uppercase' }}>{t.status}</span>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>

          {/* Section 2: Student Risk Detection */}
          <motion.div {...s(6)}>
            <GlassCard elevated style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertTriangle size={22} color="var(--accent-danger)" />
                  <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Student Risk Identification</h3>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-danger)' }}>4 CRITICAL NODES</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                {atRiskStudents.map((st, i) => (
                  <motion.div key={i} whileHover={{ x: 6 }} style={{ 
                    padding: '20px', borderRadius: '18px', background: 'rgba(239,68,68,0.03)',
                    border: '1px solid rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', gap: '20px',
                    cursor: 'pointer'
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: '14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: 'var(--accent-primary)' }}>{st.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', fontWeight: 800 }}>{st.name}</span>
                        <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--accent-danger)' }}>{st.risk}% RISK LEVEL</span>
                      </div>
                      <div style={{ height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${st.risk}%` }} style={{ height: '100%', background: 'var(--accent-danger)', boxShadow: '0 0 12px rgba(239,68,68,0.4)' }} />
                      </div>
                    </div>
                    <div style={{ padding: '6px 14px', borderRadius: '100px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: 'var(--accent-danger)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{st.flag}</div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Sidebar Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Failure Prediction Card */}
          <motion.div {...s(7)}>
            <GlassCard elevated style={{ padding: '28px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '60px', height: '60px', background: 'var(--accent-danger)', filter: 'blur(40px)', opacity: 0.3 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <BrainCircuit size={20} color="var(--accent-danger)" />
                <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Predictive Analysis</h3>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                ADHYETA engine predicts <span style={{ color: 'var(--accent-danger)', fontWeight: 800 }}>12 failures</span> in the upcoming <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Operating Systems</span> mid-term.
              </p>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['Sameer Shah', 'Karan Mehra', 'Neha Gupta'].map(n => (
                  <div key={n} style={{ fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-danger)', boxShadow: '0 0 8px var(--accent-danger)' }} /> {n}
                  </div>
                ))}
                <span style={{ fontSize: '12px', color: 'var(--text-dim)', marginTop: '6px', fontWeight: 600 }}>+ 9 others at critical threshold</span>
              </div>
              <Button variant="danger" size="sm" style={{ width: '100%', marginTop: '24px', height: '44px' }}>Issue Alert</Button>
            </GlassCard>
          </motion.div>

          {/* ADHYETA Recommendations */}
          <motion.div {...s(8)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Zap size={20} color="var(--accent-secondary)" />
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Strategic Directives</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { text: "Deploy supplementary Computer Networks simulation lab this week.", icon: BookOpen, color: 'var(--accent-primary)' },
                { text: "Scheduled OS ADHYETA-reinforcement session for Friday afternoon.", icon: Calendar, color: 'var(--accent-warn)' },
              ].map((rec, i) => (
                <GlassCard key={i} elevated style={{ padding: '18px', borderLeft: `4px solid ${rec.color}`, background: 'rgba(255,255,255,0.01)' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ padding: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', height: 'fit-content' }}>
                      <rec.icon size={18} color={rec.color} />
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.5 }}>{rec.text}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Department Activity Log */}
          <motion.div {...s(9)}>
             <GlassCard elevated style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '20px' }}>Node Activity Stream</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { text: "Dr. Aruna Kumar initialized CPU Scheduling ADHYETA module", time: "12m ago", icon: BrainCircuit },
                    { text: "Batch A focus synchronized at 92%", time: "1h ago", icon: Activity },
                    { text: "Mechanical Dept node requested inter-node audit", time: "3h ago", icon: Users2 },
                  ].map((act, i) => (
                    <div key={i} style={{ display: 'flex', gap: '14px' }}>
                      <div style={{ marginTop: '2px' }}><act.icon size={14} color="var(--text-dim)" /></div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, lineHeight: 1.4 }}>{act.text}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{act.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" style={{ width: '100%', marginTop: '24px' }}>View Full Stream</Button>
             </GlassCard>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
