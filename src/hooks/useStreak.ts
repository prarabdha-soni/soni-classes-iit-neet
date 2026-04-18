import { useEffect, useState, useCallback } from "react";

const KEY = "soni-streak-v1";

type StreakState = {
  xp: number;
  streak: number; // days
  lastActiveDate: string | null; // YYYY-MM-DD
  todayXp: number;
};

const DEFAULT: StreakState = { xp: 0, streak: 0, lastActiveDate: null, todayXp: 0 };

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00").getTime();
  const db = new Date(b + "T00:00:00").getTime();
  return Math.round((db - da) / 86400000);
}

function read(): StreakState {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as Partial<StreakState>;
    const today = todayKey();
    let { xp = 0, streak = 0, lastActiveDate = null, todayXp = 0 } = parsed;
    // reset todayXp if a new day started since last save
    if (lastActiveDate !== today) todayXp = 0;
    return { xp, streak, lastActiveDate, todayXp };
  } catch {
    return DEFAULT;
  }
}

function write(state: StreakState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("soni-streak-changed"));
}

export function useStreak() {
  const [state, setState] = useState<StreakState>(DEFAULT);

  useEffect(() => {
    setState(read());
    const handler = () => setState(read());
    window.addEventListener("soni-streak-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("soni-streak-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const addXp = useCallback((amount: number) => {
    const current = read();
    const today = todayKey();
    let { xp, streak, lastActiveDate, todayXp } = current;

    if (lastActiveDate === today) {
      // same day, just add xp
    } else if (lastActiveDate && daysBetween(lastActiveDate, today) === 1) {
      streak += 1;
      todayXp = 0;
    } else if (lastActiveDate && daysBetween(lastActiveDate, today) > 1) {
      streak = 1;
      todayXp = 0;
    } else {
      // first ever activity
      streak = 1;
      todayXp = 0;
    }

    xp += amount;
    todayXp += amount;
    lastActiveDate = today;

    const next = { xp, streak, lastActiveDate, todayXp };
    write(next);
    setState(next);
  }, []);

  return { ...state, addXp };
}
