import { SOCIALS } from "@/lib/content";

/**
 * JSON-LD builders for search engines and AI surfaces. Static-export safe —
 * rendered as <script type="application/ld+json"> via <JsonLd> (json-ld.tsx).
 */
const SITE = "https://abraaoalves.github.io";
const AUTHOR = { "@type": "Person", name: "Abraão Alves", url: SITE } as const;

/** Site-wide identity, rendered in the [lang] layout on every page. */
export const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abraão Alves",
  jobTitle: "Staff Software Engineer",
  description:
    "Staff engineer, architect, and mentor — 18+ years building software that lasts, from geospatial systems to AI infrastructure.",
  url: SITE,
  sameAs: SOCIALS.map((s) => s.href),
  knowsLanguage: ["en", "pt-BR"],
  knowsAbout: [
    "Software Architecture",
    "Geospatial Systems",
    "TypeScript",
    "React",
    "Go",
    "Serverless",
    "Engineering Mentorship",
  ],
  address: { "@type": "PostalAddress", addressCountry: "BR" },
};

/** Per-article schema for Lab posts and case studies. */
export function articleLd(opts: {
  headline: string;
  description: string;
  datePublished: string;
  path: string;
  type?: "TechArticle" | "Article";
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "TechArticle",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    inLanguage: "en",
    author: AUTHOR,
    publisher: AUTHOR,
    mainEntityOfPage: `${SITE}${opts.path}`,
  };
}
