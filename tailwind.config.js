/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0A0A0A",
          card: "#111111",
          card2: "#1A1A1A",
          border: "#2A2A2A",
          dim: "#555555",
        },
        accent: "#39FF14",
        olive: "#6B8E23",
        combat: "#FF3333",
        warning: "#FFA500",
      },
      fontFamily: {
        mono: [
          "'SF Mono'",
          "'Fira Code'",
          "'Cascadia Code'",
          "'JetBrains Mono'",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
