export default function ProgressBar({ pct, color = "bg-accent" }) {
  return (
    <div className="h-1 bg-base-border relative overflow-hidden mt-1.5">
      <div
        className={`absolute left-0 top-0 h-full transition-all duration-500 ease-out ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
