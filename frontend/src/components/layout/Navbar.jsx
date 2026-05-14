import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '16px 20px' : '20px 64px', 
      background: 'rgba(3, 7, 18, 0.9)',
      backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <img src="/logo.png" alt="ADHYETA" style={{ height: isMobile ? '28px' : '36px', objectFit: 'contain' }} />
        <div style={{ 
          fontFamily: 'var(--font-display)', 
          fontWeight: 800, 
          fontSize: isMobile ? '18px' : '22px', 
          color: '#FFFFFF'
        }}>
          ADHYETA
        </div>
      </Link>
      
      {!isMobile ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Features', 'About'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>{l}</a>
          ))}
          <Link to="/leaderboard" style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>Leaderboard</Link>
          <Link to="/login"><Button variant="ghost" size="md">Log In</Button></Link>
          <Link to="/register"><Button variant="glow" size="md">Get Started</Button></Link>
        </div>
      ) : (
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0,
          background: '#030712', padding: '24px',
          display: 'flex', flexDirection: 'column', gap: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <Link to="/leaderboard" onClick={() => setMenuOpen(false)} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 700 }}>Leaderboard</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 700 }}>Log In</Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}><Button variant="glow" size="lg" style={{ width: '100%' }}>Get Started</Button></Link>
        </div>
      )}
    </nav>
  );
}
