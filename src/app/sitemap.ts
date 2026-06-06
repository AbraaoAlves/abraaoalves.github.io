import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://abraaoalves.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/lab`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/lab/the-goto-lesson`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
