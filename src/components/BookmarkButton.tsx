import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";

export function BookmarkButton({
  subjectId,
  chapterSlug,
  formulaId,
  size = "md",
}: {
  subjectId: string;
  chapterSlug: string;
  formulaId: string;
  size?: "sm" | "md";
}) {
  const { isBookmarked, toggle } = useBookmarks();
  const active = isBookmarked(subjectId, chapterSlug, formulaId);
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <button
      type="button"
      aria-label={active ? "Remove bookmark" : "Save formula"}
      title={active ? "Saved to Vault" : "Save to Vault"}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        toggle(subjectId, chapterSlug, formulaId);
      }}
      className={`${dim} grid place-items-center rounded-full border transition-colors ${
        active
          ? "border-accent bg-accent/20 text-accent"
          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-accent/50"
      }`}
    >
      {active ? <BookmarkCheck className={icon} /> : <Bookmark className={icon} />}
    </button>
  );
}
