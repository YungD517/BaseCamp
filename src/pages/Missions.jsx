import { useState } from "react";
import MISSIONS from "../constants/missions";
import EXERCISES from "../constants/exercises";
import ProgressBar from "../components/ProgressBar";
import { playBeep } from "../utils/audio";

export default function Missions({ data, setData }) {
  const [activeMission, setActiveMission] = useState(null);
  const progress = data.missionProgress || {};

  function startMission(mission) {
    setActiveMission(mission.id);
    if (!progress[mission.id]) {
      setData({
        ...data,
        missionProgress: {
          ...progress,
          [mission.id]: { currentDay: 1, completedDays: [] },
        },
      });
    }
  }

  function completeDay(missionId, dayNum) {
    const mp = {
      ...(progress[missionId] || { currentDay: 1, completedDays: [] }),
    };
    if (!mp.completedDays.includes(dayNum)) {
      mp.completedDays = [...mp.completedDays, dayNum];
      mp.currentDay = dayNum + 1;
      setData({
        ...data,
        missionProgress: { ...progress, [missionId]: mp },
      });
      playBeep("high");
    }
  }

  function resetMission(missionId) {
    const np = { ...progress };
    delete np[missionId];
    setData({ ...data, missionProgress: np });
    setActiveMission(null);
  }

  const selectedMission = MISSIONS.find((m) => m.id === activeMission);
  const mp = activeMission ? progress[activeMission] : null;

  return (
    <div className="p-4">
      <h2 className="heading">MISSIONS</h2>

      {/* Mission List */}
      {!selectedMission ? (
        <>
          {MISSIONS.map((mission) => {
            const mProgress = progress[mission.id];
            const pct = mProgress
              ? (mProgress.completedDays.length / mission.days.length) * 100
              : 0;

            return (
              <div
                key={mission.id}
                className={`card cursor-pointer transition-colors hover:border-olive/40 ${
                  mProgress ? "!border-olive/30" : ""
                }`}
                onClick={() => startMission(mission)}
              >
                <div className="text-sm font-extrabold text-white tracking-[2px]">
                  {mission.name}
                </div>
                <div className="text-[11px] text-base-dim mt-1">
                  {mission.desc}
                </div>
                <div className="text-[10px] text-olive mt-1.5">
                  {mission.days.length} DAYS
                </div>
                {mProgress && <ProgressBar pct={pct} color="bg-olive" />}
                {mProgress && (
                  <span className="text-[10px] text-base-dim mt-1 block">
                    {mProgress.completedDays.length}/{mission.days.length} days
                    complete
                  </span>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <>
          {/* Active Mission View */}
          <button
            onClick={() => setActiveMission(null)}
            className="btn-sm !text-base-dim !border-base-dim/50 !bg-transparent mb-3"
          >
            ← ALL MISSIONS
          </button>

          <div className="card !border-olive/30">
            <div className="text-sm font-extrabold text-white tracking-[2px]">
              {selectedMission.name}
            </div>
            <div className="text-[11px] text-base-dim mt-1">
              {selectedMission.desc}
            </div>
          </div>

          {/* Day-by-Day Breakdown */}
          {selectedMission.days.map((day) => {
            const done = mp?.completedDays?.includes(day.day);
            const borderLeftColor = done
              ? "border-l-olive/40"
              : day.rest
              ? "border-l-warning/40"
              : "border-l-accent/40";

            return (
              <div
                key={day.day}
                className={`card-alt !border-l-[3px] ${borderLeftColor} ${
                  done ? "opacity-50" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`text-xs font-bold ${
                      done ? "text-olive" : "text-white"
                    }`}
                  >
                    DAY {day.day}
                    {day.rest ? " — REST" : ""}
                  </span>
                  {done ? (
                    <span className="text-[10px] text-olive font-bold">
                      ✓ DONE
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        completeDay(selectedMission.id, day.day)
                      }
                      className="btn-sm"
                    >
                      COMPLETE
                    </button>
                  )}
                </div>
                {!day.rest &&
                  day.exercises?.map((ex, j) => {
                    const exDef = EXERCISES.find((e) => e.id === ex.id);
                    return (
                      <div key={j} className="text-xs text-[#AAA] mt-1">
                        {exDef?.name}: {ex.target}{" "}
                        {exDef?.type === "hold" ? "sec" : "reps"}
                      </div>
                    );
                  })}
              </div>
            );
          })}

          <button
            onClick={() => resetMission(selectedMission.id)}
            className="btn-danger w-full mt-3"
          >
            RESET MISSION
          </button>
        </>
      )}
    </div>
  );
}
