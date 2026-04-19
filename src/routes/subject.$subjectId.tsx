import { createFileRoute, Link, notFound, Outlet, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { getSubject } from "@/data/content";
import { SubjectBadge, subjectGradient } from "@/components/SubjectIcon";

export const Route = createFileRoute("/subject/$subjectId")({
  loader: ({ params }) => {
    const subject = getSubject(params.subjectId);
    if (!subject) throw notFound();
    return { subject };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.subject.name} — Tricks & Formulas | Soni Classes` },
          {
            name: "description",
            content: `Chapter-wise ${loaderData.subject.name} tricks and formulas for ${loaderData.subject.exam}. ${loaderData.subject.tagline}`,
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md p-8 text-center">
      <h1 className="font-display text-2xl font-bold">Subject not found</h1>
      <Link to="/" className="mt-4 inline-block text-primary underline">Back home</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-md p-8 text-center">
      <p className="text-destructive">{error.message}</p>
      <Link to="/" className="mt-4 inline-block text-primary underline">Back home</Link>
    </div>
  ),
  component: SubjectPage,
});

function SubjectPage() {
  const { subject } = Route.useLoaderData();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const subjectPath = `/subject/${subject.id}`;
  const isSubjectIndex = pathname === subjectPath || pathname === `${subjectPath}/`;

  if (!isSubjectIndex) {
    return <Outlet />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 pb-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All subjects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 card-soft rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden"
      >
        <div className={`absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-25 blur-2xl ${subjectGradient(subject.id)}`} />
        <SubjectBadge id={subject.id} emoji={subject.emoji} size="lg" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold">{subject.name}</h1>
            <span className="text-[10px] uppercase tracking-wider rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">
              {subject.exam}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{subject.tagline}</p>
        </div>
      </motion.div>

      <section className="mt-8">
        <div className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
          <Sparkles className="h-4 w-4 text-primary" />
          Important Topics
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {subject.importantTopics.map((topic: typeof subject.importantTopics[number], i: number) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="card-soft rounded-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${subjectGradient(subject.id)}`} />
                <div>
                  <h3 className="font-semibold">{topic.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{topic.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <h2 className="mt-8 mb-3 font-display text-lg font-bold flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" /> Chapters
      </h2>

      <div className="grid gap-3">
        {subject.chapters.map((c: typeof subject.chapters[number], i: number) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to="/subject/$subjectId/$chapterSlug"
              params={{ subjectId: subject.id, chapterSlug: c.slug }}
              className="group flex items-center gap-4 card-soft rounded-2xl p-4 hover:border-primary/40 transition-colors"
            >
              <div className="h-11 w-11 shrink-0 rounded-xl bg-secondary flex items-center justify-center text-xl">
                {c.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-muted-foreground">
                  {c.formulas.length} formulas · {c.quiz.length} quiz Qs
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
