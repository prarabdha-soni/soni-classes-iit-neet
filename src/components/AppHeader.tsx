import { Link } from "@tanstack/react-router";
import { Sparkles, User } from "lucide-react";
import { StreakBadge } from "@/components/StreakBadge";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-hero shadow-card group-hover:animate-pulse-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-lg font-bold tracking-tight sm:text-2xl">
              Soni Classes
            </div>
            <div className="hidden text-xs text-muted-foreground sm:block">
              JEE & NEET quick revision
            </div>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <StreakBadge />
          <Link
            to="/profile"
            aria-label="Profile"
            title="Profile"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            activeProps={{
              className:
                "grid h-10 w-10 place-items-center rounded-full border border-primary bg-primary/15 text-primary",
            }}
          >
            <User className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </header>
  );
}
