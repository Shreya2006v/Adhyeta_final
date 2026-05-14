import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, BrainCircuit, Lightbulb, BookOpen, 
  Send, History, Zap, Settings, Star, Activity, Cpu, 
  Binary, Network, Database
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

export default function AIMentor() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('visual');
  const [explanation, setExplanation] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    setTimeout(() => {
      let content = "";
      if (style === 'visual') {
        content = "ADHYETA Mapping Complete: Imagine the Operating System as a busy restaurant manager. The CPU is the Chef, and Processes are the Orders. RAM is the counter space where ingredients are prepped. When the counter gets full, the manager uses 'Virtual Memory' (a shelf in the back) to store prep work that isn't needed right this second.";
      } else if (style === 'analogy') {
        content = "Analogy Synthesis: Think of a Deadlock like four cars meeting at a 4-way intersection simultaneously. Each car is waiting for the one on its right to move, but nobody can move because they're all waiting for someone else! This 'circular wait' is exactly why your system hangs.";
      } else {
        content = "Narrative Stream: In a galaxy of data, the OS is the Force that binds everything together. Sometimes, Sith Lords (Bugs) try to disrupt the flow by hoarding resources (Deadlock), but the Jedi (Kernel) restores balance using specialized protocols (Deadlock Detection) to ensure the peace of the system.";
      }
      setExplanation(content);
      setIsGenerating(false);
    }, 2500);
  };

  const s = (i) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.05, type: 'spring', damping: 20 }
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '100px' }}>
      <motion.div {...s(0)} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div style={{ position: 'relative', width: 'fit-content', margin: '0 auto 24px' }}>
          <div style={{ 
              width: 80, height: 80, borderRadius: '24px', 
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--glow-primary)'
          }}>
            <Bot size={40} color="var(--accent-primary)" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ position: 'absolute', inset: -10, borderRadius: '32px', border: '2px solid var(--accent-primary)', opacity: 0.2 }}
          />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 950, marginBottom: '12px', letterSpacing: '-0.02em' }}>ADHYETA AI MENTOR</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Your elite Learning companion for deep Study mastery and accelerated intelligence.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Section: Teach based on Weakness */}
          <motion.div {...s(1)}>
            <GlassCard elevated style={{ padding: '40px', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                <BrainCircuit size={28} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '24px', fontWeight: 900 }}>Learning Domain Mastery</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>TARGET KNOWLEDGE NODE</label>
                  <input 
                    className="premium-input" 
                    placeholder="e.g. Memory Management, Quantum Entanglement..." 
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    style={{ height: '56px', fontSize: '16px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>SYNTHESIS STYLE</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                    {[
                      { id: 'visual', label: 'ADHYETA Map', icon: <Binary size={20} />, desc: 'Structural/Visual' },
                      { id: 'analogy', label: 'Analogy Sink', icon: <Network size={20} />, desc: 'Relatable logic' },
                      { id: 'story', label: 'Narrative Arc', icon: <Database size={20} />, desc: 'Contextual story' }
                    ].map(st => (
                      <button 
                        key={st.id}
                        onClick={() => setStyle(st.id)}
                        style={{
                          padding: '20px 16px', borderRadius: '16px', textAlign: 'center',
                          background: style === st.id ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${style === st.id ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                          color: style === st.id ? 'var(--accent-primary)' : 'var(--text-primary)', 
                          cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
                        }}
                      >
                        <div style={{ color: style === st.id ? 'var(--accent-primary)' : 'var(--text-dim)' }}>{st.icon}</div>
                        <div style={{ fontSize: '14px', fontWeight: 800 }}>{st.label}</div>
                        <div style={{ fontSize: '10px', fontWeight: 600, opacity: 0.6 }}>{st.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="glow" size="lg" icon={<Sparkles size={20} />} 
                  onClick={handleGenerate} disabled={isGenerating}
                  style={{ height: '60px', fontSize: '18px', fontWeight: 900 }}
                >
                  {isGenerating ? 'Synthesizing Knowledge...' : 'Initiate Mastery'}
                </Button>
              </div>

              <AnimatePresence>
                {explanation && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    style={{ marginTop: '40px', overflow: 'hidden' }}
                  >
                    <div style={{ padding: '32px', borderRadius: '24px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', lineHeight: 1.8 }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--accent-primary)', fontSize: '14px', fontWeight: 800, letterSpacing: '0.05em' }}>
                          <Lightbulb size={18} /> AI SYNTHESIS RESULTS
                       </div>
                       <p style={{ fontSize: '17px', color: 'var(--text-primary)', fontWeight: 500 }}>{explanation}</p>
                       <div style={{ display: 'flex', gap: '14px', marginTop: '32px' }}>
                          <Button variant="ghost" size="sm" icon={<Activity size={16} />}>Generate ADHYETA Quiz</Button>
                          <Button variant="ghost" size="sm" icon={<Cpu size={16} />}>Create Learning Map</Button>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <motion.div {...s(2)}>
            <GlassCard elevated style={{ padding: '24px' }}>
               <h3 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <History size={18} color="var(--accent-primary)" /> Learning Stream
               </h3>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Paging vs Segmentation', time: '2h ago' },
                    { label: 'B-Tree Insertion Protocols', time: 'Yesterday' },
                    { label: 'HTTP/3 ADHYETA Handshake', time: '3d ago' }
                  ].map(q => (
                    <div key={q.label} style={{ 
                        padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', 
                        border: '1px solid var(--border-subtle)', cursor: 'pointer', transition: '0.2s' 
                    }} className="hover-card">
                       <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{q.label}</div>
                       <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '4px', fontWeight: 600 }}>{q.time}</div>
                    </div>
                  ))}
               </div>
            </GlassCard>
          </motion.div>

          <motion.div {...s(3)}>
            <GlassCard elevated style={{ padding: '28px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-warn)', marginBottom: '16px' }}>
                  <Star size={18} fill="currentColor" />
                  <span style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '0.05em' }}>PREMIUM SYNAPSE</span>
               </div>
               <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>Unlock high-depth structural explanations and real-time coding co-pilot integration.</p>
               <Button variant="ghost" size="sm" style={{ width: '100%', marginTop: '20px', color: 'var(--accent-warn)', border: '1px solid rgba(245,158,11,0.3)' }}>Upgrade ADHYETA Link</Button>
            </GlassCard>
          </motion.div>

          <motion.div {...s(4)}>
             <GlassCard elevated style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                   <Activity size={18} color="var(--accent-success)" />
                   <span style={{ fontSize: '14px', fontWeight: 800 }}>MENTOR STATUS</span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                   "Arjun, your focus in 'Memory Management' has reached <span style={{ color: 'var(--accent-success)', fontWeight: 800 }}>92% synchronization</span>. Ready to attempt the elite assessment?"
                </div>
             </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
