import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send, CheckCircle2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: 'var(--bg-void)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        style={{ width: '100%', maxWidth: '480px' }}
      >
        <GlassCard elevated style={{ padding: '52px', textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px'
          }}>
            {isSent ? <CheckCircle2 size={32} color="var(--accent-success)" /> : <Mail size={32} color="var(--accent-primary)" />}
          </div>

          {!isSent ? (
            <>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>
                Reset ADHYETA Access
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px', lineHeight: 1.6 }}>
                Enter your registered email address and we'll send you a secure link to reset your password.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>EMAIL ADDRESS</label>
                  <input
                    type="email" className="premium-input" placeholder="name@domain.com"
                    required
                    style={{ height: '52px' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  variant="glow"
                  size="lg"
                  loading={loading}
                  style={{ width: '100%', height: '56px', fontSize: '16px', borderRadius: '16px' }}
                  icon={<Send size={18} />}
                >
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>
                Transmission Sent
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px', lineHeight: 1.6 }}>
                A secure reset link has been dispatched to <strong>{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsSent(false)}
                style={{ width: '100%', height: '56px', fontSize: '16px', borderRadius: '16px' }}
              >
                Resend Link
              </Button>
            </>
          )}

          <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
            <Link to="/login" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', fontWeight: 600
            }}>
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
