import { useEffect, useState, useCallback } from "react";

const KEY = "soni-bookmarks-v1";

type BookmarkRef = {
  subjectId: string;
  chapterSlug: string;
  formulaId: string;
  addedAt: number;
};

function read(): BookmarkRef[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: BookmarkRef[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("soni-bookmarks-changed"));
}

export function useBookmarks() {
  const [items, setItems] = useState<BookmarkRef[]>([]);

  useEffect(() => {
    setItems(read());
    const handler = () => setItems(read());
    window.addEventListener("soni-bookmarks-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("soni-bookmarks-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const isBookmarked = useCallback(
    (subjectId: string, chapterSlug: string, formulaId: string) =>
      items.some(
        (b) =>
          b.subjectId === subjectId &&
          b.chapterSlug === chapterSlug &&
          b.formulaId === formulaId,
      ),
    [items],
  );

  const toggle = useCallback(
    (subjectId: string, chapterSlug: string, formulaId: string) => {
      const current = read();
      const exists = current.some(
        (b) =>
          b.subjectId === subjectId &&
          b.chapterSlug === chapterSlug &&
          b.formulaId === formulaId,
      );
      const next = exists
        ? current.filter(
            (b) =>
              !(
                b.subjectId === subjectId &&
                b.chapterSlug === chapterSlug &&
                b.formulaId === formulaId
              ),
          )
        : [...current, { subjectId, chapterSlug, formulaId, addedAt: Date.now() }];
      write(next);
      setItems(next);
    },
    [],
  );

  return { items, isBookmarked, toggle };
}
