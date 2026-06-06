import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { Eyebrow } from "@/components/ui/eyebrow";

type WorkItem = {
  role: string;
  org: string;
  year: string;
  desc: string;
  bullets: string[];
};

const ITEMS: WorkItem[] = [
  {
    role: "SmartScout — Geographic Audience Intelligence",
    org: "Beakyn · for OUTFRONT Media (NYSE: OUT)",
    year: "2017 — 2026",
    desc: "Founding member of the Brazil engineering team. Owned a single product end-to-end across its full lifecycle: prototype → MVP → licensing (2017) → exclusivity → acquisition (2025) → enterprise migration to OUTFRONT (2026). A rare vantage point for understanding how architectural decisions age.",
    bullets: [
      "Architected the React rebuild of the interactive map — redux-saga + web workers taming 100,000+ records of client-side reactive data under real browser memory pressure.",
      "Pivoted UX from flat filters to 200+ pre-computed personas and redesigned the query layer — cutting latency from 10s to under 800ms.",
      "Designed a serverless data pipeline in Go that has run autonomously for 2+ years after I trained the team to own it.",
      "Built the 2018 DX foundation — CI/CD, PR preview environments, devcontainers — still in production seven years later.",
    ],
  },
  {
    role: "Enterprise Infrastructure Migration",
    org: "OUTFRONT Media — internal engineering partnership",
    year: "2025 — 2026",
    desc: "Led the full migration of the SmartScout product into OUTFRONT's enterprise environment, partnering with their internal team through acquisition handoff.",
    bullets: [
      "Migrated all AWS services, Vercel deployments, GitHub repositories, and Python data pipelines from Buddy.works to AWS Batch on EC2 Spot.",
      "Drove acquisition-readiness — hardening, observability, and architectural alignment — and owned documentation and post-migration support through handoff.",
    ],
  },
  {
    role: "NotaSocial — Founder & Full-Stack Engineer",
    org: "Fortaleza, Brazil",
    year: "2014 — 2016",
    desc: "Founded a mobile-first donation platform built on top of Brazilian electronic invoices. Owned the full stack — Ionic UI, Node.js APIs, MongoDB, OCR — with no dedicated PM or designer.",
    bullets: [
      "1st place at III Startup Weekend Fortaleza.",
      "One of 12 global finalists at the Global Startup Battle 2014.",
    ],
  },
];

const MIG_LABEL = "FIVE MIGRATIONS, LED END-TO-END";
const MIGRATIONS: { from: string; to: string; why: string }[] = [
  { from: "JavaScript", to: "TypeScript", why: "Type safety + tooling conventions, year one." },
  { from: "Aurelia", to: "React", why: "Unlocked a far larger talent pool." },
  { from: "Monolith", to: "Serverless", why: "Removed scale bottlenecks." },
  { from: "Node.js", to: "Go", why: "For data-intensive pipelines." },
  { from: "Internal infra", to: "OUTFRONT", why: "Full enterprise environment." },
];

/**
 * Work section from proto/index.html: a hairline list of roles (index / role +
 * org + year + bullets) followed by the five-migrations strip.
 */
export function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead eyebrow="Selected Impact" ghost="WORK" title="Work" />

        <div className="work-list">
          {ITEMS.map((it, i) => (
            <Reveal className="work-item" key={it.role} delay={i * 0.06}>
              <div className="idx">0{i + 1}</div>
              <div className="role">
                <h3>{it.role}</h3>
                <span className="org">{it.org}</span>
                <p>{it.desc}</p>
                <div className="meta-r">
                  <span className="yr">{it.year}</span>
                </div>
              </div>
              <ul className="bullets">
                {it.bullets.map((b) => (
                  <li key={b}>
                    <span className="mk">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="migrations">
          <Reveal className="mlabel">
            <Eyebrow>{MIG_LABEL}</Eyebrow>
          </Reveal>
          <Reveal className="mig-grid" delay={0.08}>
            {MIGRATIONS.map((m) => (
              <div className="mig" key={m.to}>
                <div className="from">
                  {m.from} <span className="arrow">↓</span>
                </div>
                <div className="to">{m.to}</div>
                <div className="why">{m.why}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
