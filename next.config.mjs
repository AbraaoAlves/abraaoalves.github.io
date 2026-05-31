import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkCodeHike,
    ],
    rehypePlugins: [],
    recmaPlugins: [
      recmaCodeHike,
    ],
  },
});

export default withMDX(nextConfig);