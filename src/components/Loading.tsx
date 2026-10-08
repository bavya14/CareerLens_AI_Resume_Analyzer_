export function LoadingSpinner({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-v-violet-500 animate-spin" />
      </div>
      {label && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 animate-pulse">{label}</p>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 animate-pulse">
      <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
      <div className="space-y-3">
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-4/6 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
