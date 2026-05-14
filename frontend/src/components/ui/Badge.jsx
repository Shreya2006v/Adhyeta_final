export default function Badge({ children, color = 'primary', size = 'sm', style = {} }) {
  const colors = {
    primary: { bg: 'rgba(99,102,241,0.12)', color: '#A5B4FC', border: 'rgba(99,102,241,0.25)' },
    secondary: { bg: 'rgba(6,182,212,0.12)', color: '#67E8F9', border: 'rgba(6,182,212,0.25)' },
    tertiary: { bg: 'rgba(168,85,247,0.12)', color: '#D8B4FE', border: 'rgba(168,85,247,0.25)' },
    success: { bg: 'rgba(16,185,129,0.12)', color: '#6EE7B7', border: 'rgba(16,185,129,0.25)' },
    warn: { bg: 'rgba(245,158,11,0.12)', color: '#FCD34D', border: 'rgba(245,158,11,0.25)' },
    danger: { bg: 'rgba(239,68,68,0.12)', color: '#FCA5A5', border: 'rgba(239,68,68,0.25)' },
    dim: { bg: 'rgba(71,85,105,0.2)', color: '#94A3B8', border: 'rgba(71,85,105,0.3)' },
  };
  
  // Legacy mapping
  const colorMap = {
    bio: 'primary',
    plasma: 'secondary',
    pulse: 'tertiary'
  };
  
  const mappedColor = colorMap[color] || color;
  const c = colors[mappedColor] || colors.primary;
  const sizes = { 
    xs: { p: '2px 6px', fs: '10px' }, 
    sm: { p: '3px 10px', fs: '11px' }, 
    md: { p: '5px 14px', fs: '13px' } 
  };
  const s = sizes[size] || sizes.sm;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: s.p, fontSize: s.fs, fontFamily: 'var(--font-mono)',
      fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      borderRadius: '9999px', whiteSpace: 'nowrap', ...style,
    }}>
      {children}
    </span>
  );
}
