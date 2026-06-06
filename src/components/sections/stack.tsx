import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";

const COLS: { h: string; items: string[] }[] = [
  { h: "Languages", items: ["TypeScript", "JavaScript", "Go", "C#", "Java", "Ruby", "SQL"] },
  { h: "Frontend", items: ["React", "Redux · Saga", "Web Workers", "GraphQL", "Mapbox GL", "Tailwind · SASS"] },
  { h: "Backend & Data", items: ["Node.js", "PostgreSQL", "MongoDB · DynamoDB", "ElasticSearch", "Redis", "RabbitMQ"] },
  { h: "Infra & Ops", items: ["AWS · Vercel", "CI/CD · Serverless", "Devcontainers", "PostHog · Sentry", "TDD", "AI Workflow"] },
];

/** Stack/toolkit section from proto/index.html: four hairline-headed columns. */
export function Stack() {
  return (
    <section className="section" id="stack">
      <div className="wrap">
        <SectionHead eyebrow="Toolkit" ghost="STACK" title="Stack" />

        <div className="stack-grid">
          {COLS.map((col, i) => (
            <Reveal className="stack-col" key={col.h} delay={i * 0.06}>
              <h4>{col.h}</h4>
              <ul>
                {col.items.map((it) => (
                  <li key={it}>
                    <span className="d" aria-hidden="true" />
                    <b>{it}</b>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
