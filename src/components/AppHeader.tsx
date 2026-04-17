import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-hero shadow-card group-hover:animate-pulse-glow">
            <Sparkles className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Soni Classes</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Physics quick revision</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
