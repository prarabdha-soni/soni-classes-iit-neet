import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import { useMemo, useState } from "react";
import { Lightbulb, Sparkles } from "lucide-react";
import type { Formula, SubjectId } from "@/data/content";
import { MathExpr } from "@/components/MathExpr";
import { BookmarkButton } from "@/components/BookmarkButton";

export type SwipeFormula = Formula & {
  chapterSlug: string;
  chapterTitle: string;
  subjectId: SubjectId;
  subjectName: string;
};

const orbClass: Record<SubjectId, string> = {
  physics: "bg-gradient-physics",
  chemistry: "bg-gradient-to-br from-emerald-600/60 to-teal-950/40",
  mathematics: "bg-gradient-to-br from-amber-600/60 to-orange-950/40",
  biology: "bg-gradient-to-br from-rose-600/60 to-pink-950/40",
};

const heroFrameClass: Record<SubjectId, string> = {
  physics: "border-primary/20 from-primary/10 via-background/60 to-accent/10",
  chemistry:
    "border-[color:var(--chemistry)]/35 from-emerald-500/10 via-background/60 to-teal-900/15",
  mathematics:
    "border-[color:var(--maths)]/35 from-amber-500/10 via-background/60 to-orange-900/15",
  biology: "border-[color:var(--biology)]/35 from-rose-500/10 via-background/60 to-pink-900/15",
};
export type SwipeDirection = "left" | "right" | null;

type BinaryQuestion = {
  prompt: string;
  left: string;
  right: string;
  correctSide: "left" | "right";
  explain: string;
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.96, y: 18 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: (direction: SwipeDirection) => ({
    opacity: 0,
    scale: 0.92,
    x: direction === "left" ? -560 : direction === "right" ? 560 : 0,
    rotate: direction === "left" ? -22 : direction === "right" ? 22 : 0,
    transition: { duration: 0.28 },
  }),
} satisfies Variants;

