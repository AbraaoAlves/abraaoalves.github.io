"use client";

import { useTheme } from "next-themes";
import { AsciiArtCanvas, AsciiTextCanvas } from "./asciiart";

/**
 * Ettrics-spirit hero: the geometric logo rendered as a faint ASCII watermark
 * fills the section background, with the name set as a bold ASCII wordmark in
 * front and a mono eyebrow above. Monochrome (warm paper + ink), theme-aware:
 * every canvas background matches the page so the panels stay invisible and
 * only the characters show.
 */

// Page background per theme — MUST match <body> so canvas panels are invisible.
const PAPER_LIGHT = "#faf9f7";
const PAPER_DARK = "#121212";
// Ink (the name): full-contrast paper/ink flip.
const INK_LIGHT = "#121212";
const INK_DARK = "#faf9f7";
// Watermark (the logo): one subtle step off the paper so it reads as texture.
const WATERMARK_LIGHT = "#ddd6c6";
const WATERMARK_DARK = "#2e2e2e";
// Shade blocks give the logo a clean faint silhouette (not scattered words).
const WATERMARK_FILL = "▓▒░▓";

// Shade-block fill keeps the wordmark silhouette legible (see hero recipe).
const NAME_FILL = "▓█▒▓░█";

export function Hero() {
  // resolvedTheme is undefined on the server / first paint → defaults to light.
  // Theme only affects canvas *drawing* (props), not server-rendered markup,
  // so there's no hydration mismatch and no mount guard is needed.
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const paper = isDark ? PAPER_DARK : PAPER_LIGHT;
  const ink = isDark ? INK_DARK : INK_LIGHT;
  const watermark = isDark ? WATERMARK_DARK : WATERMARK_LIGHT;

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col justify-center overflow-hidden py-16 md:py-24">
      {/* Real accessible name — the canvases below are decorative. */}
      <h1 className="sr-only">
        Abraão Alves — software engineering, architecture, and mentorship
      </h1>

      {/* Background watermark: the logo mark as faint ASCII, filling the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <AsciiArtCanvas
          art="logo"
          ripple={false}
          source={WATERMARK_FILL}
          speed={1}
          fontSize={12}
          threshold={0.5}
          color={watermark}
          background={paper}
          className="h-full w-full max-w-5xl"
          style={{ minHeight: 0 }}
        />
      </div>

      {/* Foreground content. */}
      <div className="relative z-10">
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
          Staff Engineer · Architect · Mentor
        </p>

        <div aria-hidden="true" className="mt-6 flex flex-col gap-1">
          {/* One word per line so each fills the full width (width-bound auto-fit)
              and reads as a bold wordmark instead of a small, centered block. */}
          <AsciiTextCanvas
            text="ABRAÃO"
            source={NAME_FILL}
            speed={2}
            fontSize={12}
            weight={900}
            threshold={0.25}
            feather={0.5}
            color={ink}
            background={paper}
            className="w-full h-[16vw] min-h-[120px] max-h-[210px]"
            style={{ minHeight: 120 }}
          />
          <AsciiTextCanvas
            text="ALVES"
            source={NAME_FILL}
            speed={2}
            fontSize={12}
            weight={900}
            threshold={0.25}
            feather={0.5}
            color={ink}
            background={paper}
            className="w-full h-[16vw] min-h-[120px] max-h-[210px]"
            style={{ minHeight: 120 }}
          />
        </div>

        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-stone-600 dark:text-stone-300 text-balance">
          Building software that lasts. High-impact engineering, architecture,
          and mentorship since 2008.
        </p>
      </div>
    </section>
  );
}
