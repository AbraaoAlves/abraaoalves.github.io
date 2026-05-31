import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-4">
      <h1 className="text-4xl font-bold tracking-tight">ABRAÃO ALVES</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400">
        Building software that lasts. High-impact engineering, mentorship, and architecture since 2008.
      </p>
      <div className="mt-8">
        <ThemeToggle />
      </div>
    </main>
  );
}
