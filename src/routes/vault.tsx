import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, ArrowRight, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { getChapter, getSubject } from "@/data/content";
import { MathExpr } from "@/components/MathExpr";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "My Vault — Soni Classes" },
      { name: "description", content: "Your saved formulas across all chapters." },
    ],
  }),
  component: VaultPage,
});

function VaultPage() {
  const { items, toggle } = useBookmarks();

  const resolved = useMemo(() => {
    return items
      .map((b) => {
        const subject = getSubject(b.subjectId);
        const chapter = getChapter(b.subjectId, b.chapterSlug);
        const formula = chapter?.formulas.find((f) => f.id === b.formulaId);
        if (!subject || !chapter || !formula) return null;
        return { ...b, subject, chapter, formula };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => b.addedAt - a.addedAt);
  }, [items]);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
          <Bookmark className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">My Vault</h1>
          <p className="text-xs text-muted-foreground">
            {resolved.length} saved formula{resolved.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {resolved.length === 0 ? (
        <div className="mt-8 card-soft rounded-3xl p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary/60">
            <Bookmark className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold">No saved formulas yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tap the bookmark icon on any formula to keep it here for quick revision.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse formulas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {resolved.map((r) => (
            <li
              key={`${r.subjectId}-${r.chapterSlug}-${r.formulaId}`}
              className="card-soft rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {r.subject.name} · {r.chapter.title}
                  </div>
                  <Link
                    to="/subject/$subjectId/$chapterSlug"
                    params={{ subjectId: r.subjectId, chapterSlug: r.chapterSlug }}
                    className="mt-1 block font-semibold hover:text-primary"
                  >
                    {r.formula.title}
                  </Link>
                  <div className="mt-2 overflow-x-auto rounded-xl border border-border bg-background/50 px-3 py-2 text-primary">
                    <MathExpr
                      latex={r.formula.latex}
                      expression={r.formula.expression}
                      className="text-base"
                    />
                  </div>
                  {r.formula.trick ? (
                    <p className="mt-2 text-xs text-muted-foreground">💡 {r.formula.trick}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => toggle(r.subjectId, r.chapterSlug, r.formulaId)}
                  aria-label="Remove from vault"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground hover:border-destructive/50 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
