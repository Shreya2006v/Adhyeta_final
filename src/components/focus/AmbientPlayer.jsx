import { Volume2, CloudRain, TreePine, Waves, VolumeX } from 'lucide-react';

const ambients = [
  { label: 'Lo-fi Sync', icon: Volume2 },
  { label: 'ADHYETA Rain', icon: CloudRain },
  { label: 'Deep Forest', icon: TreePine },
  { label: 'White Noise', icon: Waves },
  { label: 'Zero State', icon: VolumeX },
];

export default function AmbientPlayer({ ambient, setAmbient }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <label style={{ 
        fontSize: '11px', 
        color: 'var(--text-dim)', 
        fontWeight: 800, 
        textTransform: 'uppercase', 
        letterSpacing: '0.12em', 
        display: 'block', 
        marginBottom: '12px' 
      }}>Study Ambiance</label>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {ambients.map((a, i) => {
          const Icon = a.icon;
          const isActive = ambient === i;
          return (
            <button 
              key={i} 
              onClick={() => setAmbient(i)} 
              style={{
                padding: '10px 18px', 
                borderRadius: '14px', 
                cursor: 'pointer',
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                background: isActive ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? 'rgba(99,102,241,0.4)' : 'var(--border-subtle)'}`,
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                fontSize: '13px', 
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.1)' : 'none'
              }}
            >
              <Icon size={16} color={isActive ? 'var(--accent-primary)' : 'currentColor'} />
              {a.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
