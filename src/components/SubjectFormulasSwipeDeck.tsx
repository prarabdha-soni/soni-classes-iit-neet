import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { BrainCircuit, Check, Lightbulb, X } from "lucide-react";
import type { Chapter, Formula, Subject } from "@/data/content";
import { subjectGradient } from "@/components/SubjectIcon";
import { MathExpr } from "@/components/MathExpr";
import { BookmarkButton } from "@/components/BookmarkButton";
import { useStreak } from "@/hooks/useStreak";

type SwipeOutcome = "known" | "unknown";

type FormulaTest = {
  formulaId: string;
  title: string;
  question: string;
  options: string[];
  answer: number;
  explain?: string;
};

export type FlatFormulaEntry = {
  key: string;
  chapter: Chapter;
  formula: Formula;
  chapterIndex: number;
  formulaIndexInChapter: number;
};

function flattenSubjectFormulas(subject: Subject): FlatFormulaEntry[] {
  const out: FlatFormulaEntry[] = [];
  subject.chapters.forEach((chapter, ci) => {
    chapter.formulas.forEach((formula, fi) => {
      out.push({
        key: `${chapter.slug}::${formula.id}`,
        chapter,
        formula,
        chapterIndex: ci + 1,
        formulaIndexInChapter: fi + 1,
      });
    });
  });
  return out;
}

function buildFormulaTest(chapter: Chapter, formulaId: string): FormulaTest {
  const formulaIndex = chapter.formulas.findIndex((f) => f.id === formulaId);
  const formula = chapter.formulas[formulaIndex] ?? chapter.formulas[0]!;
  const distractors = chapter.formulas
    .filter((item) => item.id !== formulaId)
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
      className="absolute inset-0 rounded-[2rem] card-soft p-4 sm:p-6"
    >
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">Quick test</div>
      <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{test.title}</h3>
      <p className="mt-2 text-sm text-foreground/90 sm:text-base">{test.question}</p>

      <div className="mt-4 grid gap-2 sm:gap-3">
        {test.options.map((option, index) => {
          const chosen = picked === index;
          const correct = picked !== null && index === test.answer;
          const wrong = chosen && index !== test.answer;

          return (
            <button
              key={`${option}-${index}`}
              type="button"
              onClick={() => setPicked(index)}
              disabled={picked !== null}
              className={`rounded-2xl border px-3 py-2.5 text-left text-sm transition-colors ${
                correct
                  ? "border-primary bg-primary/15"
                  : wrong
                    ? "border-destructive bg-destructive/15"
                    : "border-border bg-secondary/35 hover:bg-secondary"
              } disabled:cursor-default`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-background/60 font-mono text-[10px] font-bold sm:h-7 sm:w-7 sm:text-xs">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="min-w-0 flex-1 font-mono text-xs text-primary sm:text-sm">{option}</span>
                {correct ? <Check className="h-4 w-4 shrink-0 text-primary" /> : null}
                {wrong ? <X className="h-4 w-4 shrink-0 text-destructive" /> : null}
              </div>
            </button>
          );
        })}
      </div>

      {picked !== null ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-2xl border border-border bg-secondary/40 p-3 sm:p-4"
        >
          <div className={`text-sm font-semibold ${isCorrect ? "text-primary" : "text-destructive"}`}>
            {isCorrect ? "Strong recall." : "This one needs another pass."}
          </div>
          {test.explain ? <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{test.explain}</p> : null}
          <button
            type="button"
            onClick={onContinue}
            className="mt-3 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground sm:text-sm"
          >
            Continue swiping
          </button>
        </motion.div>
      ) : (
        <div className="mt-4 rounded-2xl border border-border bg-secondary/20 px-3 py-2.5 text-xs text-muted-foreground sm:text-sm">
          Answer this before moving back to the swipe deck.
        </div>
      )}
    </motion.div>
  );
}

