import type { Metadata } from "next";
import Content from "./content.mdx";
import { JsonLd } from "@/components/json-ld";
import { articleLd } from "@/lib/structured-data";

const title = "Rendering 100,000 points without dropping a frame";
const description =
  "How SmartScout kept 100,000+ geographic points live in the browser at 60fps — web workers, transferable typed arrays, viewport binning, and pre-computed answers.";
const path = "/en/lab/rendering-100k-points";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
    languages: {
      en: path,
      pt: "/pt/lab/rendering-100k-points",
      "x-default": path,
    },
  },
};

export default function Rendering100kPointsPage() {
  return (
    <>
      <JsonLd
        data={articleLd({
          headline: title,
          description,
          datePublished: "2026-06-06",
          path,
        })}
      />
      <Content />
    </>
  );
}
