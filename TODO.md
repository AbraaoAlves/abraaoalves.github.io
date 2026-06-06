# Plano de execução — abraaoalves.github.io

Plano detalhado e **sequencial** derivado dos 6 itens originais. Executar na ordem
T1 → T5; cada tarefa é um commit atômico. Marque os checkboxes ao concluir.

## Decisões fechadas (2026-06-06)
- **Tema/idioma (#6):** widget **flutuante fixo** no canto inferior direito (estilo
  ettrics), persistente ao rolar — **removido do header**.
- **Controle de idioma (#1):** estilo **Akita/Hextra** — botão dropdown mostrando o
  nome do idioma atual (`Português ⌄`) que abre a lista (`Português` / `English`),
  com ícone de globo. Idioma fica **à esquerda** do toggle de tema dentro do widget.
- **/lab (#5):** **redesenhar agora** para o design do proto (tokens monocromáticos,
  Space Grotesk / JetBrains Mono, eyebrows) — sair do estilo stone/Tailwind atual.
- **Conteúdo PT (#2):** **reescrita com voz natural** PT-BR (pode mudar estrutura das
  frases), revisão do Abraão depois.

## Ordem & dependências
1. **T1 Ícone** — isolado, baixo risco, alinha a paleta. (item #3)
2. **T2 Widget tema+idioma flutuante** — maior mudança de UI. (itens #1 + #6)
3. **T3 Página /about (Roots)** — mexe em nav do header/footer. (item #4)
4. **T4 Remover Lab da home + redesenhar /lab** — mexe na home e em /lab. (item #5)
5. **T5 Reescrita do conteúdo PT** — por último, com /about e /lab já existentes. (item #2)

`content.ts` é tocado por T2/T3/T4 (labels de nav) e reescrito em T5 — por isso a
reescrita de copy fica no fim, para evitar retrabalho.

---

## T1 — Ícone grayscale sobre fundo escuro (item #3)

**Objetivo:** trocar `icon.svg` (favicon) para a versão atual da logo, em tons de
cinza claro sobre fundo escuro, eliminando o azul de marca (`#5B9BD5` / `#1F4E79`)
que contraria a paleta monocromática.

**Arquivos:** `src/app/icon.svg` (fonte de verdade da geometria: `src/components/icons/logo.tsx`).

**Passos:**
- [x] Confirmar que a geometria do `icon.svg` casa com `logo.tsx` (mesmos `path d=...`). Hoje casa.
- [x] Adicionar um fundo escuro (retângulo arredondado preenchendo o viewBox `344 -44 680 680`) na cor `#0b0c0d`/`#15171a` (ink do tema dark) com cantos arredondados (`rx`).
- [x] Recolorir a **face clara** do "A" para cinza claro (`#e7e9e9`, mesmo `LOGO_DARK` do footer) e as **facetas** (`.mark-lo`) para um cinza médio (`~#8a9094`) para manter o duotom.
- [x] Ajustar o `viewBox`/padding para o mark respirar dentro do quadro (favicon legível em 16–32px).
- [x] Verificar render em aba clara e escura do browser (favicon é único, fundo escuro funciona nos dois).

**Aceite:** favicon aparece como "A" cinza-claro sobre quadro escuro; nenhum azul no SVG.
**Commit:** `feat(icon): grayscale monogram on dark favicon (drop brand blue)`

---

## T2 — Widget flutuante de tema + idioma, idioma estilo Akita (itens #1 + #6)

**Objetivo:** remover o cluster EN/PT + toggle de tema do header e recriá-lo como um
**widget flutuante fixo** no canto inferior direito (estilo ettrics). Dentro do
widget: **dropdown de idioma à esquerda** (estilo Akita: nome do idioma + globo,
abre `Português`/`English`) e **toggle de tema à direita**.

**Arquivos:**
- Novo: `src/components/floating-controls.tsx` (widget client).
- `src/app/layout.tsx` (renderizar `<FloatingControls/>` dentro de `app-layer`, fora do `<Header/>`).
- `src/components/header.tsx` (remover `.nav-tools` exceto o burger mobile; mover `changeTheme` para o novo componente ou para um hook compartilhado).
- `src/app/globals.css` (estilos `.floating-controls`, dropdown de idioma; remover/ajustar `.nav-tools`, `.lang-toggle`, `.theme-toggle` ou movê-los para o widget).
- `src/components/language-provider.tsx` (sem mudança de API; reusar `useLanguage`).

**Passos:**
- [x] Criar `FloatingControls`: container `position: fixed; right; bottom; z-index alto`, com fundo em pílula (blur + hairline, tokens `--bg`/`--line`) para legibilidade sobre qualquer seção.
- [x] **Idioma (Akita):** botão que mostra `Português`/`English` (nome cheio do idioma atual) + ícone de globo (`lucide` `Globe`) + chevron. Ao clicar, abre popover com as duas opções; selecionar troca via `setLang`. Acessível: `aria-haspopup`, `aria-expanded`, fechar no `Esc`/click-fora.
- [x] **Tema:** portar o toggle de 3 vias (System/Light/Dark) + a animação View-Transition (`changeTheme`) do header para o widget. Origem do clip-path passa a ser o canto inferior direito.
- [x] Posicionar idioma **à esquerda** do tema dentro do widget (gap pequeno, divisória sutil).
- [x] Remover `.nav-tools` (lang + theme) do `header.tsx`; manter o burger mobile do menu de navegação.
- [x] Ajustar layout do header: `nav-links` alinha à direita (ou mantém centralizado) agora que o cluster de ferramentas saiu.
- [x] CSS: `.floating-controls` responsivo (encolher em mobile, não cobrir conteúdo/CTA do footer; considerar `padding-bottom` de segurança ou esconder o nome do idioma só com globo em telas estreitas).
- [x] Garantir que o widget fica acima do footer (`z-index`) e legível sobre o slab escuro do footer.
- [x] Sem hidratação quebrada: gate `mounted` antes de refletir tema/idioma persistidos.

**Aceite:** header sem EN/PT/tema; widget fixo no canto inf. direito visível em toda
rolagem; dropdown de idioma abre/fecha e troca idioma; toggle de tema mantém o wipe
View-Transition; funciona em mobile sem cobrir o CTA.
**Commit:** `feat(controls): floating bottom-right theme + Akita-style language switcher`

---

## T3 — Mover Roots para nova página /about (item #4)

**Objetivo:** tirar a seção Roots da home e colocá-la numa página `/about` dedicada;
adicionar link "About" no header e no footer.

**Arquivos:**
- Novo: `src/app/about/page.tsx` (renderiza a seção Roots; `export const metadata`).
- `src/app/page.tsx` (remover `<Roots/>` da composição da home).
- `src/components/sections/roots.tsx` (reusar como está; manter `id="roots"` ou ajustar).
- `src/components/header.tsx` (adicionar link About em `navLinks`).
- `src/components/footer.tsx` + `src/lib/content.ts` (adicionar About em `contact.navLinks` e label `nav.about` em EN/PT).
- `src/app/sitemap.ts` (incluir `/about`).

**Passos:**
- [x] Criar `src/app/about/page.tsx` com `<main>` no padrão das rotas, renderizando `<Roots/>` (e o título/eyebrow já vêm de `CONTENT[lang].roots`).
- [x] Adicionar `metadata` (title "About | Abraão Alves", description curta).
- [x] Remover `<Roots/>` de `src/app/page.tsx` e do import em `page.tsx` (manter export em `sections/index.ts`).
- [x] Header: adicionar `{ label: nav.about, href: "/about" }` em `navLinks`; adicionar `about` em `CONTENT[en|pt].nav`.
- [x] Footer: adicionar `["About", "/about"]` (EN) / `["Sobre", "/about"]` (PT) em `contact.navLinks`.
- [x] Atualizar `LangContent.nav` type com `about: string`.
- [x] Incluir `/about` no `sitemap.ts`.
- [x] Conferir que a home (sem Roots) ainda flui: Hero → Geo → Work → Stack → Mentorship → (Lab sai em T4).

**Aceite:** `/about` renderiza Roots com o design do proto; links About no header e
footer levam até lá; home não mostra mais Roots; sitemap inclui `/about`.
**Commit:** `feat(about): move Roots to dedicated /about page + header/footer links`

---

## T4 — Remover Lab da home + redesenhar /lab no design do proto (item #5)

**Objetivo:** a home não mostra mais a seção Lab; o Lab existe só em `/lab`. Como
`/lab` hoje usa estilo fora do design (cores `stone-*`, `rounded-2xl`, Tailwind),
**redesenhar** `/lab` para o sistema do proto (monocromático, eyebrows, fontes).

**Arquivos:**
- `src/app/page.tsx` (remover `<Lab/>`).
- `src/app/lab/page.tsx` (redesign para os tokens/estilo do proto).
- `src/app/lab/(posts)/layout.tsx` (conferir consistência do wrapper de post).
- `src/app/globals.css` (estilos da listagem do Lab no padrão do proto; reaproveitar `.lab-grid`/`.lab-item`/`SectionHead` se fizer sentido).
- `src/components/sections/lab.tsx` + `sections/index.ts` (decidir: remover o componente da home ou reusar seu markup na página `/lab`).
- `src/lib/content.ts` (`nav.lab` permanece; copy `lab.*` pode migrar para a página).

**Passos:**
- [x] Remover `<Lab/>` e seu import de `src/app/page.tsx`.
- [x] Redesenhar `src/app/lab/page.tsx`: usar `wrap`/`section`, `SectionHead`/`Eyebrow` (ghost "LAB"), tipografia display, e listar `posts` com o padrão `.lab-item` (data / título / tag) e hover do proto — substituindo os cards `rounded-2xl` stone.
- [x] Usar tokens (`--fg`, `--fg-2`, `--line`, `--font-mono`) no lugar de `text-stone-*`/`bg-paper`.
- [x] Garantir bilíngue: a página `/lab` deve consumir `useLanguage()` (hoje é estática em inglês). Mover/usar `CONTENT[lang].lab.{eyebrow,ghost,title,body}` para o cabeçalho.
- [x] Decidir destino de `src/components/sections/lab.tsx`: ou remover (se a listagem real passa a viver em `/lab`) ou refatorar para ser reusado pela página `/lab`. Atualizar `sections/index.ts`.
- [x] Conferir `(posts)/layout.tsx` e a página MDX `the-goto-lesson` continuam coerentes com o novo visual.
- [x] Home final: Hero → Geo → Work → Stack → Mentorship (sem Roots, sem Lab).

**Aceite:** home sem Lab; `/lab` no design monocromático do proto, bilíngue, listando
os posts reais; post MDX continua abrindo e legível.
**Commit:** `feat(lab): remove Lab from home, redesign /lab to proto design system`

---

## T5 — Reescrever o conteúdo PT com voz natural (item #2)

**Objetivo:** revisar todo `CONTENT.pt` para soar como PT-BR nativo (não tradução
literal do EN). Mantém o sentido; melhora ritmo, idiomatismo e termos técnicos.

**Arquivos:** `src/lib/content.ts` (bloco `pt`, incluindo copy nova de `/about` e `/lab` vinda de T3/T4).

**Passos (seção a seção, revisar e reescrever o PT):**
- [x] `hero` (eyebrow, lead, meta, cue, CTAs).
- [x] `geo` (title, body, chips/chrome).
- [x] `work` (descrições e bullets dos 3 itens + `migLabel`/`migrations`).
- [x] `stack` (headers de coluna).
- [x] `ment` (body + traduções das citações soando naturais em PT).
- [x] `roots` (p1/p2 com `<b>`/`<em>`, timeline, "Além do teclado").
- [x] `lab` (body + itens).
- [x] `contact` (cta, headers, navLinks).
- [x] `nav` (revisar: hoje `nav.work` em PT está como "Work" — decidir manter EN ou "Trabalho"; idem `about`).
- [x] Reler tudo em voz alta procurando frases "traduzidas" (ordem de palavras, falsos cognatos, anglicismos desnecessários).
- [x] Validar que nenhum placeholder/HTML inline (`<b>`, `<em>`) quebrou.

**Aceite:** lendo o site em PT, nada soa como Google Translate; termos técnicos
corretos; sem regressão de HTML inline.
**Commit:** `feat(i18n): rewrite PT copy in natural PT-BR voice`

---

## Verificação final (após T1–T5)
- [x] `npm run build` passa (export estático OK).
- [x] `npx tsc --noEmit` e `npx eslint src` limpos.
- [x] QA visual claro/escuro + EN/PT em `/`, `/about`, `/lab`, `/lab/the-goto-lesson`.
- [x] Widget flutuante não cobre conteúdo crítico em mobile.
- [x] Atualizar `AGENTS.md`/`TASKS.md` refletindo /about, /lab redesenhado e o widget.

### Achados do QA (commits extras)
A verificação revelou 2 problemas pré-existentes, corrigidos antes de fechar:
- **Hidratação:** o toggle de tema (`FloatingControls`) renderizava `aria-pressed`
  do `next-themes` (undefined no servidor, definido no cliente quando um tema ≠ padrão
  estava persistido) → mismatch de hidratação. Gateado em `mounted`. O `LanguageProvider`
  passou a ler o idioma via `useSyncExternalStore` (também resolve o erro de lint
  `react-hooks/set-state-in-effect`). Commit `fix(controls): gate persisted theme/lang on hydration`.
- **Lint:** import morto + deps do `useMemo` no demo `/asciiart`. Commit `chore(asciiart): clear eslint warnings`.

QA no browser: `/`, `/about`, `/lab`, `/lab/the-goto-lesson` em claro/escuro + EN/PT,
sem erros de console/hidratação; widget mobile (375px) não sobrepõe o footer.
