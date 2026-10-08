import {
  TrendingUp, Briefcase, Target, BarChart3, ArrowRight, Sparkles,
  FileText, Lightbulb, Compass, Zap, Award, AlertTriangle,
} from 'lucide-react';
import { useApp } from '@/hooks/useApp';
import { Card, CardHeader } from '@/components/Card';
import { CircularProgress } from '@/components/CircularProgress';
import { EmptyState } from '@/components/EmptyState';
import { getScoreLabel, getPriorityColor, formatDateShort } from '@/utils/helpers';
import { getAllSummaries } from '@/services/storage';
import type { Page } from '@/types';

export function DashboardPage() {
  const { analysis, navigate } = useApp();

  if (!analysis) {
    return (
      <div className="max-w-5xl mx-auto p-4 lg:p-8">
        <Card>
          <EmptyState
            icon={FileText}
            title="No Analysis Yet"
            description="Upload your resume or try our demo analysis to see your career insights, skill breakdown, and personalized recommendations."
            actionLabel="Analyze Your Resume"
            onAction={() => navigate('analyzer')}
          />
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: BarChart3, title: 'Skill Analysis', page: 'skills' as Page, desc: 'See your detected skills' },
            { icon: Briefcase, title: 'Career Matches', page: 'careers' as Page, desc: 'Find your best roles' },
            { icon: Compass, title: 'Career Explorer', page: 'explorer' as Page, desc: 'Explore career paths' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                onClick={() => navigate(item.page)}
                className="text-left rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const topMatch = analysis.careerMatches[0];
  const highPriority = analysis.missingSkills.filter((s) => s.priority === 'High');
  const recentSummaries = getAllSummaries().slice(0, 3);

  const quickActions = [
    { icon: FileText, label: 'Analyze New Resume', page: 'analyzer' as Page, color: 'from-blue-500 to-cyan-500' },
    { icon: BarChart3, label: 'View Skills', page: 'skills' as Page, color: 'from-violet-500 to-purple-500' },
    { icon: Briefcase, label: 'Career Matches', page: 'careers' as Page, color: 'from-emerald-500 to-teal-500' },
    { icon: Lightbulb, label: 'Improve Resume', page: 'improvement' as Page, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6">
      {/* Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Here's your latest resume analysis overview
          </p>
        </div>
        <button
          onClick={() => navigate('analyzer')}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 self-start"
        >
          <Sparkles className="w-4 h-4" />
          New Analysis
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Score */}
        <Card hover className="flex flex-col items-center justify-center p-6">
          <CircularProgress value={analysis.overallScore} size={140} strokeWidth={12} label={getScoreLabel(analysis.overallScore)} sublabel="Resume Score" />
        </Card>

        {/* Skills */}
        <Card hover className="p-6">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3">
            <BarChart3 className="w-5 h-5 text-violet-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">{analysis.skillCount}</div>
          <p className="text-sm text-slate-400 mt-1">Skills Detected</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {analysis.detectedSkills.slice(0, 3).map((s) => (
              <span key={s.name} className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-500 text-xs font-medium">
                {s.name}
              </span>
            ))}
            {analysis.detectedSkills.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs">
                +{analysis.detectedSkills.length - 3}
              </span>
            )}
          </div>
        </Card>

        {/* Top Career */}
        <Card hover className="p-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
            <Briefcase className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white">{analysis.topCareer}</div>
          <p className="text-sm text-slate-400 mt-1">Top Career Match</p>
          {topMatch && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400">Match</span>
                <span className="font-semibold text-emerald-500">{topMatch.matchPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 transition-all duration-1000" style={{ width: `${topMatch.matchPercent}%` }} />
              </div>
            </div>
          )}
        </Card>

        {/* Missing Skills */}
        <Card hover className="p-6">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">{highPriority.length}</div>
          <p className="text-sm text-slate-400 mt-1">High-Priority Gaps</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {highPriority.slice(0, 3).map((s) => (
              <span key={s.skill} className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-500 text-xs font-medium">
                {s.skill}
              </span>
            ))}
            {highPriority.length === 0 && (
              <span className="text-xs text-emerald-500">No critical gaps!</span>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => navigate(action.page)}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-left hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{action.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 mt-2 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </button>
          );
        })}
      </div>

      {/* Detail Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Score Breakdown */}
        <Card>
          <CardHeader title="Score Breakdown" subtitle="How you scored across categories" icon={TrendingUp} />
          <div className="p-5 space-y-3">
            {Object.entries(analysis.scoreBreakdown).map(([key, value], i) => (
              <div key={key}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-slate-600 dark:text-slate-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white tabular-nums">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${value}%`,
                      backgroundColor: value >= 70 ? '#10b981' : value >= 50 ? '#3b82f6' : value >= 30 ? '#f59e0b' : '#ef4444',
                      transitionDelay: `${i * 80}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <button
              onClick={() => navigate('skills')}
              className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              View detailed analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>

        {/* Top Careers */}
        <Card>
          <CardHeader title="Career Recommendations" subtitle="Sorted by match percentage" icon={Target} />
          <div className="p-5 space-y-3">
            {analysis.careerMatches.slice(0, 4).map((match) => (
              <div key={match.role.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{match.role.title}</span>
                    <span className="text-sm font-bold tabular-nums" style={{ color: match.matchPercent >= 75 ? '#10b981' : match.matchPercent >= 50 ? '#3b82f6' : '#f59e0b' }}>
                      {match.matchPercent}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${match.matchPercent}%`,
                        backgroundColor: match.matchPercent >= 75 ? '#10b981' : match.matchPercent >= 50 ? '#3b82f6' : '#f59e0b',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <button
              onClick={() => navigate('careers')}
              className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              View all recommendations <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      </div>

      {/* Recent Analyses */}
      {recentSummaries.length > 0 && (
        <Card>
          <CardHeader title="Recent Analyses" subtitle="Your saved analysis history" icon={Award} />
          <div className="p-5">
            <div className="space-y-2">
              {recentSummaries.map((s) => (
                <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.overallScore >= 70 ? '#10b981' : s.overallScore >= 50 ? '#3b82f6' : '#f59e0b'}20` }}>
                    <span className="text-sm font-bold tabular-nums" style={{ color: s.overallScore >= 70 ? '#10b981' : s.overallScore >= 50 ? '#3b82f6' : '#f59e0b' }}>
                      {s.overallScore}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{s.topCareer}</div>
                    <div className="text-xs text-slate-400">{formatDateShort(s.date)} · {s.skillCount} skills</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('history')}
              className="mt-4 text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1"
            >
              View all history <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>
      )}

      {/* Missing Skills Warning */}
      {highPriority.length > 0 && (
        <Card className="border-amber-500/20 bg-amber-500/5">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">High-Priority Missing Skills</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  These skills are commonly required for your top career matches.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {highPriority.map((s) => (
                    <span key={s.skill} className={`px-2.5 py-1 rounded-md border text-xs font-medium ${getPriorityColor(s.priority)}`}>
                      {s.skill}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate('improvement')}
                  className="mt-4 text-sm font-medium text-amber-500 hover:text-amber-600 flex items-center gap-1"
                >
                  See improvement tips <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
