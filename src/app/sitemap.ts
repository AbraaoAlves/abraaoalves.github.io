import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://abraaoalves.github.io";

// One logical page → one entry per locale, cross-linked with hreflang so Google
// indexes both languages. `x-default` points at the canonical (English) URL.
const PAGES: { path: string; changeFrequency: "monthly" | "weekly" | "yearly"; priority: number }[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/lab", changeFrequency: "weekly", priority: 0.7 },
  { path: "/lab/the-goto-lesson", changeFrequency: "yearly", priority: 0.6 },
  { path: "/lab/rendering-100k-points", changeFrequency: "yearly", priority: 0.6 },
  { path: "/lab/aurelia-to-react", changeFrequency: "yearly", priority: 0.6 },
  { path: "/work/smartscout-geospatial", changeFrequency: "yearly", priority: 0.7 },
  { path: "/work/notasocial", changeFrequency: "yearly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap(({ path, changeFrequency, priority }) => {
    const languages = {
      en: `${BASE}/en${path}`,
      pt: `${BASE}/pt${path}`,
      "x-default": `${BASE}/en${path}`,
    };
    return (["en", "pt"] as const).map((lang) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
