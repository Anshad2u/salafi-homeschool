interface ProgressBarProps {
  percent: number | null;
  className?: string;
}

export default function ProgressBar({ percent, className }: ProgressBarProps) {
  const pct = percent ?? 0;

  return (
    <div className={`progress${className ? " " + className : ""}`}>
      <div
        className="progress-fill"
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}
