import { motion } from 'framer-motion';
import { Sparkles, Mic, Send, Paperclip, BrainCircuit } from 'lucide-react';
import MentorSidebar from './MentorSidebar';
import MessageBubble from './MessageBubble';
import TypingAnimation from './TypingAnimation';
import SuggestionChips from './SuggestionChips';
import { useEffect, useRef } from 'react';

export default function ChatLayout({ messages, input, setInput, onSend, typing, activeChat, setActiveChat }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  return (
    <div style={{ 
      display: 'flex', 
      height: 'calc(100vh - 120px)', 
      gap: '0', 
      margin: '-24px', 
      background: 'var(--bg-void)',
      position: 'relative'
    }}>
      <MentorSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Header */}
        <div style={{
          padding: '18px 32px', 
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', gap: '20px',
          background: 'rgba(7, 13, 26, 0.7)',
          backdropFilter: 'blur(30px)',
          zIndex: 10
        }}>
          <div style={{ position: 'relative' }}>
            <motion.div
              animate={{ 
                boxShadow: typing ? ['0 0 10px var(--accent-primary)', '0 0 25px var(--accent-primary)', '0 0 10px var(--accent-primary)'] : '0 0 15px rgba(99,102,241,0.2)' 
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: 48, height: 48, borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.1))',
                border: '1px solid rgba(99,102,241,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <BrainCircuit size={24} color="var(--accent-primary)" />
            </motion.div>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '18px', letterSpacing: '-0.01em' }}>ADHYETA AI MENTOR</h2>
            <div style={{ fontSize: '11px', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontWeight: 700 }}>
              <span style={{ position: 'relative', width: 6, height: 6 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent-success)', animation: 'pulse 2s infinite' }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent-success)' }} />
              </span>
              ADHYETA CORE ONLINE · OPTIMIZED SYNC
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={scrollRef}
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '32px',
            scrollBehavior: 'smooth'
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            {/* Welcome Message */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', marginBottom: '56px' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                 <Sparkles size={20} color="var(--accent-primary)" />
              </div>
              <p style={{ 
                fontSize: '15px', 
                color: 'var(--text-secondary)', 
                fontWeight: 500,
                maxWidth: '480px',
                margin: '0 auto',
                lineHeight: 1.6
              }}>
                I am your persistent Learning companion. Ask me anything about your subjects, 
                learning trajectories, or ADHYETA assessment results.
              </p>
            </motion.div>

            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            
            {typing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '10px',
                  background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <TypingAnimation />
                </div>
                <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.02em' }}>
                  SYNTHESIZING Learning RESPONSE...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Input Bar */}
        <div style={{ 
          padding: '24px 40px', 
          borderTop: '1px solid var(--border-subtle)',
          background: 'rgba(7, 13, 26, 0.85)',
          backdropFilter: 'blur(30px)'
        }}>
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <SuggestionChips onSelect={setInput} />
            
            <div style={{ 
              display: 'flex', gap: '16px', alignItems: 'flex-end',
              background: 'rgba(255,255,255,0.02)', padding: '12px 16px',
              borderRadius: '20px', border: '1px solid var(--border-subtle)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
            }} className="chat-input-wrapper">
              <button style={{ 
                padding: '10px', color: 'var(--text-dim)', 
                background: 'none', border: 'none', cursor: 'pointer',
                transition: '0.2s' 
              }} onMouseEnter={e => e.target.style.color = 'var(--text-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>
                <Paperclip size={22} />
              </button>

              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { 
                  if (e.key === 'Enter' && !e.shiftKey) { 
                    e.preventDefault(); 
                    onSend(); 
                  } 
                }}
                placeholder="Message ADHYETA..."
                rows={1}
                style={{
                  flex: 1, padding: '12px 4px', background: 'none', 
                  border: 'none', color: '#FFFFFF', 
                  fontFamily: 'var(--font-body)', fontSize: '16px',
                  outline: 'none', resize: 'none', maxHeight: '200px',
                  fontWeight: 500
                }}
              />

              <button style={{ 
                padding: '10px', color: 'var(--text-dim)', 
                background: 'none', border: 'none', cursor: 'pointer',
                transition: '0.2s'
              }} onMouseEnter={e => e.target.style.color = 'var(--text-primary)'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>
                <Mic size={22} />
              </button>

              <motion.button 
                whileHover={input?.trim() ? { scale: 1.05 } : {}}
                whileTap={input?.trim() ? { scale: 0.95 } : {}}
                onClick={onSend}
                disabled={!input?.trim()}
                style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: input?.trim() ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  color: input?.trim() ? '#FFFFFF' : 'var(--text-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', cursor: input?.trim() ? 'pointer' : 'default',
                  transition: 'all 0.3s',
                  boxShadow: input?.trim() ? 'var(--glow-primary)' : 'none'
                }}
              >
                <Send size={20} fill={input?.trim() ? "currentColor" : "none"} />
              </motion.button>
            </div>
            
            <div style={{ 
              textAlign: 'center', marginTop: '16px', 
              fontSize: '11px', color: 'var(--text-dim)',
              fontWeight: 700, letterSpacing: '0.02em'
            }}>
              ADHYETA AI may generate creative insights. Verify critical Student Data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
