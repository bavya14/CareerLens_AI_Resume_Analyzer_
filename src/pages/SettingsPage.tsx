import { Settings as SettingsIcon, Moon, Sun, Trash2, Info, Shield, Database, Github } from 'lucide-react';
import { useApp } from '@/hooks/useApp';
import { Card, CardHeader } from '@/components/Card';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { getAllSummaries, clearAllHistory } from '@/services/storage';
import { useState } from 'react';

export function SettingsPage() {
  const { theme, toggleTheme, showToast } = useApp();
  const [clearAll, setClearAll] = useState(false);
  const count = getAllSummaries().length;

  const handleClearAll = () => {
    clearAllHistory();
    showToast('success', 'All analysis history cleared.');
    setClearAll(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Customize your CareerLens experience</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader title="Appearance" subtitle="Customize how CareerLens looks" icon={SettingsIcon} />
        <div className="p-5">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-violet-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <div className="font-medium text-slate-900 dark:text-white text-sm">Theme</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Currently using {theme === 'dark' ? 'Dark' : 'Light'} mode
                </div>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-blue-500' : 'bg-slate-300'}`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader title="Data Management" subtitle="Manage your locally stored data" icon={Database} />
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="font-medium text-slate-900 dark:text-white text-sm">Saved Analyses</div>
              <div className="text-xs text-slate-400 mt-0.5">{count} analyses stored on this device</div>
            </div>
            <button
              onClick={() => setClearAll(true)}
              disabled={count === 0}
              className="px-3 py-2 rounded-lg border border-rose-500/20 text-rose-500 text-sm font-medium hover:bg-rose-500/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader title="Privacy" subtitle="How your data is handled" icon={Shield} />
        <div className="p-5">
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <p>All resume analysis happens entirely in your browser. No data is sent to any server.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Database className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p>Your analysis history is stored locally using your browser's LocalStorage. Clearing your browser data will remove all saved analyses.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
              <p>No accounts, no authentication, no tracking. CareerLens is 100% client-side.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* About */}
      <Card>
        <CardHeader title="About" subtitle="Project information" icon={Info} />
        <div className="p-5">
          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p><strong className="text-slate-900 dark:text-white">CareerLens</strong> — AI Resume Analyzer & Career Recommendation System</p>
            <p>A Web Technology project that uses local rule-based algorithms and keyword matching to analyze resumes and recommend career paths.</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
              <Github className="w-4 h-4" />
              <span>Built with React, Vite, TypeScript, Tailwind CSS, Recharts</span>
            </div>
          </div>
        </div>
      </Card>

      <ConfirmDialog
        open={clearAll}
        title="Clear All Analysis History?"
        message={`This will permanently remove all ${count} saved analyses from your device. This action cannot be undone.`}
        confirmLabel="Clear All"
        onConfirm={handleClearAll}
        onCancel={() => setClearAll(false)}
      />
    </div>
  );
}
