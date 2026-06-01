"use client";

import { useTheme } from "next-themes";
import { AsciiTextCanvas } from "./asciiart";
import { AsciiLink } from "./ascii-link";

// Internal page links (left column). Mirror the header nav.
const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Mentorship", href: "/#mentorship" },
  { label: "Lab", href: "/lab" },
];

// External profiles (right column). Opens in a new tab.
// TODO: verify these handles — placeholders based on the `abraaoalves` pattern.
// Stack Overflow in particular uses a numeric user id, not a slug.
const externalLinks = [
  { label: "GitHub", href: "https://github.com/abraaoalves" },
  { label: "X", href: "https://x.com/abraaoalves" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abraaoalves" },
  { label: "Stack Overflow", href: "https://stackoverflow.com/users/abraaoalves" },
  { label: "HackerRank", href: "https://www.hackerrank.com/abraaoalves" },
  { label: "CodePen", href: "https://codepen.io/abraaoalves" },
];

// Giant ASCII wordmark, Ettrics-style. Background must match the footer bg so
// the canvas panel is invisible; ink is a muted tone so the name reads as a
// textural wordmark behind the links rather than shouting over them.
const PAPER_LIGHT = "#ffffff";
const PAPER_DARK = "#0a0a0a";
const INK_LIGHT = "#c9c7c4";
const INK_DARK = "#2b2b2b";
const FILL_SOURCE = "▓█▒▓░█";

// Ettrics footer links: ~32px, light weight, sentence case, high contrast.
const linkClass =
  "text-3xl md:text-[2rem] leading-tight font-light tracking-tight text-neutral-900 dark:text-neutral-50";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <footer className="w-full border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 mt-auto">
      {/* Giant ASCII name wordmark spanning the footer width, like ettrics.com. */}
      <div aria-hidden="true" className="w-full overflow-hidden px-4">
        <AsciiTextCanvas
          text="ABRAÃO ALVES"
          source={FILL_SOURCE}
          speed={2}
          fontSize={12}
          weight={900}
          threshold={0.25}
          feather={0.5}
          color={isDark ? INK_DARK : INK_LIGHT}
          background={isDark ? PAPER_DARK : PAPER_LIGHT}
          className="mx-auto w-full max-w-4xl h-[15vw] min-h-[90px] max-h-[180px]"
          style={{ minHeight: 90 }}
        />
      </div>

      <div className="container mx-auto max-w-4xl px-4 pb-12">
        {/* Two link columns: page nav (left) / external profiles (right). */}
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <nav aria-label="Site">
            <ul className="flex flex-col gap-1">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <AsciiLink href={link.href} label={link.label} className={linkClass} />
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere" className="sm:text-right">
            <ul className="flex flex-col gap-1">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <AsciiLink href={link.href} label={link.label} external className={linkClass} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom strip: copyright (left) / meta (right). */}
        <div className="mt-12 flex flex-col gap-2 border-t border-neutral-100 pt-6 text-sm text-neutral-500 dark:border-neutral-800/60 dark:text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Abraão Alves</p>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
