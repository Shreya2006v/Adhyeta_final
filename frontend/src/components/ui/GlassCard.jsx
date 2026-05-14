import { motion } from 'framer-motion';

export default function GlassCard({ children, elevated = false, className = '', hover = true, style = {}, onClick, ...props }) {
  const base = elevated ? {
    background: 'rgba(31, 41, 55, 0.7)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '20px',
    boxShadow: '0 0 20px rgba(99,102,241,0.12), 0 16px 48px rgba(0,0,0,0.5)',
  } : {
    background: 'rgba(17, 24, 39, 0.6)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(99,102,241,0.1)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
  };

  return (
    <motion.div
      className={`card-contained ${className}`}
      onClick={onClick}
      style={{ padding: '20px', ...base, ...style }}
      whileHover={hover ? {
        y: -3,
        boxShadow: elevated
          ? '0 0 30px rgba(99,102,241,0.2), 0 20px 56px rgba(0,0,0,0.6)'
          : '0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        borderColor: 'rgba(99,102,241,0.25)',
      } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
