import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Lightbulb, X } from "lucide-react";
import { getSubject, type Formula } from "@/data/content";
import { subjectGradient } from "@/components/SubjectIcon";

type HomeFormula = Formula & { chapterSlug: string; chapterTitle: string };
type HomeQuestion = {
  title: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};
type SwipeDirection = "left" | "right" | null;

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
    () => physics?.chapters.flatMap((chapter) =>
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

  if (!physics) {
    return null;
  }

  const current = deck[0] ?? null;
  const preview = deck.slice(1, 3);

  const resetDeck = () => setDeck(formulas);
  const swipe = (direction: Exclude<SwipeDirection, null>) => {
    setSwipeDirection(direction);
    setDeck((prev) => prev.slice(1));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-10 pt-6">
      <div className="mb-4 text-center">
        <div className="text-[11px] uppercase tracking-[0.22em] text-primary">Swipe Formulas</div>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Physics revision starts here</h1>
      </div>

      <div className="relative mx-auto h-[34rem] max-w-xl">
        {preview
          .slice()
          .reverse()
          .map((formula, index) => (
            <div
              key={formula.id}
              className="absolute inset-x-3 top-0 rounded-[2rem] border border-white/6 bg-background/30 shadow-card"
              style={{
                transform: `translateY(${(index + 1) * 16}px) scale(${1 - (index + 1) * 0.05})`,
                opacity: 0.5 - index * 0.12,
                height: "28rem",
              }}
            />
          ))}

        <AnimatePresence mode="wait" custom={swipeDirection}>
          {current ? (
            <HomeSwipeCard
              key={current.id}
              formula={current}
              formulas={formulas}
              onSwipe={swipe}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 rounded-[2rem] card-soft p-6 text-center"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Done for now</div>
              <h2 className="mt-3 font-display text-3xl font-bold">You finished the home swipe deck.</h2>
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
                <button onClick={resetDeck} className="rounded-2xl glass px-5 py-3 text-sm font-semibold hover:bg-secondary">
                  Restart Cards
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HomeSwipeCard({
  formula,
  formulas,
  onSwipe,
}: {
  formula: HomeFormula;
  formulas: HomeFormula[];
  onSwipe: (direction: Exclude<SwipeDirection, null>) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-18, 0, 18]);
  const cardScale = useTransform(y, [-180, 0, 0], [1.01, 1, 1]);
  const knownOpacity = useTransform(x, [35, 150], [0, 1]);
  const weakOpacity = useTransform(x, [-150, -35], [1, 0]);
  const upOpacity = useTransform(y, [-170, -45], [1, 0]);
  const cardShadow = useTransform(
    x,
    [-220, 0, 220],
    [
      "0 24px 70px rgba(0,0,0,0.42)",
      "0 12px 40px rgba(0,0,0,0.35)",
      "0 24px 70px rgba(0,0,0,0.42)",
    ],
  );
  const [showQuestion, setShowQuestion] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  const question = useMemo(() => buildHomeQuestion(formula, formulas), [formula, formulas]);

  return (
    <motion.div
      custom={null}
      initial={{ opacity: 0, scale: 0.97, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={(direction: SwipeDirection) => ({
        opacity: 0,
        scale: 0.96,
        x: direction === "left" ? -420 : direction === "right" ? 420 : 0,
        rotate: direction === "left" ? -22 : direction === "right" ? 22 : 0,
      })}
      drag
      dragElastic={0.12}
      dragMomentum
      dragTransition={{ bounceStiffness: 280, bounceDamping: 24 }}
      style={{ x, y, rotate, scale: cardScale, boxShadow: cardShadow }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -120) {
          setShowQuestion(true);
          setPicked(null);
          x.set(0);
          y.set(0);
          return;
        }

        if (info.offset.x > 130 || info.velocity.x > 600) {
          onSwipe("right");
          return;
        }

        if (info.offset.x < -130 || info.velocity.x < -600) {
          onSwipe("left");
          return;
        }
        x.set(0);
        y.set(0);
      }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="absolute inset-0 rounded-[2rem] card-soft p-6 will-change-transform"
    >
      <motion.div style={{ opacity: weakOpacity }} className="absolute left-4 top-4 rounded-full border border-destructive/40 bg-destructive/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
        Skip
      </motion.div>
      <motion.div style={{ opacity: knownOpacity }} className="absolute right-4 top-4 rounded-full border border-primary/40 bg-primary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Known
      </motion.div>
      <motion.div style={{ opacity: upOpacity }} className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Test Me
      </motion.div>

      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{formula.chapterTitle}</div>
        <h2 className="mt-3 font-display text-3xl font-bold">{formula.title}</h2>
        <div className={`mt-4 h-1.5 w-16 rounded-full ${subjectGradient("physics")}`} />
        <div className="mt-6 rounded-2xl border border-border bg-background/60 px-4 py-5 font-mono text-xl text-primary sm:text-3xl">
          {formula.expression}
        </div>
        {formula.description ? <p className="mt-4 text-sm text-muted-foreground">{formula.description}</p> : null}
        <div className="mt-4 rounded-2xl border border-accent/25 bg-accent/8 p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-sm text-foreground/90">{formula.trick ?? "Swipe to move through the next important formula."}</p>
          </div>
        </div>
        <div className="mt-auto pt-6 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Swipe left, right, or up
        </div>
      </div>

      <AnimatePresence>
        {showQuestion ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-3 rounded-[1.75rem] border border-border bg-background/96 p-5 backdrop-blur"
          >
            <div className="text-xs uppercase tracking-[0.18em] text-accent">Quick Question</div>
            <h3 className="mt-2 font-display text-2xl font-bold">{question.title}</h3>
            <p className="mt-2 text-sm text-foreground/88">{question.question}</p>

            <div className="mt-5 grid gap-3">
              {question.options.map((option, index) => {
                const chosen = picked === index;
                const correct = picked !== null && index === question.answer;
                const wrong = chosen && index !== question.answer;

                return (
                  <button
                    key={`${option}-${index}`}
                    onClick={() => setPicked(index)}
                    disabled={picked !== null}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      correct
                        ? "border-primary bg-primary/15"
                        : wrong
                        ? "border-destructive bg-destructive/15"
                        : "border-border bg-secondary/35 hover:bg-secondary"
                    } disabled:cursor-default`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-background/60 font-mono text-xs">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 font-mono text-primary">{option}</span>
                      {correct ? <Check className="h-4 w-4 text-primary" /> : null}
                      {wrong ? <X className="h-4 w-4 text-destructive" /> : null}
                    </div>
                  </button>
                );
              })}
            </div>

            {picked !== null ? (
              <div className="mt-5 rounded-2xl border border-border bg-secondary/35 p-4">
                <div className={`font-semibold ${picked === question.answer ? "text-primary" : "text-destructive"}`}>
                  {picked === question.answer ? "Correct." : "Try that formula once more."}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{question.explain}</p>
                <button
                  onClick={() => {
                    setShowQuestion(false);
                    setPicked(null);
                  }}
                  className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Back to Card
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowQuestion(false);
                  setPicked(null);
                }}
                className="mt-5 rounded-xl glass px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                Close
              </button>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function buildHomeQuestion(formula: HomeFormula, formulas: HomeFormula[]): HomeQuestion {
  const distractors = formulas
    .filter((item) => item.id !== formula.id)
    .slice(0, 3)
    .map((item) => item.expression);
  const answer = Math.min(1, distractors.length);
  const options = [...distractors];
  options.splice(answer, 0, formula.expression);

  return {
    title: formula.title,
    question: `Which formula matches ${formula.title}?`,
    options: options.slice(0, 4),
    answer,
    explain: formula.trick ?? formula.description ?? "Remember the exact structure of this formula before moving on.",
  };
}
