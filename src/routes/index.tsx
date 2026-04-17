import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Zap, BookMarked, Brain } from "lucide-react";
import { SUBJECTS } from "@/data/content";
import { SubjectBadge, subjectGradient } from "@/components/SubjectIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soni Classes — JEE & NEET Tricks, Formulas & Flashcards" },
      {
        name: "description",
        content:
          "Quick chapter-wise tricks, important formulas, flashcards and mini quizzes for IIT-JEE and NEET preparation.",
      },
      { property: "og:title", content: "Soni Classes — JEE & NEET Quick Revision" },
      {
        property: "og:description",
        content: "Tricks, formulas & flashcards chapter-wise for IIT-JEE and NEET.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12">
      {/* Hero */}
      <section className="pt-8 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Crafted for IIT-JEE & NEET aspirants
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]"
        >
          Crack concepts in
          <br />
          <span className="text-gradient-hero">seconds, not hours.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 mx-auto max-w-xl text-sm sm:text-base text-muted-foreground"
        >
          Chapter-wise <strong className="text-foreground">tricks</strong>, must-know{" "}
          <strong className="text-foreground">formulas</strong>, swipeable{" "}
          <strong className="text-foreground">flashcards</strong> and quick quizzes — all in one tap.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-7 flex items-center justify-center gap-3"
        >
          <a
            href="#subjects"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] glow-primary"
          >
            Start revising <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/search"
            search={{ q: "" }}
            className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-semibold hover:bg-secondary"
          >
            Search formulas
          </Link>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 grid grid-cols-3 gap-3 max-w-md mx-auto"
        >
          <Stat icon={<Zap className="h-4 w-4" />} label="Tricks" value="50+" />
          <Stat icon={<BookMarked className="h-4 w-4" />} label="Chapters" value="12" />
          <Stat icon={<Brain className="h-4 w-4" />} label="Quizzes" value="30+" />
        </motion.div>
      </section>

      {/* Subjects grid */}
      <section id="subjects" className="pt-4 scroll-mt-20">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-2xl font-bold">Pick a subject</h2>
          <span className="text-xs text-muted-foreground">Tap to dive in</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUBJECTS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
            >
              <Link
                to="/subject/$subjectId"
                params={{ subjectId: s.id }}
                className="group relative block overflow-hidden rounded-3xl card-soft p-5 transition-transform hover:-translate-y-1"
              >
                <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-2xl ${subjectGradient(s.id)}`} />
                <div className="relative flex items-start gap-4">
                  <SubjectBadge id={s.id} emoji={s.emoji} size="lg" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-xl font-bold">{s.name}</h3>
                      <span className="text-[10px] uppercase tracking-wider rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">
                        {s.exam}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{s.chapters.length} chapters</span>
                      <span>•</span>
                      <span>{s.chapters.reduce((n, c) => n + c.formulas.length, 0)} formulas</span>
                    </div>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card-soft rounded-2xl px-3 py-3">
      <div className="flex items-center justify-center gap-1.5 text-primary">{icon}</div>
      <div className="mt-1 font-display text-xl font-bold">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
