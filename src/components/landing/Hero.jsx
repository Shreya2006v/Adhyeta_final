import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '160px 80px 100px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)'
    }}>
      <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ marginBottom: '40px' }}
        >
          <img 
            src="/logo.png" 
            alt="ADHYETA Logo" 
            style={{ 
              width: '280px', 
              height: 'auto', 
              filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.4))',
              marginBottom: '40px'
            }} 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: window.innerWidth < 768 ? '48px' : '84px', 
            fontWeight: 950, 
            lineHeight: 1, 
            letterSpacing: '-0.04em',
            marginBottom: '32px' 
          }}>
            <span className="text-gradient-primary">ADHYETA</span> AI <br/>
            Learning <span style={{ color: 'var(--text-dim)' }}>Reimagined.</span>
          </h1>
          <p style={{ 
            fontSize: window.innerWidth < 768 ? '18px' : '22px', 
            color: 'var(--text-secondary)', 
            maxWidth: '680px', 
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Experience the future of education. Personalized ADHYETA paths designed to adapt to your unique learning style. No clutter, just intelligence.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
            <Link to="/register">
              <Button variant="glow" size="lg" style={{ height: '64px', padding: '0 48px', fontSize: '18px' }} icon={<ArrowRight size={20} />}>
                Get Started for Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="lg" style={{ height: '64px', padding: '0 40px', fontSize: '18px' }}>
                Access Portal
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative simple background elements - No heavy WebGL */}
      <div style={{
        position: 'absolute', top: '15%', left: '5%', width: '300px', height: '300px',
        background: 'rgba(99,102,241,0.1)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '5%', width: '400px', height: '400px',
        background: 'rgba(6,182,212,0.08)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0
      }} />
    </section>
  );
}
