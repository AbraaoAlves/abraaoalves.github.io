"use client";

import { useTheme } from "next-themes";
import { AsciiTextCanvas } from "./asciiart";
import { Reveal } from "./reveal";
import { Eyebrow } from "./ui/eyebrow";
import { Button } from "./ui/button";
import { useLanguage } from "./language-provider";
import { CONTENT } from "@/lib/content";

/**
 * Hero from proto/index.html: a two-column grid — lead/meta/CTAs on the left,
 * the name rendered as a shimmering ASCII wordmark on the right (collapses to a
 * single column with the wordmark on top below 1080px).
 *
 * The ASCII canvas paints an opaque background, so it MUST match the page bg to
 * stay invisible; colors flip with the theme. The shimmer is the existing
 * engine's `ripple` shader clipped to the name mask.
 */

// Page background per theme — MUST match --bg so the canvas panel is invisible.
const PAPER_LIGHT = "#f6f5f2";
const PAPER_DARK = "#0b0c0d";
// ASCII ink — the proto's auto ascii-fg (one step off full contrast).
const INK_LIGHT = "#1d2022";
const INK_DARK = "#e7e9e9";

export function Hero() {
  // resolvedTheme is undefined on the server / first paint → defaults to light.
  // Theme only affects canvas *drawing* (props), not server-rendered markup, so
  // there is no hydration mismatch and no mount guard is needed.
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const t = CONTENT[lang].hero;
  const isDark = resolvedTheme === "dark";
  const paper = isDark ? PAPER_DARK : PAPER_LIGHT;
  const ink = isDark ? INK_DARK : INK_LIGHT;

  return (
    <section className="hero section" id="top">
      {/* Real accessible name — the canvas below is decorative. */}
      <h1 className="sr-only">
        Abraão Alves — software engineering, architecture, and mentorship
      </h1>

      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-left">
            <Reveal>
              <Eyebrow>{t.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="lead">{t.lead}</p>
            </Reveal>

            <Reveal delay={0.16} className="hero-meta">
              {t.meta.map((m, i) => (
                <span key={m}>
                  {i > 0 ? <span className="dot" aria-hidden="true" /> : null}
                  {m}
                </span>
              ))}
            </Reveal>

            <Reveal delay={0.2} className="hero-status">
              <span className="dot-live" aria-hidden="true" />
              {t.availability}
            </Reveal>

            <Reveal delay={0.24} className="btn-row">
              <Button href="#contact" variant="primary" arrow>
                {t.ctaPrimary}
              </Button>
              <Button href="#work" variant="ghost">
                {t.ctaSecondary}
              </Button>
            </Reveal>

            <Reveal delay={0.32}>
              <a href="#geo" className="scroll-cue">
                <span className="line" aria-hidden="true" />
                {t.cue}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="ascii-name">
            {/* Shade-block source keeps the silhouette solid (letters dissolve
                into noise at this density); the ripple shader shimmers it. */}
            <AsciiTextCanvas
              text={"ABRAÃO\nALVES"}
              ripple
              source="▓█▒▓░█"
              speed={1.2}
              scale={0.13}
              threshold={0.34}
              weight={900}
              fontSize={11}
              color={ink}
              background={paper}
              className="h-[30vw] min-h-[200px] max-h-[380px] w-full"
              style={{ minHeight: 200 }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
