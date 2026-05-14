import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, X, Minimize2, Sparkles, 
  Bot, BrainCircuit, Lightbulb, Target, BookOpen, User, Cpu
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const suggestedPrompts = [
  "Explain simply", "Quiz me", "ADHYETA study plan", "Teach my weakness"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Synchronization complete. I am your ADHYETA AI MENTOR. What Learning domain shall we explore today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (content) => {
    if (!content.trim()) return;
    
    const userMsg = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response logic
    setTimeout(() => {
      let aiResponse = "Analyzing your Learning footprint... I've detected a gap in your 'Virtual Memory' understanding. Shall we perform a ADHYETA reinforcement session?";
      
      const lowerInput = content.toLowerCase();
      if (lowerInput.includes('weakness')) {
        aiResponse = "Initializing 'Teach Based on Weakness' protocol. I've mapped your performance in Operating Systems. You're struggling with Page Replacement Algorithms. Would you like a Visual Analogy or a Mathematical Breakdown?";
      } else if (lowerInput.includes('quiz')) {
        aiResponse = "Learning Assessment Initiated: What is the primary difference between a hard link and a symbolic link in Linux file systems?";
      } else if (lowerInput.includes('explain simply')) {
        aiResponse = "ADHYETA simplification active: Think of a 'Deadlock' as four cars reaching a four-way stop at exactly the same time, each waiting for the car to their right to move. Nobody can go!";
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1800);
  };

  return (
    <>
      {/* Floating Orb */}
      <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: 1000 }}>
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              border: 'none', color: '#FFFFFF', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--glow-primary)', cursor: 'pointer',
              position: 'relative', overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)' }} />
            <Cpu size={36} style={{ position: 'relative', zIndex: 1 }} />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              style={{
                position: 'absolute', inset: -8, borderRadius: '50%',
                border: '2px solid var(--accent-primary)', opacity: 0.5
              }}
            />
          </motion.button>
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 100, scale: 0.9, filter: 'blur(10px)' }}
            style={{
              position: 'fixed', bottom: '40px', right: '40px',
              width: '420px', height: '640px', zIndex: 1001,
              display: 'flex', flexDirection: 'column'
            }}
          >
            <GlassCard elevated style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: '1px solid rgba(99,102,241,0.2)' }}>
              {/* Header */}
              <div style={{ padding: '24px', background: 'rgba(99,102,241,0.1)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--accent-success)', boxShadow: '0 0 10px var(--accent-success)' }} />
                    <motion.div 
                      animate={{ scale: [1, 2], opacity: [1, 0] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent-success)' }} 
                    />
                  </div>
                  <span style={{ fontWeight: 900, fontSize: '15px', letterSpacing: '0.02em', color: '#FFFFFF' }}>ADHYETA AI MENTOR</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', padding: 4 }}><Minimize2 size={20} /></button>
                  <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', padding: 4 }}><X size={20} /></button>
                </div>
              </div>

              {/* Messages Area */}
              <div ref={scrollRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(3,7,18,0.3)' }}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    style={{
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      padding: '14px 18px',
                      borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      background: msg.role === 'user' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'rgba(255,255,255,0.05)',
                      border: msg.role === 'user' ? 'none' : '1px solid var(--border-subtle)',
                      fontSize: '15px', lineHeight: 1.6,
                      color: msg.role === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                      boxShadow: msg.role === 'user' ? '0 8px 20px rgba(99,102,241,0.2)' : 'none'
                    }}
                  >
                    {msg.content}
                  </motion.div>
                ))}
                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', padding: '16px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', gap: '6px' }}>
                    {[0, 1, 2].map(d => (
                      <motion.div key={d} animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }} style={{ width: 6, height: 6, background: 'var(--accent-primary)', borderRadius: '50%', boxShadow: '0 0 8px var(--accent-primary)' }} />
                    ))}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div style={{ padding: '24px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(3,7,18,0.5)' }}>
                {messages.length < 5 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                    {suggestedPrompts.map(p => (
                      <button
                        key={p} onClick={() => handleSend(p)}
                        style={{ 
                          padding: '8px 16px', borderRadius: '100px', 
                          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', 
                          color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 700, 
                          cursor: 'pointer', transition: '0.2s' 
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(99,102,241,0.2)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(99,102,241,0.1)'}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
                <div style={{ position: 'relative' }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                    placeholder="Ask your ADHYETA mentor..."
                    className="premium-input"
                    style={{ paddingRight: '56px', height: '52px', fontSize: '15px' }}
                  />
                  <button
                    onClick={() => handleSend(input)}
                    style={{ 
                      position: 'absolute', right: '12px', top: '10px', 
                      width: '32px', height: '32px', borderRadius: '10px',
                      background: 'var(--accent-primary)', border: 'none', 
                      color: '#FFFFFF', cursor: 'pointer', display: 'flex', 
                      alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(99,102,241,0.3)'
                    }}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
