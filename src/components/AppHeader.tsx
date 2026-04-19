import { Link } from "@tanstack/react-router";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4 sm:py-5">
        <Link
          to="/"
          className="font-display text-xl font-black tracking-tight text-foreground sm:text-2xl"
        >
          Nishu Classes
        </Link>
      </div>
    </header>
  );
}
