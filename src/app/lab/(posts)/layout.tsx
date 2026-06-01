import Link from "next/link";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full mb-20 pt-12 prose dark:prose-invert prose-neutral prose-pre:bg-stone-950 dark:prose-pre:bg-stone-900 prose-pre:border prose-pre:border-stone-800">
      <div className="mb-8">
        <Link href="/lab" className="text-sm font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 no-underline">
          ← Back to Lab
        </Link>
      </div>
      {children}
    </article>
  );
}