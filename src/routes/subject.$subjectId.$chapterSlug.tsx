import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb, RotateCcw, Check, X, BrainCircuit, Flame, ShieldCheck } from "lucide-react";
import { getChapter, getSubject } from "@/data/content";
import { subjectGradient } from "@/components/SubjectIcon";
import { MathExpr } from "@/components/MathExpr";
import { BookmarkButton } from "@/components/BookmarkButton";
import { useStreak } from "@/hooks/useStreak";

export const Route = createFileRoute("/subject/$subjectId/$chapterSlug")({
  loader: ({ params }) => {
    const subject = getSubject(params.subjectId);
    const chapter = getChapter(params.subjectId, params.chapterSlug);
    if (!subject || !chapter) throw notFound();
    return { subject, chapter };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.chapter.title} — ${loaderData.subject.name} | Soni Classes`,
          },
          {
            name: "description",
            content: `${loaderData.chapter.title} formulas, tricks and a quick quiz for ${loaderData.subject.exam} preparation.`,
          },
          {
            property: "og:title",
            content: `${loaderData.chapter.title} — ${loaderData.subject.name}`,
          },
          {
            property: "og:description",
            content: `Formulas, tricks & quick quiz on ${loaderData.chapter.title}.`,
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-8 text-center">
      <h1 className="font-display text-2xl font-bold">Chapter not found</h1>
      <Link to="/" className="mt-4 inline-block text-primary underline">Back home</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md p-8 text-center">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
  component: ChapterPage,
});

type Tab = "formulas" | "flashcards" | "quiz";
const LAST_PROGRESS_KEY = "soni-last-progress";
type ChapterData = NonNullable<ReturnType<typeof getChapter>>;
type SwipeOutcome = "known" | "unknown";
type FormulaTest = {
  formulaId: string;
  title: string;
  question: string;
  options: string[];
  answer: number;
  explain?: string;
};

function ChapterPage() {
  const { subject, chapter } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("formulas");

  useEffect(() => {
    const progressByTab: Record<Tab, number> = {
      formulas: 35,
      flashcards: 70,
      quiz: 100,
    };

    window.localStorage.setItem(
      LAST_PROGRESS_KEY,
      JSON.stringify({
        subjectId: subject.id,
        subjectName: subject.name,
        chapterSlug: chapter.slug,
        chapterTitle: chapter.title,
        progress: progressByTab[tab],
        updatedAt: Date.now(),
      }),
    );
  }, [chapter.slug, chapter.title, subject.id, subject.name, tab]);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-16">
      <Link
        to="/subject/$subjectId"
        params={{ subjectId: subject.id }}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> {subject.name}
      </Link>

      <header className="mt-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-2xl bg-secondary flex items-center justify-center text-2xl">
            {chapter.emoji}
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight">{chapter.title}</h1>
            <div className="text-xs text-muted-foreground">
              {subject.name} · {chapter.formulas.length} formulas · {chapter.quiz.length} questions
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mt-5 grid grid-cols-3 gap-1 p-1 rounded-2xl glass">
        {(["formulas", "flashcards", "quiz"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative rounded-xl py-2 text-xs sm:text-sm font-semibold capitalize transition-colors ${
              tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === t && (
              <motion.span
                layoutId="tab-pill"
                className={`absolute inset-0 -z-10 rounded-xl ${subjectGradient(subject.id)}`}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "formulas" && <FormulaList chapter={chapter} subjectId={subject.id} />}
        {tab === "flashcards" && <Flashcards chapter={chapter} subjectId={subject.id} />}
        {tab === "quiz" && <Quiz chapter={chapter} subjectId={subject.id} />}
      </div>
    </div>
  );
}

function SwipeFormulaRevision({ chapter, subjectId }: { chapter: ChapterData; subjectId: string }) {
  const { addXp } = useStreak();
  const [deck, setDeck] = useState(() => chapter.formulas.map((formula) => formula.id));
  const [knownIds, setKnownIds] = useState<string[]>([]);
  const [unknownIds, setUnknownIds] = useState<string[]>([]);
  const [test, setTest] = useState<FormulaTest | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [swipesSinceTest, setSwipesSinceTest] = useState(0);

  useEffect(() => {
    setDeck(chapter.formulas.map((formula) => formula.id));
    setKnownIds([]);
    setUnknownIds([]);
    setTest(null);
    setPicked(null);
    setSwipesSinceTest(0);
  }, [chapter]);

  const currentFormula = chapter.formulas.find((formula) => formula.id === deck[0]) ?? null;
  const previewCards = deck
    .slice(1, 3)
    .map((formulaId) => chapter.formulas.find((formula) => formula.id === formulaId))
    .filter((formula): formula is ChapterData["formulas"][number] => Boolean(formula));

  const totalReviewed = knownIds.length + unknownIds.length;
  const completion = chapter.formulas.length === 0 ? 0 : Math.round((totalReviewed / chapter.formulas.length) * 100);
  const weakFormulas = chapter.formulas.filter((formula) => unknownIds.includes(formula.id));
  const testCorrect = picked === test?.answer;

  const openTestFor = (formulaId: string) => {
    setTest(buildFormulaTest(chapter, formulaId));
    setPicked(null);
  };

  const moveFormula = (outcome: SwipeOutcome) => {
    if (!currentFormula) return;

    if (outcome === "known") {
      setKnownIds((prev) => (prev.includes(currentFormula.id) ? prev : [...prev, currentFormula.id]));
      addXp(5);
    } else {
      setUnknownIds((prev) => (prev.includes(currentFormula.id) ? prev : [...prev, currentFormula.id]));
      addXp(2);
    }

    setDeck((prev) => prev.slice(1));

    const nextSwipeCount = swipesSinceTest + 1;
    if (nextSwipeCount >= 3) {
      setSwipesSinceTest(0);
      openTestFor(currentFormula.id);
      return;
    }

    setSwipesSinceTest(nextSwipeCount);
  };

  const restartAll = () => {
    setDeck(chapter.formulas.map((formula) => formula.id));
    setKnownIds([]);
    setUnknownIds([]);
    setTest(null);
    setPicked(null);
    setSwipesSinceTest(0);
  };

  const reviewWeakOnly = () => {
    if (weakFormulas.length === 0) return;

    setDeck(weakFormulas.map((formula) => formula.id));
    setKnownIds([]);
    setUnknownIds([]);
    setTest(null);
    setPicked(null);
    setSwipesSinceTest(0);
  };

  if (totalReviewed >= chapter.formulas.length && deck.length === 0 && !test) {
    return (
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="card-soft rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2.5 py-1 text-primary">
              <BrainCircuit className="h-3.5 w-3.5" /> Swipe Revision Complete
            </span>
            <span>{chapter.title}</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold">Your weak formulas are ready for round two.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Known: {knownIds.length} • Weak: {unknownIds.length} • Completion: {completion}%
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={reviewWeakOnly} disabled={weakFormulas.length === 0} className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">
              Review Weak Formulas
            </button>
            <button onClick={restartAll} className="rounded-xl glass px-5 py-3 text-sm font-semibold hover:bg-secondary">
              Restart Chapter
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {weakFormulas.length > 0 ? (
            weakFormulas.map((formula) => (
              <div key={formula.id} className="card-soft rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${subjectGradient(subjectId as never)}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold">{formula.title}</h3>
                      <BookmarkButton subjectId={subjectId} chapterSlug={chapter.slug} formulaId={formula.id} size="sm" />
                    </div>
                    <div className="mt-2 overflow-x-auto rounded-xl border border-border bg-background/60 px-3 py-2 text-primary">
                      <MathExpr latex={formula.latex} expression={formula.expression} />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{formula.trick ?? formula.description ?? "Revise this once more for better recall."}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card-soft rounded-2xl p-5 text-sm text-muted-foreground sm:col-span-2">
              No weak formulas left. This chapter is ready for a timed quiz.
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <ProgressPill icon={<ShieldCheck className="h-4 w-4" />} label="Known" value={knownIds.length} tone="primary" />
        <ProgressPill icon={<Flame className="h-4 w-4" />} label="Weak" value={unknownIds.length} tone="destructive" />
        <ProgressPill icon={<BrainCircuit className="h-4 w-4" />} label="Progress" value={`${completion}%`} tone="muted" />
      </div>

      <div className="card-soft rounded-3xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Swipe Revision</div>
            <p className="mt-1 text-sm text-muted-foreground">Swipe right for known, left for weak, or tap Test Me to check recall.</p>
          </div>
          <div className="rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
            {Math.max(deck.length, 0)} cards left
          </div>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div className={`h-full ${subjectGradient(subjectId as never)}`} animate={{ width: `${completion}%` }} transition={{ duration: 0.35 }} />
        </div>

        <div className="relative mt-6 h-[29rem]">
          {previewCards
            .slice()
            .reverse()
            .map((formula, index) => (
              <div
                key={formula.id}
                className="absolute inset-x-3 top-0 rounded-[1.75rem] border border-white/6 bg-background/30 shadow-card"
                style={{
                  transform: `translateY(${(index + 1) * 14}px) scale(${1 - (index + 1) * 0.04})`,
                  opacity: 0.45 - index * 0.12,
                  height: "24rem",
                }}
              />
            ))}

          <AnimatePresence mode="wait">
            {test && currentFormula ? (
              <FormulaTestCard
                key={`test-${test.formulaId}`}
                test={test}
                picked={picked}
                setPicked={setPicked}
                isCorrect={testCorrect}
                onContinue={() => {
                  setTest(null);
                  setPicked(null);
                }}
              />
            ) : currentFormula ? (
              <SwipeCard
                key={currentFormula.id}
                formula={currentFormula}
                subjectId={subjectId}
                onSwipe={moveFormula}
                onTestMe={() => openTestFor(currentFormula.id)}
              />
            ) : null}
          </AnimatePresence>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={() => moveFormula("unknown")} disabled={!currentFormula || Boolean(test)} className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive disabled:cursor-not-allowed disabled:opacity-50">
            Swipe Left: Weak
          </button>
          <button onClick={() => moveFormula("known")} disabled={!currentFormula || Boolean(test)} className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50">
            Swipe Right: Known
          </button>
        </div>
      </div>
    </div>
  );
}

function SwipeCard({
  formula,
  subjectId,
  onSwipe,
  onTestMe,
}: {
  formula: ChapterData["formulas"][number];
  subjectId: string;
  onSwipe: (outcome: SwipeOutcome) => void;
  onTestMe: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 0, 180], [-16, 0, 16]);
  const knownOpacity = useTransform(x, [30, 140], [0, 1]);
  const weakOpacity = useTransform(x, [-140, -30], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -12 }}
      drag="x"
      dragElastic={0.15}
      style={{ x, rotate }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) {
          onSwipe("known");
          return;
        }

        if (info.offset.x < -120) {
          onSwipe("unknown");
          return;
        }

        x.set(0);
      }}
      className="absolute inset-0 rounded-[2rem] card-soft p-5 sm:p-6"
    >
      <motion.div style={{ opacity: weakOpacity }} className="absolute left-4 top-4 rounded-full border border-destructive/40 bg-destructive/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-destructive">
        Weak
      </motion.div>
      <motion.div style={{ opacity: knownOpacity }} className="absolute right-4 top-4 rounded-full border border-primary/40 bg-primary/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Known
      </motion.div>

      <div className="flex h-full flex-col">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Swipe Card</div>
        <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{formula.title}</h3>
        <div className={`mt-3 h-1.5 w-16 rounded-full ${subjectGradient(subjectId as never)}`} />
        <div className="mt-5 rounded-2xl border border-border bg-background/60 px-4 py-4 font-mono text-lg text-primary sm:text-2xl">
          {formula.expression}
        </div>
        {formula.description ? <p className="mt-4 text-sm text-muted-foreground">{formula.description}</p> : null}
        <div className="mt-4 rounded-2xl border border-accent/25 bg-accent/8 p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-accent">Memory Hook</div>
              <p className="mt-1 text-sm text-foreground/90">{formula.trick ?? "Mark it known or weak, then test it before moving on."}</p>
            </div>
          </div>
        </div>
        <div className="mt-auto grid grid-cols-1 gap-3 pt-5 sm:grid-cols-3">
          <button onClick={onTestMe} className="rounded-2xl glass px-4 py-3 text-sm font-semibold hover:bg-secondary sm:col-span-3">
            Tap to Test Me
          </button>
          <button onClick={() => onSwipe("unknown")} className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
            Weak
          </button>
          <button onClick={() => onSwipe("known")} className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground sm:col-span-2">
            I Know This
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FormulaTestCard({
  test,
  picked,
  setPicked,
  isCorrect,
  onContinue,
}: {
  test: FormulaTest;
  picked: number | null;
  setPicked: (value: number | null) => void;
  isCorrect: boolean;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="absolute inset-0 rounded-[2rem] card-soft p-5 sm:p-6"
    >
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Quick Test</div>
      <h3 className="mt-3 font-display text-2xl font-bold">{test.title}</h3>
      <p className="mt-2 text-base text-foreground/88">{test.question}</p>

      <div className="mt-5 grid gap-3">
        {test.options.map((option, index) => {
          const chosen = picked === index;
          const correct = picked !== null && index === test.answer;
          const wrong = chosen && index !== test.answer;

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
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4">
          <div className={`font-semibold ${isCorrect ? "text-primary" : "text-destructive"}`}>
            {isCorrect ? "Strong recall." : "This one needs another pass."}
          </div>
          {test.explain ? <p className="mt-1 text-sm text-muted-foreground">{test.explain}</p> : null}
          <button onClick={onContinue} className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            Continue Swiping
          </button>
        </motion.div>
      ) : (
        <div className="mt-5 rounded-2xl border border-border bg-secondary/20 px-4 py-3 text-sm text-muted-foreground">
          Answer this before moving back to the swipe deck.
        </div>
      )}
    </motion.div>
  );
}

function ProgressPill({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  tone: "primary" | "destructive" | "muted";
}) {
  const toneClass =
    tone === "primary"
      ? "text-primary bg-primary/12"
      : tone === "destructive"
      ? "text-destructive bg-destructive/12"
      : "text-muted-foreground bg-secondary/50";

  return (
    <div className="card-soft rounded-2xl px-4 py-3">
      <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass}`}>
        {icon}
        {label}
      </div>
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
    </div>
  );
}

