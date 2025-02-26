import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EXERCISES from "../constants/exercises";

const tooltipStyle = {
  background: "#111",
  border: "1px solid #2A2A2A",
  color: "#FFF",
  fontFamily: "inherit",
  fontSize: 12,
};

export default function PRVault({ data }) {
  const prs = data.prs || {};
  const hasPRs = Object.values(prs).some((v) => v > 0);

  return (
    <div className="p-4">
      <h2 className="heading">PR VAULT</h2>
      <p className="text-[11px] text-base-dim mb-4">
        Personal records update automatically when you log workouts that beat
        your previous best.
      </p>

      {/* PR Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {EXERCISES.map((ex) => {
          const val = prs[ex.id] || 0;
          return (
            <div key={ex.id} className="frost text-center">
              <span className="label !text-[9px]">{ex.name}</span>
              <div
                className={`text-[32px] font-black my-1.5 font-mono ${
                  val > 0 ? "text-accent" : "text-[#333]"
                }`}
              >
                {val > 0 ? val : "—"}
              </div>
              <span className="text-[10px] text-base-dim">
                {ex.type === "hold" ? "sec hold" : "total reps"}
              </span>
            </div>
          );
        })}
      </div>

      {/* PR Comparison Chart */}
      {hasPRs && (
        <div className="card mt-4">
          <span className="label">PR COMPARISON</span>
          <div className="h-[180px] mt-2.5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={EXERCISES.map((ex) => ({
                  name: ex.name.slice(0, 6),
                  value: prs[ex.id] || 0,
                }))}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#555", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "rgba(57,255,20,0.05)" }}
                />
                <Bar dataKey="value" fill="#39FF14" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
