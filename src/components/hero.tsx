"use client";

import { useTheme } from "next-themes";
import { AsciiTextCanvas } from "./asciiart";

/**
 * Name-forward hero in the Ettrics `.framer-bov0b3-container` style: the name is
 * rendered as a bold wordmark whose letterforms are filled with a slowly
 * scrolling field of ASCII characters. The canvas background is set to the page
 * background so the panel is invisible — only the ASCII-filled letters show,
 * exactly like the Ettrics footer wordmark.
 *
 * Theme-aware: ink + paper flip with the active theme so the wordmark belongs to
 * the page in both light and dark instead of being a hard black/white box.
 */

// Page background per theme (matches <body> bg-white / dark:bg-neutral-950).
const PAPER_LIGHT = "#ffffff";
const PAPER_DARK = "#0a0a0a";
// Ink (the ASCII characters).
const INK_LIGHT = "#171717";
const INK_DARK = "#ededed";

// What fills the letters: shade blocks (\u2593\u2592\u2591\u2588) rather than letters. A dense,
// low-variance fill keeps the letterform silhouette readable (letters-in-letters
// dissolve into noise) while the scrolling shades give the ASCII/dither texture.
const FILL_SOURCE = "\u2593\u2592\u2591\u2593\u2588\u2592";

export function Hero() {
  // resolvedTheme is undefined on the server / first paint → defaults to light.
  // Theme only affects canvas *drawing* (passed as props), not server-rendered
  // markup, so there's no hydration mismatch and no mount guard is needed.
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const background = isDark ? PAPER_DARK : PAPER_LIGHT;
  const color = isDark ? INK_DARK : INK_LIGHT;

  return (
    <section className="w-full pt-10 md:pt-16 pb-8">
      {/* Real accessible name — the canvas below is decorative. */}
      <h1 className="sr-only">
        Abraão Alves — software engineering, architecture, and mentorship
      </h1>

      <div aria-hidden="true" className="flex flex-col gap-1">
        {/* One word per line so each fills the full width (width-bound auto-fit)
            and reads as a bold wordmark instead of a small, centered block. */}
        <AsciiTextCanvas
          text="ABRAÃO"
          source={FILL_SOURCE}
          speed={2}
          fontSize={12}
          weight={900}
          threshold={0.25}
          feather={0.5}
          color={color}
          background={background}
          className="w-full h-[18vw] min-h-[150px] max-h-[230px]"
          style={{ minHeight: 150 }}
        />
        <AsciiTextCanvas
          text="ALVES"
          source={FILL_SOURCE}
          speed={2}
          fontSize={12}
          weight={900}
          threshold={0.25}
          feather={0.5}
          color={color}
          background={background}
          className="w-full h-[18vw] min-h-[150px] max-h-[230px]"
          style={{ minHeight: 150 }}
        />
      </div>

      <p className="mt-8 max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 text-balance">
        Building software that lasts. High-impact engineering, architecture, and
        mentorship since 2008.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
        <span>Staff Engineer</span>
        <span className="text-brand">/</span>
        <span>Architect</span>
        <span className="text-brand">/</span>
        <span>Mentor</span>
      </div>
    </section>
  );
}
