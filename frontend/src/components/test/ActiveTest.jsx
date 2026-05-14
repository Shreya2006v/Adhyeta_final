import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flag, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, BarChart3, BrainCircuit, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useState } from 'react';

export default function ActiveTest({ 
  question, 
  currentIndex, 
  totalQuestions, 
  answers, 
  flagged, 
  onSelectAnswer, 
  onToggleFlag, 
  onPrev, 
  onNext, 
  onJump,
  onSubmit 
}) {
  const [confidence, setConfidence] = useState(3); // 1-5 scale
  const [showHint, setShowHint] = useState(false);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
      {/* Immersive Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '24px',
        marginBottom: '32px', padding: '18px 32px', borderRadius: '20px',
        background: 'rgba(7, 13, 26, 0.7)', border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)', position: 'sticky', top: '24px', zIndex: 100,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <div style={{ flexShrink: 0 }}>
          <Badge color="success">{question.subject.toUpperCase()} ASSESSMENT</Badge>
        </div>
        
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-dim)', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>
             SYNC STATUS: {currentIndex + 1} / {totalQuestions}
          </div>
          <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
            <motion.div 
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', boxShadow: 'var(--glow-primary)' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(245,158,11,0.05)', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.15)' }}>
          <Clock size={18} color="var(--accent-warn)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 800, color: 'var(--accent-warn)', letterSpacing: '-0.02em' }}>44:32</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '32px', alignItems: 'flex-start' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex} 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <GlassCard elevated style={{ padding: '48px', position: 'relative', border: '1px solid rgba(99,102,241,0.15)' }}>
                {/* Meta Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{
                      padding: '6px 14px', borderRadius: '8px', 
                      background: 'rgba(99,102,241,0.1)', color: 'var(--accent-primary)',
                      fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase'
                    }}>
                      Question {currentIndex + 1}
                    </div>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, marginRight: '4px' }}>COMPLEXITY</span>
                      {[1, 2, 3].map(d => (
                        <div key={d} style={{ 
                          width: 8, height: 8, borderRadius: '2px', 
                          background: d <= question.difficulty ? 'var(--accent-warn)' : 'rgba(255,255,255,0.05)',
                          boxShadow: d <= question.difficulty ? '0 0 8px var(--accent-warn)40' : 'none'
                        }} />
                      ))}
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1, background: 'rgba(245,158,11,0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onToggleFlag(currentIndex)} 
                    style={{
                      background: flagged.has(currentIndex) ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)', 
                      border: `1px solid ${flagged.has(currentIndex) ? 'var(--accent-warn)' : 'var(--border-subtle)'}`, 
                      cursor: 'pointer', padding: '10px', borderRadius: '10px',
                      color: flagged.has(currentIndex) ? 'var(--accent-warn)' : 'var(--text-dim)',
                      transition: '0.2s'
                    }}
                  >
                    <Flag size={20} fill={flagged.has(currentIndex) ? "currentColor" : "none"} />
                  </motion.button>
                </div>

                {/* Question Text */}
                <div style={{ marginBottom: '48px' }}>
                  <p style={{ 
                    fontSize: '22px', lineHeight: 1.6, 
                    fontWeight: 600, color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)', letterSpacing: '-0.01em'
                  }}>
                    {question.question}
                  </p>
                  {question.code && (
                    <div style={{
                      marginTop: '28px', padding: '24px', borderRadius: '16px',
                      background: 'rgba(3,7,18,0.8)', border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-mono)', fontSize: '15px', color: '#E8F4FF',
                      overflowX: 'auto', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                      <pre><code>{question.code}</code></pre>
                    </div>
                  )}
                </div>

                {/* Options Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {question.options.map((opt, oi) => {
                    const selected = answers[currentIndex] === oi;
                    return (
                      <motion.button 
                        key={oi} 
                        whileHover={{ x: 8, background: 'rgba(255,255,255,0.03)' }}
                        onClick={() => onSelectAnswer(currentIndex, oi)}
                        style={{
                          padding: '24px', borderRadius: '16px', cursor: 'pointer',
                          background: selected ? 'rgba(99,102,241,0.06)' : 'transparent',
                          border: `1px solid ${selected ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                          color: 'var(--text-primary)', fontSize: '16px', textAlign: 'left',
                          fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '20px',
                          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
                          background: selected ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 900,
                          color: selected ? '#FFFFFF' : 'var(--text-dim)',
                          transition: '0.2s',
                          boxShadow: selected ? 'var(--glow-primary)' : 'none'
                        }}>{String.fromCharCode(65 + oi)}</div>
                        
                        <span style={{ flex: 1, fontWeight: selected ? 700 : 500, fontSize: '16px' }}>{opt}</span>
                        
                        {selected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <CheckCircle2 size={24} color="var(--accent-primary)" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* AI Hint Section */}
                <AnimatePresence>
                   {showHint && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginTop: '32px', overflow: 'hidden' }}
                      >
                        <div style={{ padding: '20px', borderRadius: '14px', background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.2)', display: 'flex', gap: '16px' }}>
                           <Sparkles size={20} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                           <div>
                              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Insight</div>
                              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>
                                Consider how the operating system handles resources when two processes are waiting for each other...
                              </p>
                           </div>
                        </div>
                      </motion.div>
                   )}
                </AnimatePresence>

                {/* Footer Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="ghost" size="md" icon={<ChevronLeft size={20} />} onClick={onPrev} disabled={currentIndex === 0}>Previous</Button>
                    <Button 
                      variant="ghost" 
                      size="md" 
                      icon={<BrainCircuit size={18} />} 
                      onClick={() => setShowHint(!showHint)}
                      style={{ color: showHint ? 'var(--accent-secondary)' : 'var(--text-dim)', background: showHint ? 'rgba(6,182,212,0.05)' : 'none' }}
                    >
                      AI Hint
                    </Button>
                  </div>
                  {currentIndex === totalQuestions - 1 ? (
                    <Button variant="glow" size="md" onClick={onSubmit}>Finalize Assessment</Button>
                  ) : (
                    <Button variant="primary" size="md" icon={<ChevronRight size={20} />} onClick={onNext}>Next Node</Button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Confidence Meter */}
          <GlassCard elevated style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <BarChart3 size={20} color="var(--accent-primary)" />
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Confidence Level</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[1, 2, 3, 4, 5].map(v => (
                <button 
                  key={v} 
                  onClick={() => setConfidence(v)}
                  style={{
                    flex: 1, height: '48px', borderRadius: '12px', border: `1px solid ${confidence === v ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                    background: confidence === v ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                    color: confidence === v ? 'var(--accent-primary)' : 'var(--text-dim)',
                    cursor: 'pointer', transition: 'all 0.3s', fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '15px'
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Navigation Sidebar */}
        <div style={{ position: 'sticky', top: '120px' }}>
          <GlassCard elevated style={{ padding: '24px', border: '1px solid rgba(99,102,241,0.15)' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 800, marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-dim)' }}>
              Submit Answer
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '32px' }}>
              {Array.from({ length: totalQuestions }).map((_, i) => {
                const isCurrent = currentIndex === i;
                const isAnswered = answers[i] !== undefined;
                const isFlagged = flagged.has(i);
                
                return (
                  <motion.button 
                    key={i} 
                    onClick={() => onJump(i)}
                    whileHover={{ scale: 1.15, zIndex: 1 }}
                    style={{
                      aspectRatio: '1', borderRadius: '10px', border: 'none', cursor: 'pointer',
                      fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 900,
                      background: isCurrent ? 'var(--accent-primary)' : isAnswered ? 'rgba(99,102,241,0.15)' : isFlagged ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.03)',
                      color: isCurrent ? '#FFFFFF' : isAnswered ? 'var(--accent-primary)' : isFlagged ? 'var(--accent-warn)' : 'var(--text-dim)',
                      border: isCurrent ? 'none' : isAnswered ? '1px solid rgba(99,102,241,0.3)' : isFlagged ? '1px solid rgba(245,158,11,0.3)' : '1px solid transparent',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isCurrent ? 'var(--glow-primary)' : 'none'
                    }}
                  >
                    {i + 1}
                  </motion.button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '4px', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)40' }} /> Synced
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '4px', background: 'var(--accent-warn)', boxShadow: '0 0 8px var(--accent-warn)40' }} /> Flagged
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '4px', background: 'rgba(255,255,255,0.03)' }} /> Untouched
              </div>
            </div>

            <Button variant="glow" style={{ width: '100%', marginTop: '32px', height: '52px' }} onClick={onSubmit}>
              Submit Assessment
            </Button>
          </GlassCard>

          <div style={{ 
            marginTop: '24px', padding: '20px', borderRadius: '16px', 
            background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)',
            display: 'flex', gap: '14px', alignItems: 'flex-start'
          }}>
            <AlertCircle size={18} color="var(--accent-danger)" style={{ marginTop: '2px' }} />
            <div style={{ fontSize: '13px', color: 'var(--accent-danger)', lineHeight: 1.5, fontWeight: 600 }}>
              Session lock active. Exiting this node will finalize your current Student Data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
