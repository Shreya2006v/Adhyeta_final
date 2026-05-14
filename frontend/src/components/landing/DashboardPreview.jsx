import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function DashboardPreview() {
  return (
    <section style={{ padding: '80px 60px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800, marginBottom: '16px' }}>
        A dashboard that <span className="text-gradient-bio">understands you</span>
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px', margin: '0 auto 32px' }}>
        Every widget is designed to give you actionable insights about your learning journey.
      </p>
      <div style={{
        maxWidth: '900px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        background: 'rgba(13,21,37,0.4)',
        padding: '24px',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px',
      }}>
        {['Learning Map', 'Focus Score', 'Weekly Hours', 'AI Insights', 'Leaderboard', 'Heatmap'].map((item) => (
          <div key={item} style={{
            padding: '20px', borderRadius: '10px',
            background: 'rgba(0,255,163,0.03)', border: '1px solid rgba(0,255,163,0.06)',
            fontSize: '13px', color: 'var(--text-secondary)',
            fontFamily: 'var(--font-display)', fontWeight: 600,
          }}>{item}</div>
        ))}
      </div>
      <Link to="/dashboard" style={{ display: 'inline-block', marginTop: '24px' }}>
        <Button variant="ghost" size="md">Explore Dashboard →</Button>
      </Link>
    </section>
  );
}
