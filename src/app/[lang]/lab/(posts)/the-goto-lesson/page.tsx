import type { Metadata } from "next";
import Content from "./content.mdx";
import { JsonLd } from "@/components/json-ld";
import { articleLd } from "@/lib/structured-data";

// Server route owns SEO metadata; prose lives in content.mdx (MDX can't export
// metadata under the Code Hike pipeline — same pattern as the case studies).
const title = "The GOTO Lesson";
const description =
  "A failing grade on a 2000 microcontroller project taught me software's first rule: code is for humans.";
const path = "/en/lab/the-goto-lesson";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    languages: {
      en: path,
      pt: "/pt/lab/the-goto-lesson",
      "x-default": path,
    },
  },
};

export default function TheGotoLessonPage() {
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: title,
          description,
          datePublished: "2026-05-30",
          path,
        })}
      />
      <Content />
    </>
  );
}
