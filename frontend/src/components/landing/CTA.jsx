import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  return (
    <section style={{ padding: '140px 64px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(3,7,18,0.95) 0%, rgba(15,23,42,0.9) 100%)',
          borderRadius: '40px',
          padding: '100px 64px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(99,102,241,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,0.6)'
        }}
      >
        {/* Immersive ADHYETA Background Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.2, 0.15]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '1000px', height: '600px', borderRadius: '50%',
            background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
            zIndex: 0
          }} 
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(99,102,241,0.1)', padding: '10px 24px',
            borderRadius: '100px', border: '1px solid rgba(99,102,241,0.2)',
            marginBottom: '32px'
          }}>
            <Sparkles size={16} color="var(--accent-primary)" fill="var(--accent-primary)" />
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>ADHYETA SEED PHASE ACTIVE</span>
          </div>

          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: '64px', 
            fontWeight: 950, 
            lineHeight: 1.05,
            marginBottom: '28px',
            maxWidth: '900px',
            letterSpacing: '-0.04em',
            color: '#FFFFFF'
          }}>
            Stop fighting your brain. <br/> <span style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Synchronize with it.</span>
          </h2>

          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '20px', 
            lineHeight: 1.7,
            marginBottom: '56px',
            maxWidth: '640px',
            margin: '0 auto 56px',
            fontWeight: 500
          }}>
            Join thousands of Learning elite, engineers, and researchers using ADHYETA AI to unlock the full potential of their Study architecture.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <Button variant="glow" size="lg" icon={<ArrowRight size={20} />} style={{ minWidth: '240px', height: '60px', fontSize: '17px', fontWeight: 900 }}>
                Initiate Sync
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="lg" style={{ minWidth: '240px', height: '60px', fontSize: '17px', fontWeight: 900 }}>
                Enter Command Hub
              </Button>
            </Link>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
            <div style={{ color: 'var(--text-dim)', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Zap size={14} color="var(--accent-success)" /> No Credit Card Required
            </div>
            <div style={{ color: 'var(--text-dim)', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Zap size={14} color="var(--accent-success)" /> Cancel Sync Anytime
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
