import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  ArrowLeft, ArrowRight, User, School, GraduationCap,
  Award, Code, Briefcase, Sparkles, Upload,
  MapPin, Camera, LogIn
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/authStore';

export default function Register() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('select'); // 'select', 'student', 'institution'
  const [role, setRole] = useState(''); // 'student', 'teacher', 'hod', 'principal'
  const [step, setStep] = useState(1);
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [formData, setFormData] = useState({
    student: {
      name: '', age: '', country: 'India', language: 'English',
      category: '', 
      schoolInfo: { name: '', class: '', board: '', subjects: [] },
      collegeInfo: { type: '', branch: '', year: '', name: '', university: '', college_id: '', branch_id: '' },
      examInfo: { name: '', year: '', optional: '', hours: 4, target: '' },
      skillInfo: { skills: [], level: 'Beginner', goal: '', hours: 10 },
      professionalInfo: { industry: '', role: '', goal: '', hours: 2 },
      preferences: { time: '', style: '', goal: 10, weakAreas: [] },
      avatar: 1, username: '', email: '', password: '', passwordConfirm: ''
    },
    institution: {
      name: '', type: 'School', country: 'India', state: '', city: '',
      affiliation: '', students: '', principal: '', email: '',
      excelData: null, password: '', passwordConfirm: ''
    }
  });

  const { data: collegesRes } = useQuery({
    queryKey: ['colleges'],
    queryFn: async () => {
      const res = await api.get('/institutions/colleges/');
      return res.data;
    }
  });
  const colleges = collegesRes?.data || [];

  const selectedCollegeId = formData.student.collegeInfo.name; // We will store ID in name for simplicity or we can add a new field. Let's add college_id and branch_id to collegeInfo.

  const { data: branchesRes } = useQuery({
    queryKey: ['branches', formData.student.collegeInfo.college_id],
    queryFn: async () => {
      if (!formData.student.collegeInfo.college_id) return { data: [] };
      const res = await api.get(`/institutions/branches/?college_id=${formData.student.collegeInfo.college_id}`);
      return res.data;
    },
    enabled: !!formData.student.collegeInfo.college_id
  });
  const branches = branchesRes?.data || [];
  const registerMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/register/', payload);
      return response.data;
    },
    onSuccess: async (data) => {
      // Auto login after register
      try {
        const loginData = { email: formData.student.email, password: formData.student.password };
        if (mode === 'institution') loginData.email = formData.institution.email;
        
        const loginRes = await api.post('/auth/login/', loginData);
        const meRes = await api.get('/auth/me/', { headers: { Authorization: `Bearer ${loginRes.data.access}` }});
        
        setAuth(meRes.data.data || meRes.data, loginRes.data.access, loginRes.data.refresh);
        if (role === 'student') navigate('/dashboard');
        else if (role === 'teacher') navigate('/teacher');
        else if (role === 'hod') navigate('/hod');
        else navigate('/admin');
      } catch (err) {
        navigate('/login');
      }
    },
    onError: (err) => {
      alert(JSON.stringify(err.response?.data || err.message));
    }
  });

  const handleLaunch = () => {
    if (mode === 'student') {
      const s = formData.student;
      if (s.password !== s.passwordConfirm) return alert('Passwords do not match');
      registerMutation.mutate({
        username: s.username,
        email: s.email,
        full_name: s.name,
        role: 'student',
        password: s.password,
        password2: s.passwordConfirm,
        college_id: s.collegeInfo.college_id || null,
        branch_id: s.collegeInfo.branch_id || null
      });
    } else {
      const i = formData.institution;
      if (i.password !== i.passwordConfirm) return alert('Passwords do not match');
      registerMutation.mutate({
        username: i.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random()*1000),
        email: i.email,
        full_name: i.name,
        role: role,
        password: i.password,
        password2: i.passwordConfirm
      });
    }
  };

  const updateStudent = (field, value) => {
    setFormData(prev => ({
      ...prev,
      student: { ...prev.student, [field]: value }
    }));
  };

  const updateInstitution = (field, value) => {
    setFormData(prev => ({
      ...prev,
      institution: { ...prev.institution, [field]: value }
    }));
  };

  if (mode === 'select') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-void)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ maxWidth: '960px', width: '100%' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
            <img src="/logo.png" alt="ADHYETA" style={{ width: '120px', marginBottom: '24px' }} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em' }}>Join ADHYETA</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Select your integration level with the ADHYETA ecosystem.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <motion.div whileHover={{ y: -5 }} onClick={() => { setMode('student'); setRole('student'); }}>
              <GlassCard elevated style={{ padding: '40px', cursor: 'pointer', textAlign: 'center', height: '100%', border: '1px solid rgba(99,102,241,0.15)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: 'var(--glow-primary)' }}>
                  <User size={32} color="var(--accent-primary)" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Student Profile</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Personalized adaptive learning path and AI mentorship.</p>
              </GlassCard>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} onClick={() => { setMode('institution'); setRole('teacher'); }}>
              <GlassCard elevated style={{ padding: '40px', cursor: 'pointer', textAlign: 'center', height: '100%', border: '1px solid rgba(6,182,212,0.15)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: 'var(--glow-secondary)' }}>
                  <School size={32} color="var(--accent-secondary)" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Teacher</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Class analytics, focus monitoring, and automated insights.</p>
              </GlassCard>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} onClick={() => { setMode('institution'); setRole('hod'); }}>
              <GlassCard elevated style={{ padding: '40px', cursor: 'pointer', textAlign: 'center', height: '100%', border: '1px solid rgba(245,158,11,0.15)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: 'var(--glow-warn)' }}>
                  <Briefcase size={32} color="var(--accent-warn)" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>HOD</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Department-wide performance metrics and risk detection.</p>
              </GlassCard>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} onClick={() => { setMode('institution'); setRole('principal'); }}>
              <GlassCard elevated style={{ padding: '40px', cursor: 'pointer', textAlign: 'center', height: '100%', border: '1px solid rgba(168,85,247,0.15)' }}>
                <div style={{ width: 64, height: 64, borderRadius: '18px', background: 'rgba(168,85,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: 'var(--glow-tertiary)' }}>
                  <Sparkles size={32} color="var(--accent-tertiary)" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Admin / Principal</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Full institutional intelligence and systemic oversight.</p>
              </GlassCard>
            </motion.div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '56px', borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: 800, textDecoration: 'none' }}>Sign In</Link></p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'institution') {
    return <InstitutionFlow 
      data={formData.institution} 
      update={updateInstitution} 
      onBack={() => setMode('select')} 
      onLaunch={handleLaunch} 
      isPending={registerMutation.isPending}
    />;
  }

  return <StudentFlow step={step} setStep={setStep} data={formData.student} update={updateStudent} onBack={() => setMode('select')} onLaunch={handleLaunch} isPending={registerMutation.isPending} />;
}

function StudentFlow({ step, setStep, data, update, onBack, onLaunch, isPending }) {
  const steps = ["Profile", "Track", "Course", "ADHYETA", "Security"];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-void)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.05)', zIndex: 1000 }}>
        <motion.div
          animate={{ width: `${(step / 5) * 100}%` }}
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))', boxShadow: 'var(--glow-primary)' }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ maxWidth: '640px', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <StudentStep1 data={data} update={update} />}
              {step === 2 && <StudentStep2 data={data} update={update} />}
              {step === 3 && <StudentStep3 data={data} update={update} />}
              {step === 4 && <StudentStep4 data={data} update={update} />}
              {step === 5 && <StudentStep5 data={data} update={update} />}
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '64px', alignItems: 'center' }}>
            <Button variant="ghost" size="lg" icon={<ArrowLeft size={20} />} onClick={step === 1 ? onBack : () => setStep(step - 1)}>
              Back
            </Button>
            <div style={{ display: 'flex', gap: '10px' }}>
              {steps.map((_, i) => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: (i + 1) === step ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                  boxShadow: (i + 1) === step ? '0 0 10px var(--accent-primary)' : 'none',
                  transition: '0.4s'
                }} />
              ))}
            </div>
            {step < 5 ? (
              <Button variant="primary" size="lg" icon={<ArrowRight size={20} />} onClick={() => setStep(step + 1)}>Continue</Button>
            ) : (
              <Button variant="glow" size="lg" icon={isPending ? undefined : <LogIn size={20} />} onClick={onLaunch} disabled={isPending}>
                {isPending ? 'Initializing...' : 'Initialize Path'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentStep1({ data, update }) {
  return (
    <div>
      <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em' }}>Configure Your Identity.</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '40px' }}>Your ADHYETA profile begins with these fundamentals.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>FULL NAME</label>
          <input
            value={data.name} onChange={e => update('name', e.target.value)}
            className="premium-input" placeholder="Enter your name"
            style={{ height: '52px' }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>AGE</label>
            <input
              value={data.age} onChange={e => update('age', e.target.value)}
              className="premium-input" placeholder="20" type="number"
              style={{ height: '52px' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>LANGUAGE</label>
            <select
              value={data.language} onChange={e => update('language', e.target.value)}
              className="premium-input"
              style={{ height: '52px' }}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Spanish</option>
              <option>German</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>LOCATION</label>
          <div style={{ position: 'relative' }}>
            <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--accent-primary)' }} />
            <input
              value={data.country} onChange={e => update('country', e.target.value)}
              className="premium-input" style={{ paddingLeft: '48px', height: '52px' }} placeholder="Search country..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentStep2({ data, update }) {
  const categories = [
    { id: 'school', label: 'Primary/High School', sub: 'K-12 Education', icon: School, color: 'var(--accent-primary)' },
    { id: 'college', label: 'University / College', sub: 'UG, PG & Doctoral', icon: GraduationCap, color: 'var(--accent-secondary)' },
    { id: 'competitive', label: 'Competitive Exams', sub: 'UPSC, GATE, JEE, etc.', icon: Award, color: 'var(--accent-warn)' },
    { id: 'skill', label: 'Professional Skills', sub: 'AI, Code, Design', icon: Code, color: 'var(--accent-tertiary)' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em' }}>Your Learning Domain.</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '40px' }}>Which track should we optimize for?</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {categories.map((c) => {
          const Icon = c.icon;
          const isSelected = data.category === c.id;
          return (
            <motion.div
              key={c.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => update('category', c.id)}
            >
              <GlassCard style={{
                padding: '24px', cursor: 'pointer',
                border: isSelected ? `2px solid ${c.color}` : '1px solid var(--border-subtle)',
                background: isSelected ? `rgba(99,102,241,0.2)` : 'rgba(255,255,255,0.02)',
                display: 'flex', alignItems: 'center', gap: '18px',
                height: '100%', transition: '0.3s'
              }}>
                <div style={{ 
                  width: 52, height: 52, borderRadius: '14px', 
                  background: isSelected ? c.color : 'rgba(255,255,255,0.05)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isSelected ? `0 0 20px rgba(99,102,241,0.2)` : 'none'
                }}>
                  <Icon size={24} color={isSelected ? '#FFFFFF' : c.color} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800 }}>{c.label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>{c.sub}</div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function StudentStep3({ data, update }) {
  const cat = data.category || 'skill';
  const updateInfo = (field, value) => {
    const key = `${cat}Info`;
    update(key, { ...data[key], [field]: value });
  };

  return (
    <div>
      <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em' }}>Specialization.</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '40px' }}>Defining your specific curriculum parameters.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {cat === 'college' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>COURSE DOMAIN</label>
                <select
                  className="premium-input"
                  style={{ height: '52px' }}
                  value={data.collegeInfo.type} onChange={e => updateInfo('type', e.target.value)}
                >
                  <option value="">Select Domain</option>
                  <option>Computer Science</option><option>Engineering</option><option>Medical</option><option>Data Science</option><option>Arts</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>ACADEMIC YEAR</label>
                <input
                  className="premium-input" placeholder="e.g. 3rd Year"
                  style={{ height: '52px' }}
                  value={data.collegeInfo.year} onChange={e => updateInfo('year', e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>INSTITUTION NAME</label>
                <select
                  className="premium-input"
                  style={{ height: '52px' }}
                  value={data.collegeInfo.college_id}
                  onChange={e => {
                    updateInfo('college_id', e.target.value);
                    updateInfo('branch_id', ''); // reset branch when college changes
                  }}
                >
                  <option value="">Select College</option>
                  {colleges.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>BRANCH</label>
                <select
                  className="premium-input"
                  style={{ height: '52px' }}
                  value={data.collegeInfo.branch_id}
                  onChange={e => updateInfo('branch_id', e.target.value)}
                  disabled={!data.collegeInfo.college_id}
                >
                  <option value="">Select Branch</option>
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {cat === 'competitive' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>TARGET EXAM</label>
              <input
                className="premium-input" placeholder="GATE, UPSC, JEE, NEET..."
                style={{ height: '52px' }}
                value={data.examInfo.name} onChange={e => updateInfo('name', e.target.value)}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>TARGET YEAR</label>
                <input
                  className="premium-input" type="number" placeholder="2026"
                  style={{ height: '52px' }}
                  value={data.examInfo.year} onChange={e => updateInfo('year', e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>DAILY COMMITMENT ({data.examInfo.hours}h)</label>
                <input
                  type="range" min="1" max="16" className="premium-slider"
                  value={data.examInfo.hours} onChange={e => updateInfo('hours', e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {cat === 'skill' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>SKILL CLUSTERS</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['Machine Learning', 'Fullstack', 'Cybersecurity', 'Blockchain', 'UI/UX'].map(s => {
                  const isSel = data.skillInfo.skills.includes(s);
                  return (
                    <div
                      key={s}
                      onClick={() => {
                        const newSkills = isSel ? data.skillInfo.skills.filter(x => x !== s) : [...data.skillInfo.skills, s];
                        updateInfo('skills', newSkills);
                      }}
                      style={{
                        padding: '10px 20px', borderRadius: '100px',
                        border: isSel ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        background: isSel ? 'rgba(99,102,241,0.1)' : 'transparent',
                        color: isSel ? 'var(--accent-primary)' : 'var(--text-secondary)',
                        fontSize: '13px', cursor: 'pointer', transition: '0.3s', fontWeight: 700
                      }}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>CURRENT MASTERY</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                  <button
                    key={l}
                    onClick={() => updateInfo('level', l)}
                    style={{
                      padding: '14px', borderRadius: '14px',
                      background: data.skillInfo.level === l ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                      border: data.skillInfo.level === l ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      color: data.skillInfo.level === l ? 'var(--accent-primary)' : 'var(--text-secondary)', 
                      cursor: 'pointer', transition: '0.3s', fontWeight: 700
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StudentStep4({ data, update }) {
  const styles = [
    { id: 'visual', label: 'Spatial', icon: '🎨' },
    { id: 'reading', label: 'Lexical', icon: '📝' },
    { id: 'practice', label: 'Kinetic', icon: '⚡' },
    { id: 'mixed', label: 'Hybrid', icon: '🧬' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em' }}>Preferences.</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '40px' }}>Tuning the experience to match your learning style.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, marginBottom: '16px', display: 'block', letterSpacing: '0.1em' }}>LEARNING STYLE</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {styles.map(s => {
              const isSel = data.preferences.style === s.id;
              return (
                <GlassCard
                  key={s.id}
                  onClick={() => update('preferences', { ...data.preferences, style: s.id })}
                  style={{
                    padding: '20px', textAlign: 'center', cursor: 'pointer',
                    border: isSel ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    background: isSel ? 'rgba(99,102,241,0.1)' : 'transparent',
                    transition: '0.3s', height: '100%'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{s.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: isSel ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{s.label}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>
        <div>
          <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, marginBottom: '16px', display: 'block', letterSpacing: '0.1em' }}>WEEKLY COMMITMENT ({data.preferences.goal}h)</label>
          <input type="range" min="1" max="60" value={data.preferences.goal} onChange={e => update('preferences', { ...data.preferences, goal: e.target.value })} className="premium-slider" />
        </div>
      </div>
    </div>
  );
}

function StudentStep5({ data, update }) {
  return (
    <div>
      <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em' }}>Secure Your Account.</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '40px' }}>Finalize your credentials for ADHYETA.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ 
            width: 120, height: 120, borderRadius: '50%', 
            background: 'rgba(99,102,241,0.05)', border: '2px dashed var(--accent-primary)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'pointer', position: 'relative',
            boxShadow: 'inset 0 0 20px rgba(99,102,241,0.1)'
          }}>
            <Camera size={40} color="var(--accent-primary)" />
            <div style={{ 
              position: 'absolute', bottom: 4, right: 4, 
              width: 36, height: 36, borderRadius: '50%', 
              background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--glow-primary)'
            }}>
              <Sparkles size={18} color="#FFFFFF" />
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>USERNAME</label>
            <input className="premium-input" style={{ height: '52px' }} placeholder="Chosen username" value={data.username || ''} onChange={e => update('username', e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>EMAIL ADDRESS</label>
            <input className="premium-input" style={{ height: '52px' }} type="email" placeholder="you@example.com" value={data.email || ''} onChange={e => update('email', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>PASSWORD</label>
            <input className="premium-input" style={{ height: '52px' }} type="password" placeholder="Set secure password" value={data.password || ''} onChange={e => update('password', e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>CONFIRM PASSWORD</label>
            <input className="premium-input" style={{ height: '52px' }} type="password" placeholder="Re-enter password" value={data.passwordConfirm || ''} onChange={e => update('passwordConfirm', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InstitutionFlow({ data, update, onBack, onLaunch, isPending }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (e) => {
    console.log("File uploaded");
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-void)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ maxWidth: '840px', width: '100%' }}>
        <GlassCard elevated style={{ padding: '56px', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div onClick={onBack} style={{ cursor: 'pointer', color: 'var(--text-dim)' }}><ArrowLeft size={28} /></div>
            <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em' }}>Institution Onboarding</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, letterSpacing: '0.1em' }}>INSTITUTION CATEGORY</label>
              <select className="premium-input" style={{ height: '52px' }} value={data.type} onChange={e => update('type', e.target.value)}>
                <option>Engineering College</option><option>Medical University</option><option>Private School</option><option>Vocational Center</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>REGION</label>
              <select className="premium-input" style={{ height: '52px' }} value={data.country} onChange={e => update('country', e.target.value)}>
                <option>India</option><option>USA</option><option>Singapore</option><option>UK</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>STATE / PROVINCE</label>
              <input className="premium-input" style={{ height: '52px' }} value={data.state} onChange={e => update('state', e.target.value)} placeholder="e.g. Maharashtra" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>INSTITUTION IDENTITY</label>
              <input className="premium-input" style={{ height: '52px' }} value={data.name} onChange={e => update('name', e.target.value)} placeholder="Legal Name" />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>ADMIN EMAIL</label>
              <input className="premium-input" style={{ height: '52px' }} type="email" value={data.email || ''} onChange={e => update('email', e.target.value)} placeholder="admin@college.edu" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>PASSWORD</label>
              <input className="premium-input" style={{ height: '52px' }} type="password" value={data.password || ''} onChange={e => update('password', e.target.value)} placeholder="Secure Password" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800 }}>CONFIRM PASSWORD</label>
              <input className="premium-input" style={{ height: '52px' }} type="password" value={data.passwordConfirm || ''} onChange={e => update('passwordConfirm', e.target.value)} placeholder="Confirm Password" />
            </div>
          </div>

          <div style={{ 
            border: `2px dashed ${isDragging ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'}`, 
            padding: '40px', borderRadius: '20px', textAlign: 'center', marginBottom: '40px', 
            background: isDragging ? 'rgba(99,102,241,0.05)' : 'transparent', transition: '0.3s' 
          }}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e); }}>
            <Upload size={40} color={isDragging ? 'var(--accent-primary)' : 'var(--text-dim)'} style={{ marginBottom: '16px' }} />
            <div style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>Sync Student Roster</div>
            <div style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '20px' }}>Drag & drop Excel (.xlsx) for batch provisioning</div>
            <input type="file" onChange={handleFile} style={{ display: 'none' }} id="file-up" />
            <Button variant="ghost" size="md" style={{ background: 'rgba(255,255,255,0.03)' }} onClick={() => document.getElementById('file-up').click()}>Select File</Button>
          </div>

          <Button variant="glow" size="lg" style={{ width: '100%', height: '60px', fontSize: '18px', borderRadius: '18px', opacity: isPending ? 0.7 : 1 }} onClick={onLaunch} disabled={isPending}>
            {isPending ? 'Initializing...' : 'Initialize Institution Node'}
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
