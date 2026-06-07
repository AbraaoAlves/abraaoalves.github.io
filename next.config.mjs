import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

// Code Hike maps fenced code blocks to a <Code> component (provided in
// src/mdx-components.tsx) so blocks render with real syntax highlighting.
const chConfig = { components: { code: "Code" } };

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      [remarkCodeHike, chConfig],
    ],
    rehypePlugins: [],
    recmaPlugins: [
      [recmaCodeHike, chConfig],
    ],
  },
});

export default withMDX(nextConfig);