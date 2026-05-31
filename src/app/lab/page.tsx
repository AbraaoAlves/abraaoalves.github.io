import Link from "next/link";

export default function LabIndex() {
  return (
    <main className="flex-1 flex flex-col p-4 md:p-8 max-w-3xl mx-auto w-full mb-20 pt-16">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">The Lab</h1>
        <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1"></div>
      </div>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-12">
        A collection of deep dives into architecture, systems engineering, and the principles that survive the test of time. Exploring the "why" behind the code.
      </p>

      <div className="flex flex-col gap-6">
        <Link 
          href="/lab/the-goto-lesson"
          className="group flex flex-col gap-2 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">The GOTO Lesson</h2>
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-sm">May 30, 2026</span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-2">
            Why my failing grade on a digital marquee in 2000 taught me the most important rule of software architecture: code is for humans first.
          </p>
        </Link>
      </div>
    </main>
  );
}
