import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-gradient-hero">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          That formula isn't in our notebook yet.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 glow-primary"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1a1530" },
      { title: "Soni Classes — JEE & NEET Tricks, Formulas & Quick Revision" },
      {
        name: "description",
        content:
          "Chapter-wise tricks, shortcut formulas, mnemonics, flashcards & quick quizzes for IIT-JEE and NEET. Built for Indian students.",
      },
      { name: "author", content: "Soni Classes" },
      { property: "og:title", content: "Soni Classes — JEE & NEET Tricks, Formulas & Quick Revision" },
      {
        property: "og:description",
        content: "Tricks, formulas & flashcards chapter-wise for IIT-JEE and NEET aspirants.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Soni Classes — JEE & NEET Tricks, Formulas & Quick Revision" },
      { name: "description", content: "Soni Classes is a mobile app offering quick revision tools for IIT-JEE and NEET exams." },
      { property: "og:description", content: "Soni Classes is a mobile app offering quick revision tools for IIT-JEE and NEET exams." },
      { name: "twitter:description", content: "Soni Classes is a mobile app offering quick revision tools for IIT-JEE and NEET exams." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground flex items-center justify-between">
          <span>© Soni Classes</span>
          <span>Made for Indian aspirants 🇮🇳</span>
        </div>
      </footer>
    </div>
  );
}
