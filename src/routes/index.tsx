import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, BookMarked, Brain, Clock3, Flame, TimerReset, Zap } from "lucide-react";
import { SUBJECTS, type SubjectId } from "@/data/content";
import { SubjectBadge, subjectGradient } from "@/components/SubjectIcon";

type LastProgress = {
  subjectId: SubjectId;
  subjectName: string;
  chapterSlug: string;
  chapterTitle: string;
  progress: number;
  updatedAt: number;
};

const LAST_PROGRESS_KEY = "soni-last-progress";

const MOST_ASKED_TOPICS = [
  { subjectId: "physics" as const, chapterSlug: "laws-of-motion", title: "Mechanics", meta: "Physics • highest weightage start" },
  { subjectId: "physics" as const, chapterSlug: "electrostatics", title: "Electrostatics", meta: "Physics • must-do numericals" },
  { subjectId: "chemistry" as const, chapterSlug: "organic-basics", title: "Organic Chemistry", meta: "Chemistry • reaction base builder" },
  { subjectId: "chemistry" as const, chapterSlug: "equilibrium", title: "Equilibrium", meta: "Chemistry • high-repeat concepts" },
  { subjectId: "maths" as const, chapterSlug: "calculus", title: "Calculus", meta: "Maths • maximum scoring potential" },
  { subjectId: "biology" as const, chapterSlug: "human-physiology", title: "Human Physiology", meta: "Biology • NEET favorite zone" },
];

const SUBJECT_CARD_COPY: Record<
  SubjectId,
  { headline: string; meta: string; nudge: string; badge?: string }
