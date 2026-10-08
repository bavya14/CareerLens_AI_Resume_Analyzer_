import { Menu, Eye } from 'lucide-react';
import { useApp } from '@/hooks/useApp';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { navigate } = useApp();

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('landing')}
            className="flex items-center gap-2 lg:hidden"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">CareerLens</span>
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm font-medium text-slate-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
          </div>
        </div>
        <button
          onClick={() => navigate('analyzer')}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Analyze Resume
        </button>
      </div>
    </header>
  );
}
