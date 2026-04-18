import { Flame, Zap } from "lucide-react";
import { useStreak } from "@/hooks/useStreak";

export function StreakBadge() {
  const { streak, xp, todayXp } = useStreak();
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent"
        title={`Daily streak: ${streak} day${streak === 1 ? "" : "s"}`}
      >
        <Flame className="h-3.5 w-3.5" />
        <span>{streak}</span>
      </div>
      <div
        className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
        title={`Total XP: ${xp} • Today: +${todayXp}`}
      >
        <Zap className="h-3.5 w-3.5" />
        <span>{xp} XP</span>
      </div>
    </div>
  );
}
