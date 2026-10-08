import { History, Trash2, Eye, Award, Briefcase, BarChart3, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/hooks/useApp';
import { Card, CardHeader } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { getAllSummaries, deleteAnalysis, clearAllHistory, getAnalysis } from '@/services/storage';
import { formatDate, getScoreColor, getScoreLabel } from '@/utils/helpers';
import type { AnalysisSummary } from '@/types';

export function HistoryPage() {
  const { setAnalysis, navigate, showToast } = useApp();
  const [summaries, setSummaries] = useState<AnalysisSummary[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [clearAll, setClearAll] = useState(false);

  const refresh = () => setSummaries(getAllSummaries());

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = () => {
    if (deleteId) {
      deleteAnalysis(deleteId);
      refresh();
      showToast('success', 'Analysis deleted successfully.');
      setDeleteId(null);
    }
  };

  const handleClearAll = () => {
    clearAllHistory();
    refresh();
    showToast('success', 'All history cleared.');
    setClearAll(false);
  };

  const handleView = (id: string) => {
    const analysis = getAnalysis(id);
    if (analysis) {
      setAnalysis(analysis);
      navigate('dashboard');
      showToast('info', 'Loaded analysis from history.');
    } else {
      showToast('error', 'Could not load analysis data.');
    }
  };

  if (summaries.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-4 lg:p-8">
        <Card>
          <EmptyState
            icon={History}
            title="No Analysis History"
            description="Your analyzed resumes will appear here. Each analysis is saved locally on your device for future reference."
            actionLabel="Analyze Resume"
            onAction={() => navigate('analyzer')}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Analysis History</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {summaries.length} saved {summaries.length === 1 ? 'analysis' : 'analyses'}
          </p>
        </div>
        <button
          onClick={() => setClearAll(true)}
          className="px-4 py-2 rounded-lg border border-rose-500/20 text-rose-500 text-sm font-medium hover:bg-rose-500/10 transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {summaries.map((s, i) => {
          const color = getScoreColor(s.overallScore);
          return (
            <Card key={s.id} hover className="p-4 animate-slide-up" >
              <div style={{ animationDelay: `${i * 40}ms` }} className="flex items-center gap-4 flex-wrap">
                {/* Score Badge */}
                <div className="flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <div className="text-center">
                      <div className="text-xl font-bold tabular-nums" style={{ color }}>{s.overallScore}</div>
                      <div className="text-[9px] text-slate-400">/ 100</div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900 dark:text-white">{s.topCareer}</span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {getScoreLabel(s.overallScore)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(s.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5" />
                      {s.skillCount} skills
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      Top match
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleView(s.id)}
                    className="px-3 py-2 rounded-lg bg-blue-500/10 text-blue-500 text-sm font-medium hover:bg-blue-500/20 transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => setDeleteId(s.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Analysis?"
        message="This will permanently remove this analysis from your history. This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <ConfirmDialog
        open={clearAll}
        title="Clear All History?"
        message="This will permanently remove all saved analyses from your device. This action cannot be undone."
        confirmLabel="Clear All"
        onConfirm={handleClearAll}
        onCancel={() => setClearAll(false)}
      />
    </div>
  );
}
