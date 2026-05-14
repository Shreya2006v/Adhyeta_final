import { useLocation, Link } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';
import { Search, Bell } from 'lucide-react';
import { useState } from 'react';

const pageNames = {
  '/dashboard': 'Student Dashboard',
  '/focus': 'Focus Zone',
  '/test': 'Mock Tests',
  '/test/results': 'Test Results',
  '/mentor': 'AI Mentor',
  '/leaderboard': 'Leaderboard',
  '/profile': 'Profile',
  '/teacher': 'Teacher Dashboard',
  '/hod': 'HOD Dashboard',
  '/admin': 'Admin Portal',
};

export default function Topbar() {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || 'Dashboard';
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      height: '64px', display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: '16px',
      background: 'rgba(3, 7, 18, 0.8)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* Breadcrumb */}
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: '18px', color: 'var(--text-primary)',
        minWidth: '180px', letterSpacing: '-0.02em'
      }}>{pageName}</span>

      {/* Search */}
      <div style={{
        flex: 1, maxWidth: '480px', margin: '0 auto',
        position: 'relative',
      }}>
        <Search size={16} style={{
          position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-dim)',
        }} />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchTerm.trim()) {
              window.location.href = `/mentor?q=${encodeURIComponent(searchTerm.trim())}`;
            }
          }}
          placeholder="Search topics, tests, mentors..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            width: '100%', padding: '10px 16px 10px 42px',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${searchFocused ? 'rgba(99,102,241,0.4)' : 'var(--border-subtle)'}`,
            borderRadius: '12px', color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)', fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s',
            boxShadow: searchFocused ? '0 0 20px rgba(99,102,241,0.1)' : 'none',
          }}
        />
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notifications */}
        <button style={{
          position: 'relative', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px',
          borderRadius: '10px', transition: 'all 0.2s'
        }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: 8, right: 8,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent-danger)',
            border: '2px solid var(--bg-void)'
          }} />
        </button>

        {/* Avatar */}
        <Link to="/profile">
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 800,
            color: '#FFFFFF', fontSize: '13px', cursor: 'pointer',
            boxShadow: 'var(--glow-primary)', border: '2px solid rgba(255,255,255,0.1)'
          }}>AM</div>
        </Link>
      </div>
    </header>
  );
}
