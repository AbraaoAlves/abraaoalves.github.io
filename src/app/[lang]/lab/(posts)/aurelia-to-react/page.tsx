import type { Metadata } from "next";
import Content from "./content.mdx";
import { JsonLd } from "@/components/json-ld";
import { articleLd } from "@/lib/structured-data";

const title = "Why I migrated a whole team from Aurelia to React";
const description =
  "The decision was about people, not the framework. How I moved a team to React with a strangler-fig migration — no big-bang rewrite, no feature freeze.";
const path = "/en/lab/aurelia-to-react";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    languages: {
      en: path,
      pt: "/pt/lab/aurelia-to-react",
      "x-default": path,
    },
  },
};

export default function AureliaToReactPage() {
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: title,
          description,
          datePublished: "2026-06-08",
          path,
        })}
      />
      <Content />
    </>
  );
}
