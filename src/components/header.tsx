import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="container mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 hover:opacity-80 transition-opacity">
          ABRAÃO ALVES
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#work" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors">
            Work
          </Link>
          <Link href="/#mentorship" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors">
            Mentorship
          </Link>
          <Link href="/lab" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors">
            Lab
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
