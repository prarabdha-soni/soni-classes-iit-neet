import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { BookOpen, ChevronRight, Sparkles } from "lucide-react";
import { conceptDisplayBody, type FlatConcept } from "@/data/neet-top-concepts";

export type ConceptSwipeDirection = "left" | "right" | null;

const cardVariants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: (direction: ConceptSwipeDirection) => ({
    opacity: 0,
    scale: 0.94,
    x: direction === "left" ? -320 : direction === "right" ? 320 : 0,
    rotate: direction === "left" ? -14 : direction === "right" ? 14 : 0,
    transition: { duration: 0.14, ease: "easeIn" },
  }),
} satisfies Variants;

export function MostAskedConceptCard({
  concept,
  onSwipe,
  swipeExitCustom,
  onOpenQuestions,
}: {
  concept: FlatConcept;
  onSwipe: (direction: Exclude<ConceptSwipeDirection, null>) => void;
  swipeExitCustom: ConceptSwipeDirection;
  onOpenQuestions: () => void;
}) {
  const revisionBody = conceptDisplayBody(concept);
  const revisionParagraphs = revisionBody.split(/\n\n+/).filter(Boolean);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 0, 260], [-16, 0, 16]);
  const skipOpacity = useTransform(x, [-140, -40, 0], [1, 0.35, 0]);
  const nextOpacity = useTransform(x, [0, 40, 140], [0, 0.35, 1]);

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={swipeExitCustom}
      drag="x"
      dragElastic={0.12}
      dragMomentum={false}
      dragTransition={{ power: 0.8, timeConstant: 120 }}
      style={{ x, rotate }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110 || info.velocity.x > 520) {
          onSwipe("right");
          return;
        }
        if (info.offset.x < -110 || info.velocity.x < -520) {
          onSwipe("left");
          return;
        }
        x.set(0);
      }}
      transition={{ type: "spring", stiffness: 520, damping: 38 }}
      className="absolute inset-0 cursor-grab touch-none overscroll-x-contain overflow-hidden rounded-[1.85rem] border border-white/[0.12] bg-gradient-to-b from-card via-card to-secondary/[0.35] shadow-[0_28px_64px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.04] will-change-transform select-none active:cursor-grabbing"
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-hero opacity-95" />
      <div
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full opacity-[0.18] blur-3xl"
        style={{ background: "var(--gradient-physics)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />

      <motion.div
        style={{ opacity: skipOpacity }}
        className="pointer-events-none absolute left-4 top-[4.5rem] z-20 -rotate-[11deg] rounded-lg border-[2.5px] border-muted-foreground/45 bg-background/80 px-2.5 py-1 font-display text-base font-black uppercase tracking-[0.12em] text-muted-foreground shadow-sm backdrop-blur-sm sm:left-5 sm:top-[4.75rem] sm:text-lg"
      >
        Skip
      </motion.div>
      <motion.div
        style={{ opacity: nextOpacity }}
        className="pointer-events-none absolute right-4 top-[4.5rem] z-20 rotate-[11deg] rounded-lg border-[2.5px] border-primary/70 bg-primary/10 px-2.5 py-1 font-display text-base font-black uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-sm sm:right-5 sm:top-[4.75rem] sm:text-lg"
      >
        Next
      </motion.div>

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex min-h-0 flex-1 flex-col px-3.5 pb-3 pt-3 sm:px-5 sm:pb-4 sm:pt-4">
          <div className="flex shrink-0 items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-background/60 text-2xl shadow-inner backdrop-blur-sm sm:h-12 sm:w-12"
              aria-hidden
            >
              {concept.chapterEmoji}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-primary/95 sm:text-[11px]">
                  {concept.chapterTitle}
                </p>
                {concept.chapterPriority ? (
                  <span className="rounded-md border border-amber-500/25 bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {concept.chapterPriority}
                  </span>
                ) : null}
              </div>
              <div className="mt-2 flex items-start gap-2.5">
                <div className="mt-1 h-9 w-1 shrink-0 rounded-full bg-gradient-hero opacity-90" aria-hidden />
                <h2 className="min-w-0 font-display text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                  {concept.title}
                </h2>
              </div>
            </div>
          </div>

          <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3 sm:mt-4">
            <div className="min-h-0 flex-1 touch-pan-y space-y-3 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch] pr-0.5">
              <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.07] via-background/40 to-secondary/20 p-3.5 sm:p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">What to know</p>
                </div>
                <div className="space-y-2.5 text-sm leading-relaxed text-foreground/90 sm:text-[0.9375rem]">
                  {revisionParagraphs.map((para, i) => (
                    <p key={i} className="first:mt-0">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 space-y-2.5 border-t border-white/[0.06] pt-3 sm:pt-4">
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenQuestions();
                }}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-hero py-3.5 text-sm font-bold text-primary-foreground shadow-[0_12px_32px_-10px_oklch(0.55_0.2_280/0.55)] transition-[transform,box-shadow] hover:shadow-[0_14px_36px_-8px_oklch(0.55_0.2_280/0.65)] active:scale-[0.99] sm:py-4"
              >
                <BookOpen className="h-4 w-4 opacity-90 transition-transform group-hover:scale-105" />
                Practice MCQs
                <ChevronRight className="h-4 w-4 opacity-80 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="rounded-full bg-secondary/35 py-1.5 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Swipe · left skip · right next
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
