/**
 * Lab post index. Each post's prose lives in
 * src/app/lab/(posts)/<slug>/page.mdx; this drives the /lab listing so adding a
 * post is: create the MDX folder + add an entry here.
 */
export type Post = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  /** One-line claim shown under the title in the Lab listing (bilingual). */
  excerpt: { en: string; pt: string };
};

export const posts: Post[] = [
  {
    slug: "aurelia-to-react",
    title: "Why I migrated a whole team from Aurelia to React",
    date: "June 8, 2026",
    tag: "ARCHITECTURE",
    excerpt: {
      en: "The decision was about people, not the framework — and how to migrate without a big-bang rewrite.",
      pt: "A decisão foi sobre pessoas, não o framework — e como migrar sem um rewrite big-bang.",
    },
  },
  {
    slug: "rendering-100k-points",
    title: "Rendering 100,000 points without dropping a frame",
    date: "June 6, 2026",
    tag: "PERFORMANCE",
    excerpt: {
      en: "Keeping 100k+ geographic points live in the browser at 60fps: workers, typed arrays, and pre-computed answers.",
      pt: "Mantendo 100k+ pontos geográficos vivos no browser a 60fps: workers, typed arrays e respostas pré-computadas.",
    },
  },
  {
    slug: "the-goto-lesson",
    title: "The GOTO Lesson",
    date: "May 30, 2026",
    tag: "CRAFT",
    excerpt: {
      en: "A failing grade on a 2000 microcontroller project taught me software's first rule: code is for humans.",
      pt: "Uma nota baixa num projeto de microcontrolador em 2000 me ensinou a 1ª regra do software: código é para humanos.",
    },
  },
];
