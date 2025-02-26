import { useState, useEffect, useRef } from "react";
import ProgressBar from "../components/ProgressBar";
import { formatTime } from "../utils/helpers";
import { ensureAudio, playBeep } from "../utils/audio";

export default function CombatTimer({ data, setData }) {
  const [roundMin, setRoundMin] = useState(data.timerPresets?.roundMin || 3);
  const [restMin, setRestMin] = useState(data.timerPresets?.restMin || 1);
  const [totalRounds, setTotalRounds] = useState(data.timerPresets?.rounds || 3);

  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle | fight | rest | done
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const intervalRef = useRef(null);

  function startTimer() {
    ensureAudio();
    setPhase("fight");
    setCurrentRound(1);
    setTimeLeft(roundMin * 60);
    setRunning(true);
    setPaused(false);
    setData({
      ...data,
      timerPresets: { roundMin, restMin, rounds: totalRounds },
    });
  }

  function togglePause() {
    setPaused(!paused);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setRunning(false);
    setPaused(false);
    setPhase("idle");
    setCurrentRound(1);
    setTimeLeft(0);
  }

  useEffect(() => {
    if (running && !paused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (phase === "fight") {
              if (currentRound >= totalRounds) {
                clearInterval(intervalRef.current);
                setPhase("done");
                setRunning(false);
                playBeep("low");
                return 0;
              }
              setPhase("rest");
              playBeep("low");
              return restMin * 60;
            } else if (phase === "rest") {
              setPhase("fight");
              setCurrentRound((r) => r + 1);
              playBeep("high");
              return roundMin * 60;
            }
          }
          if (prev === 4) playBeep("mid");
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, paused, phase, currentRound, totalRounds, roundMin, restMin]);

  const accentColor =
    phase === "fight"
      ? "text-accent"
      : phase === "rest"
      ? "text-combat"
      : phase === "done"
      ? "text-olive"
      : "text-base-dim";

  const borderColor =
    phase === "fight"
      ? "border-accent/30"
      : phase === "rest"
      ? "border-combat/30"
      : phase === "done"
      ? "border-olive/30"
      : "border-base-border";

  const bgTint =
    phase === "fight"
      ? "bg-accent/5"
      : phase === "rest"
      ? "bg-combat/5"
      : phase === "done"
      ? "bg-olive/5"
      : "";

  const phaseLabel =
    phase === "fight"
      ? "FIGHT"
      : phase === "rest"
      ? "REST"
      : phase === "done"
      ? "COMPLETE"
      : "READY";

  const pct =
    phase === "fight"
      ? (timeLeft / (roundMin * 60)) * 100
      : phase === "rest"
      ? (timeLeft / (restMin * 60)) * 100
      : 0;

  const progressColor =
    phase === "fight" ? "bg-accent" : phase === "rest" ? "bg-combat" : "bg-olive";

  return (
    <div className="p-4">
      <h2 className="heading">COMBAT TIMER</h2>

      {/* Timer Display */}
      <div
        className={`card text-center !p-8 ${bgTint} !${borderColor} transition-all duration-500`}
      >
        <span
          className={`text-[11px] tracking-[4px] font-extrabold ${accentColor}`}
        >
          {phaseLabel}
        </span>
        <div
          className={`text-7xl font-black font-mono leading-none my-3 transition-colors duration-500 ${accentColor}`}
        >
          {phase === "idle" ? formatTime(roundMin * 60) : formatTime(timeLeft)}
        </div>
        {running && (
          <span className="text-[13px] text-base-dim">
            ROUND {currentRound} / {totalRounds}
          </span>
        )}
        {running && (
          <div className="mt-4 w-full">
            <ProgressBar pct={pct} color={progressColor} />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        {!running ? (
          <button onClick={startTimer} className="btn-primary flex-1">
            START
          </button>
        ) : (
          <>
            <button
              onClick={togglePause}
              className={`flex-1 py-2.5 px-5 border font-mono text-xs font-bold uppercase tracking-[2px] cursor-pointer transition-all ${
                paused
                  ? "bg-accent/10 border-accent text-accent"
                  : "bg-warning/10 border-warning text-warning"
              }`}
            >
              {paused ? "RESUME" : "PAUSE"}
            </button>
            <button onClick={resetTimer} className="btn-danger flex-1">
              RESET
            </button>
          </>
        )}
      </div>

      {/* Settings */}
      {!running && (
        <div className="card-alt">
          <span className="label">CONFIGURE</span>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <span className="label !text-[9px]">ROUND (MIN)</span>
              <input
                type="number"
                value={roundMin}
                onChange={(e) => setRoundMin(Math.max(1, Number(e.target.value)))}
                className="input-field"
                min="1"
              />
            </div>
            <div>
              <span className="label !text-[9px]">REST (MIN)</span>
              <input
                type="number"
                value={restMin}
                onChange={(e) =>
                  setRestMin(Math.max(0.5, Number(e.target.value)))
                }
                className="input-field"
                min="0.5"
                step="0.5"
              />
            </div>
            <div>
              <span className="label !text-[9px]">ROUNDS</span>
              <input
                type="number"
                value={totalRounds}
                onChange={(e) =>
                  setTotalRounds(Math.max(1, Number(e.target.value)))
                }
                className="input-field"
                min="1"
              />
            </div>
          </div>
        </div>
      )}

      {/* Completion Card */}
      {phase === "done" && (
        <div className="card text-center !border-olive/30">
          <div className="text-2xl text-olive font-black">MISSION COMPLETE</div>
          <div className="text-xs text-base-dim mt-1">
            {totalRounds} rounds × {roundMin}min — solid work.
          </div>
        </div>
      )}
    </div>
  );
}
