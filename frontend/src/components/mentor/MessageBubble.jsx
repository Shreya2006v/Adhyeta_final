import { motion } from 'framer-motion';
import { User, Bot, Copy, BrainCircuit } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  
  const parseContent = (content) => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let codeContent = [];
    const elements = [];

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <div key={`code-${i}`} style={{
              background: '#030712', padding: '20px', borderRadius: '12px',
              fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#E8F4FF',
              margin: '16px 0', border: '1px solid var(--border-subtle)',
              position: 'relative', overflowX: 'auto',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)'
            }}>
              <button style={{ 
                position: 'absolute', top: 12, right: 12, 
                background: 'none', border: 'none', color: 'var(--text-dim)',
                cursor: 'pointer', transition: '0.2s' 
              }} onMouseEnter={e => e.target.style.color = '#FFFFFF'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>
                <Copy size={16} />
              </button>
              <pre style={{ margin: 0, lineHeight: 1.6 }}><code>{codeContent.join('\n')}</code></pre>
            </div>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 900, margin: '24px 0 12px', color: 'var(--accent-primary)', letterSpacing: '-0.01em' }}>{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, margin: '20px 0 10px', color: 'var(--accent-secondary)' }}>{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('- ')) {
        elements.push(<div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px', paddingLeft: '8px', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 900, fontSize: '18px', lineHeight: 1 }}>•</span>
          <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{line.replace('- ', '')}</span>
        </div>);
      } else if (line.includes('**')) {
        const parts = line.split('**');
        elements.push(<p key={i} style={{ marginBottom: '12px', lineHeight: 1.8, fontWeight: 500 }}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{p}</strong> : p)}
        </p>);
      } else if (line.trim() === '') {
        elements.push(<div key={i} style={{ height: '12px' }} />);
      } else {
        elements.push(<p key={i} style={{ marginBottom: '12px', lineHeight: 1.8, fontWeight: 500 }}>{line}</p>);
      }
    });

    return elements;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '32px',
      }}
    >
      {!isUser && (
        <div style={{
          width: 40, height: 40, borderRadius: '12px',
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: '4px',
          boxShadow: '0 4px 12px rgba(99,102,241,0.1)'
        }}>
          <BrainCircuit size={22} color="var(--accent-primary)" />
        </div>
      )}

      <div style={{
        maxWidth: '85%',
        padding: '24px 32px',
        borderRadius: isUser ? '24px 4px 24px 24px' : '4px 24px 24px 24px',
        background: isUser ? 'rgba(99,102,241,0.06)' : 'rgba(15, 23, 42, 0.7)',
        border: `1px solid ${isUser ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)'}`,
        boxShadow: isUser ? '0 10px 30px -10px rgba(99,102,241,0.1)' : '0 10px 30px -10px rgba(0,0,0,0.3)',
        position: 'relative',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '16px', color: '#FFFFFF' }}>
          {parseContent(message.content)}
        </div>
        
        <div style={{ 
          fontSize: '11px', 
          color: 'var(--text-dim)', 
          marginTop: '16px',
          textAlign: isUser ? 'right' : 'left',
          fontWeight: 700,
          letterSpacing: '0.05em'
        }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} SYNCED
        </div>
      </div>

      {isUser && (
        <div style={{
          width: 40, height: 40, borderRadius: '12px',
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: '4px'
        }}>
          <User size={22} color="#FFFFFF" />
        </div>
      )}
    </motion.div>
  );
}
