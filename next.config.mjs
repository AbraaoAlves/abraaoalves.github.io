import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Outras configs aqui se necessário (ex: output: "export" p/ GitHub Pages depois)
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      "remark-gfm",
      ["codehike/mdx", { theme: "github-dark" }],
    ],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);