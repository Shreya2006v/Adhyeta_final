import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Coffee, Target, Zap, Music, CloudRain, Wind, Radio, Volume2, Sparkles, BrainCircuit, Activity } from 'lucide-react';
import FocusTimer from '../../components/focus/FocusTimer';
import FullscreenFocus from '../../components/focus/FullscreenFocus';
import SessionComplete from '../../components/focus/SessionComplete';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';

export default function FocusZone() {
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState(null);
  
  // Setup State
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(25);
  const [mode, setMode] = useState('deep'); // 'deep', 'creative', 'light'
  const [soundscape, setSoundscape] = useState('none');

  // Timer Hook Logic
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [flowScore, setFlowScore] = useState(85);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        if (Math.random() > 0.8) setFlowScore(s => Math.min(100, Math.max(70, s + (Math.random() * 4 - 2))));
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const modes = {
    deep: { label: 'Deep Sync', color: '#6366F1', icon: Target, desc: 'Maximum Learning immersion, zero latency.' },
    creative: { label: 'Alpha State Flow', color: '#06B6D4', icon: Zap, desc: 'Unlocking lateral Study connections.' },
    light: { label: 'Steady Stream', color: '#F59E0B', icon: Coffee, desc: 'Consistent maintenance and review cycles.' }
  };

  const soundscapes = [
    { id: 'none', label: 'ADHYETA Silence', icon: Volume2 },
    { id: 'rain', label: 'Synthetic Rain', icon: CloudRain },
    { id: 'wind', label: 'Alpha Waves', icon: Wind },
    { id: 'lofi', label: 'Cyber Beats', icon: Radio }
  ];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const timerData = {
    timeStr: formatTime(timeLeft),
    progress: (duration * 60) > 0 ? timeLeft / (duration * 60) : 0,
    isRunning,
    start: () => setIsRunning(true),
    pause: () => setIsRunning(false)
  };

  const handleStart = () => setIsActive(true);
  const handleEnd = () => {
    setIsActive(false);
    setIsRunning(false);
    setSessionStats({
      duration,
      flowAverage: flowScore,
      focusTime: duration,
      xpEarned: Math.floor(duration * 1.5)
    });
    setIsComplete(true);
  };

  if (isComplete) return <SessionComplete stats={sessionStats} onRestart={() => setIsComplete(false)} />;
  
  if (isActive) {
    return (
      <FullscreenFocus 
        timer={timerData} 
        mode={modes[mode]} 
        topic={topic}
        flowScore={flowScore}
        getTimerColor={() => modes[mode].color}
        onEnd={handleEnd} 
      />
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '40px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
           <BrainCircuit size={20} color="#6366F1" />
           <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366F1', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Learning Laboratory</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.02em' }}>Focus Zone</h1>
        <p style={{ color: '#94A3B8', fontSize: '18px', maxWidth: '600px' }}>Calibrate your ADHYETA environment for peak Learning synchronization and deep learning immersion.</p>
      </motion.header>

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1.2fr 0.8fr', gap: '32px' }}>
        {/* Left Column: Configuration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <GlassCard elevated style={{ padding: '32px', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
               <Activity size={20} color="#6366F1" />
               <h3 style={{ fontSize: '20px', fontWeight: 800 }}>Study Parameters</h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ADHYETA Topic / Mastery Domain</label>
                <input 
                  className="premium-input" 
                  placeholder="e.g., Quantum Computing Fundamentals..." 
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  style={{ height: '56px', fontSize: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#FFFFFF', padding: '0 16px', borderRadius: '12px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Immersion Duration (Mins)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                  {[25, 45, 60, 90].map(t => (
                    <button 
                      key={t}
                      onClick={() => setDuration(t)}
                      style={{
                        padding: '16px', borderRadius: '14px',
                        background: duration === t ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${duration === t ? '#6366F1' : 'rgba(255,255,255,0.05)'}`,
                        color: duration === t ? '#6366F1' : '#F1F5F9',
                        fontWeight: 800, fontSize: '15px', cursor: 'pointer', transition: 'all 0.3s'
                      }}
                    >
                      {t}M
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 640 ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
            {Object.entries(modes).map(([key, m]) => {
              const Icon = m.icon;
              const isSel = mode === key;
              return (
                <motion.div key={key} whileHover={{ y: -6 }} onClick={() => setMode(key)}>
                  <GlassCard elevated style={{ 
                    padding: '24px', cursor: 'pointer', textAlign: 'center', height: '100%',
                    border: `1px solid ${isSel ? m.color : 'rgba(255,255,255,0.05)'}`,
                    background: isSel ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                  }}>
                    <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                       <Icon size={24} color={m.color} />
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '8px', color: isSel ? m.color : '#FFFFFF' }}>{m.label}</div>
                    <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.5, fontWeight: 500 }}>{m.desc}</div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visualization & Audio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <GlassCard elevated style={{ padding: '32px', textAlign: 'center', border: '1px solid rgba(99,102,241,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 32px' }}>
              <FocusTimer timer={timerData} color={modes[mode].color} size={300} />
            </div>
            <Button 
              variant="glow" 
              size="lg" 
              icon={<Play size={20} fill="currentColor" />}
              style={{ width: '100%', height: '60px', fontSize: '18px', fontWeight: 900 }}
              onClick={handleStart}
            >
              INITIALIZE SYNC
            </Button>
            <p style={{ marginTop: '20px', fontSize: '12px', color: '#475569', fontWeight: 600, letterSpacing: '0.02em' }}>
               ADHYETA core ready for synchronization.
            </p>
          </GlassCard>

          <GlassCard elevated style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Music size={18} color="#06B6D4" />
              <h4 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Auditory Interface</h4>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {soundscapes.map(s => {
                const Icon = s.icon;
                const isSel = soundscape === s.id;
                return (
                  <button 
                    key={s.id}
                    onClick={() => setSoundscape(s.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '14px', borderRadius: '12px',
                      background: isSel ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isSel ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)'}`,
                      color: isSel ? '#6366F1' : '#F1F5F9', fontSize: '13px', fontWeight: 700,
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <Icon size={16} /> {s.label}
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
