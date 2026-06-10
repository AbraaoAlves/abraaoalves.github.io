import type { Metadata } from "next";
import Content from "./content.mdx";
import { JsonLd } from "@/components/json-ld";
import { articleLd } from "@/lib/structured-data";

// The route lives in page.tsx (a server component) so it can own per-page SEO
// metadata. The prose itself is authored in content.mdx and imported as a
// component — exporting `metadata` directly from the MDX is disallowed because
// the Code Hike MDX pipeline marks the module as a client component.
const title = "SmartScout — Geographic Audience Intelligence";
const description =
  "How I architected an interactive map that kept 100,000+ geographic records live in the browser at sub-800ms — and owned it end-to-end for nine years, from prototype to acquisition.";
const path = "/en/work/smartscout-geospatial";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    languages: {
      en: path,
      pt: "/pt/work/smartscout-geospatial",
      "x-default": path,
    },
  },
};

export default function SmartScoutCasePage() {
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: title,
          description,
          datePublished: "2026-05-01",
          path,
        })}
      />
      <Content />
    </>
  );
}
