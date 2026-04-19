import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, XCircle, Sparkles, Lightbulb } from "lucide-react";
import type { QuizQuestion } from "@/data/content";

export type QuizSwipeDirection = "left" | "right" | null;

export type QuizCardItem = QuizQuestion & {
  id: string;
  chapterTitle: string;
  subjectName: string;
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: (direction: QuizSwipeDirection) => ({
    opacity: 0,
    scale: 0.94,
    x: direction === "left" ? -320 : direction === "right" ? 320 : 0,
    rotate: direction === "left" ? -14 : direction === "right" ? 14 : 0,
    transition: { duration: 0.14, ease: "easeIn" },
  }),
} satisfies Variants;

export function QuizSwipeCard({
  item,
  onSwipe,
  swipeExitCustom,
}: {
  item: QuizCardItem;
  onSwipe: (direction: Exclude<QuizSwipeDirection, null>, wasCorrect: boolean) => void;
  swipeExitCustom: QuizSwipeDirection;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 0, 260], [-18, 0, 18]);
  const skipOpacity = useTransform(x, [-140, -40, 0], [1, 0.3, 0]);
  const nextOpacity = useTransform(x, [0, 40, 140], [0, 0.3, 1]);

  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handlePick = (idx: number) => {
    if (revealed) return;
    setPicked(idx);
    setRevealed(true);
  };

  const isCorrect = picked === item.answer;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={swipeExitCustom}
      drag={revealed ? "x" : false}
      dragElastic={0.12}
      dragMomentum={false}
      dragTransition={{ power: 0.8, timeConstant: 120 }}
      style={{ x, rotate }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110 || info.velocity.x > 520) {
          onSwipe("right", isCorrect);
          return;
        }
        if (info.offset.x < -110 || info.velocity.x < -520) {
          onSwipe("left", isCorrect);
          return;
        }
        x.set(0);
      }}
      transition={{ type: "spring", stiffness: 520, damping: 38 }}
      className="absolute inset-0 cursor-grab overflow-hidden rounded-[1.85rem] border border-white/10 bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] will-change-transform active:cursor-grabbing"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-hero" />

      <div
        className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-physics)" }}
      />

      {/* Swipe stamps — only after answering */}
      {revealed ? (
        <>
          <motion.div
            style={{ opacity: skipOpacity }}
            className="pointer-events-none absolute left-6 top-16 z-20 -rotate-[14deg] rounded-md border-[3px] border-destructive px-3 py-1 font-display text-xl font-black uppercase tracking-[0.18em] text-destructive"
          >
            Review
          </motion.div>
          <motion.div
            style={{ opacity: nextOpacity }}
            className="pointer-events-none absolute right-6 top-16 z-20 rotate-[14deg] rounded-md border-[3px] border-primary px-3 py-1 font-display text-xl font-black uppercase tracking-[0.18em] text-primary"
          >
            Got It
          </motion.div>
        </>
      ) : null}

      <div className="relative flex h-full min-h-0 flex-col p-5 sm:p-6">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                {item.subjectName}
              </span>
            </div>
            <p className="mt-2 truncate text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {item.chapterTitle}
            </p>
          </div>
          {revealed ? (
            isCorrect ? (
              <div className="flex items-center gap-1 rounded-full border border-primary/40 bg-primary/15 px-2 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  +10 XP
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-full border border-destructive/40 bg-destructive/15 px-2 py-1">
                <XCircle className="h-3.5 w-3.5 text-destructive" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-destructive">
                  Try again
                </span>
              </div>
            )
          ) : null}
        </div>

        {/* Question */}
        <h2 className="mt-4 shrink-0 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl">
          {item.q}
        </h2>

        {/* Options */}
        <div className="mt-5 flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-1">
          {item.options.map((opt, idx) => {
            const chosen = picked === idx;
            const correct = revealed && idx === item.answer;
            const wrong = revealed && chosen && idx !== item.answer;

            return (
              <button
                key={idx}
                type="button"
                disabled={revealed}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePick(idx);
                }}
                className={`group flex items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-all ${
                  correct
                    ? "border-primary bg-primary/15"
                    : wrong
                      ? "border-destructive bg-destructive/15"
                      : chosen
                        ? "border-primary/60 bg-primary/10"
                        : "border-border bg-background/60 hover:border-primary/40 hover:bg-secondary/50"
                } disabled:cursor-default`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[10px] font-bold ${
                    correct
                      ? "border-primary bg-primary/20 text-primary"
                      : wrong
                        ? "border-destructive bg-destructive/20 text-destructive"
                        : "border-border bg-background/80 text-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 text-sm leading-relaxed text-foreground/90">{opt}</span>
                {correct ? <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> : null}
                {wrong ? <XCircle className="h-4 w-4 shrink-0 text-destructive" /> : null}
              </button>
            );
          })}

          {revealed && item.explain ? (
            <div className="mt-1 flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/8 p-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/20">
                <Lightbulb className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                  Explanation
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90">{item.explain}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer hint */}
        <p className="mt-3 shrink-0 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {revealed ? "Swipe right if you got it • Left to review" : "Tap an option to reveal"}
        </p>
      </div>
    </motion.div>
  );
}
