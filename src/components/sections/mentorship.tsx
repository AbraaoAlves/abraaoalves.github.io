"use client";

import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { useLanguage } from "@/components/language-provider";
import { CONTENT } from "@/lib/content";

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
  const { lang } = useLanguage();
  const t = CONTENT[lang].ment;

  return (
    <section className="section" id="mentorship">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} ghost={t.ghost} title={t.title} />

        <div className="ment-grid" style={{ marginTop: "clamp(30px,5vw,56px)" }}>
          <Reveal>
            <p
              className="body-lg"
              style={{ fontSize: "clamp(17px,1.6vw,21px)", lineHeight: 1.55 }}
            >
              {t.body}
            </p>
          </Reveal>

          <div className="quotes">
            {t.quotes.map((q, i) => (
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
