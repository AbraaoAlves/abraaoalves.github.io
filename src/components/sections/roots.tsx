import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";

const P1 =
  "I didn't start with the web. In 2002 I took a technical course in electronics and learned <b>Assembly and pic8051 microcontrollers</b> — counting clock cycles, fighting for every byte. My first job came in 2004; the move into software engineering followed in 2008.";
const P2 =
  "That low-level beginning still shapes how I work. It taught me early that the evolution of programming languages is largely about constraining our ability to write unmaintainable code — and that <em>software must be understood by humans first.</em> If a team cannot read and judge the code, the architecture has failed, however clever it seems.";

const TIMELINE: [string, string][] = [
  ["2002", "Technical course in electronics — Assembly & microcontrollers"],
  ["2004", "First job — support & web development"],
  ["2008", "Transition into software engineering"],
  ["2013", "TypeScript contributor — DefinitelyTyped (FeathersJS, CucumberJS)"],
  ["2017", "Founding Brazil engineer on SmartScout"],
];

const BEYOND: [string, string][] = [
  ["♟", "Chess — practising strategic patience."],
  ["𝄞", "Classical music on the double bass."],
  ["≈", "Swimming in the sea with my daughters."],
];

/**
 * Roots section from proto/index.html: two highlighted paragraphs plus a mini
 * timeline beside a "Beyond the keyboard" card.
 */
export function Roots() {
  return (
    <section className="section" id="roots">
      <div className="wrap">
        <SectionHead eyebrow="The Foundation" ghost="ROOTS" title="Roots" />

        <div className="roots-grid">
          <div className="roots-body">
            <Reveal>
              <p dangerouslySetInnerHTML={{ __html: P1 }} />
            </Reveal>
            <Reveal delay={0.08}>
              <p dangerouslySetInnerHTML={{ __html: P2 }} />
            </Reveal>
            <Reveal className="tl" delay={0.12}>
              {TIMELINE.map((row) => (
                <div className="tl-row" key={row[0]}>
                  <span className="y">{row[0]}</span>
                  <span className="t">{row[1]}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal className="beyond" delay={0.14}>
            <h4>Beyond the Keyboard</h4>
            <ul>
              {BEYOND.map((b) => (
                <li key={b[1]}>
                  <span className="k" aria-hidden="true">
                    {b[0]}
                  </span>
                  <span>{b[1]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
