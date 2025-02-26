import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { today, uid } from "../utils/helpers";

const FIELDS = [
  { key: "weight", label: "WEIGHT", unit: "kg" },
  { key: "bodyFat", label: "BODY FAT", unit: "%" },
  { key: "chest", label: "CHEST", unit: "cm" },
  { key: "waist", label: "WAIST", unit: "cm" },
  { key: "arms", label: "ARMS", unit: "cm" },
];

const tooltipStyle = {
  background: "#111",
  border: "1px solid #2A2A2A",
  color: "#FFF",
  fontFamily: "inherit",
  fontSize: 12,
};

export default function BodyMetrics({ data, setData }) {
  const [form, setForm] = useState({
    weight: "",
    bodyFat: "",
    chest: "",
    waist: "",
    arms: "",
  });
  const [saved, setSaved] = useState(false);

  const metrics = data.metrics || [];

  function logMetrics() {
    const hasData = Object.values(form).some((v) => v && Number(v) > 0);
    if (!hasData) return;

    const entry = { id: uid(), date: today() };
    Object.entries(form).forEach(([k, v]) => {
      if (v && Number(v) > 0) entry[k] = Number(v);
    });

    setData({
      ...data,
      metrics: [...metrics, entry],
    });

    setForm({ weight: "", bodyFat: "", chest: "", waist: "", arms: "" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const weightData = metrics.filter((m) => m.weight);

  return (
    <div className="p-4">
      <h2 className="heading">BODY METRICS</h2>

      {/* Input Form */}
      <div className="card-alt">
        <span className="label">LOG MEASUREMENTS</span>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <span className="label !text-[9px]">
                {f.label} ({f.unit})
              </span>
              <input
                type="number"
                value={form[f.key]}
                onChange={(e) =>
                  setForm({ ...form, [f.key]: e.target.value })
                }
                placeholder="0"
                className="input-field"
                min="0"
                step="0.1"
              />
            </div>
          ))}
        </div>
        <button onClick={logMetrics} className="btn-primary w-full mt-3">
          {saved ? "✓ SAVED" : "LOG METRICS"}
        </button>
      </div>

      {/* Weight Trend Chart */}
      {weightData.length > 1 && (
        <div className="card mt-3">
          <span className="label">WEIGHT TREND</span>
          <div className="h-[160px] mt-2.5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightData.slice(-20)}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#555", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#39FF14"
                  fill="rgba(57,255,20,0.12)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      {metrics.length > 0 && (
        <>
          <h2 className="heading mt-5">RECENT ENTRIES</h2>
          {metrics
            .slice(-5)
            .reverse()
            .map((m) => (
              <div key={m.id} className="card-alt">
                <span className="text-[10px] text-base-dim">{m.date}</span>
                <div className="flex flex-wrap gap-2.5 mt-1.5">
                  {FIELDS.map((f) =>
                    m[f.key] ? (
                      <span key={f.key} className="text-xs">
                        <span className="text-base-dim">{f.label}:</span>{" "}
                        <span className="text-accent font-bold">
                          {m[f.key]}
                          {f.unit}
                        </span>
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
