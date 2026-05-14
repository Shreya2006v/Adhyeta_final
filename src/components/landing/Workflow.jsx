import { motion } from 'framer-motion';
import { ClipboardCheck, Cpu, Sliders, BookOpen, Route, ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const steps = [
  { 
    id: 1, 
    title: 'Student Performance', 
    desc: 'Our ADHYETA engine tracks every quiz answer, focus session, and learning pattern.', 
    icon: ClipboardCheck, 
    color: 'var(--accent-primary)' 
  },
  { 
    id: 2, 
    title: 'AI Learning Analysis', 
    desc: 'Advanced heuristics analyze your retention rates and identify knowledge gaps.', 
    icon: Cpu, 
    color: 'var(--accent-tertiary)' 
  },
  { 
    id: 3, 
    title: 'Dynamic Adjustment', 
    desc: 'The platform recalibrates difficulty levels and learning pace in real-time.', 
    icon: Sliders, 
    color: 'var(--accent-secondary)' 
  },
  { 
    id: 4, 
    title: 'Resource Curation', 
    desc: 'AI selects precise videos, notes, and exercises to bridge your specific gaps.', 
    icon: BookOpen, 
    color: 'var(--accent-electric)' 
  },
  { 
    id: 5, 
    title: 'Personalized Path', 
    desc: 'A unique learning roadmap is generated, optimized for your personal growth.', 
    icon: Route, 
    color: 'var(--accent-success)' 
  },
];

export default function Workflow() {
  return (
    <section style={{ padding: '120px 60px', background: 'rgba(99,102,241,0.02)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Adaptive Workflow</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 800, marginTop: '16px' }}>
            How <span className="text-gradient-primary">ADHYETA Adaptation</span> Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '20px auto 0', fontSize: '18px' }}>
            ADHYETA AI creates a feedback loop that evolves with your brain.
          </p>
        </motion.div>

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
          {/* Connector Line */}
          <div style={{ 
            position: 'absolute', top: '40px', left: '50px', right: '50px', 
            height: '2px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-success))', 
            opacity: 0.1, zIndex: 0 
          }} />

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '24px', 
                background: 'var(--bg-surface)', border: `1px solid ${step.color}40`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                margin: '0 auto 24px', position: 'relative',
                boxShadow: `0 0 20px ${step.color}15`
              }}>
                <step.icon size={32} color={step.color} />
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}>
                    <ArrowRight size={16} color="var(--text-dim)" />
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)' }}>{step.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, padding: '0 10px' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Visualization Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '100px' }}
        >
          <GlassCard elevated style={{ padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(6,182,212,0.05) 100%)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
               <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent-secondary)', fontWeight: 700, marginBottom: '8px' }}>INPUT SIGNAL</div>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>Student Quiz Results</div>
               </div>
               <div style={{ alignSelf: 'center', opacity: 0.2 }}><ArrowRight size={24} /></div>
               <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent-tertiary)', fontWeight: 700, marginBottom: '8px' }}>PROCESSING</div>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>ADHYETA Analysis</div>
               </div>
               <div style={{ alignSelf: 'center', opacity: 0.2 }}><ArrowRight size={24} /></div>
               <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '11px', color: 'var(--accent-success)', fontWeight: 700, marginBottom: '8px' }}>OUTPUT ACTION</div>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>Difficulty recalibrated to +15%</div>
               </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
