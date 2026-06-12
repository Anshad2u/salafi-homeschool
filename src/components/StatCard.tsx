interface StatCardProps {
  value: string | number;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat">
      <div className="big">{value}</div>
      <div className="lbl">{label}</div>
    </div>
  );
}
