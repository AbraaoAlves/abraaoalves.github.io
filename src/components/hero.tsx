"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Name-forward hero in the Ettrics footer style: the name is a wordmark used as
 * a CSS mask over a static field of ASCII characters. The font mask keeps the
 * name perfectly legible while the ASCII texture fills the letterforms.
 *
 * Reference: the `.framer-bov0b3-container` treatment on ettrics.com/about —
 * a <pre> of monospace characters clipped by a `-webkit-mask-image` wordmark.
 */

// Two-line wordmark. White = visible region of the mask.
const NAME_LINES = ["ABRAÃO", "ALVES"];

// Classic ASCII density ramp, sparse → dense.
const RAMP = " ..:-=+*#%@";

// Monospace cell metrics at the 10px font size below (width ≈ 0.6em).
const CHAR_W = 6;
const CHAR_H = 10;

// Deterministic smooth field (no Math.random → no SSR/client hydration drift).
function buildAscii(cols: number, rows: number): string {
  let out = "";
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const v =
        Math.sin(x * 0.18) +
        Math.cos(y * 0.26) +
        Math.sin((x + y) * 0.09) +
        Math.sin((x - y) * 0.13);
      const n = (v + 4) / 8; // normalise ~0..1
      const i = Math.max(0, Math.min(RAMP.length - 1, Math.floor(n * RAMP.length)));
      out += RAMP[i];
    }
    out += "\n";
  }
  return out;
}

function maskUrl(): string {
  // Inline SVG <text> mask. Generic heavy sans so it renders without web fonts
  // (data-URI SVG masks can't load @font-face). viewBox tuned to the two lines.
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 116'>` +
    `<text x='100' y='52' text-anchor='middle' font-family='Arial Black, Arial Narrow, Arial, sans-serif' font-weight='900' font-size='56' letter-spacing='-2' fill='#fff'>${NAME_LINES[0]}</text>` +
    `<text x='100' y='110' text-anchor='middle' font-family='Arial Black, Arial Narrow, Arial, sans-serif' font-weight='900' font-size='56' letter-spacing='-2' fill='#fff'>${NAME_LINES[1]}</text>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  // Seed with a reasonably sized field so SSR/first paint isn't empty.
  const [ascii, setAscii] = useState(() => buildAscii(180, 44));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const regen = () => {
      const cols = Math.ceil(el.clientWidth / CHAR_W) + 1;
      const rows = Math.ceil(el.clientHeight / CHAR_H) + 1;
      setAscii(buildAscii(cols, rows));
    };
    regen();
    const ro = new ResizeObserver(regen);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mask = maskUrl();

  return (
    <section className="w-full pt-10 md:pt-16 pb-8">
      {/* Accessible name for screen readers / SEO */}
      <h1 className="sr-only">Abraão Alves — software engineering, architecture, and mentorship</h1>

      <div
        ref={ref}
        aria-hidden="true"
        className="relative w-full select-none overflow-hidden text-neutral-900 dark:text-neutral-100 h-[34vw] min-h-[170px] max-h-[420px]"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "left center",
          WebkitMaskPosition: "left center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      >
        <pre
          className="m-0 font-mono leading-none tracking-normal text-current"
          style={{ fontSize: `${CHAR_H}px`, lineHeight: `${CHAR_H}px` }}
        >
          {ascii}
        </pre>
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
