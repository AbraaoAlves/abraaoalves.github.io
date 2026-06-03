"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { AsciiTextCanvas } from "./asciiart";
import { ThemeSwitch } from "./theme-switch";

// Internal page links (left column). Mirror the header nav.
const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Mentorship", href: "/#mentorship" },
  { label: "Lab", href: "/lab" },
];

// External profiles (right column). Opens in a new tab.
const externalLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/abraaoalves" },
  { label: "GitHub", href: "https://github.com/abraaoalves" },
  { label: "X", href: "https://x.com/abraao4lves" },
  { label: "Stack Overflow", href: "https://stackoverflow.com/users/815478" },
  { label: "CodePen", href: "https://codepen.io/AbraaoAlves" },
];

// Giant ASCII wordmark, Ettrics-style. Background must match the footer bg so
// the canvas panel is invisible; ink is a muted tone so the name reads as a
// textural wordmark behind the links rather than shouting over them.
const PAPER_LIGHT = "#faf9f7";
const PAPER_DARK = "#121212";
const INK_LIGHT = "#d8d3c8";
const INK_DARK = "#2b2b2b";
const FILL_SOURCE = "▓█▒▓░█";

// Ettrics footer spotlight: the dim is triggered only while a link is actually
// hovered/focused (`group-has-[a:hover]`), not just while the cursor is inside
// the footer — so leaving a link onto empty space restores everything at once.
// The hovered/focused link returns to full opacity (important, to beat the dim).
const dimClass =
  "transition-opacity duration-300 ease-out group-has-[a:hover]:opacity-40 group-has-[a:focus-visible]:opacity-40";
const linkClass =
  "text-4xl md:text-[2.5rem] leading-[1.2] font-light tracking-tight text-stone-900 dark:text-stone-50 " +
  dimClass +
  " hover:opacity-100! focus-visible:opacity-100!";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <footer className="group w-full border-t border-stone-200 bg-paper dark:border-stone-800 dark:bg-ink mt-auto">
      {/* Giant ASCII name wordmark spanning the footer width, like ettrics.com.
          Dims with the rest of the footer on hover (no hover override). */}
      <div aria-hidden="true" className={"w-full overflow-hidden px-4 " + dimClass}>
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
        {/* Link columns on the left (both left-aligned, side by side, like
            ettrics.com); descriptive theme switch pinned to the bottom-right. */}
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-x-24">
            <nav aria-label="Site">
              <ul className="flex flex-col">
                {pageLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Elsewhere">
              <ul className="flex flex-col">
                {externalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <ThemeSwitch className={dimClass} />
        </div>

        {/* Bottom strip: copyright (left) / meta (right). Dims as one unit. */}
        <div className={"mt-12 flex flex-col gap-2 border-t border-stone-100 pt-6 text-sm text-stone-500 dark:border-stone-800/60 dark:text-stone-400 sm:flex-row sm:items-center sm:justify-between " + dimClass}>
          <p>© {currentYear} Abraão Alves</p>
          <p className="font-mono text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500">
            v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
