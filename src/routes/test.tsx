import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Calendar,
  ChevronRight,
  Clock,
  Gift,
  Radio,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { QuizSwipeCard, type QuizCardItem, type QuizSwipeDirection } from "@/components/QuizSwipeCard";
import { NEET_PHYSICS_TOP_CHAPTERS } from "@/data/neet-top-concepts";
import { useStreak } from "@/hooks/useStreak";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Concept swipe test — ₹11 · 26 April — Nishu Classes" },
      {
        name: "description",
        content:
          "One NEET Physics contest: swipe MCQs from most-asked concepts. Joining fee ₹11 · 26 April 2026.",
      },
    ],
  }),
  component: TestPage,
});

const CONTEST_DATE_LABEL = "26 April 2026";
const ENTRY_FEE = 11;
const PREVIEW_QUESTION_CAP = 10;

/** Demo-only contest stats (no real money). */
const DEMO_SPOTS = { max: 500, filled: 312 };
const DEMO_PRIZE_POOL = "₹5,500";

function buildConceptQuizDeck(max: number): QuizCardItem[] {
  const deck: QuizCardItem[] = [];
  outer: for (const ch of NEET_PHYSICS_TOP_CHAPTERS) {
    for (const c of ch.concepts) {
      for (let qi = 0; qi < c.questions.length; qi++) {
        if (deck.length >= max) break outer;
        const question = c.questions[qi]!;
        deck.push({
          ...question,
          id: `contest-preview-${ch.id}-${c.id}-${qi}`,
          chapterTitle: `${ch.emoji} ${c.title}`,
          subjectName: "NEET Physics · Most asked",
        });
      }
    }
  }
  return deck;
}

function fillPct(filled: number, max: number) {
  return Math.min(100, Math.round((filled / Math.max(1, max)) * 100));
}

