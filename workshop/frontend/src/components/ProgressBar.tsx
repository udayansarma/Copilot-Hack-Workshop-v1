interface Props {
  completed: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ completed, total, label }: Props) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-github-muted">{label || 'Progress'}</span>
        <span className="text-github-text font-medium">
          {completed}/{total} ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-github-border rounded-full overflow-hidden">
        <div
          className="h-full bg-github-green rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
