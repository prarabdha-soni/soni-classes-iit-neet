import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { getSubject } from "@/data/content";
import { useStreak } from "@/hooks/useStreak";
import { SwipeCard, type SwipeFormula, type SwipeDirection } from "@/components/SwipeCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soni Classes — Physics Swipe Revision" },
      {
        name: "description",
        content: "Swipe through important Physics formulas right from the home page.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const physics = getSubject("physics");
  const formulas = useMemo<SwipeFormula[]>(
    () =>
      physics?.chapters.flatMap((chapter) =>
        chapter.formulas.slice(0, 2).map((formula) => ({
          ...formula,
          chapterSlug: chapter.slug,
          chapterTitle: chapter.title,
        })),
      ) ?? [],
    [physics],
  );
  const [deck, setDeck] = useState<SwipeFormula[]>(formulas);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const { addXp } = useStreak();

  if (!physics) {
    return null;
  }

  const current = deck[0] ?? null;
  const preview = deck.slice(1, 3);
  const total = formulas.length;
  const remaining = deck.length;
  const completed = total - remaining;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  const resetDeck = () => setDeck(formulas);
  const swipe = (direction: Exclude<SwipeDirection, null>) => {
    setSwipeDirection(direction);
    addXp(direction === "right" ? 5 : 2);
    setDeck((prev) => prev.slice(1));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-10 pt-5">
      {/* Header strip */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
            Daily Revision
          </div>
          <h1 className="mt-0.5 font-display text-xl font-bold tracking-tight">
            Physics Formula Stack
          </h1>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-black tabular-nums text-foreground">
            {Math.max(0, completed)}
            <span className="text-muted-foreground">/{total}</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Reviewed
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5 h-1 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full bg-gradient-hero"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
        />
      </div>

      {/* Card stack */}
      <div className="relative mx-auto h-[32rem] w-full max-w-md sm:h-[34rem]">
        {/* Background preview cards */}
        {preview
          .slice()
          .reverse()
          .map((formula, index) => {
            const depth = index + 1;
            return (
              <motion.div
                key={formula.id}
                initial={false}
                animate={{
                  y: depth * 10,
                  scale: 1 - depth * 0.04,
                  opacity: 0.5 - index * 0.15,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="pointer-events-none absolute inset-x-3 top-0 h-full rounded-[1.85rem] border border-white/8 bg-card/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
              />
            );
          })}

        <AnimatePresence mode="wait" custom={swipeDirection}>
          {current ? (
            <SwipeCard
              key={current.id}
              formula={current}
              formulas={formulas}
              onSwipe={swipe}
              swipeExitCustom={swipeDirection}
            />
          ) : (
            <motion.div
              key="deck-empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.85rem] border border-white/10 bg-card p-6 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-hero">
                <span className="text-2xl">🎉</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Stack Complete
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold leading-tight">
                Great work today!
              </h2>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                You've reviewed every formula in today's stack. Dive deeper into a chapter or restart the deck.
              </p>
              <div className="mt-5 flex w-full flex-col gap-2.5">
                <Link
                  to="/subject/$subjectId/$chapterSlug"
                  params={{ subjectId: "physics", chapterSlug: "laws-of-motion" }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02]"
                >
                  Open Laws of Motion <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={resetDeck}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restart Stack
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
