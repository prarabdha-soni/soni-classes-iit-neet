import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getChapter, getSubject } from "@/data/content";
import { ChapterRevisionWorkspace } from "@/components/ChapterRevisionWorkspace";

export const Route = createFileRoute("/subject/$subjectId/$chapterSlug")({
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
            title: `${loaderData.chapter.title} — ${loaderData.subject.name} | Nishu Classes`,
          },
          {
            name: "description",
            content: `${loaderData.chapter.title} formulas, tricks and a quick quiz for ${loaderData.subject.exam} preparation.`,
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-8 text-center">
      <h1 className="font-display text-2xl font-bold">Chapter not found</h1>
      <Link to="/" className="mt-4 inline-block text-primary underline">
        Back home
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md p-8 text-center">
      <p className="text-destructive">{error.message}</p>
    </div>
  ),
  component: SubjectChapterPage,
});

function SubjectChapterPage() {
  const { subject, chapter } = Route.useLoaderData();
  return (
    <ChapterRevisionWorkspace
      subject={subject}
      chapter={chapter}
      backLink={{ kind: "subject", subjectId: subject.id, label: subject.name }}
      tabLayoutId="subject-chapter-tabs"
    />
  );
}
