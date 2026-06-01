import Link from "next/link";
import { posts } from "@/lib/posts";

export default function LabIndex() {
  return (
    <main className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full mb-20 pt-16">
      <div className="mb-10">
        <span className="block select-none text-6xl md:text-8xl font-black uppercase leading-none tracking-tight text-stone-100 dark:text-stone-900">
          Lab
        </span>
        <h1 className="-mt-4 md:-mt-6 pl-1 font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-brand">
          Writing & Experiments
        </h1>
      </div>

      <p className="text-stone-600 dark:text-stone-400 mb-12">
        A collection of deep dives into architecture, systems engineering, and the principles that survive the test of time. Exploring the &quot;why&quot; behind the code.
      </p>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/lab/${post.slug}`}
            className="group flex flex-col gap-2 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:border-brand dark:hover:border-brand transition-colors"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold group-hover:text-brand transition-colors">{post.title}</h2>
              <span className="text-stone-400 dark:text-stone-500 font-mono text-sm">{post.date}</span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
