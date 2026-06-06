# Project Agents Overview: abraaoalves.github.io

Este documento serve como o ponto de entrada central para agentes de IA e desenvolvedores que trabalham na manutenção e evolução deste portfólio. Ele fornece um mapa de contexto para evitar a leitura redundante de arquivos extensos.

## 📌 Contexto Geral
O objetivo deste projeto é reconstruir a identidade digital de **Abraão Alves**, focando em sua versatilidade como Staff Engineer, Mentor e Arquiteto de Software com 18+ anos de experiência.

Para detalhes sobre a visão estratégica, arquitetura proposta e referências visuais (Ettrics/Javis Perez), consulte o [Plano de Implementação Principal](../../conductor/plan-abraao-site.md).

## 🧭 Navegação de Documentação

### 📖 [README.md](./README.md)
**Use para:** Entender o setup técnico, como rodar o projeto localmente (`npm run dev --webpack`) e a stack tecnológica (Next.js 16, Tailwind 4, Framer Motion).

### 📋 [TODO.md](./TODO.md)
**Use para:** Verificar o plano de execução atual e o progresso (tarefas T1–T5 + verificação final, com checkboxes). Cada tarefa é um commit atômico. 
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
- **Seções:** (`src/components/sections/`) - Geo, Work (+migrações), Stack, Mentorship compõem a home (`src/app/page.tsx`). **Roots** vive em `/about` (`src/app/about/page.tsx`) e o **Lab** em `/lab` — nenhum dos dois aparece na home.
- **Nav & Footer:** (`src/components/header.tsx`, `footer.tsx`) - Nav fixa (blur ao rolar, links incl. About, burger mobile) e footer-contato (slab + backdrop ASCII do logo + spotlight). O toggle EN/PT e o de tema **não** ficam mais no header — migraram para os controles flutuantes.
- **Controles flutuantes:** (`src/components/floating-controls.tsx`) - Widget fixo no canto inferior direito: dropdown de idioma (estilo Akita: globo + nome do idioma, colapsa só no globo em mobile) à esquerda + toggle de tema de 3 vias (System/Light/Dark) com wipe View-Transition à direita. `aria-pressed` gateado em `mounted` (hidratação segura).
- **i18n:** (`src/lib/content.ts` + `src/components/language-provider.tsx`) - Conteúdo bilíngue EN/PT (`CONTENT`, `SOCIALS`) consumido via `useLanguage()`. O provider lê o idioma persistido via `useSyncExternalStore` (snapshot de servidor `"en"`, cliente do `localStorage`) — sem mismatch de hidratação. PT-BR reescrito em voz natural (não tradução literal).
- **Reveal:** (`src/components/reveal.tsx`) - Animação de scroll baseada em CSS (`.js-anim` gate) — conteúdo visível sem JS/para crawlers.
- **Logo:** (`src/components/icons/logo.tsx`) - Logo geométrica; facetas marcadas `.mark-lo` para a nav monocromática de duas tonalidades.
- **Lab:** (`src/app/lab/`) - Página `/lab` no design do proto (monocromático, eyebrows, bilíngue via `useLanguage`) listando os posts no padrão `.lab-item` (data / título / tag). Posts MDX em `(posts)/` com Code Hike.

---
*Este arquivo deve ser mantido atualizado a cada grande mudança na arquitetura ou fluxo de trabalho.*
