import { motion } from 'framer-motion';
import { useRef } from 'react';

const variants = {
  primary: {
    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.08))',
    border: '1px solid rgba(99,102,241,0.4)',
    color: '#A5B4FC',
    hoverBg: 'rgba(99,102,241,0.25)',
  },
  ghost: {
    background: 'transparent',
    border: '1px solid rgba(99,102,241,0.2)',
    color: '#F1F5F9',
    hoverBg: 'rgba(99,102,241,0.08)',
  },
  danger: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#FCA5A5',
    hoverBg: 'rgba(239,68,68,0.2)',
  },
  glow: {
    background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
    border: '1px solid transparent',
    color: '#FFFFFF',
    hoverBg: 'linear-gradient(135deg, #6366F1, #06B6D4)',
  },
  success: {
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    color: '#6EE7B7',
    hoverBg: 'rgba(16,185,129,0.2)',
  },
};

export default function Button({ children, variant = 'primary', onClick, className = '', loading = false, icon, size = 'md', style: customStyle = {}, ...props }) {
  const btnRef = useRef(null);
  const v = variants[variant] || variants.primary;
  const sizeStyles = {
    xs: { padding: '4px 10px', fontSize: '12px' },
    sm: { padding: '6px 14px', fontSize: '13px' },
    md: { padding: '10px 22px', fontSize: '14px' },
    lg: { padding: '14px 32px', fontSize: '16px' },
  };

  const handleClick = (e) => {
    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.2);pointer-events:none;transform:scale(0);animation:ripple 0.6s linear;left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;width:10px;height:10px;margin-left:-5px;margin-top:-5px;`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    onClick?.(e);
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={handleClick}
      whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: v.background,
        border: v.border,
        color: v.color,
        borderRadius: '12px',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        letterSpacing: '0.01em',
        cursor: loading ? 'wait' : 'pointer',
        ...sizeStyles[size],
        boxShadow: variant === 'glow' ? '0 0 20px rgba(99,102,241,0.3)' : 'none',
        ...customStyle,
      }}
      disabled={loading}
      {...props}
    >
      {loading && (
        <span style={{
          width: '16px', height: '16px', border: '2px solid transparent',
          borderTopColor: v.color, borderRadius: '50%',
          animation: 'spinSlow 0.8s linear infinite',
        }} />
      )}
      {icon && !loading && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </motion.button>
  );
}
