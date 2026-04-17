import type { SubjectId } from "@/data/content";

const GRADIENT: Record<SubjectId, string> = {
  physics: "bg-gradient-physics",
  chemistry: "bg-gradient-chemistry",
  maths: "bg-gradient-maths",
  biology: "bg-gradient-biology",
};

export function SubjectBadge({ id, emoji, size = "md" }: { id: SubjectId; emoji: string; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "h-16 w-16 text-3xl" : size === "sm" ? "h-9 w-9 text-base" : "h-12 w-12 text-2xl";
  return (
    <div
      className={`${GRADIENT[id]} ${sz} flex shrink-0 items-center justify-center rounded-2xl shadow-card`}
      aria-hidden
    >
      <span className="drop-shadow-sm">{emoji}</span>
    </div>
  );
}

export const subjectGradient = (id: SubjectId) => GRADIENT[id];
