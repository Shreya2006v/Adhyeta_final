import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { subjectRadarData } from '../../lib/mockData';

export default function SubjectRadar() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart data={subjectRadarData} cx="50%" cy="50%" outerRadius="80%">
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: 'var(--text-dim)', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em' }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey="score"
          stroke="var(--accent-primary)"
          fill="var(--accent-primary)"
          fillOpacity={0.25}
          strokeWidth={4}
          animationDuration={1500}
          animationEasing="ease-out"
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
