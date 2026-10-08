import { Briefcase, CheckCircle2, XCircle, Target, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/hooks/useApp';
import { Card, CardHeader } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { CareerMatchChart } from '@/components/Charts';
import { Tooltip } from '@/components/Tooltip';
import * as LucideIcons from 'lucide-react';
import type { CareerMatch } from '@/types';

export function CareersPage() {
  const { analysis, navigate } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showCalc, setShowCalc] = useState(false);

  if (!analysis) {
    return (
      <div className="max-w-5xl mx-auto p-4 lg:p-8">
        <Card>
          <EmptyState
            icon={Briefcase}
            title="No Career Recommendations Yet"
            description="Analyze your resume to get personalized career role recommendations with match percentages."
            actionLabel="Analyze Resume"
            onAction={() => navigate('analyzer')}
          />
        </Card>
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon || Briefcase;
  };

  const chartData = analysis.careerMatches.map((m) => ({
    role: m.role.title.length > 18 ? m.role.title.slice(0, 16) + '…' : m.role.title,
    match: m.matchPercent,
  }));

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Career Recommendations</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Sorted by match percentage based on your detected skills
          </p>
        </div>
        <button
          onClick={() => setShowCalc(!showCalc)}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600"
        >
          <Info className="w-4 h-4" />
          How this is calculated
          {showCalc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Calculation Info */}
      {showCalc && (
        <Card className="animate-slide-up">
          <div className="p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">How Match Percentage Is Calculated</h3>
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p>Each career role has a set of required skills. Your match percentage is calculated as:</p>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 font-mono text-xs">
                Match % = (Your matching skills / Total required skills) × 100
              </div>
              <p className="mt-3">The overall resume score uses weighted categories:</p>
              <ul className="space-y-1 ml-4">
                <li>• Technical Skills: 25%</li>
                <li>• Projects: 15%</li>
                <li>• Experience: 15%</li>
                <li>• Education: 10%</li>
                <li>• Soft Skills: 10%</li>
                <li>• Resume Structure: 10%</li>
                <li>• Keyword Relevance: 10%</li>
                <li>• Certifications: 5%</li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Chart */}
      <Card>
        <CardHeader title="Career Match Overview" subtitle="Visual comparison of all career matches" icon={Target} />
        <div className="p-5">
          <CareerMatchChart matches={chartData} />
        </div>
      </Card>

      {/* Career Cards */}
      <div className="space-y-4">
        {analysis.careerMatches.map((match, i) => (
          <CareerMatchCard
            key={match.role.id}
            match={match}
            rank={i + 1}
            expanded={expanded === match.role.id}
            onToggle={() => setExpanded(expanded === match.role.id ? null : match.role.id)}
            getIcon={getIcon}
          />
        ))}
      </div>
    </div>
  );
}

function CareerMatchCard({
  match, rank, expanded, onToggle, getIcon,
}: {
  match: CareerMatch;
  rank: number;
  expanded: boolean;
  onToggle: () => void;
  getIcon: (name: string) => React.ComponentType<{ className?: string }>;
}) {
  const Icon = getIcon(match.role.icon);
  const matchColor = match.matchPercent >= 75 ? '#10b981' : match.matchPercent >= 50 ? '#3b82f6' : match.matchPercent >= 25 ? '#f59e0b' : '#ef4444';

  return (
    <Card hover className="overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${matchColor}15` }}>
          <Icon className="w-6 h-6" style={{ color: matchColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">#{rank}</span>
            <h3 className="font-semibold text-slate-900 dark:text-white truncate">{match.role.title}</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">{match.role.category}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="text-2xl font-bold tabular-nums" style={{ color: matchColor }}>{match.matchPercent}%</div>
            <div className="text-xs text-slate-400">match</div>
          </div>
          {expanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>

      {/* Progress bar */}
      <div className="px-5">
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${match.matchPercent}%`, backgroundColor: matchColor }}
          />
        </div>
      </div>

      {expanded && (
        <div className="p-5 pt-4 animate-slide-up space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{match.role.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-emerald-500 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Your Matching Skills ({match.matchingSkills.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {match.matchingSkills.length > 0 ? (
                  match.matchingSkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-medium">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">No matching skills yet</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-rose-500 mb-2 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                Missing Skills ({match.missingSkills.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {match.missingSkills.length > 0 ? (
                  match.missingSkills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-500 text-xs font-medium">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-500">You have all required skills!</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {match.role.requiredSkills.map((s) => {
                const has = match.matchingSkills.includes(s);
                return (
                  <span
                    key={s}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      has ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Related Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {match.role.technologies.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-500 text-xs font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
