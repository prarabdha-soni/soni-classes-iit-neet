import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bookmark, Flame, Settings, Trophy, Zap } from "lucide-react";
import { useStreak } from "@/hooks/useStreak";
import { useBookmarks } from "@/hooks/useBookmarks";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Nishu Classes" },
      { name: "description", content: "Your XP, streak, accuracy and saved formulas." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { xp, streak, todayXp } = useStreak();
  const { items: bookmarks } = useBookmarks();
  const dailyGoal = 50;
  const goalPct = Math.min(100, Math.round((todayXp / dailyGoal) * 100));

  return (
    <div className="mx-auto max-w-2xl px-4 pb-8 pt-5">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/8 bg-card/70 p-5"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-hero opacity-25 blur-3xl" />
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-hero text-2xl font-black text-primary-foreground shadow-card">
            SC
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Aspirant
            </div>
            <h1 className="font-display text-xl font-bold tracking-tight">Nishu Student</h1>
            <p className="text-xs text-muted-foreground">JEE + NEET track · India 🇮🇳</p>
          </div>
        </div>

        {/* Daily goal ring */}
        <div className="mt-5 rounded-2xl border border-white/8 bg-background/40 p-3.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <span>Today's goal</span>
            <span className="text-foreground">{todayXp} / {dailyGoal} XP</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-gradient-hero"
              initial={false}
              animate={{ width: `${goalPct}%` }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Stat grid */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        <StatCard icon={<Zap className="h-4 w-4" />} label="Total XP" value={xp.toString()} accent="text-primary" />
        <StatCard icon={<Flame className="h-4 w-4" />} label="Streak" value={`${streak}d`} accent="text-accent" />
        <StatCard icon={<Trophy className="h-4 w-4" />} label="Tests" value="0" accent="text-foreground" />
      </div>

      {/* Vault link */}
      <Link
        to="/vault"
        className="mt-4 flex items-center justify-between rounded-2xl border border-white/8 bg-card/70 p-4 transition-colors hover:border-primary/40"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
            <Bookmark className="h-4 w-4" />
          </div>
          <div>
            <div className="font-display text-base font-bold">My Vault</div>
            <div className="text-xs text-muted-foreground">
              {bookmarks.length} saved {bookmarks.length === 1 ? "formula" : "formulas"}
            </div>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Open →</span>
      </Link>

      {/* Settings (placeholder) */}
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/8 bg-card/40 p-4 opacity-60">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-muted-foreground">
            <Settings className="h-4 w-4" />
          </div>
          <div>
            <div className="font-display text-base font-bold">Settings</div>
            <div className="text-xs text-muted-foreground">Notifications, sync — coming soon</div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Login & cloud sync coming soon
      </p>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-card/70 p-3 text-center">
      <div className={`mx-auto mb-1 grid h-8 w-8 place-items-center rounded-lg bg-secondary/60 ${accent}`}>
        {icon}
      </div>
      <div className="font-display text-lg font-black tabular-nums">{value}</div>
      <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
