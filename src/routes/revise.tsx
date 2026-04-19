import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { RotateCcw, Target, Trophy } from "lucide-react";
import { SUBJECTS, type SubjectId } from "@/data/content";
import { QuizSwipeCard, type QuizCardItem, type QuizSwipeDirection } from "@/components/QuizSwipeCard";
import { SubjectBadge } from "@/components/SubjectIcon";
import { useStreak } from "@/hooks/useStreak";

export const Route = createFileRoute("/revise")({
  head: () => ({
    meta: [
      { title: "Revise — Soni Classes" },
      {
        name: "description",
        content:
          "Swipe through chapter-wise important questions and quizzes. Tinder-style revision for JEE & NEET.",
      },
    ],
  }),
  component: RevisePage,
});

type Filter = "all" | SubjectId;

function buildDeck(filter: Filter): QuizCardItem[] {
  const deck: QuizCardItem[] = [];
  for (const subject of SUBJECTS) {
    if (filter !== "all" && subject.id !== filter) continue;
    for (const chapter of subject.chapters) {
      chapter.quiz.forEach((q, idx) => {
        deck.push({
          ...q,
          id: `${subject.id}-${chapter.slug}-${idx}`,
          chapterTitle: chapter.title,
          subjectName: subject.name,
        });
      });
    }
  }
  return deck;
}

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "mathematics", label: "Maths" },
  { id: "biology", label: "Biology" },
];

function RevisePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [index, setIndex] = useState(0);
  const [exitDir, setExitDir] = useState<QuizSwipeDirection>(null);
  const [stats, setStats] = useState({ correct: 0, attempted: 0 });
  const { addXp } = useStreak();

  const deck = useMemo(() => buildDeck(filter), [filter]);
  const card = deck[index];
  const completed = index >= deck.length;

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

  const reset = () => {
    setIndex(0);
    setStats({ correct: 0, attempted: 0 });
    setExitDir(null);
  };

  const switchFilter = (next: Filter) => {
    setFilter(next);
    setIndex(0);
    setStats({ correct: 0, attempted: 0 });
    setExitDir(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl min-h-0 flex-1 flex-col overflow-hidden px-3 pt-2">
      <div className="flex shrink-0 items-center justify-between gap-2 pb-2">
        <h1 className="font-display text-lg font-bold tracking-tight sm:text-xl">Revise</h1>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1">
          <Target className="h-3 w-3 text-primary" />
          <span className="text-xs font-bold text-primary tabular-nums">
            {stats.correct}/{stats.attempted || deck.length}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 overflow-x-auto pb-2">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => switchFilter(f.id)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                active
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {f.id !== "all" ? (
                <SubjectBadge id={f.id as SubjectId} emoji="" size="sm" />
              ) : null}
              <span className={f.id !== "all" ? "ml-1.5" : ""}>{f.label}</span>
            </button>
          );
        })}
      </div>

      <div className="shrink-0 pb-2">
        <div className="h-1 w-full overflow-hidden rounded-full bg-secondary/60">
          <motion.div
            className="h-full bg-gradient-hero"
            initial={false}
            animate={{
              width: `${deck.length === 0 ? 0 : Math.min(100, (index / deck.length) * 100)}%`,
            }}
            transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="tabular-nums">
            {Math.min(index + 1, deck.length)} / {deck.length || 0}
          </span>
          <span>{filter === "all" ? "All" : FILTERS.find((f) => f.id === filter)?.label}</span>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 pb-1">
        <div className="relative mx-auto h-full min-h-0 w-full max-w-md">
          {!completed && deck[index + 2] ? (
            <motion.div
              key={deck[index + 2]!.id}
              initial={false}
              animate={{ y: 20, scale: 0.92, opacity: 0.35 }}
              transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
              aria-hidden
              className="pointer-events-none absolute inset-x-3 top-0 h-full rounded-[1.85rem] border border-white/8 bg-card/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            />
          ) : null}
          {!completed && deck[index + 1] ? (
            <motion.div
              key={deck[index + 1]!.id}
              initial={false}
              animate={{ y: 10, scale: 0.96, opacity: 0.45 }}
              transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
              aria-hidden
              className="pointer-events-none absolute inset-x-3 top-0 h-full rounded-[1.85rem] border border-white/8 bg-card/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            />
          ) : null}

          <AnimatePresence mode="sync" custom={exitDir}>
            {!completed && card ? (
              <QuizSwipeCard
                key={card.id}
                item={card}
                onSwipe={onSwipe}
                swipeExitCustom={exitDir}
              />
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.85rem] border border-white/10 bg-card p-6 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-hero">
                  <Trophy className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold">Deck cleared!</h2>
                <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                  You attempted {stats.attempted} questions and got{" "}
                  <span className="font-bold text-primary">{stats.correct}</span> right.
                </p>
                <div className="mt-5 flex w-full max-w-xs flex-col gap-2">
                  <button
                    type="button"
                    onClick={reset}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restart deck
                  </button>
                  {filter !== "all" ? (
                    <button
                      type="button"
                      onClick={() => switchFilter("all")}
                      className="rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm font-semibold hover:bg-secondary/60"
                    >
                      Try all subjects
                    </button>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
