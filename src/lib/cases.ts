/**
 * Case-study index. Each case's prose lives in
 * src/app/[lang]/work/(cases)/<slug>/page.mdx; this drives the "Read the case"
 * links from the Work section, so adding a case is: create the MDX folder + add
 * an entry here (+ register the path in app/sitemap.ts).
 *
 * Mirrors src/lib/posts.ts, but carries `tag` in the registry from day one
 * (the Lab listing learned that lesson the hard way — its tags live in a
 * separate hardcoded map in lab/page.tsx).
 */
export type Case = {
  slug: string;
  title: string;
  org: string;
  year: string;
  summary: string;
  tag: string;
};

export const cases: Case[] = [
  {
    slug: "smartscout-geospatial",
    title: "SmartScout — Geographic Audience Intelligence",
    org: "Beakyn · for OUTFRONT Media (NYSE: OUT)",
    year: "2017 — 2026",
    summary:
      "Owning a geospatial audience-intelligence platform end-to-end for nine years — prototype to acquisition — and the architecture that kept 100,000+ records live in the browser at sub-800ms.",
    tag: "GEOSPATIAL",
  },
];
