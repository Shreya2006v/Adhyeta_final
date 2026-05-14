import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, School, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      setError('Please enter your credentials');
      return;
    }
    setError('');
    if (role === 'student') navigate('/dashboard');
    else if (role === 'teacher') navigate('/teacher');
    else if (role === 'hod') navigate('/hod');
    else if (role === 'principal') navigate('/admin');
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#030712',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'rgba(99,102,241,0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'rgba(6,182,212,0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '1000px', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {/* Left Side: Branding */}
        <div style={{ flex: 1, minWidth: '320px', display: window.innerWidth < 768 ? 'none' : 'block' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img src="/logo.png" alt="ADHYETA" style={{ width: '200px', marginBottom: '32px', filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.3))' }} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              Welcome back to <br/><span className="text-gradient-primary">ADHYETA.</span>
            </h1>
            <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: 1.6, maxWidth: '400px' }}>
              Access your personalized learning portal and continue your journey towards mastery.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Login Form */}
        <div style={{ flex: 1, minWidth: '320px', maxWidth: '480px' }}>
          <GlassCard elevated style={{ padding: window.innerWidth < 480 ? '24px' : '48px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <img src="/logo.png" alt="ADHYETA" style={{ width: '64px', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Sign In</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Access Role</label>
                <select 
                  className="premium-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ height: '52px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0 16px', borderRadius: '12px' }}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="hod">HOD</option>
                  <option value="principal">Admin</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Address</label>
                <input 
                  type="email" className="premium-input" placeholder="you@domain.com"
                  style={{ height: '52px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0 16px', borderRadius: '12px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secret Key</label>
                  <Link to="/forgot-password" style={{ fontSize: '11px', color: '#6366F1', textDecoration: 'none', fontWeight: 800 }}>Forgot?</Link>
                </div>
                <input 
                  type="password" className="premium-input" placeholder="••••••••"
                  style={{ height: '52px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', padding: '0 16px', borderRadius: '12px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p style={{ color: '#EF4444', fontSize: '13px', fontWeight: 700, textAlign: 'center' }}>{error}</p>}

              <Button variant="glow" size="lg" style={{ height: '56px', fontSize: '16px' }} onClick={handleSignIn} icon={<LogIn size={20} />}>
                Login to ADHYETA
              </Button>

              <p style={{ textAlign: 'center', fontSize: '14px', color: '#94A3B8', marginTop: '16px' }}>
                New to ADHYETA? <Link to="/register" style={{ color: '#6366F1', fontWeight: 800, textDecoration: 'none' }}>Initialize Account <ArrowRight size={14} /></Link>
              </p>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}
