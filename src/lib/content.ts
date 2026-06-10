import type { Lang } from "@/components/language-provider";

/**
 * Bilingual site content (EN / PT), ported from proto/index.html (the source of
 * truth). Consumed by the section components via `useLanguage()` →
 * CONTENT[lang]. SOCIALS is language-independent and uses real profile URLs.
 */
export type LangContent = {
  nav: { work: string; mentorship: string; lab: string; about: string };
  hero: {
    eyebrow: string;
    lead: string;
    meta: string[];
    cue: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  geo: {
    eyebrow: string;
    ghost: string;
    title: string;
    body: string;
    chrome: [string, string];
    chips: [string, string][];
  };
  work: {
    eyebrow: string;
    ghost: string;
    title: string;
    items: {
      role: string;
      org: string;
      year: string;
      desc: string;
      bullets: string[];
      /** When set, the item links to a case-study page at /work/<caseSlug>. */
      caseSlug?: string;
    }[];
    migLabel: string;
    migrations: { from: string; to: string; why: string }[];
  };
  stack: {
    eyebrow: string;
    ghost: string;
    title: string;
    cols: { h: string; items: string[] }[];
  };
  ment: {
    eyebrow: string;
    ghost: string;
    title: string;
    body: string;
    quotes: { t: string; by: string }[];
  };
  roots: {
    eyebrow: string;
    ghost: string;
    title: string;
    p1: string;
    p2: string;
    timeline: [string, string][];
    beyondH: string;
    beyond: [string, string][];
  };
  lab: {
    eyebrow: string;
    ghost: string;
    title: string;
    body: string;
    items: [string, string, string][];
    soon: string;
  };
  contact: {
    eyebrow: string;
    cta: string;
    /** Dual-intent CTAs: recruiters vs. project/partner inquiries. The *Subject
     *  strings pre-fill the mailto subject so Abraão can triage his inbox. */
    hireLabel: string;
    hireSubject: string;
    projectLabel: string;
    projectSubject: string;
    navH: string;
    connectH: string;
    emailH: string;
    navLinks: [string, string][];
  };
  /** Per-locale SEO strings for <head> (title/description). */
  meta: { title: string; description: string };
};

export const CONTENT: Record<Lang, LangContent> = {
  en: {
    nav: { work: "Work", mentorship: "Mentorship", lab: "Lab", about: "About" },
    hero: {
      eyebrow: "SOFTWARE ENGINEER · FULL-STACK",
      lead: "Building software that lasts with Javascript since 2008.",
      meta: ["Based in Brazil", "Remote", "Fluent English"],
      cue: "Scroll",
      ctaPrimary: "Get in touch",
      ctaSecondary: "See selected work",
    },
    geo: {
      eyebrow: "GEOSPATIAL",
      ghost: "PLACE",
      title: "Where data meets place.",
      body: "For nine years I owned the interactive map at the heart of SmartScout — a geographic audience-intelligence platform — rendering 100,000+ records of reactive data in the browser without dropping a frame. Solving problems that live on a map is what I do best.",
      chrome: ["us-albers // reactive", "records: 100,000+"],
      chips: [
        ["100K+", "records, client-side"],
        ["10s → 800ms", "query latency"],
        ["200+", "pre-computed personas"],
        ["Mapbox GL", "visual layers"],
      ],
    },
    work: {
      eyebrow: "SELECTED IMPACT",
      ghost: "WORK",
      title: "Work",
      items: [
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
          caseSlug: "smartscout-geospatial",
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
      ],
      migLabel: "FIVE MIGRATIONS, LED END-TO-END",
      migrations: [
        {
          from: "JavaScript",
          to: "TypeScript",
          why: "Type safety + tooling conventions, year one.",
        },
        {
          from: "Aurelia",
          to: "React",
          why: "Unlocked a far larger talent pool.",
        },
        {
          from: "Monolith",
          to: "Serverless",
          why: "Removed scale bottlenecks.",
        },
        { from: "Node.js", to: "Go", why: "For data-intensive pipelines." },
        {
          from: "Internal infra",
          to: "OUTFRONT",
          why: "Full enterprise environment.",
        },
      ],
    },
    stack: {
      eyebrow: "TOOLKIT",
      ghost: "STACK",
      title: "Stack",
      cols: [
        {
          h: "Languages",
          items: [
            "TypeScript",
            "JavaScript",
            "Go",
            "C#",
            "Java",
            "Ruby",
            "SQL",
          ],
        },
        {
          h: "Frontend",
          items: [
            "React",
            "Redux · Saga",
            "Web Workers",
            "GraphQL",
            "Mapbox GL",
            "Tailwind · SASS",
          ],
        },
        {
          h: "Backend & Data",
          items: [
            "Node.js",
            "PostgreSQL",
            "MongoDB · DynamoDB",
            "ElasticSearch",
            "Redis",
            "RabbitMQ",
          ],
        },
        {
          h: "Infra & Ops",
          items: [
            "AWS · Vercel",
            "CI/CD · Serverless",
            "Devcontainers",
            "PostHog · Sentry",
            "TDD",
            "AI Workflow",
          ],
        },
      ],
    },
    ment: {
      eyebrow: "PEOPLE",
      ghost: "MENTOR",
      title: "Mentorship",
      body: "I trained engineering hires internally at Beakyn, designed the technical interview process from year one, and taught externally as a part-time programming instructor — feeding qualified candidates into the hiring pipeline. Growing engineers is the work I am proudest of.",
      quotes: [
        {
          t: "Working with Abraão is knowing your engineering foundation is in safe hands. I had the privilege of seeing his growth — evolving from mid-level developer to the software architect responsible for our entire authentication.",
          by: "On mentoring Hiléo Andersson",
        },
        {
          t: "His contribution goes far beyond delivering functional code. He's one of those rare professionals who combines a strong product-first mindset with impeccable technical rigor.",
          by: "On mentoring Lamartine",
        },
      ],
    },
    roots: {
      eyebrow: "THE FOUNDATION",
      ghost: "ROOTS",
      title: "Roots",
      p1: "I didn't start with the web. In 2002 I took a technical course in electronics and learned <b>Assembly and pic8051 microcontrollers</b> — counting clock cycles, fighting for every byte. My first job came in 2004; the move into software engineering followed in 2008.",
      p2: "That low-level beginning still shapes how I work. It taught me early that the evolution of programming languages is largely about constraining our ability to write unmaintainable code — and that <em>software must be understood by humans first.</em> If a team cannot read and judge the code, the architecture has failed, however clever it seems.",
      timeline: [
        [
          "2002",
          "Technical course in electronics — Assembly & microcontrollers",
        ],
        ["2004", "First job — support & web development"],
        ["2008", "Transition into software engineering"],
        [
          "2013",
          "TypeScript contributor — DefinitelyTyped (FeathersJS, CucumberJS)",
        ],
        ["2017", "Founding Brazil engineer on SmartScout"],
      ],
      beyondH: "BEYOND THE KEYBOARD",
      beyond: [
        ["♟", "Chess — practising strategic patience."],
        ["𝄞", "Classical music on the double bass."],
        ["≈", "Swimming in the sea with my daughters."],
      ],
    },
    lab: {
      eyebrow: "WRITING",
      ghost: "LAB",
      title: "Lab",
      body: "Notes on architecture, geospatial systems, and the craft of software built to outlive its first author.",
      items: [
        [
          "Soon",
          "Rendering 100k points without dropping a frame",
          "GEOSPATIAL",
        ],
        [
          "Soon",
          "Why I migrated a whole team from Aurelia to React",
          "ARCHITECTURE",
        ],
        ["Soon", "Assembly taught me to read code like a human", "CRAFT"],
      ],
      soon: "In draft",
    },
    contact: {
      eyebrow: "CONTACT",
      cta: "Let’s build something that lasts.",
      hireLabel: "I’m hiring",
      hireSubject: "Hiring Abraão — let’s talk",
      projectLabel: "I have a project",
      projectSubject: "Project inquiry for Abraão",
      navH: "Navigate",
      connectH: "Connect",
      emailH: "Email",
      navLinks: [
        ["Home", "/"],
        ["Work", "/#work"],
        ["Mentorship", "/#mentorship"],
        ["Lab", "/lab"],
        ["About", "/about"],
      ],
    },
    meta: {
      title: "Abraão Alves | Software Engineering & Mentorship",
      description:
        "Building software that lasts — 18+ years of high-impact engineering, architecture, and mentorship. From Assembly to AI infrastructure.",
    },
  },

  pt: {
    nav: { work: "Work", mentorship: "Mentoria", lab: "Lab", about: "Sobre" },
    hero: {
      eyebrow: "STAFF ENGINEER · ARQUITETO · MENTOR",
      lead: "Software que não envelhece — dezoito anos de engenharia de alto impacto, arquitetura e mentoria.",
      meta: ["Brasil", "Remoto", "Inglês fluente"],
      cue: "Rolar",
      ctaPrimary: "Fale comigo",
      ctaSecondary: "Ver trabalhos",
    },
    geo: {
      eyebrow: "GEOESPACIAL",
      ghost: "LUGAR",
      title: "Onde o dado encontra o lugar.",
      body: "Por nove anos fui responsável pelo mapa interativo no coração do SmartScout — uma plataforma de inteligência geográfica de audiência — renderizando mais de 100.000 registros reativos no browser sem travar. Resolver problemas que vivem num mapa é onde me sinto em casa.",
      chrome: ["us-albers // reativo", "registros: 100.000+"],
      chips: [
        ["100K+", "registros, no cliente"],
        ["10s → 800ms", "latência de consulta"],
        ["200+", "personas pré-computadas"],
        ["Mapbox GL", "camadas visuais"],
      ],
    },
    work: {
      eyebrow: "IMPACTO SELECIONADO",
      ghost: "WORK",
      title: "Trabalho",
      items: [
        {
          role: "SmartScout — Inteligência Geográfica de Audiência",
          org: "Beakyn · para a OUTFRONT Media (NYSE: OUT)",
          year: "2017 — 2026",
          desc: "Membro fundador do time de engenharia no Brasil. Conduzi um único produto do início ao fim de seu ciclo de vida: protótipo → MVP → licenciamento (2017) → exclusividade → aquisição (2025) → migração enterprise para a OUTFRONT (2026). Um vantage point raro para entender como decisões arquiteturais envelhecem.",
          bullets: [
            "Arquitetei a reconstrução do mapa interativo em React — redux-saga + web workers colocando ordem em mais de 100.000 registros reativos no cliente, com toda a pressão de memória que um browser impõe.",
            "Substituí filtros planos por 200+ personas pré-computadas e redesenhei a camada de consulta — derrubando a latência de 10s para menos de 800ms.",
            "Projetei um pipeline de dados serverless em Go que roda sem intervenção há mais de 2 anos, depois de treinar o time para tocá-lo sozinho.",
            "Montei a base de DX em 2018 — CI/CD, ambientes de preview por PR, devcontainers — em produção até hoje, sete anos depois.",
          ],
          caseSlug: "smartscout-geospatial",
        },
        {
          role: "Migração de Infraestrutura Enterprise",
          org: "OUTFRONT Media — parceria com a engenharia interna",
          year: "2025 — 2026",
          desc: "Liderei a migração completa do SmartScout para o ambiente enterprise da OUTFRONT, trabalhando lado a lado com o time interno até a entrega final da aquisição.",
          bullets: [
            "Migrei todos os serviços AWS, deploys na Vercel, repositórios GitHub e pipelines Python do Buddy.works para AWS Batch em EC2 Spot.",
            "Conduzi o processo de prontidão para aquisição — hardening, observabilidade e alinhamento arquitetural — e cuidei da documentação e do suporte pós-migração até a entrega.",
          ],
        },
        {
          role: "NotaSocial — Fundador & Engenheiro Full-Stack",
          org: "Fortaleza, Brasil",
          year: "2014 — 2016",
          desc: "Criei uma plataforma mobile-first de doações ancorada na nota fiscal eletrônica brasileira. Cuidei de tudo sozinho — UI Ionic, APIs Node.js, MongoDB, OCR — sem PM nem designer.",
          bullets: [
            "1º lugar no III Startup Weekend Fortaleza.",
            "Um dos 12 finalistas globais da Global Startup Battle 2014.",
          ],
        },
      ],
      migLabel: "CINCO MIGRAÇÕES, LIDERADAS DO INÍCIO AO FIM",
      migrations: [
        {
          from: "JavaScript",
          to: "TypeScript",
          why: "Type safety e padronização, logo no primeiro ano.",
        },
        {
          from: "Aurelia",
          to: "React",
          why: "Abriu um mercado de talentos muito maior.",
        },
        {
          from: "Monolito",
          to: "Serverless",
          why: "Eliminou os gargalos de escala.",
        },
        {
          from: "Node.js",
          to: "Go",
          why: "Para pipelines intensivos em dados.",
        },
        {
          from: "Infra própria",
          to: "OUTFRONT",
          why: "Ambiente enterprise completo.",
        },
      ],
    },
    stack: {
      eyebrow: "FERRAMENTAS",
      ghost: "STACK",
      title: "Stack",
      cols: [
        {
          h: "Linguagens",
          items: [
            "TypeScript",
            "JavaScript",
            "Go",
            "C#",
            "Java",
            "Ruby",
            "SQL",
          ],
        },
        {
          h: "Frontend",
          items: [
            "React",
            "Redux · Saga",
            "Web Workers",
            "GraphQL",
            "Mapbox GL",
            "Tailwind · SASS",
          ],
        },
        {
          h: "Backend & Dados",
          items: [
            "Node.js",
            "PostgreSQL",
            "MongoDB · DynamoDB",
            "ElasticSearch",
            "Redis",
            "RabbitMQ",
          ],
        },
        {
          h: "Infra & Ops",
          items: [
            "AWS · Vercel",
            "CI/CD · Serverless",
            "Devcontainers",
            "PostHog · Sentry",
            "TDD",
            "AI Workflow",
          ],
        },
      ],
    },
    ment: {
      eyebrow: "PESSOAS",
      ghost: "MENTOR",
      title: "Mentoria",
      body: "Formei engenheiros internamente na Beakyn, montei o processo de entrevista técnica do zero e dei aulas fora como instrutor de programação em tempo parcial — levando candidatos qualificados direto para o processo seletivo. Desenvolver pessoas é o trabalho de que mais me orgulho.",
      quotes: [
        {
          t: "Trabalhar com o Abraão é ter a certeza de que sua base de engenharia está em boas mãos. Tive o privilégio de acompanhar seu crescimento — de desenvolvedor pleno a arquiteto de software responsável por toda a nossa autenticação.",
          by: "Sobre mentorar Hiléo Andersson",
        },
        {
          t: "A contribuição dele vai muito além de código que funciona. É um daqueles profissionais raros que une visão de produto com rigor técnico de verdade.",
          by: "Sobre mentorar Lamartine",
        },
      ],
    },
    roots: {
      eyebrow: "A FUNDAÇÃO",
      ghost: "ROOTS",
      title: "Origem",
      p1: "Não comecei pela web. Em 2002 fiz um curso técnico em eletrônica e aprendi <b>Assembly e microcontroladores pic8051</b> — contando ciclos de clock, brigando por cada byte. Meu primeiro emprego veio em 2004; a transição para a engenharia de software aconteceu em 2008.",
      p2: "Esse começo em baixo nível ainda molda o jeito como trabalho. Aprendi cedo que a evolução das linguagens de programação é, no fundo, uma história de restrição: cada geração existe para nos impedir de escrever código que ninguém vai conseguir manter. E que <em>software precisa ser entendido por humanos primeiro.</em> Se o time não consegue ler e julgar o código, a arquitetura fracassou — por mais inteligente que pareça.",
      timeline: [
        ["2002", "Curso técnico em eletrônica — Assembly & microcontroladores"],
        ["2004", "Primeiro emprego — suporte & desenvolvimento web"],
        ["2008", "Transição para a engenharia de software"],
        [
          "2013",
          "Contribuidor TypeScript — DefinitelyTyped (FeathersJS, CucumberJS)",
        ],
        ["2017", "Engenheiro fundador do SmartScout no Brasil"],
      ],
      beyondH: "ALÉM DO TECLADO",
      beyond: [
        ["♟", "Xadrez — treinando paciência estratégica."],
        ["𝄞", "Música clássica no contrabaixo acústico."],
        ["≈", "Nadar no mar com as minhas filhas."],
      ],
    },
    lab: {
      eyebrow: "ESCRITA",
      ghost: "LAB",
      title: "Lab",
      body: "Notas sobre arquitetura, sistemas geoespaciais e o ofício de escrever software que sobrevive ao seu primeiro autor.",
      items: [
        ["Em breve", "Renderizando 100k pontos sem travar", "GEOESPACIAL"],
        [
          "Em breve",
          "Por que migrei um time inteiro de Aurelia para React",
          "ARQUITETURA",
        ],
        ["Em breve", "Assembly me ensinou a ler código como gente", "OFÍCIO"],
      ],
      soon: "Rascunho",
    },
    contact: {
      eyebrow: "CONTATO",
      cta: "Vamos construir algo que dure de verdade.",
      hireLabel: "Estou contratando",
      hireSubject: "Contratação — vamos conversar",
      projectLabel: "Tenho um projeto",
      projectSubject: "Proposta de projeto",
      navH: "Navegar",
      connectH: "Conectar",
      emailH: "Email",
      navLinks: [
        ["Início", "/"],
        ["Trabalho", "/#work"],
        ["Mentoria", "/#mentorship"],
        ["Lab", "/lab"],
        ["Sobre", "/about"],
      ],
    },
    meta: {
      title: "Abraão Alves | Engenharia de Software & Mentoria",
      description:
        "Software que não envelhece — 18+ anos de engenharia de alto impacto, arquitetura e mentoria. Do Assembly à infraestrutura de IA.",
    },
  },
};

export const SOCIALS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://linkedin.com/in/abraaoalves" },
  { label: "GitHub", href: "https://github.com/abraaoalves" },
  { label: "Stack Overflow", href: "https://stackoverflow.com/users/815478" },
  { label: "X", href: "https://x.com/abraao4lves" },
  { label: "CodePen", href: "https://codepen.io/AbraaoAlves" },
];
