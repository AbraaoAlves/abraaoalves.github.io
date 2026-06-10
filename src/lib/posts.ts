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
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: "the-goto-lesson",
    title: "The GOTO Lesson",
    date: "May 30, 2026",
    tag: "CRAFT",
    excerpt:
      "Why my failing grade on a digital marquee in 2000 taught me the most important rule of software architecture: code is for humans first.",
  },
];
