export default function StatCard({ label, value, sub, colorClass = "text-accent" }) {
  return (
    <div className="card">
      <span className="label">{label}</span>
      <div className={`big-num ${colorClass}`}>{value}</div>
      {sub && (
        <span className="text-[11px] text-base-dim mt-1 block">{sub}</span>
      )}
    </div>
  );
}
