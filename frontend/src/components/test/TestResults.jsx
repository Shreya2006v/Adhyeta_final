import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowLeft, BrainCircuit, Activity, Zap } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function TestResults({ answers = {}, questions = [], onRetry }) {
  const qList = Array.isArray(questions) ? questions : [];
  const total = qList.length;

  if (total === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ marginBottom: '24px' }}>Assessment Data Syncing...</h2>
        <Button onClick={onRetry}>Try Reconnecting</Button>
      </div>
    );
  }

  let correctCount = 0;
  qList.forEach((q, i) => {
    if (q && answers[i] === q.correct_index) correctCount++;
  });
  
  const pct = Math.round((correctCount / total) * 100);
  const grade = pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'F';
  const statusColor = pct >= 60 ? '#10B981' : pct >= 40 ? '#F59E0B' : '#EF4444';

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <div style={{ 
          fontSize: '72px', fontWeight: 900, color: statusColor, 
          fontFamily: 'var(--font-mono)', marginBottom: '8px' 
        }}>
          {pct}%
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>Sync Complete</h1>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Badge color={pct >= 60 ? 'success' : 'warn'}>GRADE: {grade}</Badge>
          <Badge color="primary">+{pct * 5} ADHYETA XP</Badge>
        </div>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Node Analysis</h3>
        {qList.map((q, i) => {
          const isCorrect = answers[i] === q.correct_index;
          return (
            <GlassCard key={i} elevated style={{ padding: '20px', borderLeft: `4px solid ${isCorrect ? '#10B981' : '#EF4444'}` }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ marginTop: '2px' }}>
                  {isCorrect ? <CheckCircle2 size={20} color="#10B981" /> : <XCircle size={20} color="#EF4444" />}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>{q.question}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Correct: <span style={{ color: '#10B981', fontWeight: 700 }}>{q.options[q.correct_index]}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '48px' }}>
        <Button variant="glow" onClick={onRetry} icon={<Zap size={18} />}>New Assessment</Button>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <Button variant="ghost" icon={<ArrowLeft size={18} />}>Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
