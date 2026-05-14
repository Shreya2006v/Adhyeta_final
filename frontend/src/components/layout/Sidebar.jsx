import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';
import { 
  LayoutDashboard, Target, ClipboardCheck, Bot, Trophy, 
  User, School, Settings, Flame, Zap, ChevronLeft, ChevronRight, Briefcase 
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/focus', label: 'Focus Zone', icon: Target },
  { path: '/test', label: 'Mock Tests', icon: ClipboardCheck },
  { path: '/mentor', label: 'AI Mentor', icon: Bot },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/teacher', label: 'Teacher Dashboard', icon: School },
  { path: '/hod', label: 'HOD Dashboard', icon: Briefcase },
  { path: '/admin', label: 'Admin Portal', icon: Settings },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 240 : 64 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{
        position: 'fixed', left: 0, top: 0, bottom: 0,
        background: 'rgba(3, 7, 18, 0.98)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex', flexDirection: 'column',
        zIndex: 100, overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{
        padding: '20px 16px', display: 'flex', alignItems: 'center',
        gap: '12px', borderBottom: '1px solid var(--border-subtle)',
        minHeight: '64px',
      }}>
        <img src="/logo.png" alt="ADHYETA" style={{ width: 32, height: 32, objectFit: 'contain' }} />
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: '20px', letterSpacing: '0.05em', color: '#FFFFFF'
            }}
          >
            ADHYETA
          </motion.span>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
          return (
            <NavLink key={path} to={path} style={{ textDecoration: 'none', position: 'relative' }}>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(99, 102, 241, 0.12)',
                    borderRadius: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              )}
              <div style={{
                position: 'relative', display: 'flex', alignItems: 'center',
                gap: '12px', padding: '12px 14px', borderRadius: '12px',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}>
                <Icon size={20} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontSize: '14px', fontWeight: isActive ? 700 : 500,
                      fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
                    }}
                  >{label}</motion.span>
                )}
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom: User Status */}
      <div style={{
        padding: '20px 16px', borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(255,255,255,0.01)'
      }}>
        {sidebarOpen ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Flame size={20} color="var(--accent-warn)" />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--accent-warn)', fontSize: '14px' }}>Active Session</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Zap size={16} color="var(--accent-primary)" />
              <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>Sync Active</span>
            </div>
            <div style={{
              height: '6px', borderRadius: '3px',
              background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: '85%', borderRadius: '3px',
                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
              }} />
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Zap size={22} color="var(--accent-primary)" />
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        style={{
          position: 'absolute', right: 4, top: 18,
          width: 24, height: 24, borderRadius: '50%',
          background: 'transparent', border: 'none',
          color: 'var(--text-dim)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10, transition: '0.2s'
        }}
      >
        {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </motion.aside>
  );
}
