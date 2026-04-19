import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HOME_SUBJECT_ORDER, type SubjectId } from "@/data/content";
import { SubjectRevisionDeck } from "@/components/SubjectRevisionDeck";

function subjectLabel(id: SubjectId) {
  return id === "mathematics" ? "Maths" : id.charAt(0).toUpperCase() + id.slice(1);
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revise Faster. Score Higher. — Soni Classes" },
      {
        name: "description",
        content:
          "Swipe Physics, Chemistry, Maths, and Biology formula stacks — quick revision for JEE and NEET.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeSubject, setActiveSubject] = useState<SubjectId>(HOME_SUBJECT_ORDER[0]!);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-12 pt-5">
      <header className="mb-10 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
          Soni Classes
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          Revise Faster. Score Higher.
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Choose a subject — only that stack is shown. Swipe right when you know it, left to
          revisit. Tap <span className="font-semibold text-accent">T</span> for a quick check.
        </p>
        <div
          className="mt-5 flex flex-wrap justify-center gap-2 text-xs"
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
                className={`rounded-full border px-3 py-1.5 font-medium transition-colors ${
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
      </header>

      <div role="tabpanel" aria-label={subjectLabel(activeSubject)}>
        <SubjectRevisionDeck key={activeSubject} subjectId={activeSubject} />
      </div>

      <footer className="mt-8 border-t border-border pt-6 text-center">
        <Link
          to="/search"
          search={{ q: "" }}
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Search all formulas
        </Link>
      </footer>
    </div>
  );
}
