import { motion } from 'framer-motion';
import { Brain, Timer, ClipboardCheck, Map, Flame, MessageSquare, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { featuresData } from '../../lib/mockData';

const iconMap = { Brain, Timer, ClipboardCheck, Map, Flame, MessageSquare };

export default function Features() {
  return (
    <section id="features" style={{ padding: '120px 60px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <Sparkles size={16} color="var(--accent-primary)" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Capabilities</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          The operating system for <br/> <span className="text-gradient-primary">ADHYETA excellence</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '24px auto 0', fontSize: '18px', lineHeight: 1.6 }}>
          Move beyond traditional LMS. ADHYETA AI uses advanced Learning mapping to track your focus, 
          retention, and performance bottlenecks in real-time.
        </p>
      </motion.div>

      <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'minmax(280px, auto)',
        gap: '24px', 
        maxWidth: '1280px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {featuresData.map((f, i) => {
          const Icon = iconMap[f.icon] || Brain;
          // Map mock colors to theme variables
          const featureColor = f.color === '#00FFA3' ? 'var(--accent-primary)' : 
                               f.color === '#FF4D6D' ? 'var(--accent-danger)' :
                               f.color === '#FFB347' ? 'var(--accent-warn)' :
                               f.color === '#4DFFEE' ? 'var(--accent-secondary)' : 
                               f.color === '#0066FF' ? 'var(--accent-electric)' : 'var(--accent-tertiary)';

          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 100, damping: 20 }}
              style={{ 
                gridColumn: f.size === 'large' ? 'span 2' : 'span 1',
                height: '100%'
              }}
            >
              <GlassCard 
                style={{ 
                  height: '100%', 
                  padding: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.4s var(--ease-out)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(255,255,255,0.05)'
                }}
                className="feature-card"
              >
                {/* Decorative emoji background for large cards */}
                {f.size === 'large' && (
                  <div style={{
                    position: 'absolute', right: '-20px', bottom: '-20px',
                    fontSize: '140px', opacity: 0.04, pointerEvents: 'none',
                    transform: 'rotate(-15deg)'
                  }}>
                    {f.emoji}
                  </div>
                )}

                <div style={{
                  width: 56, height: 56, borderRadius: '16px',
                  background: `rgba(99,102,241,0.2)`,
                  border: `1px solid rgba(99,102,241,0.2)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '28px',
                  boxShadow: `0 8px 24px rgba(99,102,241,0.2)`
                }}>
                  <Icon size={28} color={featureColor} />
                </div>
                
                <h3 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: '24px', 
                  fontWeight: 800, 
                  marginBottom: '14px',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em'
                }}>
                  {f.title}
                </h3>
                
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '16px', 
                  lineHeight: 1.7,
                  maxWidth: f.size === 'large' ? '85%' : '100%'
                }}>
                  {f.desc}
                </p>

                {f.size === 'large' && (
                  <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ height: '4px', width: '32px', borderRadius: '2px', background: featureColor }} />
                      <span style={{ height: '4px', width: '12px', borderRadius: '2px', background: 'rgba(255,255,255,0.1)' }} />
                      <span style={{ height: '4px', width: '12px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }} />
                    </div>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
