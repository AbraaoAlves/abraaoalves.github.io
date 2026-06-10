import { Hero } from "@/components/hero";
import { Geo, Proof, Work, Stack, Mentorship } from "@/components/sections";

/**
 * Home — composed from the prototype (proto/index.html) section order:
 * Hero → Geo → Work (+migrations) → Stack → Mentorship → Roots → Lab.
 * The Footer/Contact block is rendered by the layout.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Proof />
      <Geo />
      <Work />
      <Stack />
      <Mentorship />
    </main>
  );
}
