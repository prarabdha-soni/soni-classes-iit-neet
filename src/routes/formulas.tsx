import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sigma } from "lucide-react";
import { getSubject, HOME_SUBJECT_ORDER, type SubjectId } from "@/data/content";
import { SubjectBadge, subjectGradient } from "@/components/SubjectIcon";
import { SubjectFormulasSwipeDeck } from "@/components/SubjectFormulasSwipeDeck";

export const Route = createFileRoute("/formulas")({
  head: () => ({
    meta: [
      { title: "Swipe formulas — Nishu Classes" },
      {
        name: "description",
        content: "Swipe through every formula in the syllabus deck — chapter order, quick tests, known vs weak.",
      },
    ],
  }),
  component: FormulasSwipePage,
});

function subjectLabel(id: SubjectId) {
  return id === "mathematics" ? "Maths" : id.charAt(0).toUpperCase() + id.slice(1);
}

function FormulasSwipePage() {
  const [subjectId, setSubjectId] = useState<SubjectId>(HOME_SUBJECT_ORDER[0]!);
  const subject = getSubject(subjectId);
  if (!subject) return null;

  const formulaCount = subject.chapters.reduce((n, ch) => n + ch.formulas.length, 0);

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-3">
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-white/5 pb-2 sm:pb-3">
        <Sigma className="h-5 w-5 shrink-0 text-primary" />
        <div className="min-w-0">
          <h1 className="font-display text-lg font-bold tracking-tight sm:text-xl">Swipe formulas</h1>
          <p className="text-[10px] text-muted-foreground sm:text-xs">
            {formulaCount} cards · {subject.name} · one continuous deck (chapter order)
          </p>
        </div>
      </div>

      <div
        className="mt-2 flex shrink-0 flex-wrap justify-center gap-1.5 sm:mt-3 sm:gap-2"
        role="tablist"
        aria-label="Subject"
      >
        {HOME_SUBJECT_ORDER.map((id) => {
          const selected = id === subjectId;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setSubjectId(id)}
              className={`rounded-full border px-2.5 py-1 text-[10px] font-medium transition-colors sm:px-3 sm:py-1.5 sm:text-xs ${
                selected
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {subjectLabel(id)}
            </button>
          );
        })}
      </div>

      <div className="relative mt-2 flex min-h-0 flex-1 flex-col overflow-hidden sm:mt-3">
        <div
          className={`pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full opacity-20 blur-3xl ${subjectGradient(subject.id)}`}
        />
        <div className="relative mb-2 flex shrink-0 items-center gap-3 rounded-2xl border border-white/8 bg-card/40 px-3 py-2 sm:px-4">
          <SubjectBadge id={subject.id} emoji={subject.emoji} size="sm" />
          <p className="text-xs text-muted-foreground sm:text-sm">{subject.tagline}</p>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto">
          <SubjectFormulasSwipeDeck subject={subject} />
        </div>
      </div>
    </div>
  );
}