> = {
  physics: {
    headline: "Revise Physics in 60 minutes total",
    meta: "8 chapters -> 60% exam coverage",
    nudge: "Start with Mechanics (highest weightage)",
    badge: "Most Asked",
  },
  chemistry: {
    headline: "Fix Chemistry formulas faster",
    meta: "7 chapters -> reaction + numerical essentials",
    nudge: "Start with Mole Concept and Organic GOC",
    badge: "Most Asked",
  },
  maths: {
    headline: "Turn Maths formulas into speed",
    meta: "7 chapters -> quick revision for core scoring areas",
    nudge: "Start with Calculus for maximum ROI",
  },
  biology: {
    headline: "Revise NCERT Biology the smart way",
    meta: "6 chapters -> high-yield NEET memory zones",
    nudge: "Start with Human Physiology first",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soni Classes — JEE & NEET 10-Min Revision" },
      {
        name: "description",
        content:
          "Revise any JEE/NEET chapter in 10 minutes with formulas, flashcards, quizzes, and most-asked topics.",
      },
      { property: "og:title", content: "Soni Classes — JEE & NEET 10-Min Revision" },
      {
        property: "og:description",
        content: "From formula to question to marks in seconds. Fast revision for JEE and NEET students.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [lastProgress, setLastProgress] = useState<LastProgress | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(LAST_PROGRESS_KEY);
    if (!saved) return;

    try {
      setLastProgress(JSON.parse(saved) as LastProgress);
    } catch {
      window.localStorage.removeItem(LAST_PROGRESS_KEY);
    }
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12">
      <section className="pt-8 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-foreground/80"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Built for JEE & NEET marks-first revision
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 font-display text-4xl font-bold leading-[1.02] sm:text-5xl md:text-6xl"
        >
          Revise any JEE/NEET chapter
          <br />
          <span className="text-gradient-hero">in 10 minutes.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-4 max-w-2xl text-base text-foreground/82 sm:text-lg"
        >
          From formula to question to marks in seconds. Fix weak formulas fast, revise high-yield chapters, and move into tests with speed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-7"
        >
          <a
            href="#most-asked-topics"
            className="animate-pulse-glow inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03] glow-primary"
          >
            Start 10-min Revision <ArrowRight className="h-5 w-5" />
          </a>
          <div className="mt-3 text-sm text-foreground/78">
            or{" "}
            <Link to="/search" search={{ q: "" }} className="font-semibold text-primary hover:text-primary/85">
              search formulas
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm"
        >
          <span className="rounded-full border border-border bg-secondary/55 px-3 py-1.5 text-foreground/85">
            🔥 Covers 60% of most asked questions
          </span>
          <span className="rounded-full border border-border bg-secondary/55 px-3 py-1.5 text-foreground/85">
            📊 Based on high-frequency JEE/NEET revision zones
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-foreground/78"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5">
            <Clock3 className="h-4 w-4 text-primary" /> 10 min per chapter
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5">
            <Zap className="h-4 w-4 text-primary" /> 5 sec per formula
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5">
            <Brain className="h-4 w-4 text-primary" /> Students improve 20-30 marks by fixing formulas
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <Stat icon={<Flame className="h-4 w-4" />} label="Coverage" value="Top 60% syllabus" />
          <Stat icon={<TimerReset className="h-4 w-4" />} label="Revision Time" value="Avg 8 mins" />
          <Stat icon={<BookMarked className="h-4 w-4" />} label="Formula Bank" value="100+ high-yield" />
        </motion.div>
      </section>

      {lastProgress ? (
        <section className="pt-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative overflow-hidden rounded-[2rem] card-soft p-5"
          >
            <div className="absolute -right-14 -top-12 h-36 w-36 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/14 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Continue Where You Left
              </div>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold">
                    Continue: {lastProgress.chapterTitle}
                  </h2>
                  <p className="mt-1 text-sm text-foreground/82">
                    {lastProgress.subjectName} • {lastProgress.progress}% done
                  </p>
                </div>
                <Link
                  to="/subject/$subjectId/$chapterSlug"
                  params={{ subjectId: lastProgress.subjectId, chapterSlug: lastProgress.chapterSlug }}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Continue Revision <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full bg-gradient-hero"
                  initial={{ width: 0 }}
                  animate={{ width: `${lastProgress.progress}%` }}
                  transition={{ duration: 0.55, delay: 0.15 }}
                />
              </div>
            </div>
          </motion.div>
        </section>
      ) : null}

      <section id="most-asked-topics" className="pt-10 scroll-mt-24">
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">🔥 Most Asked Topics</h2>
            <p className="mt-1 text-sm text-foreground/76">Start from the chapters students usually need first.</p>
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-primary">High ROI</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOST_ASKED_TOPICS.map((topic, index) => {
            const subject = SUBJECTS.find((item) => item.id === topic.subjectId);
            if (!subject) return null;

            return (
              <motion.div
                key={`${topic.subjectId}-${topic.chapterSlug}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Link
                  to="/subject/$subjectId/$chapterSlug"
                  params={{ subjectId: topic.subjectId, chapterSlug: topic.chapterSlug }}
                  className="group relative block overflow-hidden rounded-3xl card-soft p-5 transition-transform hover:-translate-y-1"
                >
                  <div className={`absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-30 blur-2xl ${subjectGradient(subject.id)}`} />
                  <div className="relative">
                    <div className="inline-flex rounded-full bg-primary/14 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                      Most Asked
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-bold">{topic.title}</h3>
                    <p className="mt-2 text-sm text-foreground/76">{topic.meta}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Start now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="subjects" className="pt-12 scroll-mt-20">
        <div className="mb-4 flex items-baseline justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">📘 Subjects</h2>
            <p className="mt-1 text-sm text-foreground/76">Choose a subject and start from the fastest scoring area.</p>
          </div>
          <span className="text-xs text-foreground/66">Action-first revision</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SUBJECTS.map((subject, index) => {
            const copy = SUBJECT_CARD_COPY[subject.id];

            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Link
                  to="/subject/$subjectId"
                  params={{ subjectId: subject.id }}
                  className="group relative block overflow-hidden rounded-3xl card-soft p-5 transition-transform hover:-translate-y-1"
                >
                  <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-2xl ${subjectGradient(subject.id)}`} />
                  <div className="relative flex items-start gap-4">
                    <SubjectBadge id={subject.id} emoji={subject.emoji} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-bold">{subject.name}</h3>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground/72">
                          {subject.exam}
                        </span>
                        {copy.badge ? (
                          <span className="rounded-full bg-primary/14 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                            {copy.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-base font-semibold text-foreground">{copy.headline}</p>
                      <p className="mt-1 text-sm text-foreground/76">{copy.meta}</p>
                      <p className="mt-3 text-sm text-primary">{copy.nudge}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-foreground/68">
                        <span>{subject.chapters.length} chapters</span>
                        <span>•</span>
                        <span>{subject.chapters.reduce((count, chapter) => count + chapter.formulas.length, 0)} formulas</span>
                      </div>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-foreground/55 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card-soft rounded-2xl px-4 py-4">
      <div className="flex items-center justify-center gap-1.5 text-primary">{icon}</div>
      <div className="mt-1 font-display text-xl font-bold">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-foreground/70">{label}</div>
    </div>
  );
}
