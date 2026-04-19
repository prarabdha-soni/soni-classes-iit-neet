import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import { SUBJECTS } from "@/data/content";
import { SubjectBadge, subjectGradient } from "@/components/SubjectIcon";

export const Route = createFileRoute("/revise")({
  head: () => ({
    meta: [
      { title: "Revise — Soni Classes" },
      { name: "description", content: "Pick a subject, open a chapter, and swipe through formulas Tinder-style." },
    ],
  }),
  component: RevisePage,
});

function RevisePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-5">
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
          Chapter-wise Revision
        </span>
      </div>
      <h1 className="mt-1 font-display text-2xl font-bold tracking-tight">Pick a subject</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tap a subject → open a chapter → swipe formulas like Tinder.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {SUBJECTS.map((s, i) => {
          const totalFormulas = s.chapters.reduce((acc, c) => acc + c.formulas.length, 0);
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to="/subject/$subjectId"
                params={{ subjectId: s.id }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/8 bg-card/70 p-4 transition-colors hover:border-primary/40"
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl ${subjectGradient(s.id)}`}
                />
                <SubjectBadge id={s.id} emoji={s.emoji} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-display text-base font-bold">{s.name}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      {s.exam}
                    </span>
                  </div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">
                    {s.chapters.length} chapters · {totalFormulas} formulas
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
