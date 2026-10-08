import {
  LayoutDashboard, FileText, BarChart3, Briefcase, Lightbulb,
  Compass, History, Settings, Eye, EyeOff, X,
} from 'lucide-react';
import type { Page } from '@/types';
import { useApp } from '@/hooks/useApp';

interface NavItem {
  page: Page;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { page: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { page: 'analyzer', label: 'Resume Analyzer', icon: FileText },
  { page: 'skills', label: 'Skill Analysis', icon: BarChart3 },
  { page: 'careers', label: 'Career Recommendations', icon: Briefcase },
  { page: 'improvement', label: 'Resume Improvement', icon: Lightbulb },
  { page: 'explorer', label: 'Career Explorer', icon: Compass },
  { page: 'history', label: 'Analysis History', icon: History },
  { page: 'settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { currentPage, navigate, theme, toggleTheme } = useApp();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 z-40 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => navigate('landing')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="block font-bold text-slate-900 dark:text-white text-lg leading-none">CareerLens</span>
              <span className="block text-[10px] text-slate-400 mt-0.5">AI Resume Analyzer</span>
            </div>
          </button>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => {
                  navigate(item.page);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${active ? 'text-blue-500 dark:text-blue-400' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <span className="flex items-center gap-3">
              {theme === 'dark' ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
            <div className={`w-9 h-5 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-blue-500' : 'bg-slate-300'}`}>
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0.5'}`}
              />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
