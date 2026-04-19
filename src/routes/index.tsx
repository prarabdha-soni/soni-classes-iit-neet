import { createFileRoute } from "@tanstack/react-router";
import { Layers, Sparkles } from "lucide-react";
import { MostAskedDeck } from "@/components/MostAskedDeck";
import { NEET_PHYSICS_AI_DECK_SIZE } from "@/data/neet-top-concepts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI concepts — Nishu Classes" },
      {
        name: "description",
        content:
          "Top repeated NEET Physics concepts, chapter-wise. Swipe cards, tap to practice MCQs — AI-guided revision.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden px-2 pb-2 pt-3 sm:px-4 sm:pb-4 sm:pt-6">
      <header className="relative shrink-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-card/55 p-4 shadow-card backdrop-blur-md sm:p-5">
        <div
          className="pointer-events-none absolute -right-16 -top-24 h-48 w-48 rounded-full bg-gradient-physics opacity-[0.22] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-gradient-hero opacity-[0.12] blur-2xl"
          aria-hidden
        />

        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.08] px-2.5 py-1 sm:px-3 sm:py-1.5">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-[11px]">
                NEET Physics · smart stack
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl">
              <span className="text-gradient-hero">AI</span>
              <span className="text-foreground"> concepts</span>
            </h1>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {NEET_PHYSICS_AI_DECK_SIZE} high-yield cards in exam order. Swipe to move; open MCQs when you want a
              quick check.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/[0.06] bg-background/50 px-3 py-2.5 sm:flex-col sm:items-stretch sm:px-4 sm:py-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Layers className="h-4 w-4 shrink-0 text-primary/80" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">How to use</span>
            </div>
            <p className="text-[11px] leading-snug text-foreground/85 sm:max-w-[12rem] sm:text-xs">
              Drag the card horizontally · left skip · right next · button opens questions
            </p>
          </div>
        </div>
      </header>

      <div className="mt-4 flex min-h-0 min-w-0 flex-1 flex-col sm:mt-6">
        <MostAskedDeck />
      </div>
    </div>
  );
}
