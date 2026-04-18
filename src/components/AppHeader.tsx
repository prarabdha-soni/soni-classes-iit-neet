import { Link } from "@tanstack/react-router";
import { Sparkles, Bookmark } from "lucide-react";
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
              Physics quick revision
            </div>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <StreakBadge />
          <Link
            to="/vault"
            aria-label="My Vault"
            title="My Vault"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/50 text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            activeProps={{
              className:
                "grid h-9 w-9 place-items-center rounded-full border border-accent bg-accent/20 text-accent",
            }}
          >
            <Bookmark className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
