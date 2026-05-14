import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, CloudLightning } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

export default function FileUploadZone({ isDragging, setIsDragging, handleFileUpload, excelData }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, type: 'spring', damping: 20 }}>
      <GlassCard elevated
        style={{ 
          padding: '48px', 
          border: isDragging ? '2px dashed var(--accent-primary)' : '2px dashed rgba(255,255,255,0.08)',
          textAlign: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.01)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileUpload(e); }}
      >
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '24px', 
          background: 'rgba(255,255,255,0.02)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
          border: '1px solid var(--border-subtle)',
          boxShadow: excelData ? 'var(--glow-primary)' : 'none',
          transition: '0.3s'
        }}>
          {excelData ? (
             <CheckCircle2 size={36} color="var(--accent-primary)" />
          ) : (
             <CloudLightning size={36} color={isDragging ? 'var(--accent-primary)' : 'var(--text-dim)'} />
          )}
        </div>

        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-0.01em' }}>
          {excelData ? 'Student Data Synchronized' : 'Student Data Ingestion'}
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px', maxWidth: '360px', margin: '0 auto 32px', fontWeight: 500, lineHeight: 1.6 }}>
          {excelData 
            ? `Successfully ingested ${excelData.length} Learning profiles into the faculty hub.`
            : 'Drop your Excel (.xlsx) or CSV payload to update the cohort intelligence records.'}
        </p>
        
        <input type="file" id="excel-upload" hidden onChange={handleFileUpload} accept=".xlsx, .xls, .csv" />
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <label htmlFor="excel-upload">
            <Button variant={excelData ? 'ghost' : 'glow'} size="md" icon={<Upload size={18} />}>
              {excelData ? 'Upload New Payload' : 'Select Data Source'}
            </Button>
          </label>
        </div>

        <AnimatePresence>
          {excelData && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginTop: '40px', textAlign: 'left', borderTop: '1px solid var(--border-subtle)', paddingTop: '32px', overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                 <FileText size={14} color="var(--accent-primary)" />
                 <div style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>INGESTION PREVIEW: {excelData.length} RECORDS</div>
              </div>
              <div style={{ maxHeight: '140px', overflowY: 'auto', borderRadius: '12px', border: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.2)' }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-dim)', textAlign: 'left' }}>
                    <tr>
                      {Object.keys(excelData[0]).map(k => <th key={k} style={{ padding: '12px 16px', fontWeight: 800, borderBottom: '1px solid var(--border-subtle)', textTransform: 'uppercase', fontSize: '10px' }}>{k}</th>)}
                    </tr>
                  </thead>
                  <tbody style={{ color: 'var(--text-secondary)' }}>
                    {excelData.slice(0, 5).map((row, i) => (
                      <tr key={i} style={{ transition: '0.2s' }}>
                        {Object.values(row).map((v, j) => <td key={j} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)', fontWeight: 500 }}>{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}
