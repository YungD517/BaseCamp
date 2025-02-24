import RANKS from "../constants/ranks";

/**
 * Get today's date as YYYY-MM-DD string.
 */
export function today() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Generate a unique ID.
 */
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/**
 * Format seconds into MM:SS display.
 */
export function formatTime(s) {
  const mins = String(Math.floor(s / 60)).padStart(2, "0");
  const secs = String(s % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

/**
 * Calculate rank from total XP points.
 * Returns the current rank object with progress percentage toward next rank.
 */
export function getRank(points) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (points >= r.min) rank = r;
  }
  const idx = RANKS.indexOf(rank);
  const next = RANKS[idx + 1];
  const progress = next
    ? ((points - rank.min) / (next.min - rank.min)) * 100
    : 100;

  return { ...rank, progress: Math.min(progress, 100), next, idx };
}

/**
 * Calculate total XP from all tracked data.
 */
export function calcPoints(data) {
  let pts = 0;

  // Each workout = 10 XP
  pts += (data.workouts || []).length * 10;

  // Each PR set = 15 XP
  Object.values(data.prs || {}).forEach((v) => {
    if (v > 0) pts += 15;
  });

  // Streak milestones
  const uniqueDays = new Set((data.workouts || []).map((w) => w.date));
  if (uniqueDays.size >= 7) pts += 50;
  if (uniqueDays.size >= 30) pts += 150;
  if (uniqueDays.size >= 60) pts += 300;

  // Mission day completions = 8 XP each
  Object.values(data.missionProgress || {}).forEach((m) => {
    pts += (m.completedDays || []).length * 8;
  });

  return pts;
}

/**
 * Calculate current consecutive day streak.
 */
export function getStreak(workouts) {
  if (!workouts.length) return 0;

  const dates = [...new Set(workouts.map((w) => w.date))].sort().reverse();
  let streak = 0;
  const d = new Date();

  for (let i = 0; i < 365; i++) {
    const check = d.toISOString().slice(0, 10);
    if (dates.includes(check)) {
      streak++;
    } else if (i > 0) {
      break;
    }
    d.setDate(d.getDate() - 1);
  }

  return streak;
}

/**
 * Generate 84-day (12-week) heatmap data array.
 */
export function getHeatmapData(workouts) {
  const map = {};
  (workouts || []).forEach((w) => {
    map[w.date] = (map[w.date] || 0) + 1;
  });

  const days = [];
  const d = new Date();
  for (let i = 83; i >= 0; i--) {
    const nd = new Date(d);
    nd.setDate(nd.getDate() - i);
    const ds = nd.toISOString().slice(0, 10);
    days.push({ date: ds, count: map[ds] || 0, dow: nd.getDay() });
  }

  return days;
}

/**
 * Generate weekly volume data for the bar chart (last 8 weeks).
 */
export function getWeeklyData(workouts) {
  const data = [];
  const now = new Date();

  for (let i = 7; i >= 0; i--) {
    const start = new Date(now);
    start.setDate(start.getDate() - i * 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const count = (workouts || []).filter((w) => {
      const wd = new Date(w.date);
      return wd >= start && wd < end;
    }).length;

    data.push({ week: `W${8 - i}`, count });
  }

  return data;
}
