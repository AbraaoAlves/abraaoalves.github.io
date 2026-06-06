"use client";

import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { useLanguage } from "@/components/language-provider";
import { CONTENT } from "@/lib/content";

/**
 * Roots section from proto/index.html: two highlighted paragraphs plus a mini
 * timeline beside a "Beyond the keyboard" card.
 */
export function Roots() {
  const { lang } = useLanguage();
  const t = CONTENT[lang].roots;

  return (
    <section className="section" id="roots">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} ghost={t.ghost} title={t.title} />

        <div className="roots-grid">
          <div className="roots-body">
            <Reveal>
              <p dangerouslySetInnerHTML={{ __html: t.p1 }} />
            </Reveal>
            <Reveal delay={0.08}>
              <p dangerouslySetInnerHTML={{ __html: t.p2 }} />
            </Reveal>
            <Reveal className="tl" delay={0.12}>
              {t.timeline.map((row) => (
                <div className="tl-row" key={row[0]}>
                  <span className="y">{row[0]}</span>
                  <span className="t">{row[1]}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal className="beyond" delay={0.14}>
            <h4>{t.beyondH}</h4>
            <ul>
              {t.beyond.map((b) => (
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
