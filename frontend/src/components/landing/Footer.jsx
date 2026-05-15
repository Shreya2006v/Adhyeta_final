import { motion } from 'framer-motion';
import { Globe, Users, GitFork, MessageCircle, Heart } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      padding: '120px 64px 48px', 
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-void)', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1.8fr 1fr 1fr 1fr', 
        gap: '64px', 
        position: 'relative', 
        maxWidth: '1440px', 
        margin: '0 auto' 
      }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <img src={logo} alt="ADHYETA" style={{ height: '36px', objectFit: 'contain' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 950, fontSize: '28px', letterSpacing: '0.05em', color: '#FFFFFF' }}>
              ADHYETA
            </div>
          </div>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '16px', 
            maxWidth: '340px', 
            lineHeight: 1.8,
            marginBottom: '40px',
            fontWeight: 500
          }}>
            The premier personalized learning platform designed to adapt to your unique educational journey through ADHYETA-native intelligence.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[Globe, Users, GitFork, MessageCircle].map((Icon, i) => (
              <motion.a 
                key={i}
                href="#"
                whileHover={{ y: -6, color: 'var(--accent-primary)' }}
                style={{ color: 'var(--text-dim)', transition: 'all 0.3s' }}
              >
                <Icon size={22} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {[
          { 
            title: 'Platform', 
            links: [
              { name: 'Core Features', href: '#features' },
              { name: 'Focus Zone', href: '/focus' },
              { name: 'AI Mentor', href: '/mentor' },
              { name: 'Assessments', href: '/test' },
              { name: 'Profile Mapping', href: '/profile' }
            ] 
          },
          { 
            title: 'Resources', 
            links: [
              { name: 'Documentation', href: '#' },
              { name: 'Learning Protocols', href: '#' },
              { name: 'API Access', href: '#' },
              { name: 'Leaderboard', href: '/leaderboard' }
            ] 
          },
          { 
            title: 'Company', 
            links: [
              { name: 'About Us', href: '#' },
              { name: 'Privacy Policy', href: '#' },
              { name: 'Terms of Service', href: '#' },
              { name: 'Support', href: '#' }
            ] 
          }
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 900, 
              fontSize: '13px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              color: 'var(--text-primary)', 
              marginBottom: '32px' 
            }}>
              {col.title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {col.links.map(link => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  whileHover={{ x: 6, color: 'var(--accent-primary)' }}
                  style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '15px', 
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'all 0.2s'
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '100px', 
        paddingTop: '40px', 
        borderTop: '1px solid var(--border-subtle)', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px', 
        color: 'var(--text-dim)', 
        position: 'relative',
        zIndex: 1,
        fontWeight: 600
      }}>
        <div>© {currentYear} ADHYETA SYSTEMS. All rights reserved.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          Built with <Heart size={14} color="var(--accent-danger)" fill="var(--accent-danger)" /> for the curious minds.
        </div>
      </div>
    </footer>
  );
}