function TestPage() {
  const { addXp } = useStreak();
  const deck = useMemo(() => buildConceptQuizDeck(PREVIEW_QUESTION_CAP), []);
  const [index, setIndex] = useState(0);
  const [exitDir, setExitDir] = useState<QuizSwipeDirection>(null);
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });

  const card = deck[index];
  const completed = index >= deck.length;
  const pctFilled = fillPct(DEMO_SPOTS.filled, DEMO_SPOTS.max);
  const deckProgress = deck.length === 0 ? 0 : Math.min(100, Math.round((index / deck.length) * 100));
  const accuracy =
    stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : null;

  const onSwipe = (dir: "left" | "right", wasCorrect: boolean) => {
    setExitDir(dir);
    setStats((s) => ({
      correct: s.correct + (wasCorrect ? 1 : 0),
      attempted: s.attempted + 1,
    }));
    if (wasCorrect) addXp(10);
    queueMicrotask(() => {
      setIndex((i) => i + 1);
      setExitDir(null);
    });
  };

  const resetPreview = () => {
    setIndex(0);
    setStats({ correct: 0, attempted: 0 });
    setExitDir(null);
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto overflow-x-hidden px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-3">
      {/* Contest hero */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative shrink-0 overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-primary/25 via-card to-violet-950/40 p-4 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.85)] sm:p-5"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-20%,rgba(168,85,247,0.18),transparent)]" />
        <div className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/35 bg-destructive/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-destructive">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                </span>
                <Radio className="h-3 w-3" />
                Live slot · demo
              </span>
              <h1 className="max-w-[16rem] font-display text-xl font-black leading-[1.15] tracking-tight text-foreground sm:max-w-none sm:text-2xl">
                NEET Physics swipe contest
              </h1>
              <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Same most-asked concepts as <strong className="text-foreground/90">AI</strong> — timed swipe MCQs.
                One entry slab, one paper date.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-start">
              <div className="rounded-2xl border border-white/15 bg-background/50 px-3 py-2 text-right shadow-inner ring-1 ring-white/5 backdrop-blur-md">
                <div className="flex items-center justify-end gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Wallet className="h-3 w-3" />
                  Entry
                </div>
                <div className="font-display text-2xl font-black tabular-nums text-emerald-300 sm:text-3xl">₹{ENTRY_FEE}</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-background/40 px-3 py-2 backdrop-blur-md">
                <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="h-3 w-3 shrink-0" />
                  Slot
                </div>
                <div className="mt-0.5 text-right font-display text-sm font-bold leading-tight text-foreground sm:text-base">
                  {CONTEST_DATE_LABEL}
                </div>
                <div className="mt-1 flex items-center justify-end gap-1 text-[9px] text-muted-foreground">
                  <Clock className="h-2.5 w-2.5" />
                  Full paper · same day
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-background/35 px-3 py-2.5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                <Gift className="h-3 w-3 text-amber-400" />
                Prize pool
              </div>
              <div className="mt-1 font-display text-lg font-bold text-amber-100">{DEMO_PRIZE_POOL}</div>
              <p className="mt-0.5 text-[9px] text-muted-foreground">Demo numbers</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-background/35 px-3 py-2.5 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                <Users className="h-3 w-3" />
                Spots
              </div>
              <div className="mt-1 font-mono text-sm font-bold tabular-nums text-foreground">
                {DEMO_SPOTS.filled.toLocaleString("en-IN")}/{DEMO_SPOTS.max.toLocaleString("en-IN")}
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background/80">
                <motion.div
                  className="h-full rounded-full bg-emerald-400/90"
                  initial={false}
                  animate={{ width: `${pctFilled}%` }}
                  transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-2.5 sm:col-span-1">
              <p className="text-[10px] font-medium leading-snug text-emerald-100/90">
                Join saves your name on the demo board. UPI collection comes later — tap below when you are ready.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/55 px-2.5 py-1 text-[10px] font-medium ring-1 ring-white/10">
              <Zap className="h-3 w-3 text-accent" />
              Swipe after you lock an option
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-background/55 px-2.5 py-1 text-[10px] font-medium ring-1 ring-white/10">
              <Target className="h-3 w-3 text-primary" />
              Concept-linked MCQs
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-background/55 px-2.5 py-1 text-[10px] text-muted-foreground ring-1 ring-white/10">
              <ShieldCheck className="h-3 w-3 shrink-0 text-primary" />
              Not a paid contest yet
            </span>
          </div>
        </div>
      </motion.section>

      {/* Preview deck */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.05, ease: "easeOut" }}
        className="mt-3 flex min-h-[min(22rem,42dvh)] flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-card/80 shadow-[0_16px_44px_-28px_rgba(0,0,0,0.75)] sm:mt-4"
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/8 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Warm-up preview
            </div>
            <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
              {PREVIEW_QUESTION_CAP} questions · same deck as AI · not the full contest length
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary tabular-nums">
              <Trophy className="h-3.5 w-3.5" />
              {stats.attempted === 0 ? "—" : `${stats.correct}/${stats.attempted}`}
              {accuracy !== null ? (
                <span className="text-[10px] font-semibold text-primary/80">({accuracy}%)</span>
              ) : null}
            </div>
            <span className="text-[9px] text-muted-foreground">score · accuracy</span>
          </div>
        </div>

        <div className="shrink-0 px-3 pt-2 sm:px-4">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="tabular-nums">
              Card {Math.min(index + 1, deck.length)} / {deck.length || 0}
            </span>
            <span className="tabular-nums">{deckProgress}% through preview</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary/70">
            <motion.div
              className="h-full rounded-full bg-gradient-hero"
              initial={false}
              animate={{ width: `${deckProgress}%` }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="relative min-h-0 flex-1 px-2 pb-2 pt-2 sm:px-3 sm:pb-3">
          {!completed && deck[index + 1] ? (
            <motion.div
              key={deck[index + 1]!.id}
              initial={false}
              animate={{ y: 10, scale: 0.96, opacity: 0.42 }}
              transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
              aria-hidden
              className="pointer-events-none absolute inset-x-3 bottom-0 top-0 rounded-[1.85rem] border border-white/8 bg-card/65 shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:inset-x-4"
            />
          ) : null}

          <AnimatePresence mode="sync" custom={exitDir}>
            {!completed && card ? (
              <QuizSwipeCard key={card.id} item={card} onSwipe={onSwipe} swipeExitCustom={exitDir} />
            ) : (
              <motion.div
                key="preview-done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-2 flex flex-col items-center justify-center rounded-[1.85rem] border border-primary/20 bg-gradient-to-b from-card to-secondary/25 p-5 text-center sm:inset-3 sm:p-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-primary/25 blur-xl" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-hero shadow-lg">
                    <Trophy className="h-7 w-7 text-primary-foreground" />
                  </div>
                </div>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Preview complete</p>
                <h3 className="mt-1 font-display text-xl font-bold sm:text-2xl">See you on {CONTEST_DATE_LABEL}</h3>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
                  You finished <span className="font-semibold text-foreground">{stats.attempted}</span> warm-up
                  questions with{" "}
                  <span className="font-bold text-primary">{stats.correct}</span> correct
                  {accuracy !== null ? (
                    <>
                      {" "}
                      (<span className="tabular-nums">{accuracy}%</span> accuracy)
                    </>
                  ) : null}
                  . Full contest will feel the same — longer paper, ranked leaderboard (demo).
                </p>
                <div className="mt-5 flex w-full max-w-xs flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={resetPreview}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary/70"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Run again
                  </button>
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-black uppercase tracking-wide text-white shadow-md transition-transform hover:bg-emerald-500 active:scale-[0.99]"
                  >
                    Reserve ₹{ENTRY_FEE}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.25 }}
        className="mt-3 shrink-0 space-y-2"
      >
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_12px_36px_-12px_rgba(16,185,129,0.55)] transition-[transform,filter] hover:brightness-110 active:scale-[0.99]"
        >
          Join contest · ₹{ENTRY_FEE}
          <ChevronRight className="h-4 w-4 opacity-90" />
        </button>
        <p className="text-center text-[10px] leading-snug text-muted-foreground">
          Nishu Classes · NEET 2026 · Practice product — no real-money gaming yet.
        </p>
      </motion.div>
    </div>
  );
}
