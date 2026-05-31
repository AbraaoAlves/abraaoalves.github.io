import { ThemeToggle } from "@/components/theme-toggle";
import { HeroAscii } from "@/components/hero-ascii";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center p-4 md:p-8 gap-16 max-w-5xl mx-auto w-full mb-20">
      <section className="w-full flex flex-col items-center pt-8">
        <HeroAscii text="ABRAÃO ALVES" />
        <p className="text-lg text-neutral-500 dark:text-neutral-400 text-center max-w-2xl mt-8">
          Building software that lasts. High-impact engineering, mentorship, and architecture since 2008.
        </p>
      </section>

      {/* WORK / IMPACT SECTION */}
      <section id="work" className="w-full scroll-mt-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Selected Impact</h2>
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Beakyn */}
          <div className="group flex flex-col gap-3 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-xl">The 9-Year Evolution</h3>
              <span className="text-xs font-mono px-2 py-1 bg-neutral-100 dark:bg-neutral-900 rounded text-neutral-500">2017 - Present</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              As the first Brazilian engineer hired at <span className="font-medium text-neutral-900 dark:text-neutral-200">Beakyn</span>, I led the architectural evolution from an early Aurelia/FeathersJS MVP to a highly scalable global platform using React, NestJS, and Go.
            </p>
            <ul className="text-sm text-neutral-500 dark:text-neutral-500 space-y-2 mt-2">
              <li className="flex gap-2">
                <span className="text-neutral-300 dark:text-neutral-700">›</span>
                <span>Architected complex geospatial data visualization layers using Mapbox GL for Outfront Media.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-300 dark:text-neutral-700">›</span>
                <span>Championed DX (Developer Experience) with Storybook, SWC, and strict pre-commit CI pipelines.</span>
              </li>
            </ul>
          </div>

          {/* Ontic2 / Compliance */}
          <div className="group flex flex-col gap-3 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-xl">AI & Compliance Architecture</h3>
              <span className="text-xs font-mono px-2 py-1 bg-neutral-100 dark:bg-neutral-900 rounded text-neutral-500">2024 - 2026</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Built guardrails and architecture for enterprise AI systems, ensuring compliance with strict global standards (ISO 27001/42001, SOC 2) and passing institutional investor Due Diligence.
            </p>
            <ul className="text-sm text-neutral-500 dark:text-neutral-500 space-y-2 mt-2">
              <li className="flex gap-2">
                <span className="text-neutral-300 dark:text-neutral-700">›</span>
                <span>Implemented LLM training traceability and prompt-injection safeguards.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-neutral-300 dark:text-neutral-700">›</span>
                <span>Designed Zero Trust "air-gapped" topologies and SBOM CI/CD pipelines.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MENTORSHIP SECTION */}
      <section id="mentorship" className="w-full scroll-mt-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Building People</h2>
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1"></div>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl">
          The true measure of a Staff Engineer is the multiplier effect. Over the years, I've had the privilege of hiring, mentoring, and shaping the careers of exceptional developers who now lead the industry.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/50">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 italic mb-4">
              "Abraão is far more than a brilliant Principal Engineer. He is the kind of leader who 'sets the house in order,' establishing clear quality standards that elevate the entire engineering organization... the best leader I have worked with in my entire career."
            </p>
            <footer className="text-sm font-medium">Juan Pujol</footer>
          </blockquote>
          
          <blockquote className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/50">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 italic mb-4">
              "He goes beyond 'making it work': he prioritizes security, performance, and long‑term reliability... He adds maturity, rigor, and a systemic mindset—an invaluable asset to any engineering team."
            </p>
            <footer className="text-sm font-medium">Bruno Lázaro</footer>
          </blockquote>
          
          <blockquote className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/50">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 italic mb-4">
              "Working with Hiléo Andersson is knowing your engineering foundation is in safe hands. I had the privilege of seeing his growth... evolving from mid‑level developer to the software architect responsible for our entire authentication."
            </p>
            <footer className="text-sm font-medium">Mentoring Hiléo</footer>
          </blockquote>
          
          <blockquote className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800/50">
            <p className="text-sm text-neutral-600 dark:text-neutral-300 italic mb-4">
              "I had the pleasure of working with Lamartine... his contribution goes far beyond delivering functional code. He’s one of those rare professionals who combines a strong product‑first mindset with impeccable technical rigor."
            </p>
            <footer className="text-sm font-medium">Mentoring Lamartine</footer>
          </blockquote>
        </div>
      </section>

      {/* ABOUT / FOUNDATION SECTION */}
      <section id="about" className="w-full scroll-mt-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight">The Foundation</h2>
          <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4 text-neutral-600 dark:text-neutral-400">
            <p>
              My journey began in 2000 at a local public technical school learning <strong className="text-neutral-900 dark:text-neutral-200">Assembly and pic8051 microcontrollers</strong>. That raw, low-level experience taught me early on that the evolution of programming languages is largely about constraining our ability to write unmaintainable code.
            </p>
            <p>
              A classic lesson from those days—learning the hard way why excessive <code>GOTO</code> statements ruin readability—shaped my philosophy today: <em>"Software must be understood by humans first."</em> If a team cannot read and judge the code, the architecture has failed, regardless of how clever it seems.
            </p>
          </div>
          <div className="md:w-1/3 bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800/50 flex flex-col justify-center">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-200 mb-2">Beyond the Keyboard</h3>
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
        </div>
      </section>

    </main>
  );
}
