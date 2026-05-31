import { ThemeToggle } from "@/components/theme-toggle";
import { HeroAscii } from "@/components/hero-ascii";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-4 max-w-5xl mx-auto w-full">
      <HeroAscii text="ABRAÃO ALVES" />
      
      <p className="text-lg text-neutral-500 dark:text-neutral-400 text-center max-w-2xl mt-8">
        Building software that lasts. High-impact engineering, mentorship, and architecture since 2008.
      </p>
    </main>
  );
}
