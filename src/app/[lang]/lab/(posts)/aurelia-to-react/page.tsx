import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Why I migrated a whole team from Aurelia to React",
  description:
    "The decision was about people, not the framework. How I moved a team to React with a strangler-fig migration — no big-bang rewrite, no feature freeze.",
  alternates: {
    canonical: "/en/lab/aurelia-to-react",
    languages: {
      en: "/en/lab/aurelia-to-react",
      pt: "/pt/lab/aurelia-to-react",
      "x-default": "/en/lab/aurelia-to-react",
    },
  },
};

export default function AureliaToReactPage() {
  return <Content />;
}
