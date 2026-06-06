import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";

const BODY =
  "I trained engineering hires internally at Beakyn, designed the technical interview process from year one, and taught externally as a part-time programming instructor — feeding qualified candidates into the hiring pipeline. Growing engineers is the work I am proudest of.";

const QUOTES: { t: string; by: string }[] = [
  {
    t: "Working with Abraão is knowing your engineering foundation is in safe hands. I had the privilege of seeing his growth — evolving from mid-level developer to the software architect responsible for our entire authentication.",
    by: "On mentoring Hiléo Andersson",
  },
  {
    t: "His contribution goes far beyond delivering functional code. He's one of those rare professionals who combines a strong product-first mindset with impeccable technical rigor.",
    by: "On mentoring Lamartine",
  },
];

// Avatar initial = first letter of the last capitalised name in the attribution
// (mirrors the prototype). Falls back to "·".
function initialOf(by: string): string {
  const names = by.match(/[A-ZÀ-Ý][a-zà-ÿ]+/g);
  return names?.at(-1)?.[0] ?? "·";
}

/**
 * Mentorship section from proto/index.html: a lead paragraph beside a stack of
 * quote cards (italic testimonial + mono attribution with an initial avatar).
 */
export function Mentorship() {
  return (
    <section className="section" id="mentorship">
      <div className="wrap">
        <SectionHead eyebrow="People" ghost="MENTOR" title="Mentorship" />

        <div className="ment-grid" style={{ marginTop: "clamp(30px,5vw,56px)" }}>
          <Reveal>
            <p
              className="body-lg"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.55 }}
            >
              {BODY}
            </p>
          </Reveal>

          <div className="quotes">
            {QUOTES.map((q, i) => (
              <Reveal className="quote" key={q.by} delay={i * 0.08}>
                <p>“{q.t}”</p>
                <div className="by">
                  <span className="av">{initialOf(q.by)}</span>
                  {q.by}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
