import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "HQ", icon: "◉" },
  { to: "/log", label: "LOG", icon: "+" },
  { to: "/timer", label: "TIMER", icon: "⏱" },
  { to: "/prs", label: "PRs", icon: "↑" },
  { to: "/body", label: "BODY", icon: "◎" },
  { to: "/missions", label: "OPS", icon: "⚑" },
];

export default function Navbar() {
  return (
    <nav className="flex gap-0.5 px-3 py-2 bg-[#080808] border-b border-base-border overflow-x-auto sticky top-0 z-50">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) =>
            `py-2 px-3.5 border text-[11px] font-mono font-bold uppercase tracking-[2px] whitespace-nowrap transition-all ${
              isActive
                ? "border-accent bg-accent/10 text-accent"
                : "border-base-border bg-transparent text-base-dim hover:border-base-dim/50"
            }`
          }
        >
          <span className="mr-1">{tab.icon}</span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
