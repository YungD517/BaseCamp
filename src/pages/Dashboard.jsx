import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ProgressBar from "../components/ProgressBar";
import StatCard from "../components/StatCard";
import {
  getRank,
  calcPoints,
  getStreak,
  getHeatmapData,
  getWeeklyData,
} from "../utils/helpers";

const tooltipStyle = {
  background: "#111",
  border: "1px solid #2A2A2A",
  color: "#FFF",
  fontFamily: "inherit",
  fontSize: 12,
};

export default function Dashboard({ data }) {
  const pts = calcPoints(data);
  const rank = getRank(pts);
  const streak = getStreak(data.workouts || []);
  const totalWorkouts = (data.workouts || []).length;
  const uniqueDays = new Set((data.workouts || []).map((w) => w.date)).size;
  const heatmap = getHeatmapData(data.workouts || []);
  const weeklyData = getWeeklyData(data.workouts || []);

  return (
    <div className="p-4">
      {/* Rank Display */}
      <div className="card text-center !p-6 !border-accent/20">
        <span className="label">CURRENT RANK</span>
        <div className="text-[28px] text-accent my-2 tracking-[4px]">
          {rank.icon}
        </div>
        <div className="text-[22px] font-black text-white tracking-[4px] uppercase">
          {rank.name}
        </div>
        <ProgressBar pct={rank.progress} />
        <div className="text-[10px] text-base-dim mt-1.5">
          {rank.next
            ? `${pts} / ${rank.next.min} XP → ${rank.next.name}`
            : `${pts} XP — MAX RANK`}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="STREAK" value={`${streak}D`} sub="consecutive" />
        <StatCard
          label="TOTAL"
          value={totalWorkouts}
          sub="workouts"
          colorClass="text-olive"
        />
        <StatCard
          label="ACTIVE"
          value={uniqueDays}
          sub="days"
          colorClass="text-warning"
        />
      </div>

      {/* 12-Week Heatmap */}
      <div className="card">
        <span className="label">12-WEEK ACTIVITY</span>
        <div className="grid grid-cols-12 gap-[3px] mt-2.5">
          {heatmap.map((d, i) => (
            <div
              key={i}
              title={`${d.date}: ${d.count} workout${d.count !== 1 ? "s" : ""}`}
              className="aspect-square rounded-sm"
              style={{
                background:
                  d.count === 0
                    ? "#1A1A1A"
                    : d.count === 1
                    ? "rgba(57,255,20,0.25)"
                    : d.count === 2
                    ? "rgba(57,255,20,0.5)"
                    : "#39FF14",
              }}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-2 items-center justify-end">
          <span className="text-[9px] text-base-dim">LESS</span>
          {[0, 1, 2, 3].map((v) => (
            <div
              key={v}
              className="w-2.5 h-2.5 rounded-sm"
              style={{
                background:
                  v === 0
                    ? "#1A1A1A"
                    : v === 1
                    ? "rgba(57,255,20,0.25)"
                    : v === 2
                    ? "rgba(57,255,20,0.5)"
                    : "#39FF14",
              }}
            />
          ))}
          <span className="text-[9px] text-base-dim">MORE</span>
        </div>
      </div>

      {/* Weekly Volume Chart */}
      <div className="card">
        <span className="label">WEEKLY VOLUME</span>
        <div className="mt-2.5 h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis
                dataKey="week"
                tick={{ fill: "#555", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={tooltipStyle}
                cursor={{ fill: "rgba(57,255,20,0.05)" }}
              />
              <Bar dataKey="count" fill="#39FF14" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
