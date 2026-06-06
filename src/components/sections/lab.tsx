"use client";

import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { useLanguage } from "@/components/language-provider";
import { CONTENT } from "@/lib/content";

/**
 * Lab/writing section from proto/index.html: a lead line over a hairline list of
 * upcoming posts (date / title / tag) that slide on hover.
 */
export function Lab() {
  const { lang } = useLanguage();
  const t = CONTENT[lang].lab;

  return (
    <section className="section" id="lab">
      <div className="wrap">
        <SectionHead eyebrow={t.eyebrow} ghost={t.ghost} title={t.title} />

        <Reveal>
          <p className="body-lg" style={{ marginTop: 22, maxWidth: "52ch" }}>
            {t.body}
          </p>
        </Reveal>

        <div className="lab-grid">
          {t.items.map((it, i) => (
            <Reveal className="lab-item" key={it[1]} delay={i * 0.06}>
              <span className="d">{it[0]}</span>
              <span className="ti">{it[1]}</span>
              <span className="tag">{it[2]}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