function buildFormulaTest(chapter: ChapterData, formulaId: string): FormulaTest {
  const formulaIndex = chapter.formulas.findIndex((formula) => formula.id === formulaId);
  const formula = chapter.formulas[formulaIndex] ?? chapter.formulas[0];
  const distractors = chapter.formulas
    .filter((item) => item.id !== formula.id)
    .slice(formulaIndex, formulaIndex + 3);

  while (distractors.length < 3) {
    const fallback = chapter.formulas[distractors.length];
    if (!fallback || fallback.id === formula.id || distractors.some((item) => item.id === fallback.id)) break;
    distractors.push(fallback);
  }

  const answer = Math.min(formulaIndex % 4, distractors.length);
  const options = [...distractors.map((item) => item.expression)];
  options.splice(answer, 0, formula.expression);

  return {
    formulaId: formula.id,
    title: formula.title,
    question: `What is the correct formula for ${formula.title}?`,
    options: options.slice(0, 4),
    answer,
    explain: formula.trick ?? formula.description ?? "Review the expression once more, then swipe it again.",
  };
}

function FormulaList({ chapter, subjectId }: { chapter: ChapterData; subjectId: string }) {
  return <SwipeFormulaRevision chapter={chapter} subjectId={subjectId} />;
}

function Flashcards({ chapter, subjectId }: { chapter: ChapterData; subjectId: string }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = chapter.formulas[i];
  const next = () => { setFlipped(false); setI((p) => (p + 1) % chapter.formulas.length); };
  const prev = () => { setFlipped(false); setI((p) => (p - 1 + chapter.formulas.length) % chapter.formulas.length); };

  return (
    <div>
      <div className="text-center text-xs text-muted-foreground mb-2">
        {i + 1} / {chapter.formulas.length} · tap card to flip
      </div>
      <div className="relative h-72 [perspective:1200px]">
        <motion.button
          key={card.id}
          onClick={() => setFlipped((f) => !f)}
          className="absolute inset-0 w-full text-left [transform-style:preserve-3d] cursor-pointer"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* Front */}
          <div className="absolute inset-0 rounded-3xl card-soft p-6 flex flex-col items-center justify-center [backface-visibility:hidden]">
            <div className={`h-1 w-12 rounded-full mb-4 ${subjectGradient(subjectId as never)}`} />
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Formula</div>
            <h3 className="mt-2 font-display text-xl text-center">{card.title}</h3>
            <div className="mt-4 font-mono text-2xl sm:text-3xl text-primary text-center">{card.expression}</div>
            <div className="mt-6 text-[11px] text-muted-foreground">Tap for trick →</div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 rounded-3xl card-soft p-6 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-card">
            <Lightbulb className="h-6 w-6 text-accent mb-2" />
            <div className="text-xs uppercase tracking-wider text-accent">Trick</div>
            <p className="mt-3 text-center text-sm sm:text-base">{card.trick ?? card.description ?? "No trick — pure recall."}</p>
            {card.description && card.trick && (
              <p className="mt-3 text-center text-xs text-muted-foreground">{card.description}</p>
            )}
          </div>
        </motion.button>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button onClick={prev} className="rounded-xl glass px-4 py-2 text-sm font-semibold inline-flex items-center gap-1 hover:bg-secondary">
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <button onClick={() => setFlipped(false)} className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
        <button onClick={next} className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground inline-flex items-center gap-1 glow-primary">
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Quiz({ chapter, subjectId }: { chapter: ChapterData; subjectId: string }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = chapter.quiz[i];
  const isCorrect = picked === q?.answer;

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= chapter.quiz.length) { setDone(true); return; }
    setI((p) => p + 1);
    setPicked(null);
  };
  const restart = () => { setI(0); setPicked(null); setScore(0); setDone(false); };

  if (done) {
    const pct = Math.round((score / chapter.quiz.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-soft rounded-3xl p-8 text-center">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Result</div>
        <div className="mt-2 font-display text-5xl font-bold text-gradient-hero">{score}/{chapter.quiz.length}</div>
        <p className="mt-2 text-sm text-muted-foreground">{pct >= 80 ? "Crushed it! 🚀" : pct >= 50 ? "Solid — revise the misses." : "Time to revisit the formulas."}</p>
        <button onClick={restart} className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-primary inline-flex items-center gap-1">
          <RotateCcw className="h-4 w-4" /> Try again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="card-soft rounded-3xl p-5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Question {i + 1} of {chapter.quiz.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="mt-2 h-1 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div className={`h-full ${subjectGradient(subjectId as never)}`} animate={{ width: `${((i) / chapter.quiz.length) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <h3 className="mt-4 font-semibold text-base sm:text-lg">{q.q}</h3>
          <div className="mt-4 grid gap-2">
            {q.options.map((opt, idx) => {
              const chosen = picked === idx;
              const correct = picked !== null && idx === q.answer;
              const wrong = chosen && idx !== q.answer;
              return (
                <button
                  key={idx}
                  onClick={() => choose(idx)}
                  disabled={picked !== null}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm text-left transition-colors ${
                    correct
                      ? "border-primary bg-primary/15"
                      : wrong
                      ? "border-destructive bg-destructive/15"
                      : "border-border bg-secondary/40 hover:bg-secondary"
                  } disabled:cursor-default`}
                >
                  <span className="h-6 w-6 shrink-0 rounded-md bg-background/60 grid place-items-center text-xs font-mono">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {correct && <Check className="h-4 w-4 text-primary" />}
                  {wrong && <X className="h-4 w-4 text-destructive" />}
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl bg-secondary/50 border border-border p-3 text-sm">
              <div className={`font-semibold ${isCorrect ? "text-primary" : "text-destructive"}`}>
                {isCorrect ? "Correct!" : "Not quite."}
              </div>
              {q.explain && <p className="mt-1 text-muted-foreground">{q.explain}</p>}
              <button onClick={next} className="mt-3 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground inline-flex items-center gap-1">
                {i + 1 >= chapter.quiz.length ? "See result" : "Next question"} <ChevronRight className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
