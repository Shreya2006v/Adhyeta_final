import { Plus, MessageSquare, Search, MoreHorizontal, Hash, BrainCircuit } from 'lucide-react';
import { chatHistory } from '../../lib/mockData';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MentorSidebar({ activeChat, setActiveChat }) {
  const [search, setSearch] = useState('');

  const filteredHistory = chatHistory.filter(chat => 
    chat.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      width: '320px', flexShrink: 0, padding: '32px 20px',
      background: 'rgba(7, 13, 26, 0.6)', borderRight: '1px solid var(--border-subtle)',
      display: 'flex', flexDirection: 'column', height: '100%',
      backdropFilter: 'blur(40px)'
    }}>
      {/* New Session Button */}
      <motion.button 
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(99,102,241,0.15)' }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%', padding: '14px', borderRadius: '16px',
          background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)',
          color: 'var(--accent-primary)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px',
          marginBottom: '32px', transition: 'all 0.2s',
          boxShadow: '0 4px 15px rgba(99,102,241,0.1)'
        }}
      >
        <Plus size={20} /> New Session
      </motion.button>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '32px' }}>
        <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder="Query archives..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '12px 16px 12px 44px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)',
            color: '#FFFFFF', fontSize: '14px', outline: 'none',
            fontWeight: 500, transition: '0.2s'
          }}
          className="search-input"
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
        <div style={{ 
          fontSize: '11px', fontWeight: 900, color: 'var(--text-dim)', 
          textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px',
          paddingLeft: '12px'
        }}>
          Study History
        </div>

        {filteredHistory.map((chat, i) => {
          const isActive = activeChat === i;
          return (
            <motion.button 
              key={chat.id} 
              onClick={() => setActiveChat(i)} 
              whileHover={{ x: 6, background: 'rgba(255,255,255,0.03)' }}
              style={{
                width: '100%', textAlign: 'left', padding: '16px', borderRadius: '16px',
                marginBottom: '8px', cursor: 'pointer', border: '1px solid transparent',
                background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                borderColor: isActive ? 'rgba(99,102,241,0.2)' : 'transparent',
                display: 'flex', flexDirection: 'column', gap: '6px',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: 32, height: 32, borderRadius: '10px', 
                    background: isActive ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <MessageSquare size={16} color={isActive ? 'var(--accent-primary)' : 'var(--text-dim)'} />
                  </div>
                  <span style={{ 
                    fontSize: '14px', fontWeight: isActive ? 800 : 600, 
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    maxWidth: '180px', letterSpacing: '-0.01em'
                  }}>
                    {chat.topic}
                  </span>
                </div>
                {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }} />}
              </div>
              
              <div style={{ 
                fontSize: '11px', color: 'var(--text-dim)', 
                paddingLeft: '44px', display: 'flex', alignItems: 'center', gap: '8px',
                fontWeight: 700
              }}>
                <span>{chat.time}</span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span>{chat.messages} messages</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* User Status Node */}
      <div style={{ 
        marginTop: 'auto', paddingTop: '24px', 
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', gap: '14px'
      }}>
        <div style={{ 
          width: 40, height: 40, borderRadius: '12px', 
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          fontSize: '14px', fontWeight: 900, color: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--glow-primary)'
        }}>AM</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Arjun Mehta</div>
          <div style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '2px' }}>ADHYETA Elite</div>
        </div>
        <MoreHorizontal size={20} color="var(--text-dim)" style={{ cursor: 'pointer' }} />
      </div>
    </div>
  );
}
