import { createContext, useContext } from 'react';
import type { ResumeAnalysis, ToastType } from '@/types';

export interface AppContextValue {
  analysis: ResumeAnalysis | null;
  setAnalysis: (a: ResumeAnalysis | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (v: boolean) => void;
  showToast: (type: ToastType, message: string) => void;
  navigate: (page: import('@/types').Page) => void;
  currentPage: import('@/types').Page;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
