import { Pre, highlight, type RawCode } from "codehike/code";

/**
 * Code Hike renderer for MDX fenced code blocks (mapped via chConfig in
 * next.config.mjs → src/mdx-components.tsx). Runs at build time (async server
 * component), so it works with the static export.
 */
export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark");
  return (
    <Pre
      code={highlighted}
      className="my-6 overflow-x-auto rounded-xl border border-stone-800 p-5 text-sm leading-relaxed"
    />
  );
}
