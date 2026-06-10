import type { Metadata } from "next";
import Content from "./content.mdx";

// The route lives in page.tsx (a server component) so it can own per-page SEO
// metadata. The prose itself is authored in content.mdx and imported as a
// component — exporting `metadata` directly from the MDX is disallowed because
// the Code Hike MDX pipeline marks the module as a client component.
export const metadata: Metadata = {
  title: "SmartScout — Geographic Audience Intelligence",
  description:
    "How I architected an interactive map that kept 100,000+ geographic records live in the browser at sub-800ms — and owned it end-to-end for nine years, from prototype to acquisition.",
  alternates: {
    canonical: "/en/work/smartscout-geospatial",
    languages: {
      en: "/en/work/smartscout-geospatial",
      pt: "/pt/work/smartscout-geospatial",
      "x-default": "/en/work/smartscout-geospatial",
    },
  },
};

export default function SmartScoutCasePage() {
  return <Content />;
}
