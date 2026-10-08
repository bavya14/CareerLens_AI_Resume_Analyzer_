import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import type { ScoreBreakdown, Skill } from '@/types';
import { SKILL_CATEGORIES } from '@/data/skills';

const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#0ea5e9', '#f97316', '#a78bfa'];

export function SkillCategoryChart({ skills }: { skills: Skill[] }) {
  const data = SKILL_CATEGORIES.map((cat) => ({
    name: cat.label,
    count: skills.filter((s) => s.category === cat.label).length,
    fill: cat.color,
  })).filter((d) => d.count > 0);

  if (data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: 'currentColor' }}
          className="text-slate-500"
          interval={0}
          angle={-25}
          textAnchor="end"
          height={70}
        />
        <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} className="text-slate-500" allowDecimals={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgb(15 23 42)',
            border: '1px solid rgb(51 65 85)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '12px',
          }}
          cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CareerMatchChart({ matches }: { matches: { role: string; match: number }[] }) {
  if (matches.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={Math.max(250, matches.length * 45)}>
      <BarChart data={matches} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'currentColor' }} className="text-slate-500" />
        <YAxis
          type="category"
          dataKey="role"
          tick={{ fontSize: 11, fill: 'currentColor' }}
          className="text-slate-500"
          width={130}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgb(15 23 42)',
            border: '1px solid rgb(51 65 85)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '12px',
          }}
          cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
          formatter={(value: number) => [`${value}%`, 'Match']}
        />
        <Bar dataKey="match" radius={[0, 6, 6, 0]}>
          {matches.map((entry, i) => (
            <Cell key={i} fill={entry.match >= 75 ? '#10b981' : entry.match >= 50 ? '#3b82f6' : entry.match >= 25 ? '#f59e0b' : '#ef4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ScoreBreakdownChart({ breakdown }: { breakdown: ScoreBreakdown }) {
  const data = [
    { name: 'Technical', value: breakdown.technicalSkills, fill: '#3b82f6' },
    { name: 'Soft Skills', value: breakdown.softSkills, fill: '#8b5cf6' },
    { name: 'Education', value: breakdown.education, fill: '#06b6d4' },
    { name: 'Projects', value: breakdown.projects, fill: '#10b981' },
    { name: 'Experience', value: breakdown.experience, fill: '#f59e0b' },
    { name: 'Certs', value: breakdown.certifications, fill: '#ec4899' },
    { name: 'Structure', value: breakdown.resumeStructure, fill: '#0ea5e9' },
    { name: 'Keywords', value: breakdown.keywordRelevance, fill: '#f97316' },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'currentColor' }} className="text-slate-500" angle={-25} textAnchor="end" height={60} interval={0} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'currentColor' }} className="text-slate-500" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgb(15 23 42)',
            border: '1px solid rgb(51 65 85)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '12px',
          }}
          cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SkillDistributionPie({ skills }: { skills: Skill[] }) {
  const data = SKILL_CATEGORIES.map((cat) => ({
    name: cat.label,
    value: skills.filter((s) => s.category === cat.label).length,
    fill: cat.color,
  })).filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgb(15 23 42)',
            border: '1px solid rgb(51 65 85)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '12px',
          }}
        />
        <Legend wrapperStyle={{ fontSize: '11px' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export { CHART_COLORS };
