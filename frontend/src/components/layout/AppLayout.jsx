import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

export default function AppLayout() {
  const { sidebarOpen } = useUIStore();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 1024;
  const mainMargin = isMobile ? '0px' : (sidebarOpen ? '240px' : '64px');

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#F1F5F9' }}>
      <Sidebar />
      
      <main
        style={{
          marginLeft: mainMargin,
          paddingTop: '64px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s ease-out'
        }}
      >
        <Topbar />
        
        <div style={{ 
          flex: 1, 
          padding: isMobile ? '16px' : '32px',
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </div>

        <footer style={{ 
          padding: '32px', 
          textAlign: 'center', 
          opacity: 0.4,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em'
        }}>
          ADHYETA SYNC &middot; ALL SYSTEMS OPERATIONAL
        </footer>
      </main>
    </div>
  );
}
