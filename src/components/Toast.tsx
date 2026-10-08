import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { Toast as ToastType } from '@/types';
import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: 'border-emerald-500/30 text-emerald-400',
  error: 'border-rose-500/30 text-rose-400',
  info: 'border-sky-500/30 text-sky-400',
  warning: 'border-amber-500/30 text-amber-400',
};

export function ToastContainer({ toasts, onDismiss }: { toasts: ToastType[]; onDismiss: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        return (
          <ToastItem key={toast.id} toast={toast} Icon={Icon} onDismiss={onDismiss} />
        );
      })}
    </div>
  );
}

function ToastItem({
  toast,
  Icon,
  onDismiss,
}: {
  toast: ToastType;
  Icon: typeof CheckCircle2;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border bg-slate-900/95 dark:bg-slate-900/95 backdrop-blur px-4 py-3 shadow-xl animate-toast-in ${colorMap[toast.type]}`}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-white flex-1">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
