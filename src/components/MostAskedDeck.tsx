import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import { flattenConceptDeck, NEET_PHYSICS_AI_DECK_SIZE, type FlatConcept } from "@/data/neet-top-concepts";
import { MostAskedConceptCard, type ConceptSwipeDirection } from "@/components/MostAskedConceptCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function MostAskedDeck() {
  const [deck, setDeck] = useState<FlatConcept[]>(() => flattenConceptDeck());
  const [swipeDirection, setSwipeDirection] = useState<ConceptSwipeDirection>(null);
  const [dialogConcept, setDialogConcept] = useState<FlatConcept | null>(null);
  const [pickedByQ, setPickedByQ] = useState<Record<number, number | null>>({});

  const current = deck[0] ?? null;
  const preview = deck.slice(1, 3);
  const total = NEET_PHYSICS_AI_DECK_SIZE;
  const progress = total === 0 ? 0 : ((total - deck.length) / total) * 100;
  const positionLabel = deck.length > 0 ? total - deck.length + 1 : total;

  const resetDeck = useCallback(() => {
    setDeck(flattenConceptDeck());
    setSwipeDirection(null);
  }, []);

  const swipe = (direction: Exclude<ConceptSwipeDirection, null>) => {
    setSwipeDirection(direction);
    setDeck((prev) => prev.slice(1));
  };

  const openQuestions = (c: FlatConcept) => {
    setDialogConcept(c);
    setPickedByQ({});
  };

  const closeDialog = (open: boolean) => {
    if (!open) {
      setDialogConcept(null);
      setPickedByQ({});
    }
  };

  return (
    <>
      <section className="flex h-full min-h-0 w-full flex-1 flex-col">
        <div className="mb-2 flex shrink-0 items-center justify-between gap-2 px-0.5 sm:px-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Your stack
          </span>
          <div className="flex h-1.5 min-w-[6rem] flex-1 max-w-[10rem] items-center overflow-hidden rounded-full bg-secondary/70 sm:max-w-[14rem]">
            <motion.div
              className="h-full rounded-full bg-gradient-hero"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
            />
          </div>
          <span className="tabular-nums text-[10px] font-bold text-primary sm:text-xs">
            {positionLabel}/{total}
          </span>
        </div>

        <div className="relative min-h-0 w-full flex-1">
          <div
            className="pointer-events-none absolute inset-x-[8%] -top-6 h-24 rounded-[50%] bg-gradient-physics opacity-[0.14] blur-3xl"
            aria-hidden
          />

          {preview
            .slice()
            .reverse()
            .map((c, index) => {
              const depth = index + 1;
              return (
                <motion.div
                  key={c.id}
                  initial={false}
                  animate={{
                    y: depth * 10,
                    scale: 1 - depth * 0.04,
                    opacity: 0.52 - index * 0.14,
                  }}
                  transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-x-2 top-0 h-full rounded-[1.85rem] border border-white/[0.07] bg-gradient-to-b from-card/85 to-card/50 shadow-[0_12px_36px_-18px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:inset-x-3"
                />
              );
            })}

          <AnimatePresence mode="sync" custom={swipeDirection}>
            {current ? (
              <MostAskedConceptCard
                key={current.id}
                concept={current}
                onSwipe={swipe}
                swipeExitCustom={swipeDirection}
                onOpenQuestions={() => openQuestions(current)}
              />
            ) : (
              <motion.div
                key="empty-deck"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.85rem] border border-white/[0.1] bg-gradient-to-b from-card via-card to-secondary/25 p-6 text-center shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
              >
                <div className="relative mb-3">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-hero shadow-lg">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Stack complete</div>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl">You cleared the deck</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Run it again to keep photoelectricity, circuits, and the rest sharp for exam day.
                </p>
                <button
                  type="button"
                  onClick={resetDeck}
                  className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.45)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  Restart deck
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Dialog open={dialogConcept !== null} onOpenChange={closeDialog}>
        <DialogContent className="max-h-[min(90vh,680px)] max-w-lg gap-0 overflow-hidden border-white/[0.08] bg-card p-0 shadow-2xl sm:rounded-2xl">
          {dialogConcept ? (
            <>
              <div className="border-b border-white/[0.06] bg-gradient-to-br from-primary/[0.12] via-card to-secondary/30 px-5 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-6">
                <DialogHeader className="space-y-3 text-left">
                  <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-background/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                    <span className="text-base leading-none" aria-hidden>
                      {dialogConcept.chapterEmoji}
                    </span>
                    {dialogConcept.chapterTitle}
                  </div>
                  <DialogTitle className="pr-6 font-display text-xl leading-tight tracking-tight sm:text-2xl">
                    {dialogConcept.title}
                  </DialogTitle>
                  <DialogDescription className="text-left text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {dialogConcept.questions.length} practice question
                    {dialogConcept.questions.length === 1 ? "" : "s"} · tap an option to reveal the key
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="max-h-[min(52vh,420px)] space-y-5 overflow-y-auto overscroll-y-contain px-5 py-5 sm:max-h-[min(56vh,480px)] sm:px-6 sm:py-6">
                {dialogConcept.questions.map((question, qi) => {
                  const picked = pickedByQ[qi] ?? null;
                  return (
                    <div
                      key={qi}
                      className="rounded-2xl border border-white/[0.06] bg-secondary/25 p-4 shadow-inner ring-1 ring-white/[0.03] sm:p-5"
                    >
                      <p className="text-sm font-semibold leading-relaxed text-foreground sm:text-base">{question.q}</p>
                      <div className="mt-4 grid gap-2.5">
                        {question.options.map((opt, oi) => {
                          const chosen = picked === oi;
                          const correct = picked !== null && oi === question.answer;
                          const wrong = chosen && oi !== question.answer;
                          return (
                            <button
                              key={oi}
                              type="button"
                              disabled={picked !== null}
                              onClick={() => setPickedByQ((prev) => ({ ...prev, [qi]: oi }))}
                              className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-all ${
                                correct
                                  ? "border-primary/50 bg-primary/15 shadow-[0_0_0_1px_oklch(0.72_0.16_200/0.25)]"
                                  : wrong
                                    ? "border-destructive/40 bg-destructive/10"
                                    : "border-border/80 bg-background/60 hover:border-primary/35 hover:bg-secondary/40"
                              } disabled:cursor-default`}
                            >
                              <span
                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold ${
                                  correct
                                    ? "border-primary bg-primary/20 text-primary"
                                    : wrong
                                      ? "border-destructive bg-destructive/15 text-destructive"
                                      : "border-border bg-background/80 text-muted-foreground"
                                }`}
                              >
                                {String.fromCharCode(65 + oi)}
                              </span>
                              <span className="flex-1 leading-relaxed">{opt}</span>
                              {correct ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> : null}
                              {wrong ? <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" /> : null}
                            </button>
                          );
                        })}
                      </div>
                      {picked !== null && question.explain ? (
                        <div className="mt-4 rounded-xl border border-accent/20 bg-accent/8 px-3 py-3">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Why</p>
                          <p className="mt-1.5 text-xs leading-relaxed text-foreground/90 sm:text-sm">{question.explain}</p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
