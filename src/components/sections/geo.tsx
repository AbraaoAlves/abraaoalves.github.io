"use client";

import { useTheme } from "next-themes";
import { AsciiArtCanvas } from "@/components/asciiart";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

// The geo-map surface is --bg-1, so the canvas bg must match that (not --bg) to
// stay invisible. Ink tracks the theme.
const BG1_LIGHT = "#ecebe6";
const BG1_DARK = "#111315";
const INK_LIGHT = "#1d2022";
const INK_DARK = "#e7e9e9";

const CHROME = ["us-albers // reactive", "records: 100,000+"];
const CHIPS: [string, string][] = [
  ["100K+", "records, client-side"],
  ["10s → 800ms", "query latency"],
  ["200+", "pre-computed personas"],
  ["Mapbox GL", "visual layers"],
];

/**
 * Geospatial centerpiece from proto/index.html: a bordered card holding the US
 * map rendered as shimmering ASCII (existing engine, `ripple` shader), with a
 * mono chrome caption and a row of stat chips.
 */
export function Geo() {
  const { resolvedTheme } = useTheme();
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
            PLACE
          </div>
          <Reveal className="geo-head real">
            <Eyebrow>Geospatial</Eyebrow>
            <h2
              className="h-display"
              style={{ fontSize: "clamp(34px,5.4vw,72px)", maxWidth: "15ch" }}
            >
              Where data meets place.
            </h2>
            <p className="body-lg" style={{ maxWidth: "60ch" }}>
              For nine years I owned the interactive map at the heart of
              SmartScout — a geographic audience-intelligence platform —
              rendering 100,000+ records of reactive data in the browser without
              dropping a frame. Solving problems that live on a map is what I do
              best.
            </p>
          </Reveal>
        </div>

        <Reveal className="geo-map" delay={0.1}>
          <div className="map-chrome">
            <span>{CHROME[0]}</span>
            <span>{CHROME[1]}</span>
          </div>
          <div className="map-canvas-wrap">
            <AsciiArtCanvas
              art="USmap"
              ripple
              source="geospatiallatlng·smartscout "
              speed={4}
              scale={0.16}
              threshold={0.5}
              fontSize={11}
              color={isDark ? INK_DARK : INK_LIGHT}
              background={isDark ? BG1_DARK : BG1_LIGHT}
              className="h-[32vw] min-h-[200px] max-h-[380px] w-full"
              style={{ minHeight: 200 }}
            />
          </div>
        </Reveal>

        <Reveal className="geo-foot" delay={0.16}>
          {CHIPS.map((c) => (
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
