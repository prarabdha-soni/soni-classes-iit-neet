import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

export function AppHeader() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate({ to: "/search", search: { q: query } });
  };

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-hero flex items-center justify-center shadow-card group-hover:animate-pulse-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">Soni Classes</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">Physics quick revision</div>
          </div>
        </Link>

        <form onSubmit={submit} className="ml-auto flex-1 max-w-sm">
          <label className="relative flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              type="search"
              placeholder="Search formulas…"
              className="w-full rounded-xl bg-secondary/60 border border-border pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-secondary"
            />
          </label>
        </form>
      </div>
    </header>
  );
}
