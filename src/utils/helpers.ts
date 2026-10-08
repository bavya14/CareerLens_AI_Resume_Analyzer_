export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Needs Work';
}

export function getPriorityColor(priority: 'High' | 'Medium' | 'Low'): string {
  switch (priority) {
    case 'High': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'Low': return 'text-sky-400 bg-sky-500/10 border-sky-500/20';
  }
}

export function getMatchColor(match: number): string {
  if (match >= 75) return '#10b981';
  if (match >= 50) return '#3b82f6';
  if (match >= 25) return '#f59e0b';
  return '#ef4444';
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + '...';
}

export function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
