import { motion } from 'framer-motion';
import { mentorSuggestions } from '../../lib/mockData';
import { Sparkles } from 'lucide-react';

export default function SuggestionChips({ onSelect }) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '10px', 
      marginBottom: '20px', 
      overflowX: 'auto', 
      paddingBottom: '8px',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    }} className="hide-scrollbar">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px', borderRadius: '100px',
        background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
        marginRight: '6px', flexShrink: 0
      }}>
        <Sparkles size={14} color="var(--accent-primary)" fill="var(--accent-primary)" />
        <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--accent-primary)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Quick Prompts</span>
      </div>

      {mentorSuggestions.map((s, i) => (
        <motion.button 
          key={s} 
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)', color: '#FFFFFF' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(s)}
          style={{
            padding: '8px 20px', 
            borderRadius: '100px', 
            whiteSpace: 'nowrap',
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)', 
            fontSize: '14px', 
            cursor: 'pointer',
            fontFamily: 'var(--font-body)', 
            fontWeight: 600,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            flexShrink: 0
          }}
        >
          {s}
        </motion.button>
      ))}
    </div>
  );
}
