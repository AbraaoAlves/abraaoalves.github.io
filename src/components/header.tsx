"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./icons/logo";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-paper/80 backdrop-blur dark:border-stone-800 dark:bg-ink/80">
      <div className="container mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-stone-900 dark:text-stone-50 hover:opacity-80 transition-opacity">
          <Logo className="h-6 w-6" />
          <span>ABRAÃO ALVES</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            href="/#work" 
            className={cn(
              "text-sm font-medium transition-colors",
              pathname === "/" ? "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50" : "text-stone-600 dark:text-stone-400"
            )}
          >
            Work
          </Link>
          <Link 
            href="/#mentorship" 
            className="text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50 transition-colors"
          >
            Mentorship
          </Link>
          <Link 
            href="/lab" 
            className={cn(
              "text-sm font-medium transition-colors",
              pathname.startsWith("/lab") 
                ? "text-stone-900 dark:text-stone-50" 
                : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50"
            )}
          >
            Lab
          </Link>
        </nav>
      </div>
    </header>
  );
}
