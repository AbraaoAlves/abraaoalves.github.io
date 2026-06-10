import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Rendering 100,000 points without dropping a frame",
  description:
    "How SmartScout kept 100,000+ geographic points live in the browser at 60fps — web workers, transferable typed arrays, viewport binning, and pre-computed answers.",
  alternates: {
    canonical: "/en/lab/rendering-100k-points",
    languages: {
      en: "/en/lab/rendering-100k-points",
      pt: "/pt/lab/rendering-100k-points",
      "x-default": "/en/lab/rendering-100k-points",
    },
  },
};

export default function Rendering100kPointsPage() {
  return <Content />;
}
