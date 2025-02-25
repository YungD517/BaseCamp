import { useState } from "react";
import EXERCISES from "../constants/exercises";
import { today, uid } from "../utils/helpers";
import { playBeep } from "../utils/audio";

export default function WorkoutLogger({ data, setData }) {
  const [entries, setEntries] = useState([
    { exerciseId: "pushups", value: "", sets: 1 },
  ]);
  const [isRest, setIsRest] = useState(false);
  const [saved, setSaved] = useState(false);

  function addEntry() {
    setEntries([...entries, { exerciseId: "pushups", value: "", sets: 1 }]);
  }

  function removeEntry(i) {
    if (entries.length > 1) setEntries(entries.filter((_, idx) => idx !== i));
  }

  function updateEntry(i, field, val) {
    const n = [...entries];
    n[i] = { ...n[i], [field]: val };
    setEntries(n);
  }

  function logWorkout() {
    if (isRest) {
      const workout = { id: uid(), date: today(), restDay: true, exercises: [] };
      setData({
        ...data,
        workouts: [...(data.workouts || []), workout],
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return;
    }

    const valid = entries.filter((e) => e.value && Number(e.value) > 0);
    if (!valid.length) return;

    const exercises = valid.map((e) => ({
      id: e.exerciseId,
      value: Number(e.value),
      sets: Number(e.sets) || 1,
    }));

    const workout = { id: uid(), date: today(), restDay: false, exercises };

    // Auto-update PRs
    const newPrs = { ...(data.prs || {}) };
    exercises.forEach((ex) => {
      const exDef = EXERCISES.find((e) => e.id === ex.id);
      if (exDef?.type === "hold") {
        if (!newPrs[ex.id] || ex.value > newPrs[ex.id]) {
          newPrs[ex.id] = ex.value;
        }
      } else {
        const total = ex.value * ex.sets;
        if (!newPrs[ex.id] || total > newPrs[ex.id]) {
          newPrs[ex.id] = total;
        }
      }
    });

    setData({
      ...data,
      workouts: [...(data.workouts || []), workout],
      prs: newPrs,
    });

    setEntries([{ exerciseId: "pushups", value: "", sets: 1 }]);
    setSaved(true);
    playBeep("mid");
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-4">
      <h2 className="heading">LOG WORKOUT</h2>

      {/* Rest Day Toggle */}
      <div
        onClick={() => setIsRest(!isRest)}
        className={`card-alt flex items-center gap-3 cursor-pointer ${
          isRest ? "!border-warning" : ""
        }`}
      >
        <div
          className={`w-[18px] h-[18px] border-2 flex items-center justify-center text-xs font-black ${
            isRest
              ? "border-warning bg-warning text-black"
              : "border-base-dim bg-transparent"
          }`}
        >
          {isRest && "✓"}
        </div>
        <div>
          <div
            className={`text-xs font-bold ${
              isRest ? "text-warning" : "text-[#999]"
            }`}
          >
            REST DAY
          </div>
          <div className="text-[10px] text-base-dim">
            Mark today as active recovery
          </div>
        </div>
      </div>

      {/* Exercise Entries */}
      {!isRest &&
        entries.map((entry, i) => {
          const exDef = EXERCISES.find((e) => e.id === entry.exerciseId);
          return (
            <div key={i} className="card-alt !border-l-[3px] !border-l-accent/30">
              <div className="flex gap-2 mb-2.5 items-center">
                <span className="label !mb-0 flex-1">EXERCISE {i + 1}</span>
                {entries.length > 1 && (
                  <button
                    onClick={() => removeEntry(i)}
                    className="py-1 px-2 bg-combat/10 border border-combat/50 text-combat font-mono text-[10px] font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <select
                value={entry.exerciseId}
                onChange={(e) => updateEntry(i, "exerciseId", e.target.value)}
                className="input-field mb-2 cursor-pointer"
              >
                {EXERCISES.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name} ({ex.type === "hold" ? "timed hold" : "reps"})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="label !text-[9px]">
                    {exDef?.type === "hold" ? "SECONDS" : "REPS"}
                  </span>
                  <input
                    type="number"
                    value={entry.value}
                    onChange={(e) => updateEntry(i, "value", e.target.value)}
                    placeholder={exDef?.type === "hold" ? "60" : "20"}
                    className="input-field"
                    min="0"
                  />
                </div>
                <div>
                  <span className="label !text-[9px]">SETS</span>
                  <input
                    type="number"
                    value={entry.sets}
                    onChange={(e) => updateEntry(i, "sets", e.target.value)}
                    placeholder="3"
                    className="input-field"
                    min="1"
                  />
                </div>
              </div>
            </div>
          );
        })}

      {!isRest && (
        <button onClick={addEntry} className="btn-ghost w-full mb-3">
          + ADD EXERCISE
        </button>
      )}

      <button onClick={logWorkout} className="btn-primary w-full mb-2">
        {saved ? "✓ LOGGED" : isRest ? "LOG REST DAY" : "LOG WORKOUT"}
      </button>

      {/* Recent Workouts */}
      <h2 className="heading mt-6">RECENT OPS</h2>
      {(data.workouts || []).length === 0 && (
        <p className="text-xs text-base-dim">No workouts logged yet. Get moving, soldier.</p>
      )}
      {(data.workouts || [])
        .slice(-5)
        .reverse()
        .map((w) => (
          <div
            key={w.id}
            className={`card-alt ${w.restDay ? "opacity-60" : ""}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-base-dim">{w.date}</span>
              {w.restDay ? (
                <span className="text-[11px] text-warning font-bold">
                  REST DAY
                </span>
              ) : (
                <span className="text-[11px] text-accent">
                  {w.exercises?.length || 0} exercises
                </span>
              )}
            </div>
            {!w.restDay &&
              w.exercises?.map((ex, j) => {
                const exDef = EXERCISES.find((e) => e.id === ex.id);
                return (
                  <div key={j} className="text-xs text-[#CCC] mt-1">
                    {exDef?.name || ex.id}: {ex.value}
                    {exDef?.type === "hold" ? "s" : ""} × {ex.sets} set
                    {ex.sets > 1 ? "s" : ""}
                  </div>
                );
              })}
          </div>
        ))}
    </div>
  );
}
