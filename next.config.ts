import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import { remarkCodeHike } from "codehike/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Outras configs aqui se necessário (ex: output: "export" p/ GitHub Pages depois)
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      [remarkCodeHike, { theme: "github-dark" }],
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
