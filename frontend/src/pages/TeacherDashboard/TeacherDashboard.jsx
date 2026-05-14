import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Send, MessageSquare, Sparkles, Filter, BrainCircuit, Activity, Download, Users } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import TeacherStats from '../../components/teacher/TeacherStats';
import RiskScatterPlot from '../../components/teacher/RiskScatterPlot';
import FileUploadZone from '../../components/teacher/FileUploadZone';
import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import api from '../../lib/axios';

const engagement = [
  { name: 'Active Sync', value: 21, color: 'var(--accent-success)' },
  { name: 'Partial Link', value: 9, color: 'var(--accent-warn)' },
  { name: 'Signal Loss', value: 4, color: 'var(--accent-danger)' },
];

const alerts = [
  { student: 'Ananya Joshi', issue: 'ADHYETA activity flatline (4 days)', type: 'danger' },
  { student: 'Rahul Singh', issue: 'Learning load consistently sub-optimal', type: 'warn' },
  { student: 'Divya Nair', issue: 'Predictive score trajectory declining', type: 'warn' },
];

export default function TeacherDashboard() {
  const [excelData, setExcelData] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setExcelData(data);
    };
    reader.readAsBinaryString(file);
  }, []);

  const handleExport = async () => {
    try {
      const res = await api.get('/dashboard/teacher/export/', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'adhyeta_cohort_intelligence.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Failed to export intelligence data.");
    }
  };

  const handleIngest = async () => {
    if (!excelData || excelData.length === 0) return;
    try {
      const res = await api.post('/dashboard/teacher/ingest/', excelData);
      alert(res.data?.message || 'Data successfully ingested!');
      setExcelData(null);
    } catch (err) {
      alert("Failed to ingest data.");
    }
  };

  const s = (i) => ({ 
    initial: { opacity: 0, y: 15 }, 
    animate: { opacity: 1, y: 0 }, 
    transition: { delay: i * 0.05, type: 'spring', damping: 20 } 
  });

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', paddingBottom: '80px' }}>
      <motion.div {...s(0)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-primary)', marginBottom: '12px' }}>
            <BrainCircuit size={20} />
            <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Faculty Intelligence Hub</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 950, letterSpacing: '-0.02em' }}>Welcome back, Prof. Sharma</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginTop: '4px' }}>CS-AI Domain · Section B · 34 Synchronized Minds</p>
        </div>
        <div style={{ display: 'flex', gap: '14px' }}>
          <Button variant="ghost" size="md" icon={<Filter size={18} />}>Filter</Button>
          <Button variant="glow" size="md" icon={<Download size={18} />} onClick={handleExport}>Intelligence Export</Button>
        </div>
      </motion.div>

      <TeacherStats />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <RiskScatterPlot />
          <FileUploadZone 
            isDragging={isDragging} 
            setIsDragging={setIsDragging} 
            handleFileUpload={handleFileUpload} 
            excelData={excelData} 
            handleIngest={handleIngest}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <motion.div {...s(7)}>
            <GlassCard elevated style={{ padding: '32px', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                 <Users size={18} color="var(--accent-primary)" />
                 <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900 }}>Cohort Synchronization</h3>
              </div>
              <div style={{ height: '220px', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={engagement} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={95} paddingAngle={8} cornerRadius={6}>
                      {engagement.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'rgba(3,7,18,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                   <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: 950, color: '#FFFFFF', lineHeight: 1 }}>34</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-dim)', fontWeight: 800, marginTop: '2px' }}>TOTAL</div>
                   </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '32px' }}>
                {engagement.map(e => (
                  <div key={e.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 700 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '4px', background: e.color, boxShadow: `0 0 10px ${e.color}40` }} /> {e.name}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '14px', color: e.color }}>{e.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div {...s(8)}>
            <GlassCard elevated style={{ padding: '32px', border: '1px solid rgba(239,68,68,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <AlertTriangle size={20} color="var(--accent-danger)" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 900 }}>Interventions</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {alerts.map((a, i) => (
                  <div key={i} style={{
                    padding: '20px', borderRadius: '16px',
                    background: a.type === 'danger' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)',
                    border: `1px solid ${a.type === 'danger' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}`,
                    position: 'relative', overflow: 'hidden'
                  }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>{a.student}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', marginBottom: '16px', fontWeight: 500 }}>{a.issue}</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Button variant="ghost" size="sm" icon={<Send size={14} />} style={{ flex: 1, fontSize: '11px', fontWeight: 800 }}>Nudge</Button>
                      <Button variant="ghost" size="sm" icon={<MessageSquare size={14} />} style={{ flex: 1, fontSize: '11px', fontWeight: 800 }}>Secure Chat</Button>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{
                  width: '100%', marginTop: '24px', padding: '14px',
                  background: 'none', border: '1px solid var(--border-subtle)',
                  borderRadius: '12px', color: 'var(--text-dim)',
                  fontSize: '12px', fontWeight: 800, cursor: 'pointer', transition: '0.2s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}
              >
                VIEW ALL ANOMALIES
              </button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
