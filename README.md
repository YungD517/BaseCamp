# BASECAMP — Military Calisthenics Tracker

> Rugged. Tactical. No excuses.

A dark-mode, military-themed calisthenics tracker built with React, Vite, and Tailwind CSS. Track workouts, break PRs, run combat timers, follow structured missions, and rank up from Recruit to General.

![Built by YungD](https://img.shields.io/badge/Built%20by-YungD-39FF14?style=flat-square&labelColor=0A0A0A)

---

## Features

### HQ — Dashboard
- Military rank system (Recruit → General) based on XP earned from workouts, PRs, streaks, and mission completions
- Consecutive day streak counter
- 12-week activity heatmap (GitHub contribution style)
- Weekly workout volume bar chart

### LOG — Workout Logger
- Log standard calisthenics: Push-ups, Pull-ups, Sit-ups, Squats, Burpees
- Log timed holds: Plank, L-Sit, Wall Sit
- Multi-exercise entries with sets tracking
- Rest day toggle for active recovery
- Auto-updates Personal Records when you beat your best

### TIMER — Combat/Boxing Timer
- Configurable round duration, rest duration, and number of rounds
- Visual color shifts: green (fight), red (rest), olive (complete)
- Audio beeps on phase transitions and 3-second countdown
- Start / Pause / Resume / Reset controls

### PRs — Personal Records Vault
- Frosted-glass card display for all exercises
- Auto-populated from workout logs
- Bar chart comparison across exercises

### BODY — Body Metrics Tracker
- Track weight, body fat %, chest, waist, and arm measurements
- Weight trend line chart (appears after 2+ entries)
- Chronological entry history

### OPS — Missions
- 3 pre-built programs:
  - **Boot Camp Week 1** — Foundation basics (7 days)
  - **Spec Ops Upper Body** — High-volume push/pull (5 days)
  - **Iron Core** — Core endurance focus (5 days)
- Day-by-day progress tracking
- Mission reset capability

---

## Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Framework | React 18                      |
| Build     | Vite 5                        |
| Routing   | React Router v6               |
| Styling   | Tailwind CSS 3                |
| Charts    | Recharts                      |
| Audio     | Tone.js                       |
| Storage   | localStorage (client-side)    |

---

## Getting Started

### Prerequisites

- **Node.js** v18+ — [Download](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/basecamp.git
cd basecamp

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will open at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` directory. Deploy it to Netlify, Vercel, or any static host.

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
basecamp/
├── .gitignore
├── index.html                  # Root HTML entry
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                # React entry point
│   ├── App.jsx                 # Router setup
│   ├── index.css               # Tailwind + global styles
│   ├── constants/
│   │   ├── exercises.js        # Exercise definitions
│   │   ├── missions.js         # Mission programs
│   │   └── ranks.js            # Rank thresholds
│   ├── utils/
│   │   ├── helpers.js          # XP calc, streak, heatmap, formatting
│   │   ├── storage.js          # localStorage wrapper
│   │   └── audio.js            # Tone.js sound effects
│   ├── hooks/
│   │   └── useBaseCampData.js  # Data persistence hook
│   ├── components/
│   │   ├── Layout.jsx          # Page layout (header, nav, footer)
│   │   ├── Navbar.jsx          # Tab navigation
│   │   ├── ProgressBar.jsx     # Reusable progress bar
│   │   └── StatCard.jsx        # Dashboard stat display
│   └── pages/
│       ├── Dashboard.jsx       # HQ overview
│       ├── WorkoutLogger.jsx   # Workout input
│       ├── CombatTimer.jsx     # Boxing interval timer
│       ├── PRVault.jsx         # Personal records
│       ├── BodyMetrics.jsx     # Body measurements
│       └── Missions.jsx        # Structured programs
```

---

## XP & Rank System

| Rank         | Min XP | Icon    |
|-------------|--------|---------|
| Recruit     | 0      | ○       |
| Private     | 50     | ◆       |
| Corporal    | 150    | ◆◆      |
| Sergeant    | 300    | ▲       |
| Staff Sgt   | 500    | ▲▲      |
| Lieutenant  | 800    | ★       |
| Captain     | 1200   | ★★      |
| Major       | 1800   | ★★★     |
| Colonel     | 2500   | ✦✦✦     |
| General     | 3500   | ✦✦✦✦✦   |

**XP Sources:**
- Each workout logged: **10 XP**
- Each PR set: **15 XP**
- 7 unique active days: **50 XP bonus**
- 30 unique active days: **150 XP bonus**
- 60 unique active days: **300 XP bonus**
- Each mission day completed: **8 XP**

---

## Data Storage

All data is stored in the browser's `localStorage` under the key `basecamp-data`. This means:
- Data persists across sessions on the same browser
- Data is device-specific (no cloud sync)
- Clearing browser data will reset your progress

---

## Future Roadmap

- [ ] Backend API for cloud sync and multi-device support
- [ ] Custom mission builder
- [ ] Workout export as shareable image
- [ ] PWA support for offline use
- [ ] Social leaderboard
- [ ] Sound effect library expansion (whistle, horn, drill sergeant)

---

## License

MIT

---

**BASECAMP v1.0 — Built by YungD**
