interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  icon?: string;
  delay?: number;
}

export function ProgressBar({
  label,
  value,
  max = 100,
  color = '#3b82f6',
  delay = 0,
}: ProgressBarProps) {
  const percent = Math.min(100, (value / max) * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
          {Math.round(value)}
          <span className="text-slate-400 text-xs ml-0.5">/ {max}</span>
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
            transitionDelay: `${delay}ms`,
            boxShadow: `0 0 8px ${color}50`,
          }}
        />
      </div>
    </div>
  );
}
