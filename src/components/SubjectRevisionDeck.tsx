import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { SubjectId } from "@/data/content";
import { getSubject } from "@/data/content";
import { useStreak } from "@/hooks/useStreak";
import { SubjectBadge } from "@/components/SubjectIcon";
import { SwipeCard, type SwipeDirection, type SwipeFormula } from "@/components/SwipeCard";

const progressBarClass: Record<SubjectId, string> = {
  physics: "bg-gradient-hero",
  chemistry: "bg-[linear-gradient(90deg,var(--chemistry),oklch(0.55_0.12_160))]",
  mathematics: "bg-[linear-gradient(90deg,var(--maths),oklch(0.55_0.14_55))]",
  biology: "bg-[linear-gradient(90deg,var(--biology),oklch(0.55_0.18_350))]",
};

function buildHomeDeck(subjectId: SubjectId): SwipeFormula[] {
  const subject = getSubject(subjectId);
  if (!subject) return [];
  return subject.chapters.flatMap((chapter, chapterIdx) =>
    chapter.formulas.map((formula, fIdx) => ({
      ...formula,
      chapterSlug: chapter.slug,
      chapterTitle: chapter.title,
      subjectId,
      subjectName: subject.name,
      chapterNumber: chapterIdx + 1,
      formulaIndexInChapter: fIdx + 1,
      formulasInChapter: chapter.formulas.length,
    })),
  );
}

export function SubjectRevisionDeck({
  subjectId,
  compact = false,
}: {
  subjectId: SubjectId;
  compact?: boolean;
}) {
  const subject = getSubject(subjectId);
  const formulas = useMemo(() => buildHomeDeck(subjectId), [subjectId]);
  const [deck, setDeck] = useState<SwipeFormula[]>(formulas);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const { addXp } = useStreak();

  useEffect(() => {
    setDeck(formulas);
    setSwipeDirection(null);
  }, [formulas]);

  if (!subject) return null;

  const current = deck[0] ?? null;
  const preview = deck.slice(1, 3);
  const total = formulas.length;
  const remaining = deck.length;
  const completed = total - remaining;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const firstChapterSlug = subject.chapters[0]?.slug ?? "kinematics";

  const resetDeck = () => setDeck(formulas);
  const swipe = (direction: Exclude<SwipeDirection, null>) => {
    setSwipeDirection(direction);
    addXp(direction === "right" ? 5 : 2);
    setDeck((prev) => prev.slice(1));
  };

  const deckShell = (
    <div className={compact ? "relative min-h-0 flex-1" : "relative h-full min-h-0"}>
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
              transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
              className="pointer-events-none absolute inset-x-3 top-0 h-full rounded-[1.85rem] border border-white/8 bg-card/70 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
            />
          );
        })}

      <AnimatePresence mode="sync" custom={swipeDirection}>
        {current ? (
          <SwipeCard
            key={`${subjectId}-${current.id}`}
            formula={current}
            formulas={formulas}
            onSwipe={swipe}
            swipeExitCustom={swipeDirection}
            showQuickTest={!compact}
          />
        ) : (
          <motion.div
            key={`${subjectId}-empty`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.85rem] border border-white/10 bg-card p-5 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] sm:p-6"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-hero text-xl">
              🎉
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Stack complete
            </div>
            <h3 className="mt-2 font-display text-xl font-bold leading-tight">
              {subject.name} — done for now
            </h3>
            <p className="mt-2 max-w-xs text-xs text-muted-foreground sm:text-sm">
              Open full chapters for deeper revision or restart this home stack.
            </p>
            <div className="mt-4 flex w-full max-w-xs flex-col gap-2">
              <Link
                to="/subject/$subjectId/$chapterSlug"
                params={{ subjectId, chapterSlug: firstChapterSlug }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02]"
              >
                Open a chapter <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={resetDeck}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                Restart stack
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (compact) {
    return (
      <section className="flex h-full min-h-0 w-full flex-col">
        {deckShell}
      </section>
    );
  }

  return (
    <section className="mb-12 scroll-mt-6 last:mb-6" id={`revise-${subjectId}`}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <SubjectBadge id={subjectId} emoji={subject.emoji} size="sm" />
          <div className="min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              {subject.exam}
            </div>
            <h2 className="mt-0.5 font-display text-lg font-bold tracking-tight sm:text-xl">
              {subject.name}
            </h2>
            <p className="mt-1 max-w-md text-xs text-muted-foreground sm:text-sm">{subject.tagline}</p>
            <Link
              to="/subject/$subjectId"
              params={{ subjectId }}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              All chapters <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-black tabular-nums text-foreground">
            {Math.max(0, completed)}
            <span className="text-muted-foreground">/{total}</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Reviewed</div>
        </div>
      </div>

      <div className="mb-4 h-1 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={`h-full ${progressBarClass[subjectId]}`}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
        />
      </div>

      <div className="relative mx-auto h-[28rem] w-full max-w-md sm:h-[30rem]">{deckShell}</div>
    </section>
  );
}
