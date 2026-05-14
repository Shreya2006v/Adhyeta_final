import { lazy, Suspense, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingScreen from './components/ui/Loader';
import AppLayout from './components/layout/AppLayout';
import { useUIStore } from './store/uiStore';
import { useAuthStore } from './store/authStore';
import { useKonamiCode } from './hooks/useAnimations';
import api from './lib/axios';

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes cache to avoid latency
    },
  },
});

// Lazy load all pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FocusZone = lazy(() => import('./pages/FocusZone'));
const AIMentor = lazy(() => import('./pages/AIMentor'));
const MockTest = lazy(() => import('./pages/MockTest'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/Login/ForgotPassword'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const HODDashboard = lazy(() => import('./pages/HODDashboard'));

function PageLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', color: 'var(--text-dim)',
    }}>
      <div style={{
        width: 32, height: 32, border: '2px solid transparent',
        borderTopColor: 'var(--accent-primary)', borderRadius: '50%',
        animation: 'spinSlow 1s linear infinite',
      }} />
    </div>
  );
}

function KonamiOverlay() {
  const { konamiActive, setKonamiActive } = useUIStore();
  if (!konamiActive) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(3,7,18,0.95)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={() => setKonamiActive(false)}>
      <h1 style={{ color: 'var(--accent-primary)', fontSize: '40px', fontWeight: 800 }}>ADHYETA SYNC ACTIVE</h1>
    </div>
  );
}

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  const { setKonamiActive } = useUIStore();
  const { isAuthenticated, setUser } = useAuthStore();
  
  // Refresh user profile on every app load to fix stale cached data
  useEffect(() => {
    if (isAuthenticated) {
      api.get('/auth/me/').then(res => {
        const userObj = res.data.data || res.data;
        if (userObj && userObj.id) setUser(userObj);
      }).catch(() => {}); // silently ignore if token expired (interceptor handles logout)
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useKonamiCode(useCallback(() => {
    setKonamiActive(true);
    setTimeout(() => setKonamiActive(false), 3000);
  }, [setKonamiActive]));

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LoadingScreen />
        <KonamiOverlay />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/focus" element={<FocusZone />} />
              <Route path="/test" element={<MockTest />} />
              <Route path="/mentor" element={<AIMentor />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/hod" element={<HODDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
