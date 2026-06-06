import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";

const BODY =
  "Notes on architecture, geospatial systems, and the craft of software built to outlive its first author.";

const ITEMS: [string, string, string][] = [
  ["Soon", "Rendering 100k points without dropping a frame", "GEOSPATIAL"],
  ["Soon", "Why I migrated a whole team from Aurelia to React", "ARCHITECTURE"],
  ["Soon", "Assembly taught me to read code like a human", "CRAFT"],
];

/**
 * Lab/writing section from proto/index.html: a lead line over a hairline list of
 * upcoming posts (date / title / tag) that slide on hover.
 */
export function Lab() {
  return (
    <section className="section" id="lab">
      <div className="wrap">
        <SectionHead eyebrow="Writing" ghost="LAB" title="Lab" />

        <Reveal>
          <p className="body-lg" style={{ marginTop: 22, maxWidth: "52ch" }}>
            {BODY}
          </p>
        </Reveal>

        <div className="lab-grid">
          {ITEMS.map((it, i) => (
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
