"use client";

import { useTheme } from "next-themes";
import { AsciiArtCanvas } from "@/components/asciiart";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useLanguage } from "@/components/language-provider";
import { CONTENT } from "@/lib/content";

// The geo-map surface is --bg-1, so the canvas bg must match that (not --bg) to
// stay invisible. Ink tracks the theme.
const BG1_LIGHT = "#ecebe6";
const BG1_DARK = "#111315";
const INK_LIGHT = "#1d2022";
const INK_DARK = "#e7e9e9";

/**
 * Geospatial centerpiece from proto/index.html: a bordered card holding the US
 * map rendered as shimmering ASCII (existing engine, `ripple` shader), with a
 * mono chrome caption and a row of stat chips.
 */
export function Geo() {
  const { resolvedTheme } = useTheme();
  const { lang } = useLanguage();
  const t = CONTENT[lang].geo;
  const isDark = resolvedTheme === "dark";

  return (
    <section className="section" id="geo">
      <div className="wrap">
        <div className="ghosthead">
          <div
            className="ghost"
            aria-hidden="true"
            style={{ fontSize: "clamp(80px,15vw,210px)" }}
          >
            {t.ghost}
          </div>
          <Reveal className="geo-head real">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2
              className="h-display"
              style={{ fontSize: "clamp(34px,5.4vw,72px)", maxWidth: "15ch" }}
            >
              {t.title}
            </h2>
            <p className="body-lg" style={{ maxWidth: "60ch" }}>
              {t.body}
            </p>
          </Reveal>
        </div>

        <Reveal className="geo-map" delay={0.1}>
          <div className="map-chrome">
            <span>{t.chrome[0]}</span>
            <span>{t.chrome[1]}</span>
          </div>
          <div className="map-canvas-wrap">
            <AsciiArtCanvas
              art="USmap"
              ripple
              source="·smartscout"
              speed={1.3}
              scale={0.18}
              origin={{x: 0.7475041918307729, y: 0.42154605263157896}}
              threshold={0.5}
              fontSize={10}
              color={isDark ? INK_DARK : INK_LIGHT}
              background={isDark ? BG1_DARK : BG1_LIGHT}
              className="h-[32vw] min-h-[200px] max-h-[380px] w-full"
              style={{ minHeight: 200 }}
            />
          </div>
        </Reveal>

        <Reveal className="geo-foot" delay={0.16}>
          {t.chips.map((c) => (
            <span key={c[0]} className="chip">
              <span className="sq" aria-hidden="true" />
              <b>{c[0]}</b> {c[1]}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
