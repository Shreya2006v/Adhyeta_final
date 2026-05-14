import { motion } from 'framer-motion';

export default function TypingAnimation() {
  return (
    <div style={{ display: 'flex', gap: '4px', padding: '8px 0' }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#4DFFEE' }} />
      ))}
    </div>
  );
}
