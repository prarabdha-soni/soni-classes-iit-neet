import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getChapter, getSubject } from "@/data/content";
import { ChapterRevisionWorkspace } from "@/components/ChapterRevisionWorkspace";

export const Route = createFileRoute("/formulas/$subjectId/$chapterSlug")({
  loader: ({ params }) => {
    const subject = getSubject(params.subjectId);
    const chapter = getChapter(params.subjectId, params.chapterSlug);
    if (!subject || !chapter) throw notFound();
    return { subject, chapter };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.chapter.title} — ${loaderData.subject.name} · Formulas | Nishu Classes`,
          },
          {
            name: "description",
            content: `${loaderData.chapter.title} — swipe formulas, flashcards, and chapter quiz.`,
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-8 text-center">
      <h1 className="font-display text-2xl font-bold">Chapter not found</h1>
      <Link to="/formulas" className="mt-4 inline-block text-primary underline">
        Back to formulas
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md p-8 text-center">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
  component: FormulasChapterPage,
});

function FormulasChapterPage() {
  const { subject, chapter } = Route.useLoaderData();
  return (
    <ChapterRevisionWorkspace
      subject={subject}
      chapter={chapter}
      backLink={{ kind: "formulasHub", label: "All chapters" }}
      tabLayoutId="formulas-chapter-tabs"
    />
  );
}
