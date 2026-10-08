import type { ToastType } from '@/types';

export const TOAST_ICONS: Record<ToastType, string> = {
  success: 'CheckCircle2',
  error: 'XCircle',
  info: 'Info',
  warning: 'AlertTriangle',
};

export const TOAST_COLORS: Record<ToastType, string> = {
  success: 'text-emerald-400',
  error: 'text-rose-400',
  info: 'text-sky-400',
  warning: 'text-amber-400',
};
