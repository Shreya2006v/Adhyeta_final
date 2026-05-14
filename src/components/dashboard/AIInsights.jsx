import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, AlertTriangle, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { aiInsights } from '../../lib/mockData';

export default function AIInsights() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % aiInsights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [loading]);

  const insight = aiInsights[current];

  return (
    <GlassCard elevated style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Sparkles size={16} color="var(--accent-primary)" />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 800, color: 'var(--accent-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          ADHYETA Analysis
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
          {aiInsights.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 18 : 6, height: 6, borderRadius: '3px',
              background: i === current ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading ? (
          /* AI Thinking animation */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0], scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    boxShadow: '0 0 10px var(--accent-primary)'
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>Processing ADHYETA feedback...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px',
                }}>
                  {insight.emoji}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: insight.color, marginBottom: '6px', letterSpacing: '-0.01em' }}>
                    {insight.title}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500 }}>
                    {insight.body}
                  </p>
                </div>
              </div>

              <Link to={insight.actionPath} style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ x: 6 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: insight.color, fontSize: '13px', fontWeight: 700,
                    fontFamily: 'var(--font-body)', padding: '0',
                    marginTop: '20px',
                  }}
                >
                  {insight.action} <ArrowRight size={14} />
                </motion.button>
              </Link>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </GlassCard>
  );
}
