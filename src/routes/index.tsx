import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HOME_SUBJECT_ORDER, type SubjectId } from "@/data/content";
import { SubjectRevisionDeck } from "@/components/SubjectRevisionDeck";

function subjectLabel(id: SubjectId) {
  return id === "mathematics" ? "Maths" : id.charAt(0).toUpperCase() + id.slice(1);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soni Classes — JEE & NEET" },
      {
        name: "description",
        content: "Physics, Chemistry, Maths, and Biology formula stacks for JEE and NEET.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeSubject, setActiveSubject] = useState<SubjectId>(HOME_SUBJECT_ORDER[0]!);

  return (
    <div className="mx-auto flex w-full max-w-2xl min-h-0 flex-1 flex-col overflow-hidden px-3 pt-1">
      <div
        className="flex shrink-0 flex-wrap justify-center gap-2 py-2"
        role="tablist"
        aria-label="Subjects"
      >
        {HOME_SUBJECT_ORDER.map((id) => {
          const selected = id === activeSubject;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveSubject(id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
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

      <div className="min-h-0 flex-1 pb-1" role="tabpanel" aria-label={subjectLabel(activeSubject)}>
        <SubjectRevisionDeck key={activeSubject} subjectId={activeSubject} compact />
      </div>
    </div>
  );
}