function SubjectFormulaSwipeCard({
  entry,
  subjectId,
  globalIndex,
  globalTotal,
  onSwipe,
  onTestMe,
}: {
  entry: FlatFormulaEntry;
  subjectId: string;
  globalIndex: number;
  globalTotal: number;
  onSwipe: (outcome: SwipeOutcome) => void;
  onTestMe: () => void;
}) {
  const { formula, chapter } = entry;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 0, 180], [-16, 0, 16]);
  const knownOpacity = useTransform(x, [30, 140], [0, 1]);
  const weakOpacity = useTransform(x, [-140, -30], [1, 0]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -8, transition: { duration: 0.14, ease: "easeIn" } }}
      transition={{ type: "spring", stiffness: 520, damping: 38 }}
      drag="x"
      dragElastic={0.12}
      dragMomentum={false}
      style={{ x, rotate }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110 || info.velocity.x > 520) {
          onSwipe("known");
          return;
        }
        if (info.offset.x < -110 || info.velocity.x < -520) {
          onSwipe("unknown");
          return;
        }
        x.set(0);
      }}
      className="absolute inset-0 cursor-grab touch-none overscroll-x-contain rounded-[2rem] card-soft p-4 sm:p-6 select-none active:cursor-grabbing"
    >
      <motion.div
        style={{ opacity: weakOpacity }}
        className="absolute left-3 top-3 rounded-full border border-destructive/40 bg-destructive/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-destructive sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs"
      >
        Weak
      </motion.div>
      <motion.div
        style={{ opacity: knownOpacity }}
        className="absolute right-3 top-3 rounded-full border border-primary/40 bg-primary/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs"
      >
        Known
      </motion.div>

      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">Swipe formula</div>
            <p className="mt-0.5 truncate text-xs font-medium text-foreground/90 sm:text-sm">
              {chapter.emoji} {chapter.title}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="rounded-lg border border-border/80 bg-background/90 px-1.5 py-0.5 text-right shadow-sm ring-1 ring-white/5 backdrop-blur-sm sm:px-2 sm:py-1">
              <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-muted-foreground sm:text-[9px]">
                All formulas
              </div>
              <div className="mt-0.5 font-mono text-[10px] font-black tabular-nums leading-none text-primary sm:text-xs">
                {String(globalIndex).padStart(2, "0")}/{String(globalTotal).padStart(2, "0")}
              </div>
            </div>
            <BookmarkButton subjectId={subjectId} chapterSlug={chapter.slug} formulaId={formula.id} size="sm" />
          </div>
        </div>

        <h3 className="mt-2 shrink-0 font-display text-xl font-bold leading-tight sm:text-2xl md:text-3xl">{formula.title}</h3>
        <div className={`mt-2 h-1.5 w-14 shrink-0 rounded-full sm:mt-3 sm:w-16 ${subjectGradient(subjectId as never)}`} />
        <div className="mt-3 min-h-0 flex-1 overflow-y-auto overflow-x-auto rounded-2xl border border-border bg-background/60 px-3 py-3 text-primary sm:px-4 sm:py-4">
          <MathExpr latex={formula.latex} expression={formula.expression} className="text-lg sm:text-xl md:text-2xl" />
        </div>
        {formula.description ? (
          <p className="mt-2 shrink-0 text-xs text-muted-foreground sm:text-sm">{formula.description}</p>
        ) : null}
        <div className="mt-2 shrink-0 rounded-2xl border border-accent/25 bg-accent/8 p-3 sm:mt-3 sm:p-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent sm:h-4 sm:w-4" />
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent sm:text-xs">Memory hook</div>
              <p className="mt-0.5 text-xs leading-relaxed text-foreground/90 sm:text-sm">
                {formula.trick ?? "Mark it known or weak, then test it before moving on."}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto grid shrink-0 grid-cols-1 gap-2 pt-3 sm:grid-cols-3 sm:gap-3 sm:pt-4">
          <button
            type="button"
            onClick={onTestMe}
            className="rounded-2xl glass px-3 py-2.5 text-xs font-semibold hover:bg-secondary sm:px-4 sm:py-3 sm:text-sm sm:col-span-3"
          >
            Tap to test me
          </button>
          <button
            type="button"
            onClick={() => onSwipe("unknown")}
            className="rounded-2xl border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-xs font-semibold text-destructive sm:px-4 sm:py-3 sm:text-sm"
          >
            Weak
          </button>
          <button
            type="button"
            onClick={() => onSwipe("known")}
            className="rounded-2xl bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground sm:px-4 sm:py-3 sm:text-sm sm:col-span-2"
          >
            I know this
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function SubjectFormulasSwipeDeck({ subject }: { subject: Subject }) {
  const subjectId = subject.id;
  const { addXp } = useStreak();
  const entries = useMemo(() => flattenSubjectFormulas(subject), [subject]);
  const totalFormulas = entries.length;

  const [deckKeys, setDeckKeys] = useState<string[]>(() => entries.map((e) => e.key));
  const [knownKeys, setKnownKeys] = useState<string[]>([]);
  const [unknownKeys, setUnknownKeys] = useState<string[]>([]);
  const [test, setTest] = useState<FormulaTest | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [swipesSinceTest, setSwipesSinceTest] = useState(0);

  useEffect(() => {
    setDeckKeys(entries.map((e) => e.key));
    setKnownKeys([]);
    setUnknownKeys([]);
    setTest(null);
    setPicked(null);
    setSwipesSinceTest(0);
  }, [entries]);

  const keyToEntry = useMemo(() => {
    const m = new Map<string, FlatFormulaEntry>();
    entries.forEach((e) => m.set(e.key, e));
    return m;
  }, [entries]);

  const currentKey = deckKeys[0] ?? null;
  const currentEntry = currentKey ? keyToEntry.get(currentKey) ?? null : null;

  const previewEntries = deckKeys
    .slice(1, 3)
    .map((k) => keyToEntry.get(k))
    .filter((e): e is FlatFormulaEntry => Boolean(e));

  const totalReviewed = knownKeys.length + unknownKeys.length;
  const completion = totalFormulas === 0 ? 0 : Math.round((totalReviewed / totalFormulas) * 100);
  const weakEntries = entries.filter((e) => unknownKeys.includes(e.key));
  const testCorrect = picked === test?.answer;

  const globalIndexForCard = currentEntry ? entries.findIndex((e) => e.key === currentEntry.key) + 1 : 0;

  const openTestFor = (entry: FlatFormulaEntry) => {
    setTest(buildFormulaTest(entry.chapter, entry.formula.id));
    setPicked(null);
  };

  const moveFormula = (outcome: SwipeOutcome) => {
    if (!currentEntry || !currentKey) return;

    if (outcome === "known") {
      setKnownKeys((prev) => (prev.includes(currentKey) ? prev : [...prev, currentKey]));
      addXp(5);
    } else {
      setUnknownKeys((prev) => (prev.includes(currentKey) ? prev : [...prev, currentKey]));
      addXp(2);
    }

    setDeckKeys((prev) => prev.slice(1));

    const nextSwipeCount = swipesSinceTest + 1;
    if (nextSwipeCount >= 3) {
      setSwipesSinceTest(0);
      openTestFor(currentEntry);
      return;
    }
    setSwipesSinceTest(nextSwipeCount);
  };

  const restartAll = () => {
    setDeckKeys(entries.map((e) => e.key));
    setKnownKeys([]);
    setUnknownKeys([]);
    setTest(null);
    setPicked(null);
    setSwipesSinceTest(0);
  };

  const reviewWeakOnly = () => {
    if (weakEntries.length === 0) return;
    setDeckKeys(weakEntries.map((e) => e.key));
    setKnownKeys([]);
    setUnknownKeys([]);
    setTest(null);
    setPicked(null);
    setSwipesSinceTest(0);
  };

  if (totalFormulas === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No formulas in this subject yet.
      </div>
    );
  }

  if (totalReviewed >= totalFormulas && deckKeys.length === 0 && !test) {
    return (
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="card-soft rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2.5 py-1 text-primary">
              <BrainCircuit className="h-3.5 w-3.5" /> Deck complete
            </span>
            <span>{subject.name}</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">All formulas swiped once.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Known: {knownKeys.length} · Weak: {unknownKeys.length} · {completion}%
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reviewWeakOnly}
              disabled={weakEntries.length === 0}
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              Review weak only
            </button>
            <button
              type="button"
              onClick={restartAll}
              className="rounded-xl glass px-5 py-3 text-sm font-semibold hover:bg-secondary"
            >
              Restart full deck
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {weakEntries.length > 0 ? (
            weakEntries.map((e) => (
              <div key={e.key} className="card-soft rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${subjectGradient(subjectId as never)}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold">{e.formula.title}</h3>
                      <BookmarkButton subjectId={subjectId} chapterSlug={e.chapter.slug} formulaId={e.formula.id} size="sm" />
                    </div>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {e.chapter.emoji} {e.chapter.title}
                    </p>
                    <div className="mt-2 overflow-x-auto rounded-xl border border-border bg-background/60 px-3 py-2 text-primary">
                      <MathExpr latex={e.formula.latex} expression={e.formula.expression} />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {e.formula.trick ?? e.formula.description ?? "Revise once more."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card-soft rounded-2xl p-5 text-sm text-muted-foreground sm:col-span-2">
              No weak formulas — you cleared the stack.
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-3 sm:space-y-4">
      <div className="flex min-h-0 flex-1 flex-col rounded-3xl border border-white/8 bg-card/50 p-3 sm:p-4">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">Swipe formulas</div>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
              Right = know it · Left = weak · Quick test every few swipes
            </p>
          </div>
          <div className="rounded-full bg-secondary px-2.5 py-1 text-[10px] text-muted-foreground sm:text-xs">
            {Math.max(deckKeys.length, 0)} left · {totalFormulas} total
          </div>
        </div>

        <div className="mt-3 h-1.5 w-full shrink-0 overflow-hidden rounded-full bg-secondary sm:mt-4">
          <motion.div
            className={`h-full ${subjectGradient(subjectId as never)}`}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>

        <div className="relative mt-3 min-h-0 flex-1 sm:mt-4">
          <div className="absolute inset-0 min-h-[18rem] sm:min-h-[22rem]">
            {previewEntries
              .slice()
              .reverse()
              .map((e, index) => (
                <div
                  key={e.key}
                  className="absolute inset-x-2 top-0 rounded-[1.75rem] border border-white/6 bg-background/30 shadow-card sm:inset-x-3"
                  style={{
                    transform: `translateY(${(index + 1) * 12}px) scale(${1 - (index + 1) * 0.035})`,
                    opacity: 0.42 - index * 0.1,
                    height: "calc(100% - 0.5rem)",
                  }}
                />
              ))}

            <AnimatePresence mode="sync">
              {test && currentEntry ? (
                <FormulaTestCard
                  key={`test-${currentEntry.key}`}
                  test={test}
                  picked={picked}
                  setPicked={setPicked}
                  isCorrect={testCorrect}
                  onContinue={() => {
                    setTest(null);
                    setPicked(null);
                  }}
                />
              ) : currentEntry ? (
                <SubjectFormulaSwipeCard
                  key={currentEntry.key}
                  entry={currentEntry}
                  subjectId={subjectId}
                  globalIndex={globalIndexForCard}
                  globalTotal={totalFormulas}
                  onSwipe={moveFormula}
                  onTestMe={() => openTestFor(currentEntry)}
                />
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-3 grid shrink-0 grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
          <button
            type="button"
            onClick={() => moveFormula("unknown")}
            disabled={!currentEntry || Boolean(test)}
            className="rounded-2xl border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-xs font-semibold text-destructive disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm"
          >
            Swipe left: weak
          </button>
          <button
            type="button"
            onClick={() => moveFormula("known")}
            disabled={!currentEntry || Boolean(test)}
            className="rounded-2xl bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm"
          >
            Swipe right: known
          </button>
        </div>
      </div>
    </div>
  );
}
