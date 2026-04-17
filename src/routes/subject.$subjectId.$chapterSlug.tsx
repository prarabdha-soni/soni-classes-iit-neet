import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb, RotateCcw, Check, X } from "lucide-react";
import { getChapter, getSubject } from "@/data/content";
import { subjectGradient } from "@/components/SubjectIcon";

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

function ChapterPage() {
  const { subject, chapter } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("formulas");

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

function FormulaList({ chapter, subjectId }: { chapter: ReturnType<typeof getChapter> & object; subjectId: string }) {
  return (
    <ul className="grid gap-3">
      {chapter.formulas.map((f, i) => (
        <motion.li
          key={f.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="card-soft rounded-2xl p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold">{f.title}</h3>
            <span className={`h-1.5 w-1.5 rounded-full mt-2 ${subjectGradient(subjectId as never)}`} />
          </div>
          <div className="mt-2 rounded-xl bg-background/60 border border-border px-3 py-2 font-mono text-sm sm:text-base text-primary overflow-x-auto">
            {f.expression}
          </div>
          {f.description && (
            <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
          )}
          {f.trick && (
            <div className="mt-2 flex items-start gap-2 rounded-xl bg-accent/10 border border-accent/30 p-2.5">
              <Lightbulb className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-foreground/90">
                <span className="font-semibold text-accent">Trick: </span>
                {f.trick}
              </p>
            </div>
          )}
        </motion.li>
      ))}
    </ul>
  );
}

function Flashcards({ chapter, subjectId }: { chapter: ReturnType<typeof getChapter> & object; subjectId: string }) {
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

function Quiz({ chapter, subjectId }: { chapter: ReturnType<typeof getChapter> & object; subjectId: string }) {
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
