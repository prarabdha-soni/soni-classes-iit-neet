import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { getSubject, type Formula } from "@/data/content";
import { subjectGradient } from "@/components/SubjectIcon";
import { MathExpr } from "@/components/MathExpr";
import { BookmarkButton } from "@/components/BookmarkButton";
import { useStreak } from "@/hooks/useStreak";

type HomeFormula = Formula & { chapterSlug: string; chapterTitle: string };
type HomeBinaryQuestion = {
  prompt: string;
  left: string;
  right: string;
  correctSide: "left" | "right";
  explain: string;
};
type SwipeDirection = "left" | "right" | null;

const homeSwipeCardVariants = {
  initial: { opacity: 0, scale: 0.97, y: 14 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: (direction: SwipeDirection) => ({
    opacity: 0,
    scale: 0.92,
    x: direction === "left" ? -520 : direction === "right" ? 520 : 0,
    rotate: direction === "left" ? -28 : direction === "right" ? 28 : 0,
  }),
} satisfies Variants;

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
  const formulas = useMemo(
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
  const [deck, setDeck] = useState<HomeFormula[]>(formulas);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>(null);
  const { addXp } = useStreak();

  if (!physics) {
    return null;
  }

  const current = deck[0] ?? null;
  const preview = deck.slice(1, 3);

  const resetDeck = () => setDeck(formulas);
  const swipe = (direction: Exclude<SwipeDirection, null>) => {
    setSwipeDirection(direction);
    addXp(direction === "right" ? 5 : 2);
    setDeck((prev) => prev.slice(1));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-6">
      <div className="mb-4 text-center">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary">Swipe Formulas</div>
      </div>

      <div className="relative mx-auto max-w-xl">
        <div className="relative h-[34rem] overflow-visible rounded-[2.25rem] bg-gradient-to-b from-primary/12 via-background/40 to-destructive/10 p-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-background/20">
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
                      y: depth * 11,
                      scale: 1 - depth * 0.045,
                      rotate: depth % 2 === 0 ? 1.25 : -1.25,
                      opacity: 0.72 - index * 0.14,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="pointer-events-none absolute inset-x-4 top-1 rounded-[1.85rem] border border-white/10 bg-card/85 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm"
                    style={{ height: "calc(100% - 0.5rem)" }}
                  >
                    <div className="flex h-full flex-col justify-end p-5 pb-8">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Up next
                      </p>
                      <p className="mt-1 line-clamp-2 font-display text-lg font-bold leading-tight text-foreground/80">
                        {formula.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            <AnimatePresence mode="wait" custom={swipeDirection}>
              {current ? (
                <HomeSwipeCard
                  key={current.id}
                  formula={current}
                  formulas={formulas}
                  onSwipe={swipe}
                  swipeExitCustom={swipeDirection}
                />
              ) : (
                <motion.div
                  key="deck-empty"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 rounded-[2rem] card-soft p-6 text-center"
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Done for now
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-bold">
                    You finished the home swipe deck.
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Open the full chapter for deeper revision or restart this home stack.
                  </p>
                  <div className="mt-6 flex flex-col items-center gap-3">
                    <Link
                      to="/subject/$subjectId/$chapterSlug"
                      params={{ subjectId: "physics", chapterSlug: "laws-of-motion" }}
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                    >
                      Open Laws of Motion <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={resetDeck}
                      className="rounded-2xl glass px-5 py-3 text-sm font-semibold hover:bg-secondary"
                    >
                      Restart Cards
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeSwipeCard({
  formula,
  formulas,
  onSwipe,
  swipeExitCustom,
}: {
  formula: HomeFormula;
  formulas: HomeFormula[];
  onSwipe: (direction: Exclude<SwipeDirection, null>) => void;
  swipeExitCustom: SwipeDirection;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 0, 240], [-22, 0, 22]);
  const skipStampOpacity = useTransform(x, [-140, -52, 0], [1, 0.4, 0]);
  const knownStampOpacity = useTransform(x, [0, 52, 140], [0, 0.4, 1]);
  const cardShadow = useTransform(
    x,
    [-240, 0, 240],
    [
      "0 28px 64px rgba(0,0,0,0.48)",
      "0 14px 44px rgba(0,0,0,0.32)",
      "0 28px 64px rgba(0,0,0,0.48)",
    ],
  );
  const [showQuestion, setShowQuestion] = useState(false);
  const [picked, setPicked] = useState<"left" | "right" | null>(null);
  const [questionNonce, setQuestionNonce] = useState(0);
  const [testHeading, setTestHeading] = useState<"Question" | "Test">("Test");

  const question = useMemo(
    () => buildHomeBinaryQuestion(formula, formulas, questionNonce),
    [formula, formulas, questionNonce],
  );

  const openTest = () => {
    setQuestionNonce((n) => n + 1);
    setShowQuestion(true);
    setPicked(null);
  };

  const handleCardDoubleClick = () => {
    if (showQuestion) return;
    setTestHeading("Question");
    openTest();
  };

  return (
    <motion.div
      variants={homeSwipeCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={swipeExitCustom}
      drag={showQuestion ? false : "x"}
      dragElastic={0.22}
      dragMomentum
      dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
      style={{ x, rotate, boxShadow: cardShadow }}
      onDoubleClick={handleCardDoubleClick}
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
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className="absolute inset-0 cursor-grab overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-b from-card via-card to-card/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] will-change-transform active:cursor-grabbing"
    >
      <motion.div
        style={{ opacity: skipStampOpacity }}
        className="pointer-events-none absolute left-[10%] top-[20%] z-10 origin-center -rotate-[18deg] border-[5px] border-destructive/90 px-3 py-1.5 font-display text-2xl font-black uppercase tracking-[0.12em] text-destructive sm:left-[12%] sm:text-3xl"
      >
        Later
      </motion.div>
      <motion.div
        style={{ opacity: knownStampOpacity }}
        className="pointer-events-none absolute right-[10%] top-[18%] z-10 origin-center rotate-[16deg] border-[5px] border-primary px-3 py-1.5 font-display text-2xl font-black uppercase tracking-[0.12em] text-primary sm:right-[12%] sm:text-3xl"
      >
        Known
      </motion.div>
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {formula.chapterTitle}
          </div>
          <BookmarkButton
            subjectId="physics"
            chapterSlug={formula.chapterSlug}
            formulaId={formula.id}
            size="sm"
          />
        </div>
        <h2 className="mt-3 shrink-0 font-display text-3xl font-bold">{formula.title}</h2>
        <div className={`mt-4 h-1.5 w-16 shrink-0 rounded-full ${subjectGradient("physics")}`} />
        <div className="mt-6 shrink-0 overflow-x-auto rounded-2xl border border-border bg-background/60 px-4 py-5 text-primary">
          <MathExpr latex={formula.latex} expression={formula.expression} className="text-xl sm:text-3xl" />
        </div>

        <div
          className="mt-4 shrink-0 rounded-2xl border border-border bg-secondary/25 p-4"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Rate this formula
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Same as swiping the card—known skips ahead, still learning keeps it in rotation.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSwipe("right")}
              className="rounded-2xl bg-primary px-2 py-2.5 text-center text-xs font-semibold text-primary-foreground sm:text-sm"
            >
              Formula known
            </button>
            <button
              type="button"
              onClick={() => onSwipe("left")}
              className="rounded-2xl border border-destructive/40 bg-destructive/10 px-2 py-2.5 text-center text-xs font-semibold text-destructive sm:text-sm"
            >
              Still learning
            </button>
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
          {formula.description ? (
            <p className="text-sm text-muted-foreground">{formula.description}</p>
          ) : null}
          <div
            className={`rounded-2xl border border-accent/25 bg-accent/8 p-4 ${formula.description ? "mt-4" : ""}`}
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-sm text-foreground/90">
                {formula.trick ?? "Swipe to move through the next important formula."}
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
                className="mt-4 overflow-hidden rounded-2xl border border-accent/30 bg-accent/6"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {testHeading}
                  </div>
                  <p className="mt-2 text-sm text-foreground/90">{question.prompt}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
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
                          className={`relative flex min-h-[5.5rem] flex-col rounded-2xl border px-3 py-3 text-left transition-colors ${
                            correct
                              ? "border-primary bg-primary/15"
                              : wrong
                                ? "border-destructive bg-destructive/15"
                                : "border-border bg-background/50 hover:bg-secondary/50"
                          } disabled:cursor-default`}
                        >
                          <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                            {side === "left" ? "Left" : "Right"}
                          </span>
                          <span className="line-clamp-4 font-mono text-xs text-primary sm:text-sm">
                            {text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {picked !== null ? (
                    <div className="mt-4 rounded-xl border border-border bg-secondary/35 p-3">
                      <div
                        className={`text-sm font-semibold ${picked === question.correctSide ? "text-primary" : "text-destructive"}`}
                      >
                        {picked === question.correctSide
                          ? "Correct."
                          : "Not quite—compare with the card above."}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{question.explain}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setShowQuestion(false);
                          setPicked(null);
                        }}
                        className="mt-3 w-full rounded-lg border border-border bg-background/80 py-2 text-xs font-semibold hover:bg-secondary/60 sm:text-sm"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuestion(false);
                        setPicked(null);
                      }}
                      className="mt-3 w-full rounded-lg glass py-2 text-xs font-semibold hover:bg-secondary sm:text-sm"
                    >
                      Close
                    </button>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="relative mt-3 flex shrink-0 flex-col items-center gap-2 pt-2">
          <button
            type="button"
            aria-label="Open test"
            title="Test"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setTestHeading("Test");
              openTest();
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent/50 bg-accent/15 font-display text-lg font-bold text-accent shadow-sm transition-colors hover:border-accent hover:bg-accent/25"
          >
            T
          </button>
          <p className="text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            Double-click the card for a question — or tap T for the test
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function buildHomeBinaryQuestion(
  formula: HomeFormula,
  formulas: HomeFormula[],
  variant: number,
): HomeBinaryQuestion {
  const others = formulas.filter((item) => item.id !== formula.id);
  const explain =
    formula.trick ??
    formula.description ??
    "Remember the exact structure of this formula before moving on.";

  if (others.length === 0) {
    return {
      prompt: `Which side shows the expression for ${formula.title}?`,
      left: formula.expression,
      right: "—",
      correctSide: "left",
      explain,
    };
  }

  const wrong = others[variant % others.length]!.expression;
  const correctOnLeft = variant % 2 === 0;

  return {
    prompt: `Which side matches ${formula.title}?`,
    left: correctOnLeft ? formula.expression : wrong,
    right: correctOnLeft ? wrong : formula.expression,
    correctSide: correctOnLeft ? "left" : "right",
    explain,
  };
}
