import { motion } from 'framer-motion';

export default function FocusStats({ flowScore }) {
  return (
    <div style={{ position: 'absolute', top: '24px', right: '24px', textAlign: 'right' }}>
      <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
        Sync: <span style={{ color: 'var(--accent-primary)' }}>{flowScore}%</span>
      </div>
      {flowScore >= 85 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 5 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }}
          style={{ 
            marginTop: '8px', 
            padding: '6px 12px', 
            borderRadius: '100px', 
            background: 'rgba(99,102,241,0.15)', 
            border: '1px solid rgba(99,102,241,0.3)', 
            fontSize: '11px', 
            color: 'var(--accent-primary)', 
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', animation: 'pulse 1.5s infinite' }} />
          Study FLOW ACTIVE
        </motion.div>
      )}
    </div>
  );
}
