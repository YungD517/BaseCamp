import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-base-bg text-[#E0E0E0] font-mono text-sm">
      {/* Header */}
      <header className="px-4 pt-3.5 pb-1.5 bg-[#080808]">
        <div className="flex items-center gap-2.5">
          <span className="text-lg text-accent font-black tracking-[4px]">
            BASECAMP
          </span>
          <span className="text-[9px] text-base-dim tracking-[2px]">
            MILITARY CALISTHENICS
          </span>
        </div>
      </header>

      <Navbar />

      {/* Page Content */}
      <main className="max-w-[600px] mx-auto pb-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center py-5 border-t border-base-border">
        <span className="text-[9px] text-[#333] tracking-[3px]">
          BASECAMP v1.0 — BUILT BY YUNGD
        </span>
      </footer>
    </div>
  );
}
