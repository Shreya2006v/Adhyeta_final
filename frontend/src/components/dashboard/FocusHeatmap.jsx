import { useState } from 'react';
import { motion } from 'framer-motion';
import { focusSessionHistory } from '../../lib/mockData';

const COLS = 12;
const ROWS = 7;

function getIntensity(minutes) {
  if (minutes === 0) return 0;
  if (minutes < 30) return 1;
  if (minutes < 60) return 2;
  if (minutes < 120) return 3;
  return 4;
}

const intensityColors = [
  'rgba(255,255,255,0.03)',
  'rgba(99,102,241,0.15)',
  'rgba(99,102,241,0.35)',
  'rgba(99,102,241,0.60)',
  'rgba(99,102,241,0.90)',
];

export default function FocusHeatmap() {
  const [tooltip, setTooltip] = useState(null);
  const cells = focusSessionHistory;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 800 }}>
          ADHYETA Activity Hub
        </h3>
        <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
          12-Week Learning Stream
        </span>
      </div>

      {/* Day labels */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '6px', paddingLeft: '32px' }}>
        {Array.from({ length: COLS }).map((_, i) => (
          <div key={i} style={{ flex: 1, fontSize: '10px', color: 'var(--text-dim)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            {i % 3 === 0 ? `W${i + 1}` : ''}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        {/* Row labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '28px' }}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={i} style={{ height: '14px', fontSize: '10px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', fontWeight: 700 }}>
              {i % 2 === 0 ? d : ''}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 14px)`, gap: '4px', flex: 1, position: 'relative' }}>
          {cells.map((cell, i) => {
            const intensity = getIntensity(cell.totalMinutes);
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.4, zIndex: 10, boxShadow: '0 0 15px rgba(99,102,241,0.4)' }}
                onHoverStart={() => setTooltip({ ...cell, index: i })}
                onHoverEnd={() => setTooltip(null)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.003, duration: 0.2 }}
                style={{
                  borderRadius: '3px',
                  background: intensityColors[intensity],
                  border: '1px solid rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              />
            );
          })}

          {/* Tooltip */}
          {tooltip && (
            <div style={{
              position: 'fixed', zIndex: 100,
              background: 'rgba(3,7,18,0.98)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: '10px', padding: '10px 14px',
              pointerEvents: 'none', fontSize: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              transform: 'translate(-50%, -120%)',
              left: '50%', top: '50%',
            }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 800, marginBottom: '2px' }}>{tooltip.date}</div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {tooltip.totalMinutes ? `${tooltip.totalMinutes} min · ${tooltip.sessions} sessions` : 'ADHYETA Silent'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Dormant</span>
        {intensityColors.map((c, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: '4px', background: c, border: '1px solid rgba(255,255,255,0.05)' }} />
        ))}
        <span style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Peak</span>
      </div>
    </div>
  );
}
