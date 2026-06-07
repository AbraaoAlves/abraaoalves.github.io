# TODO — Boot splash + enxugar baseline estático

## 🎯 Contexto / objetivo
Usuários em conexão lenta não veem nada útil enquanto o bundle baixa. Dois
objetivos, medidos a partir do build estático (`out/`):

1. **Enxugar o baseline** que trava a primeira pintura (a loading page nem
   aparece antes de ~234KB gzip baixarem).
2. **Boot splash com a marca** no HTML estático: splash inline (pré-JS) →
   redireciona para `/en` ou `/pt` assim que o app hidrata.

## 📊 Medições do build (gzip — o que conta em rede lenta)
| Entrada | gzip | raw |
|---|---|---|
| `/` (loading page) | **234KB** | 740KB |
| `/en` (home) | 236KB | 748KB |
| **delta home sobre `/`** | **+3KB** | +9KB |

**Descoberta-chave:** a home é só +3KB sobre `/`. Pré-carregar a home (plano
antigo) é **inócuo** — o peso já está no baseline compartilhado, porque:
- o **Footer (no root layout) renderiza `AsciiArtCanvas`** → o motor ASCII já
  está em toda página, então uma segunda loading page em canvas quase não reduz
  custo e ainda duplica a experiência.
- o **`template.tsx` puxa `framer-motion`** em toda rota.

Composição do baseline (gzip): framework React ~121KB · polyfills 39KB ·
**framer-motion 38KB** (chunk `82`, só usado por `template.tsx`) · Lenis 7KB ·
motor ASCII ~11KB · resto.

## ✅ Decisões (alinhadas)
- **SSG:** (1) **remover framer-motion** do `template.tsx` → entrada via CSS;
  (2) **lazy-load do Lenis**. (Não mexer em polyfills nem em route-group agora.)
- **Cold-load:** **splash inline sem JS** (logo SVG + "loading…").
- **Timing do redirect:** `LocaleRedirect` faz `router.prefetch` e redireciona
  imediatamente; sem min-display e sem segunda tela de loading.

---

## 🧩 Tarefas (cada item = 1 commit atômico)

### SSG primeiro
- [x] **S1 — Remover framer-motion do `template.tsx`.** Trocar pelo entrance em
  CSS `.route-enter` (transform-only, igual ao framer atual — conteúdo sempre
  visível), gated em `.js-anim` + `prefers-reduced-motion` no `globals.css`
  (espelha o padrão de `.reveal`). `template.tsx` vira server component. Remove
  ~38KB gzip de **toda** rota (único consumidor de framer-motion).
- [x] **S2 — Lazy-load do Lenis.** Mover `import("lenis")` para dentro do efeito
  em `lenis-provider.tsx` (dynamic import → chunk separado, fora do baseline).
  Manter `import "lenis/dist/lenis.css"`. Sem perda de comportamento.

### Boot splash
- [x] **T1 — Splash inline pré-JS.** Em `src/app/layout.tsx`, overlay
  `#boot-splash` no `<body>` com `<style>` inline (tema via
  `prefers-color-scheme`), SVG do logo (reuso do path de `icons/logo.tsx`) +
  "loading…" mono + `<noscript>` com links `/en`·`/pt`. Mantido durante o redirect em `/` e removido quando a rota localizada
  monta.
- [x] **T2 — Remover segunda tela de loading.** `LoadingScreen` foi removido;
  o `BootSplash` cobre o cold-load e evita duplicar a experiência após
  hidratação.
- [x] **T3 — Redirect direto.** `locale-redirect.tsx` calcula
  `pickInitialLocale()`, faz `router.prefetch("/"+locale)`, chama
  `router.replace("/"+locale)` imediatamente e mantém `<noscript>`.

### Fechamento
- [x] **T4 — Verificar estático + medir antes/depois.** `npm run build` ok;
  `/` gzip **234.4KB → 193.0KB (−41.4KB / −17.7%)**; framer-motion sumiu do
  output; Lenis virou chunk on-demand (`411.*.js`, não referenciado por `/`);
  `out/` com HTML estático de todas as rotas; sem superfície SSR. QA visual via
  `/browse` **bloqueado neste ambiente** (Chromium sandbox falha) — validado por
  DOM no HTML estático (boot-splash presente em `/`; hero intacto em `/en`).
- [x] **T5 — Docs.** `AGENTS.md` atualizado (fluxo de loading com `BootSplash`,
  baseline enxuto sem framer + Lenis lazy).

---

## 🔎 Verificação final
- [x] `npx tsc --noEmit`, `npx eslint`, `npm run build` passam.
- [x] Build confirma que o chunk de framer-motion (`82`, ~38KB gzip) sumiu do `/`.
- [x] QA visual via **chrome-devtools-mcp** (gstack /browse falha por sandbox):
      `/` → redirect imediato p/ `/en`; boot-splash full-screen e centrado em
      **dark e light** (adapta via prefers-color-scheme), some (`is-hidden`) ao
      hidratar; hero + home renderizam; **0 erros de console** (só os warnings de
      font-preload pré-existentes). Screenshots em `/tmp/qa_bootsplash*.png`.
- [x] Sem JS: `out/index.html` contém splash + `<noscript>` com links de locale.

## 💡 Oportunidades SSG adiadas (não nesta leva)
- Trim de polyfills via browserslist (~39KB gzip; dropa browsers antigos).
- Layout mínimo para `/` via route group (loading page sem Header/Footer/providers).
