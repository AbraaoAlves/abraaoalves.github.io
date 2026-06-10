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
