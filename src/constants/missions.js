const MISSIONS = [
  {
    id: "bootcamp1",
    name: "BOOT CAMP WEEK 1",
    desc: "Foundation building — master the basics.",
    days: [
      {
        day: 1,
        exercises: [
          { id: "pushups", target: 30 },
          { id: "squats", target: 40 },
          { id: "plank", target: 45 },
        ],
      },
      {
        day: 2,
        exercises: [
          { id: "pullups", target: 8 },
          { id: "situps", target: 40 },
          { id: "wallsit", target: 60 },
        ],
      },
      { day: 3, rest: true },
      {
        day: 4,
        exercises: [
          { id: "burpees", target: 20 },
          { id: "pushups", target: 40 },
          { id: "lsit", target: 20 },
        ],
      },
      {
        day: 5,
        exercises: [
          { id: "squats", target: 50 },
          { id: "pullups", target: 10 },
          { id: "plank", target: 60 },
        ],
      },
      {
        day: 6,
        exercises: [
          { id: "pushups", target: 50 },
          { id: "situps", target: 50 },
          { id: "burpees", target: 15 },
        ],
      },
      { day: 7, rest: true },
    ],
  },
  {
    id: "specops",
    name: "SPEC OPS UPPER BODY",
    desc: "High-volume push/pull punishment.",
    days: [
      {
        day: 1,
        exercises: [
          { id: "pushups", target: 60 },
          { id: "pullups", target: 15 },
          { id: "plank", target: 90 },
        ],
      },
      {
        day: 2,
        exercises: [
          { id: "pushups", target: 80 },
          { id: "pullups", target: 12 },
          { id: "lsit", target: 30 },
        ],
      },
      { day: 3, rest: true },
      {
        day: 4,
        exercises: [
          { id: "pushups", target: 100 },
          { id: "pullups", target: 20 },
          { id: "plank", target: 120 },
        ],
      },
      {
        day: 5,
        exercises: [
          { id: "burpees", target: 30 },
          { id: "pushups", target: 60 },
          { id: "pullups", target: 15 },
        ],
      },
    ],
  },
  {
    id: "ironcore",
    name: "IRON CORE",
    desc: "Core endurance and stability focus.",
    days: [
      {
        day: 1,
        exercises: [
          { id: "plank", target: 60 },
          { id: "situps", target: 60 },
          { id: "lsit", target: 20 },
        ],
      },
      {
        day: 2,
        exercises: [
          { id: "plank", target: 90 },
          { id: "situps", target: 80 },
          { id: "wallsit", target: 90 },
        ],
      },
      { day: 3, rest: true },
      {
        day: 4,
        exercises: [
          { id: "plank", target: 120 },
          { id: "lsit", target: 30 },
          { id: "situps", target: 100 },
        ],
      },
      {
        day: 5,
        exercises: [
          { id: "plank", target: 90 },
          { id: "situps", target: 60 },
          { id: "burpees", target: 20 },
        ],
      },
    ],
  },
];

export default MISSIONS;
