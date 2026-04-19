import { Link } from "@tanstack/react-router";
import { Home, Layers, Trophy, User } from "lucide-react";

const TABS = [
  { to: "/", label: "Home", Icon: Home, exact: true },
  { to: "/revise", label: "Revise", Icon: Layers, exact: false },
  { to: "/test", label: "Test", Icon: Trophy, exact: false },
  { to: "/profile", label: "Profile", Icon: User, exact: false },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-background/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around px-2 py-1.5">
        {TABS.map(({ to, label, Icon, exact }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact }}
              className="group flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className:
                  "group flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary",
              }}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                      isActive
                        ? "bg-primary/15 text-primary shadow-[0_4px_14px_-4px_hsl(var(--primary)/0.6)]"
                        : "text-muted-foreground group-hover:bg-secondary/60 group-hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                  </span>
                  <span>{label}</span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
