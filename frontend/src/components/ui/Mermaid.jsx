import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'var(--font-body)',
  themeVariables: {
    primaryColor: '#6366F1',
    primaryTextColor: '#fff',
    primaryBorderColor: '#6366F1',
    lineColor: '#6366F1',
    secondaryColor: '#06B6D4',
    tertiaryColor: '#1F2937'
  }
});

const Mermaid = ({ chart }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && chart) {
      mermaid.contentLoaded();
      // Ensure we re-render if chart changes
      ref.current.removeAttribute('data-processed');
      mermaid.render('mermaid-chart', chart).then((result) => {
        ref.current.innerHTML = result.svg;
      }).catch(err => {
        console.error('Mermaid error:', err);
      });
    }
  }, [chart]);

  return (
    <div 
      className="mermaid" 
      ref={ref} 
      style={{ 
        background: 'rgba(0,0,0,0.2)', 
        padding: '20px', 
        borderRadius: '12px',
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'center'
      }}
    />
  );
};

export default Mermaid;
