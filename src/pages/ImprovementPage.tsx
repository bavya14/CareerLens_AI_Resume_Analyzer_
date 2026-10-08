import {
  Lightbulb, AlertTriangle, Info, FileWarning, KeyRound,
  FileText, Rocket, Zap, BookOpen,
} from 'lucide-react';
import { useApp } from '@/hooks/useApp';
import { Card, CardHeader } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import type { ImprovementSuggestion } from '@/types';

const typeConfig: Record<ImprovementSuggestion['type'], { icon: typeof Lightbulb; color: string; label: string }> = {
  missing_section: { icon: FileText, color: 'text-rose-500 bg-rose-500/10', label: 'Missing Section' },
  weak_area: { icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10', label: 'Weak Area' },
  keyword: { icon: KeyRound, color: 'text-violet-500 bg-violet-500/10', label: 'Keyword Tip' },
  formatting: { icon: FileWarning, color: 'text-sky-500 bg-sky-500/10', label: 'Formatting' },
  project: { icon: Rocket, color: 'text-emerald-500 bg-emerald-500/10', label: 'Project Tip' },
  action_verb: { icon: Zap, color: 'text-orange-500 bg-orange-500/10', label: 'Action Verbs' },
  ats_tip: { icon: Info, color: 'text-blue-500 bg-blue-500/10', label: 'ATS Tip' },
};

const severityConfig: Record<ImprovementSuggestion['severity'], string> = {
  high: 'border-l-rose-500',
  medium: 'border-l-amber-500',
  low: 'border-l-sky-500',
};

export function ImprovementPage() {
  const { analysis, navigate } = useApp();

  if (!analysis) {
    return (
      <div className="max-w-5xl mx-auto p-4 lg:p-8">
        <Card>
          <EmptyState
            icon={Lightbulb}
            title="No Improvement Suggestions Yet"
            description="Analyze your resume to get personalized suggestions for improving your resume."
            actionLabel="Analyze Resume"
            onAction={() => navigate('analyzer')}
          />
        </Card>
      </div>
    );
  }

  const highSeverity = analysis.improvements.filter((i) => i.severity === 'high');
  const mediumSeverity = analysis.improvements.filter((i) => i.severity === 'medium');
  const lowSeverity = analysis.improvements.filter((i) => i.severity === 'low');

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Improve My Resume</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {analysis.improvements.length} personalized suggestions to strengthen your resume
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center border-rose-500/20">
          <div className="text-3xl font-bold text-rose-500 tabular-nums">{highSeverity.length}</div>
          <div className="text-xs text-slate-400 mt-1">High Priority</div>
        </Card>
        <Card className="p-4 text-center border-amber-500/20">
          <div className="text-3xl font-bold text-amber-500 tabular-nums">{mediumSeverity.length}</div>
          <div className="text-xs text-slate-400 mt-1">Medium Priority</div>
        </Card>
        <Card className="p-4 text-center border-sky-500/20">
          <div className="text-3xl font-bold text-sky-500 tabular-nums">{lowSeverity.length}</div>
          <div className="text-xs text-slate-400 mt-1">Low Priority</div>
        </Card>
      </div>

      {/* High Priority */}
      {highSeverity.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            High Priority
          </h2>
          <div className="space-y-3">
            {highSeverity.map((s, i) => (
              <SuggestionCard key={i} suggestion={s} />
            ))}
          </div>
        </div>
      )}

      {/* Medium Priority */}
      {mediumSeverity.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            Medium Priority
          </h2>
          <div className="space-y-3">
            {mediumSeverity.map((s, i) => (
              <SuggestionCard key={i} suggestion={s} />
            ))}
          </div>
        </div>
      )}

      {/* Low Priority */}
      {lowSeverity.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-sky-500" />
            General Tips
          </h2>
          <div className="space-y-3">
            {lowSeverity.map((s, i) => (
              <SuggestionCard key={i} suggestion={s} />
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills Quick Reference */}
      {analysis.missingSkills.length > 0 && (
        <Card>
          <CardHeader title="Missing Skills Reference" subtitle="Skills you should consider learning" icon={KeyRound} />
          <div className="p-5 space-y-2">
            {analysis.missingSkills.slice(0, 8).map((s) => (
              <div key={s.skill} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-900 dark:text-white">{s.skill}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      s.priority === 'High' ? 'bg-rose-500/10 text-rose-500' :
                      s.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-sky-500/10 text-sky-500'
                    }`}>
                      {s.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.reason}</p>
                  <p className="text-xs text-blue-500 mt-1">💡 {s.learningDirection}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function SuggestionCard({ suggestion }: { suggestion: ImprovementSuggestion }) {
  const config = typeConfig[suggestion.type];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-800 border-l-4 ${severityConfig[suggestion.severity]} bg-white dark:bg-slate-900 p-4 hover:shadow-md transition-all`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${config.color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{suggestion.title}</h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
              {config.label}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{suggestion.description}</p>
        </div>
      </div>
    </div>
  );
}