export function SwipeCard({
  formula,
  formulas,
  onSwipe,
  swipeExitCustom,
}: {
  formula: SwipeFormula;
  formulas: SwipeFormula[];
  onSwipe: (direction: Exclude<SwipeDirection, null>) => void;
  swipeExitCustom: SwipeDirection;
}) {
  const { subjectId, subjectName } = formula;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 0, 260], [-18, 0, 18]);
  const skipOpacity = useTransform(x, [-140, -40, 0], [1, 0.3, 0]);
  const knownOpacity = useTransform(x, [0, 40, 140], [0, 0.3, 1]);

  const [showQuestion, setShowQuestion] = useState(false);
  const [picked, setPicked] = useState<"left" | "right" | null>(null);
  const [questionNonce, setQuestionNonce] = useState(0);

  const question = useMemo(
    () => buildBinaryQuestion(formula, formulas, questionNonce),
    [formula, formulas, questionNonce],
  );

  const openTest = () => {
    setQuestionNonce((n) => n + 1);
    setShowQuestion(true);
    setPicked(null);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={swipeExitCustom}
      drag={showQuestion ? false : "x"}
      dragElastic={0.2}
      dragMomentum
      dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
      style={{ x, rotate }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110 || info.velocity.x > 520) {
          onSwipe("right");
          return;
        }
        if (info.offset.x < -110 || info.velocity.x < -520) {
          onSwipe("left");
          return;
        }
        x.set(0);
      }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="absolute inset-0 cursor-grab overflow-hidden rounded-[1.85rem] border border-white/10 bg-card shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] will-change-transform active:cursor-grabbing"
    >
      {/* Top gradient accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-hero" />

      {/* Subtle ambient glow inside card */}
      <div
        className={`pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full opacity-30 blur-3xl ${orbClass[subjectId]}`}
      />

      {/* Decision stamps */}
      <motion.div
        style={{ opacity: skipOpacity }}
        className="pointer-events-none absolute left-6 top-16 z-20 -rotate-[14deg] rounded-md border-[3px] border-destructive px-3 py-1 font-display text-xl font-black uppercase tracking-[0.18em] text-destructive"
      >
        Later
      </motion.div>
      <motion.div
        style={{ opacity: knownOpacity }}
        className="pointer-events-none absolute right-6 top-16 z-20 rotate-[14deg] rounded-md border-[3px] border-primary px-3 py-1 font-display text-xl font-black uppercase tracking-[0.18em] text-primary"
      >
        Known
      </motion.div>

      <div className="relative flex h-full min-h-0 flex-col p-5 sm:p-6">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                {subjectName}
              </span>
            </div>
            <p className="mt-2 truncate text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {formula.chapterTitle}
            </p>
          </div>
          <BookmarkButton
            subjectId={subjectId}
            chapterSlug={formula.chapterSlug}
            formulaId={formula.id}
            size="sm"
          />
        </div>

        {/* Title */}
        <h2 className="mt-4 shrink-0 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          {formula.title}
        </h2>

        {/* Formula display — hero element */}
        <div
          className={`mt-5 shrink-0 overflow-x-auto rounded-2xl border bg-gradient-to-br px-5 py-7 text-center text-primary shadow-inner ${heroFrameClass[subjectId]}`}
        >
          <MathExpr
            latex={formula.latex}
            expression={formula.expression}
            className="text-xl sm:text-2xl"
          />
        </div>

        {/* Scrollable content */}
        <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
          {formula.description ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{formula.description}</p>
          ) : null}

          <div
            className={`flex items-start gap-2.5 rounded-xl border border-accent/25 bg-accent/8 p-3.5 ${formula.description ? "mt-3" : ""}`}
          >
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/20">
              <Lightbulb className="h-3.5 w-3.5 text-accent" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                Quick Trick
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                {formula.trick ?? "Swipe right when memorized, left to revisit later."}
              </p>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {showQuestion ? (
              <motion.div
                key="q"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="mt-3 overflow-hidden rounded-xl border border-primary/25 bg-primary/5"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    Quick Test
                  </div>
                  <p className="mt-1.5 text-sm text-foreground/90">{question.prompt}</p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(["left", "right"] as const).map((side) => {
                      const text = side === "left" ? question.left : question.right;
                      const chosen = picked === side;
                      const correct = picked !== null && side === question.correctSide;
                      const wrong = chosen && side !== question.correctSide;

                      return (
                        <button
                          key={side}
                          type="button"
                          disabled={picked !== null}
                          onClick={() => setPicked(side)}
                          className={`relative flex min-h-[4.5rem] flex-col rounded-xl border px-2.5 py-2.5 text-left transition-all ${
                            correct
                              ? "border-primary bg-primary/15"
                              : wrong
                                ? "border-destructive bg-destructive/15"
                                : "border-border bg-background/60 hover:border-primary/40 hover:bg-secondary/50"
                          } disabled:cursor-default`}
                        >
                          <span className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                            {side === "left" ? "A" : "B"}
                          </span>
                          <span className="line-clamp-3 font-mono text-xs text-primary">
                            {text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {picked !== null ? (
                    <div className="mt-3 rounded-lg border border-border bg-background/60 p-2.5">
                      <div
                        className={`text-xs font-bold uppercase tracking-wide ${picked === question.correctSide ? "text-primary" : "text-destructive"}`}
                      >
                        {picked === question.correctSide ? "✓ Correct" : "✗ Incorrect"}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{question.explain}</p>
                    </div>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      setShowQuestion(false);
                      setPicked(null);
                    }}
                    className="mt-2.5 w-full rounded-lg border border-border bg-background/60 py-1.5 text-xs font-semibold hover:bg-secondary/60"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex shrink-0 flex-col items-center gap-2 pt-1">
          <button
            type="button"
            aria-label="Open test"
            title="Test"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              openTest();
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent/50 bg-accent/15 font-display text-xl font-black text-accent shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all hover:scale-105 hover:border-accent hover:bg-accent/25"
          >
            T
          </button>
          <p className="text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Swipe the card • T opens quick test
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function buildBinaryQuestion(
  formula: SwipeFormula,
  formulas: SwipeFormula[],
  variant: number,
): BinaryQuestion {
  const others = formulas.filter((item) => item.id !== formula.id);
  const explain =
    formula.trick ??
    formula.description ??
    "Remember the exact structure of this formula before moving on.";

  if (others.length === 0) {
    return {
      prompt: `Which expression matches ${formula.title}?`,
      left: formula.expression,
      right: "—",
      correctSide: "left",
      explain,
    };
  }

  const wrong = others[variant % others.length]!.expression;
  const correctOnLeft = variant % 2 === 0;

  return {
    prompt: `Which expression matches ${formula.title}?`,
    left: correctOnLeft ? formula.expression : wrong,
    right: correctOnLeft ? wrong : formula.expression,
    correctSide: correctOnLeft ? "left" : "right",
    explain,
  };
}
