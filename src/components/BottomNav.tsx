import { Link } from "@tanstack/react-router";
import { Layers, Sigma, Sparkles, Trophy } from "lucide-react";

const tabs = [
  {
    to: "/",
    label: "AI",
    caption: "Concepts",
    Icon: Sparkles,
    activeOptions: { exact: true } as const,
  },
  {
    to: "/formulas",
    label: "Formula",
    caption: "Chapters",
    Icon: Sigma,
    activeOptions: { exact: false } as const,
  },
  {
    to: "/revise",
    label: "Revise",
    caption: "Swipe Qs",
    Icon: Layers,
    activeOptions: { exact: false } as const,
  },
  {
    to: "/test",
    label: "Test",
    caption: "26 Apr · ₹11",
    Icon: Trophy,
    activeOptions: { exact: false } as const,
  },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="shrink-0 border-t border-white/10 bg-card/85 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_40px_-20px_rgba(0,0,0,0.45)] backdrop-blur-xl"
    >
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-1 px-2 sm:gap-2 sm:px-4">
        {tabs.map(({ to, label, caption, Icon, activeOptions }) => (
          <Link
            key={to}
            to={to}
            activeOptions={activeOptions}
            className="group flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground sm:rounded-2xl sm:py-2"
            activeProps={{
              className:
                "group flex flex-col items-center justify-center gap-0.5 rounded-xl bg-primary/15 py-1.5 text-primary ring-1 ring-primary/25 sm:rounded-2xl sm:py-2",
            }}
          >
            <Icon className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={2.2} aria-hidden />
            <span className="font-display text-[9px] font-black uppercase tracking-[0.08em] sm:text-[11px] sm:tracking-[0.12em]">
              {label}
            </span>
            <span className="max-w-[4.5rem] truncate text-center text-[7px] font-medium leading-tight text-muted-foreground group-data-[status=active]:text-primary/85 sm:max-w-none sm:text-[9px]">
              {caption}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
