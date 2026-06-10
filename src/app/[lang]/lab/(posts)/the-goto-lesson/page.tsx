import type { Metadata } from "next";
import Content from "./content.mdx";

// Server route owns SEO metadata; prose lives in content.mdx (MDX can't export
// metadata under the Code Hike pipeline — same pattern as the case studies).
export const metadata: Metadata = {
  title: "The GOTO Lesson",
  description:
    "A failing grade on a 2000 microcontroller project taught me software's first rule: code is for humans.",
  alternates: {
    canonical: "/en/lab/the-goto-lesson",
    languages: {
      en: "/en/lab/the-goto-lesson",
      pt: "/pt/lab/the-goto-lesson",
      "x-default": "/en/lab/the-goto-lesson",
    },
  },
};

export default function TheGotoLessonPage() {
  return <Content />;
}
