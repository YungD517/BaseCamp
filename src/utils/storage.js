const STORAGE_KEY = "basecamp-data";

const DEFAULT_DATA = {
  workouts: [],
  prs: {},
  metrics: [],
  missionProgress: {},
  timerPresets: { roundMin: 3, restMin: 1, rounds: 3 },
};

/**
 * Load all BaseCamp data from localStorage.
 * Returns merged defaults + stored data.
 */
export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_DATA, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error("Failed to load BaseCamp data:", e);
  }
  return { ...DEFAULT_DATA };
}

/**
 * Save all BaseCamp data to localStorage.
 */
export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save BaseCamp data:", e);
  }
}

/**
 * Clear all BaseCamp data (factory reset).
 */
export function clearData() {
  localStorage.removeItem(STORAGE_KEY);
}

export { DEFAULT_DATA };
