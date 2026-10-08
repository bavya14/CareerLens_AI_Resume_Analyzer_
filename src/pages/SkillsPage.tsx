import { BarChart3, CheckCircle2, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useApp } from '@/hooks/useApp';
import { Card, CardHeader } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { SkillCategoryChart, SkillDistributionPie } from '@/components/Charts';
import { SKILL_CATEGORIES } from '@/data/skills';
import * as LucideIcons from 'lucide-react';

export function SkillsPage() {
  const { analysis, navigate } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    if (!analysis) return [];
    let skills = analysis.detectedSkills;
    if (activeCategory) {
      skills = skills.filter((s) => s.category === activeCategory);
    }
    if (search) {
      skills = skills.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
    }
    return skills;
  }, [analysis, search, activeCategory]);

  if (!analysis) {
    return (
      <div className="max-w-5xl mx-auto p-4 lg:p-8">
        <Card>
          <EmptyState
            icon={BarChart3}
            title="No Skills to Show"
            description="Analyze your resume first to see a detailed breakdown of your detected skills."
            actionLabel="Analyze Resume"
            onAction={() => navigate('analyzer')}
          />
        </Card>
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon || BarChart3;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Skill Analysis</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {analysis.detectedSkills.length} skills detected across {SKILL_CATEGORIES.filter(c => analysis.detectedSkills.some(s => s.category === c.label)).length} categories
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader title="Skill Category Distribution" subtitle="Number of skills per category" icon={BarChart3} />
          <div className="p-5">
            <SkillCategoryChart skills={analysis.detectedSkills} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Skill Distribution" subtitle="Proportion of skills by category" icon={BarChart3} />
          <div className="p-5">
            <SkillDistributionPie skills={analysis.detectedSkills} />
          </div>
        </Card>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            !activeCategory
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All ({analysis.detectedSkills.length})
        </button>
        {SKILL_CATEGORIES.map((cat) => {
          const count = analysis.detectedSkills.filter((s) => s.category === cat.label).length;
          if (count === 0) return null;
          const Icon = getIcon(cat.icon);
          const active = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(active ? null : cat.label)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                active
                  ? 'text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              style={active ? { backgroundColor: cat.color, boxShadow: `0 4px 12px ${cat.color}40` } : undefined}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Skills Grid */}
      {filteredSkills.length === 0 ? (
        <Card>
          <div className="p-10 text-center">
            <p className="text-slate-400">No skills found matching your search.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSkills.map((skill, i) => {
            const cat = SKILL_CATEGORIES.find((c) => c.label === skill.category);
            const Icon = cat ? getIcon(cat.icon) : CheckCircle2;
            return (
              <div
                key={skill.name}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all animate-slide-up"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cat?.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: cat?.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{skill.name}</div>
                  <div className="text-xs text-slate-400">{skill.category}</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </div>
            );
          })}
        </div>
      )}

      {/* Category Summary */}
      <Card>
        <CardHeader title="Category Summary" subtitle="Skills detected per category" icon={BarChart3} />
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SKILL_CATEGORIES.map((cat) => {
            const skills = analysis.detectedSkills.filter((s) => s.category === cat.label);
            const Icon = getIcon(cat.icon);
            return (
              <div key={cat.label} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <Icon className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cat.label}</span>
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{skills.length}</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {skills.length === 0 ? 'No skills detected' : skills.map((s) => s.name).join(', ')}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
