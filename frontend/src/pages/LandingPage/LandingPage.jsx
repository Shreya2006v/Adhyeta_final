import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import DashboardPreview from '../../components/landing/DashboardPreview';
import CTA from '../../components/landing/CTA';
import Footer from '../../components/landing/Footer';
import Navbar from '../../components/layout/Navbar';
import Stats from '../../components/landing/Stats';
import Testimonials from '../../components/landing/Testimonials';
import Workflow from '../../components/landing/Workflow';

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Stats />
      <div id="features">
        <Features />
      </div>
      <Workflow />
      <DashboardPreview />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
