import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { MostAskedDeck } from "@/components/MostAskedDeck";

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
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden px-2 pb-2 pt-4 sm:px-4 sm:pb-3 sm:pt-8">
      <div className="flex shrink-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 border-b border-white/5 pb-3 text-center sm:gap-x-3 sm:pb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-2.5 py-0.5 sm:px-3 sm:py-1">
          <Sparkles className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary sm:text-[10px]">
            NEET Physics · AI deck
          </span>
        </div>
        <p className="max-w-[18rem] text-[10px] leading-tight text-muted-foreground sm:max-w-none sm:text-[11px]">
          Swipe left/right on the card · tap below for MCQs
        </p>
      </div>

      <div className="mt-6 flex min-h-0 min-w-0 flex-1 flex-col sm:mt-10">
        <MostAskedDeck />
      </div>
    </div>
  );
}
