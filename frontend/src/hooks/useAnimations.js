import { useState, useEffect, useRef, useCallback } from 'react';

// ── useCountUp: Animated counter with easeOutCubic ──
export function useCountUp(target, duration = 1200, startOnMount = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const rafRef = useRef(null);

  const start = useCallback(() => {
    setStarted(true);
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  }, [target, duration]);

  useEffect(() => {
    if (startOnMount) start();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start, startOnMount]);

  return { count, start, started };
}

// ── useInView: Intersection observer ──
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once !== false) observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: options.margin || '-50px', ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// ── useFocusTimer: Timer state machine ──
export function useFocusTimer(initialMinutes = 50) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remaining, setRemaining] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) { setIsRunning(false); setIsComplete(true); return 0; }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (mins) => {
    setRemaining((mins || initialMinutes) * 60);
    setTotalSeconds((mins || initialMinutes) * 60);
    setIsComplete(false);
    setIsRunning(false);
  };
  const progress = 1 - remaining / totalSeconds;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { remaining, totalSeconds, isRunning, isComplete, start, pause, reset, progress, timeStr, minutes, seconds };
}

// ── useKonamiCode ──
export function useKonamiCode(callback) {
  const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  const inputRef = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      inputRef.current.push(e.key);
      inputRef.current = inputRef.current.slice(-10);
      if (inputRef.current.join(',') === sequence.join(',')) {
        callback();
        inputRef.current = [];
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}

// ── useTypewriter: Character-by-character text reveal ──
export function useTypewriter(text, speed = 40, startOnMount = true) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  const start = useCallback(() => {
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);
    timerRef.current = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(timerRef.current);
        setDone(true);
      }
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    if (startOnMount) start();
    return () => clearInterval(timerRef.current);
  }, [start, startOnMount]);

  return { displayed, done, start };
}

// ── useParallax: Mouse position-driven transform ──
export function useParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setOffset({
        x: ((e.clientX - cx) / cx) * strength,
        y: ((e.clientY - cy) / cy) * strength,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [strength]);

  return offset;
}

// ── useScrollProgress: Page scroll percentage ──
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return progress;
}

// ── useConfetti: Particle burst trigger ──
export function useConfetti() {
  const [particles, setParticles] = useState([]);

  const trigger = useCallback((count = 60) => {
    const colors = ['#6366F1', '#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B', '#FFFFFF'];
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: 40 + Math.random() * 20,
      y: 40 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 12,
      vy: -(4 + Math.random() * 8),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  }, []);

  return { particles, trigger };
}

// ── useDebounce ──
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
