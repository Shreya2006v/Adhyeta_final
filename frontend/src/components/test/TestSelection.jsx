import { motion } from 'framer-motion';
import { Brain, Cpu, Network, Database, BookOpen, Clock, BarChart3, Trophy, ArrowRight, Activity, BrainCircuit } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';

const iconMap = { Brain, Cpu, Network, Database, BookOpen };

const subjects = [
  { name: 'Data Structures', icon: 'Brain', questions: 30, difficulty: 'Medium', bestScore: 88, time: '45 min', color: 'var(--accent-primary)' },
  { name: 'Operating Systems', icon: 'Cpu', questions: 25, difficulty: 'Hard', bestScore: 52, time: '40 min', color: 'var(--accent-danger)' },
  { name: 'Computer Networks', icon: 'Network', questions: 20, difficulty: 'Medium', bestScore: 55, time: '35 min', color: 'var(--accent-secondary)' },
  { name: 'Database Systems', icon: 'Database', questions: 30, difficulty: 'Easy', bestScore: 76, time: '45 min', color: 'var(--accent-warn)' },
  { name: 'Machine Learning', icon: 'BookOpen', questions: 20, difficulty: 'Hard', bestScore: 71, time: '30 min', color: '#9D4EDD' },
];

export default function TestSelection({ onSelect }) {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-primary)', marginBottom: '16px' }}>
          <BrainCircuit size={20} />
          <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Assessments</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 950, letterSpacing: '-0.03em', marginBottom: '16px' }}>
          Evaluate your <span style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cognition</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '56px', fontSize: '18px', maxWidth: '640px', fontWeight: 500, lineHeight: 1.6 }}>
          Our ADHYETA-adaptation algorithms target your Learning gaps with precision. Select a module to begin your performance audit.
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
        gap: '32px' 
      }}>
        {subjects.map((s, i) => {
          const Icon = iconMap[s.icon] || Brain;
          return (
            <motion.div 
              key={s.name} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.05, type: 'spring', damping: 20 }}
            >
              <GlassCard elevated
                onClick={() => onSelect(s)} 
                style={{ 
                  cursor: 'pointer', 
                  padding: '40px',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'rgba(255,255,255,0.01)'
                }}
              >
                {/* Background Accent Glow */}
                <div style={{
                  position: 'absolute', top: '-40px', right: '-40px',
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: s.color, filter: 'blur(50px)', opacity: 0.05
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                  <div style={{ 
                    width: 60, height: 60, borderRadius: '18px', 
                    background: `rgba(99,102,241,0.2)`, 
                    border: `1px solid rgba(99,102,241,0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 8px 20px -5px rgba(99,102,241,0.2)`
                  }}>
                    <Icon size={28} color={s.color} />
                  </div>
                  <Badge color={s.difficulty === 'Hard' ? 'danger' : s.difficulty === 'Medium' ? 'warn' : 'success'} size="md">
                    {s.difficulty}
                  </Badge>
                </div>

                <h3 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '26px', 
                  fontWeight: 900, 
                  marginBottom: '20px',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF'
                }}>
                  {s.name}
                </h3>

                <div style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  marginBottom: '32px' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>
                    <Clock size={16} color="var(--accent-primary)" /> {s.time}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>
                    <Activity size={16} color="var(--accent-secondary)" /> {s.questions} Nodes
                  </div>
                </div>

                <div style={{ 
                  padding: '20px 24px', 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>MASTER INDEX</div>
                  <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '22px', 
                    fontWeight: 900, 
                    color: s.bestScore >= 70 ? 'var(--accent-success)' : 'var(--accent-warn)',
                    letterSpacing: '-0.05em'
                  }}>
                    {s.bestScore}%
                  </div>
                </div>

                <div style={{ 
                  marginTop: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',
                  color: s.color,
                  fontSize: '15px',
                  fontWeight: 900,
                  transition: '0.2s'
                }} className="hover-link">
                  INITIALIZE SESSION <ArrowRight size={18} />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
