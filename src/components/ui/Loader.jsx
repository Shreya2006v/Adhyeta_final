import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

export default function LoadingScreen() {
  const { showLoading, setShowLoading } = useUIStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showLoading) return;
    const duration = 1200;
    const interval = 20;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setShowLoading(false), 200);
          return 100;
        }
        return p + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [showLoading, setShowLoading]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#030712',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '24px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 800,
              color: '#FFFFFF', letterSpacing: '0.05em', marginBottom: '8px'
            }}>
              ADHYETA
            </h1>
            <div style={{ 
              fontSize: '12px', color: 'var(--accent-primary)', 
              fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase' 
            }}>
              Initializing Mesh
            </div>
          </motion.div>

          <div style={{
            width: '200px', height: '2px', background: 'rgba(255,255,255,0.05)',
            borderRadius: '10px', overflow: 'hidden'
          }}>
            <motion.div
              style={{
                height: '100%', background: 'var(--accent-primary)',
                width: `${progress}%`,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
