# Project Agents Overview: abraaoalves.github.io

Este documento serve como o ponto de entrada central para agentes de IA e desenvolvedores que trabalham na manutenção e evolução deste portfólio. Ele fornece um mapa de contexto para evitar a leitura redundante de arquivos extensos.

## 📌 Contexto Geral
O objetivo deste projeto é reconstruir a identidade digital de **Abraão Alves**, focando em sua versatilidade como Staff Engineer, Mentor e Arquiteto de Software com 18+ anos de experiência.

Para detalhes sobre a visão estratégica, arquitetura proposta e referências visuais (Ettrics/Javis Perez), consulte o [Plano de Implementação Principal](../../conductor/plan-abraao-site.md).

## 🧭 Navegação de Documentação

### 📖 [README.md](./README.md)
**Use para:** Entender o setup técnico, como rodar o projeto localmente (`npm run dev --webpack`) e a stack tecnológica (Next.js 16, Tailwind 4, Framer Motion).

### 📋 [TASKS.md](./TASKS.md)
**Use para:** Verificar o progresso atual do desenvolvimento. Este arquivo lista o que já foi concluído (como o Hero ASCII e as seções de Impacto) e o que ainda está pendente (Deploy, SEO, Refinamento de Copy). 
*Sempre consulte este arquivo antes de iniciar uma nova tarefa para garantir commits atômicos.*

### 🧠 [MEMORY.md](./MEMORY.md)
**Use para:** Consultar lições aprendidas, decisões técnicas difíceis e o histórico de prompts que moldaram a narrativa atual. 
*Contém detalhes críticos sobre o workaround do Turbopack e a integração do Code Hike.*

## 🎨 Fonte da verdade do design
O visual do site é definido por **`proto/index.html`** (protótipo do usuário). Decodificado em **`proto/design.md`** (spec completa) e **`proto/PLAN-proto-integration.md`** (plano de aplicação em 8 fases). Qualquer ajuste visual deve seguir o protótipo.

## 🛠 Componentes Chave
- **Tokens & tipografia:** (`src/app/globals.css`) - Sistema de 14 tokens por tema (`:root`/`.dark`), escala fluida (`--t-*`), grain, e todo o CSS de componentes/seções portado do protótipo. Fontes em `src/app/layout.tsx` (Space Grotesk display, Hanken body, JetBrains Mono).
- **Primitivas UI:** (`src/components/ui/`) - `Eyebrow`, `Button`, `SectionHead` (ghost + título display).
- **Hero:** (`src/components/hero.tsx`) - Grid do herói + nome como wordmark ASCII (motor existente em `src/components/asciiart/`, via prop `ripple` + fonte de blocos de sombra).
- **Seções:** (`src/components/sections/`) - Geo, Work (+migrações), Stack, Mentorship, Roots, Lab. Compostas em `src/app/page.tsx`.
- **Nav & Footer:** (`src/components/header.tsx`, `footer.tsx`) - Nav fixa (blur ao rolar, toggle EN/PT, toggle de tema com wipe View-Transition) e footer-contato (slab + backdrop ASCII do logo + spotlight).
- **i18n:** (`src/lib/content.ts` + `src/components/language-provider.tsx`) - Conteúdo bilíngue EN/PT (`CONTENT`, `SOCIALS`) consumido via `useLanguage()`.
- **Reveal:** (`src/components/reveal.tsx`) - Animação de scroll baseada em CSS (`.js-anim` gate) — conteúdo visível sem JS/para crawlers.
- **Logo:** (`src/components/icons/logo.tsx`) - Logo geométrica; facetas marcadas `.mark-lo` para a nav monocromática de duas tonalidades.
- **Lab Engine:** (`src/app/lab/`) - Estrutura baseada em MDX para artigos técnicos de alta fidelidade.

---
*Este arquivo deve ser mantido atualizado a cada grande mudança na arquitetura ou fluxo de trabalho.*
