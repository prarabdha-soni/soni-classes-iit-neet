import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { searchAll } from "@/data/content";
import { SubjectBadge } from "@/components/SubjectIcon";
import { MathExpr } from "@/components/MathExpr";
import { BookmarkButton } from "@/components/BookmarkButton";

type SearchParams = { q: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Search formulas — Soni Classes" },
      { name: "description", content: "Search across every chapter, formula and trick." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [input, setInput] = useState(q);

  // keep URL in sync (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      if (input !== q) navigate({ search: { q: input }, replace: true });
    }, 200);
    return () => clearTimeout(t);
  }, [input, q, navigate]);

  const hits = useMemo(() => searchAll(input), [input]);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-16">
      <h1 className="font-display text-2xl font-bold">Search</h1>
      <p className="text-sm text-muted-foreground">Across all subjects, chapters & tricks.</p>

      <label className="relative mt-4 flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try ‘carbocation’, ‘Carnot’, ‘chain rule’…"
          className="w-full rounded-2xl bg-secondary/60 border border-border pl-10 pr-3 py-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </label>

      {input.trim() === "" ? (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          Type to search formulas, tricks or chapter names.
        </div>
      ) : hits.length === 0 ? (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          No results for <span className="text-foreground font-semibold">“{input}”</span>.
        </div>
      ) : (
        <ul className="mt-5 grid gap-3">
          {hits.map((h) => (
            <li key={`${h.subject.id}-${h.chapter.slug}-${h.formula.id}`} className="card-soft rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <SubjectBadge id={h.subject.id} emoji={h.subject.emoji} size="sm" />
                <Link
                  to="/subject/$subjectId/$chapterSlug"
                  params={{ subjectId: h.subject.id, chapterSlug: h.chapter.slug }}
                  className="min-w-0 flex-1 hover:text-primary"
                >
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {h.subject.name} · {h.chapter.title}
                  </div>
                  <div className="font-semibold truncate">{h.formula.title}</div>
                  <div className="mt-1 overflow-x-auto text-primary">
                    <MathExpr latex={h.formula.latex} expression={h.formula.expression} className="text-sm" />
                  </div>
                </Link>
                <BookmarkButton subjectId={h.subject.id} chapterSlug={h.chapter.slug} formulaId={h.formula.id} size="sm" />
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
