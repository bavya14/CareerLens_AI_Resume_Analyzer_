import type { AnalysisSummary, ResumeAnalysis } from '@/types';

const STORAGE_KEY = 'careerlens_history';
const THEME_KEY = 'careerlens_theme';

export function saveAnalysis(analysis: ResumeAnalysis): void {
  try {
    const existing = getAllSummaries();
    const summary: AnalysisSummary = {
      id: analysis.id,
      date: analysis.date,
      overallScore: analysis.overallScore,
      topCareer: analysis.topCareer,
      skillCount: analysis.skillCount,
    };
    const updated = [summary, ...existing].slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(`${STORAGE_KEY}_${analysis.id}`, JSON.stringify(analysis));
  } catch (e) {
    console.error('Failed to save analysis:', e);
  }
}

export function getAllSummaries(): AnalysisSummary[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getAnalysis(id: string): ResumeAnalysis | null {
  try {
    const data = localStorage.getItem(`${STORAGE_KEY}_${id}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function deleteAnalysis(id: string): void {
  try {
    const summaries = getAllSummaries().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(summaries));
    localStorage.removeItem(`${STORAGE_KEY}_${id}`);
  } catch (e) {
    console.error('Failed to delete analysis:', e);
  }
}

export function clearAllHistory(): void {
  try {
    const summaries = getAllSummaries();
    summaries.forEach((s) => localStorage.removeItem(`${STORAGE_KEY}_${s.id}`));
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

export function getTheme(): 'light' | 'dark' {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'light' || theme === 'dark') return theme;
  } catch {
    // ignore
  }
  return 'dark';
}

export function setTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}
