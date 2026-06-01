import { AsciiArtCanvas } from "@/components/asciiart";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";

function SectionHeader({ ghost, label }: { ghost: string; label: string }) {
  return (
    <div className="mb-10">
      <span className="block select-none text-6xl md:text-8xl font-black uppercase leading-none tracking-tight text-stone-100 dark:text-stone-900">
        {ghost}
      </span>
      <h2 className="-mt-4 md:-mt-6 pl-1 font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-brand">
        {label}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex-1 flex flex-col p-4 md:p-8 gap-24 max-w-5xl mx-auto w-full mb-24">
      <Hero />

      {/* WORK / IMPACT SECTION */}
      <section id="work" className="w-full scroll-mt-24">
        <Reveal><SectionHeader ghost="Work" label="Selected Impact" /></Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Beakyn */}
          <div className="group flex flex-col gap-3 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:border-brand dark:hover:border-brand transition-colors">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-xl">The 9-Year Evolution</h3>
              <span className="text-xs font-mono px-2 py-1 bg-stone-100 dark:bg-stone-900 rounded text-stone-500">2017 - 2026</span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              As the first Brazilian engineer hired at <span className="font-medium text-stone-900 dark:text-stone-200">Beakyn</span>, I led the architectural evolution from an early Aurelia/FeathersJS MVP to a highly scalable global platform using React, NestJS, and Go.
            </p>
            <ul className="text-sm text-stone-500 dark:text-stone-500 space-y-2 mt-2">
              <li className="flex gap-2">
                <span className="text-brand">›</span>
                <span>Architected complex geospatial data visualization layers using Mapbox GL for Outfront Media.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand">›</span>
                <span>Championed DX (Developer Experience) with Storybook, SWC, and strict pre-commit CI pipelines.</span>
              </li>
            </ul>
          </div>

          {/* Ontic2 / Compliance */}
          <div className="group flex flex-col gap-3 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:border-brand dark:hover:border-brand transition-colors">
            <AsciiArtCanvas art="USmap" source="smartscout." speed={1} background="#1c1917" color="#f4f1ea" ripple clickable />
          </div>
        </Reveal>
      </section>

      {/* MENTORSHIP SECTION */}
      <section id="mentorship" className="w-full scroll-mt-24">
        <Reveal><SectionHeader ghost="People" label="Building Teams" /></Reveal>

        <Reveal>
          <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-3xl">
            The true measure of a Staff Engineer is the multiplier effect. Over the years, I've had the privilege of hiring, mentoring, and shaping the careers of exceptional developers who now lead the industry.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800/50">
            <p className="text-sm text-stone-600 dark:text-stone-300 italic mb-4">
              "Abraão is far more than a brilliant Principal Engineer. He is the kind of leader who 'sets the house in order,' establishing clear quality standards that elevate the entire engineering organization... the best leader I have worked with in my entire career."
            </p>
            <footer className="text-sm font-medium">Juan Pujol</footer>
          </blockquote>

          <blockquote className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800/50">
            <p className="text-sm text-stone-600 dark:text-stone-300 italic mb-4">
              "He goes beyond 'making it work': he prioritizes security, performance, and long‑term reliability... He adds maturity, rigor, and a systemic mindset—an invaluable asset to any engineering team."
            </p>
            <footer className="text-sm font-medium">Bruno Lázaro</footer>
          </blockquote>

          <blockquote className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800/50">
            <p className="text-sm text-stone-600 dark:text-stone-300 italic mb-4">
              "Working with Hiléo is knowing your engineering foundation is in safe hands. I had the privilege of seeing his growth... evolving from mid‑level developer to the software architect responsible for our entire authentication."
            </p>
            <footer className="text-sm font-medium">On mentoring Hiléo Andersson</footer>
          </blockquote>

          <blockquote className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-900/50 border border-stone-100 dark:border-stone-800/50">
            <p className="text-sm text-stone-600 dark:text-stone-300 italic mb-4">
              "His contribution goes far beyond delivering functional code. He's one of those rare professionals who combines a strong product‑first mindset with impeccable technical rigor."
            </p>
            <footer className="text-sm font-medium">On mentoring Lamartine</footer>
          </blockquote>
        </Reveal>
      </section>

      {/* ABOUT / FOUNDATION SECTION */}
      <section id="about" className="w-full scroll-mt-24">
        <Reveal><SectionHeader ghost="Roots" label="The Foundation" /></Reveal>

        <Reveal delay={0.1} className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4 text-stone-600 dark:text-stone-400">
            <p>
              My journey began in 2000 at a local public technical school learning <strong className="text-stone-900 dark:text-stone-200">Assembly and pic8051 microcontrollers</strong>. That raw, low-level experience taught me early on that the evolution of programming languages is largely about constraining our ability to write unmaintainable code.
            </p>
            <p>
              A classic lesson from those days—learning the hard way why excessive <code>GOTO</code> statements ruin readability—shaped my philosophy today: <em>"Software must be understood by humans first."</em> If a team cannot read and judge the code, the architecture has failed, regardless of how clever it seems.
            </p>
          </div>
          <div className="md:w-1/3 bg-stone-50 dark:bg-stone-900/50 p-6 rounded-2xl border border-stone-100 dark:border-stone-800/50 flex flex-col justify-center">
            <h3 className="font-semibold text-stone-900 dark:text-stone-200 mb-2">Beyond the Keyboard</h3>
            <ul className="text-sm space-y-3">
              <li className="flex gap-2">
                <span>♟️</span>
                <span>Playing chess to practice strategic patience.</span>
              </li>
              <li className="flex gap-2">
                <span>🎻</span>
                <span>Learning classical music with a double bass.</span>
              </li>
              <li className="flex gap-2">
                <span>🌊</span>
                <span>Swimming in the sea with my daughters.</span>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

    </main>
  );
}
