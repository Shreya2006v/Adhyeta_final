import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { testimonials } from '../../lib/mockData';

export default function Testimonials() {
  // Triple the list for a seamless infinite scroll
  const scrollItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section style={{ padding: '140px 0', overflow: 'hidden', position: 'relative' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '80px', padding: '0 64px' }}
      >
        <div style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>Proven Results</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 950, letterSpacing: '-0.03em' }}>
          Loved by <span style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>12,000+</span> minds
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginTop: '16px', maxWidth: '600px', margin: '16px auto 0', fontWeight: 500, lineHeight: 1.6 }}>
          See how ADHYETA AI is transforming Study retention and deep work habits across the globe.
        </p>
      </motion.div>

      {/* Marquee Container */}
      <div style={{ display: 'flex', position: 'relative' }}>
        <motion.div 
          animate={{ x: [0, -100 * scrollItems.length / 3 + '%'] }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ 
            display: 'flex', 
            gap: '32px', 
            padding: '24px 0' 
          }}
        >
          {scrollItems.map((t, i) => (
            <div key={i} style={{ width: '440px', flexShrink: 0 }}>
              <GlassCard elevated
                style={{ 
                  height: '100%', 
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: '1px solid rgba(99,102,241,0.1)',
                  background: 'rgba(255,255,255,0.01)'
                }}
                hover={false}
              >
                <Quote 
                  size={48} 
                  style={{ 
                    position: 'absolute', top: 24, right: 24, 
                    opacity: 0.08, color: 'var(--accent-primary)' 
                  }} 
                />

                <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star 
                      key={j} 
                      size={16} 
                      fill={j < t.rating ? "var(--accent-warn)" : "transparent"} 
                      color={j < t.rating ? "var(--accent-warn)" : "rgba(255,255,255,0.1)"} 
                    />
                  ))}
                </div>

                <p style={{ 
                  fontSize: '17px', 
                  color: '#FFFFFF', 
                  lineHeight: 1.7, 
                  marginBottom: '32px',
                  fontWeight: 500,
                  flex: 1
                }}>
                  "{t.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.1))',
                    border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, color: 'var(--accent-primary)', fontSize: '18px',
                    fontFamily: 'var(--font-display)',
                    boxShadow: 'var(--glow-primary)'
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#FFFFFF' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{t.role} · {t.college}</div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </motion.div>

        {/* Faded edges */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, var(--bg-void) 0%, transparent 20%, transparent 80%, var(--bg-void) 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }} />
      </div>
    </section>
  );
}
