import type { Metadata } from "next";
import Content from "./content.mdx";
import { JsonLd } from "@/components/json-ld";
import { articleLd } from "@/lib/structured-data";

const title = "NotaSocial — Founder & Full-Stack Engineer";
const description =
  "Founding and building a mobile donation platform on Brazilian e-invoices — solo, full-stack — to 1st place at Startup Weekend and a global top-12 finish.";
const path = "/en/work/notasocial";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    languages: {
      en: path,
      pt: "/pt/work/notasocial",
      "x-default": path,
    },
  },
};

export default function NotaSocialCasePage() {
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: title,
          description,
          datePublished: "2026-04-15",
          path,
        })}
      />
      <Content />
    </>
  );
}
