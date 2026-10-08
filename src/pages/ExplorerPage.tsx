import { Compass, CheckCircle2, XCircle, ArrowRight, Map } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useApp } from '@/hooks/useApp';
import { Card, CardHeader } from '@/components/Card';
import { CAREER_ROLES } from '@/data/careers';
import * as LucideIcons from 'lucide-react';
import type { CareerRole } from '@/types';

export function ExplorerPage() {
  const { analysis } = useApp();
  const [selected, setSelected] = useState<CareerRole | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(CAREER_ROLES.map((r) => r.category)));
    return ['All', ...cats];
  }, []);

  const filteredRoles = useMemo(() => {
    if (categoryFilter === 'All') return CAREER_ROLES;
    return CAREER_ROLES.filter((r) => r.category === categoryFilter);
  }, [categoryFilter]);

  const getMatch = (role: CareerRole): number | null => {
    if (!analysis) return null;
    const match = analysis.careerMatches.find((m) => m.role.id === role.id);
    return match?.matchPercent ?? null;
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon || Compass;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Career Explorer</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Explore career paths independently — see roadmaps, required skills, and your match
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              categoryFilter === cat
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoles.map((role, i) => {
          const Icon = getIcon(role.icon);
          const match = getMatch(role);
          const matchColor = match !== null ? (match >= 75 ? '#10b981' : match >= 50 ? '#3b82f6' : match >= 25 ? '#f59e0b' : '#ef4444') : null;

          return (
            <Card key={role.id} hover className="p-5 animate-slide-up" >
              <div style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-500" />
                  </div>
                  {match !== null && (
                    <div className="text-right">
                      <div className="text-xl font-bold tabular-nums" style={{ color: matchColor! }}>{match}%</div>
                      <div className="text-[10px] text-slate-400">your match</div>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{role.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{role.category}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-3">{role.description}</p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {role.requiredSkills.slice(0, 4).map((s) => {
                    const has = analysis?.detectedSkills.some((d) => d.name.toLowerCase() === s.toLowerCase());
                    return (
                      <span
                        key={s}
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          has ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {s}
                      </span>
                    );
                  })}
                  {role.requiredSkills.length > 4 && (
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs">
                      +{role.requiredSkills.length - 4}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setSelected(role)}
                  className="mt-4 w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  Explore Career
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selected && (
        <CareerDetailModal
          role={selected}
          match={getMatch(selected)}
          analysis={analysis}
          onClose={() => setSelected(null)}
          getIcon={getIcon}
        />
      )}
    </div>
  );
}

function CareerDetailModal({
  role, match, analysis, onClose, getIcon,
}: {
  role: CareerRole;
  match: number | null;
  analysis: ReturnType<typeof useApp>['analysis'];
  onClose: () => void;
  getIcon: (name: string) => React.ComponentType<{ className?: string }>;
}) {
  const Icon = getIcon(role.icon);

  const matchingSkills = analysis
    ? role.requiredSkills.filter((s) => analysis.detectedSkills.some((d) => d.name.toLowerCase() === s.toLowerCase()))
    : [];
  const missingSkills = analysis
    ? role.requiredSkills.filter((s) => !analysis.detectedSkills.some((d) => d.name.toLowerCase() === s.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{role.title}</h2>
              <p className="text-sm text-slate-400">{role.category}</p>
            </div>
          </div>
          {match !== null && (
            <div className="text-right">
              <div className="text-2xl font-bold tabular-nums" style={{
                color: match >= 75 ? '#10b981' : match >= 50 ? '#3b82f6' : match >= 25 ? '#f59e0b' : '#ef4444',
              }}>
                {match}%
              </div>
              <div className="text-xs text-slate-400">your match</div>
            </div>
          )}
        </div>

        <div className="p-5 space-y-5">
          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{role.description}</p>

          {/* Match Analysis */}
          {analysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <h4 className="text-sm font-semibold text-emerald-500 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Matching ({matchingSkills.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {matchingSkills.length > 0 ? (
                    matchingSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-xs font-medium">{s}</span>
                    ))
                  ) : <span className="text-xs text-slate-400">No matching skills</span>}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                <h4 className="text-sm font-semibold text-rose-500 mb-2 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  Missing ({missingSkills.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.length > 0 ? (
                    missingSkills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 text-xs font-medium">{s}</span>
                    ))
                  ) : <span className="text-xs text-emerald-500">All skills matched!</span>}
                </div>
              </div>
            </div>
          )}

          {/* Required Skills */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {role.requiredSkills.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Related Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {role.technologies.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <Map className="w-4 h-4 text-violet-500" />
              Beginner Roadmap
            </h4>
            <div className="space-y-3">
              {role.roadmap.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
