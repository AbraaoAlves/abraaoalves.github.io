# ISSUES — Review of abraaoalves.github.io (feature/new-site)

> **Resolution status (updated 2026-06-01, branch feature/new-site):**
> - ✅ **#1** theme toggle + dead CSS vars (toggle uses `resolvedTheme`; `.dark` drives vars; hydration aria-label fixed)
> - ✅ **#2** hero — rebuilt as a legible Ettrics ASCII wordmark (shade-block dither fill, theme-blended)
> - ✅ **#3** Ettrics face — warm paper palette (stone), ghost headers, brand accent, scroll-reveal motion
> - ✅ **#4** logo — real isometric "A" from the pen
> - ✅ **#5** Lab — data-driven listing + real Code Hike syntax highlighting
> - ✅ **#6** page-fade — transform-only reveal, respects reduced-motion, no invisible HTML
> - ✅ **#7** deploy — paths run at repo root, triggers on `master`
> - ✅ **#8** SEO — sitemap, robots, OG image, metadataBase
> - ✅ **#9** boilerplate — stock svgs removed, real favicon from the logo
> - ✅ **#10** perpetual rAF — solved by the new canvas (IntersectionObserver pause + fps cap + reduced-motion)
> - ⚠️ **#11** content/copy (mentorship attribution clarified; dates + social links still to verify with real data)
> - ⚪ **#12–#14** polish — `next start` script, font-preload warning, minor a11y (hero now has a real sr-only h1)


> Review date: 2026-05-31. Tested live at `http://localhost:3000` (`next dev --webpack`) with a headless browser, in both light and dark mode, desktop (1280px) and mobile (375px). Cross-referenced against the stated design targets — **ettrics.com** (typography + motion) and **javisperez.com** (structure + name-as-hero) — and the user's real logo pen (https://codepen.io/AbraaoAlves/pen/BjzPjy, titled "My logo").

## Goal recap (from AGENTS.md / MEMORY.md)
Rebuild Abraão Alves' digital identity as a versatile Staff/Architect/Mentor (18+ yrs). The **name** is the brand and must be the hero centerpiece. Visual language = **Ettrics** (bold variable typography + kinetic motion) over **Javis Perez** structure (giant ghost section headers, name-driven hero, accent color, light/dark/system). Content: Impact (Beakyn), Mentorship, Foundation, and a Code Hike "Lab".

## TASKS.md status check
All of Fase 1–3 and Tasks 4.1/4.2 are marked `[x]`. Functionally the sections render and the routes exist, but several "done" tasks do not meet the design intent:
- **2.3 / 2.4 (HeroAscii + name)** — renders, but the result is illegible and off-brand (see #2).
- **2.5 (Framer Motion transitions)** — present, but the implementation makes content invisible on load (see #6).
- **4.1 (Logo)** — the wrong logo was integrated; it's CodePen's brand mark, not the user's pen (see #4).
- **4.2 (GitHub Actions deploy)** — workflow paths point at a nested monorepo dir that won't exist in the real repo; deploy will fail (see #7).
- **4.3 / 4.4** — still `[ ]` (SEO/perf audit, copy + motion polish). Findings below feed directly into these.

---

## CRITICAL

### #1 — Light/Dark theme toggle is broken (first click is a no-op) + dead CSS variables
**User report:** "light/dark theme is a mess." Confirmed.

- **Broken toggle logic.** `src/components/theme-toggle.tsx` does `setTheme(theme === "light" ? "dark" : "light")`. With `defaultTheme="system"`, the initial value of `theme` is `"system"`, not `"light"`. So the first click always resolves to `"light"`.
  - Reproduced: OS/system = light → page is light → click toggle → `theme` set to `"light"` → **nothing changes**. The user must click a **second** time to reach dark. Verified via `localStorage.theme` going `light` → (click) → `dark`.
  - The toggle also permanently drops the `"system"` option once clicked — there is no 3-state (light/dark/system) control even though Task 1.3 promised System mode.
- **No hydration guard.** `useTheme()` is read during render with no `mounted` check, so the icon/label can mismatch on first paint.
- **Dead CSS variables.** `src/app/globals.css` defines `--background`/`--foreground` and switches them with `@media (prefers-color-scheme: dark)` — i.e. they only follow the **OS**, never the in-app `.dark` class that `next-themes` toggles (`attribute="class"`). The visible body color happens to work only because `layout.tsx` hard-codes `bg-white dark:bg-neutral-950` on `<body>`. Any component that uses `var(--background)`/`var(--foreground)` will silently ignore the manual toggle. There is no `.dark { --background … }` rule.

**Fix direction:** toggle on `resolvedTheme` (`setTheme(resolvedTheme === "dark" ? "light" : "dark")`), add a `mounted` guard, consider a 3-state control, and drive `--background`/`--foreground` off the `.dark` class instead of (or in addition to) the media query.

---

### #2 — Hero name is illegible and off-brand
**User report:** "the name in hero section is very ugly." Confirmed.

`src/components/hero-ascii.tsx` rasterizes "ABRAÃO ALVES" to a hidden canvas, then maps pixel luminance to ASCII chars rendered in a `<pre>`. Problems:
- The output is a **low-resolution smear of dots** (`. : - = +`), barely readable on desktop and nearly unreadable on mobile (the grid gets too narrow at 375px). The name — which the whole brand is supposed to hinge on — is the least legible element on the page.
- **Inverted color box.** The container is `bg-neutral-950 dark:bg-neutral-50`, so in **light** mode the hero is a hard **black box**, and in **dark** mode it flips to a glaring **white box**. It fights the page instead of belonging to it (screenshots `/tmp/site-default.png` vs `/tmp/site-dark.png`).
- This is the opposite of the references: **Javis Perez** renders his name as huge, crisp, confident display type (with an accent-colored surname); **Ettrics** uses large bold variable type. The ASCII gimmick buries the name instead of celebrating it.

**Fix direction:** lead with real, large, variable-weight typography for "ABRAÃO ALVES" (Geist supports 100–900). If the Ettrics-style kinetic ASCII/variable effect is kept, it should be a subtle layer behind/around crisp type, not the primary rendering of the name, and it must not invert the whole hero block against the theme.

---

### #3 — Doesn't evoke Ettrics or Javis Perez
**User report:** "the site doesn't remember ettrics.com neither javisperez.com." Confirmed against live captures of both.

What the references actually do (verified):
- **Javis Perez** (`/tmp/javis.png`): near-black canvas, **giant outlined name hero** with a yellow accent on the surname, oversized **ghost section headers** ("STACK", "PROJECTS", "YEARS", "HELLO") used as scroll dividers, a single bold accent color, minimal top-right nav, starfield/motion.
- **Ettrics** (`/tmp/ettrics.png`): airy light layout, very large left-aligned bold display headline ("Design that scales with you"), premium project cards with rich media, generous whitespace, strong scroll motion, a bold "Start your next project." closer.

What the current site is: a generic, centered, bootstrap-ish portfolio — small `text-2xl` section titles with a hairline rule, uniform rounded-2xl bordered cards, no accent color (blue appears only on the logo + link hover), no oversized typographic system, no kinetic scroll motion. It reads as a tidy template, not as either reference.

Gaps to close:
- No **oversized display typography** / type scale anywhere (titles top out at `text-3xl`).
- No **accent color** as a brand signal (Javis' yellow / Ettrics' restraint).
- No **giant ghost section labels** for Work / Mentorship / Foundation.
- No **kinetic/scroll motion** (the only motion is a page-fade — see #6).
- Hero centered + boxed, instead of an editorial, name-forward composition.

**Fix direction:** establish a real type scale and one accent color, rebuild section headers as oversized ghost labels, and add scroll-reveal motion. This is the substance of Tasks 4.4 (motion polish) and the design intent behind 2.x.

---

### #4 — Wrong logo (CodePen's brand mark, not the user's pen)
**User report:** "logo is very wrong — today is the codepen logo, not the SVG rendered in my pen." Confirmed.

- The pen at https://codepen.io/AbraaoAlves/pen/BjzPjy ("My logo") renders a **geometric isometric "A"** — a peak/triangle built from a light-blue left stroke and a dark-blue right stroke with a small dark inner chevron (`/tmp/codepen-shot.png`).
- `src/components/icons/logo.tsx` instead contains the **CodePen platform logo** — the faceted hexagon/"squares-in-a-frame" mark that CodePen uses as its own brand. It was almost certainly copied from the CodePen page chrome rather than from the pen's SVG.

**Fix direction:** replace the path in `logo.tsx` with the actual "A" mark from the pen (extract the SVG from the pen's HTML panel). Keep it as `currentColor` so it themes, but the real mark is two-tone blue — decide whether to preserve the two blues or recolor to the new accent.

---

## HIGH

### #5 — `/lab` index and the blog post render but the Lab is essentially a stub
- Code Hike + MDX wiring works: `/lab` lists one post and `/lab/the-goto-lesson` renders prose (verified via extracted text). Good.
- But the "Lab" is a single hard-coded post card in `src/app/lab/page.tsx` with no data source, no listing system, and no code blocks exercising Code Hike in the one post (the whole Code Hike/Turbopack workaround is currently unused by real content). For a site whose technical-authority pitch is the Lab, one prose-only article undersells it.

### #6 — Page-transition animation hides all content on load
`src/app/template.tsx` wraps every route in a Framer Motion `motion.div` with `initial={{ opacity: 0, y: 10 }}`. Because `template.tsx` re-runs on every navigation and the fade takes 0.4s:
- Initial screenshots of `/lab`, the post, and the mobile home came back **blank** — the DOM was present but the wrapper was mid-fade (measured `opacity: 0.33` right after network idle, settling to `1` a beat later).
- For a **static export** this is risky: the server-rendered HTML ships with `opacity: 0`, so if JS is slow or fails, the page stays invisible. Bad for perceived performance and for crawlers/link-preview bots.
- No `prefers-reduced-motion` handling.

**Fix direction:** drop the opacity-0 initial on first paint (animate only on client-side route changes, or start near-visible), and respect reduced motion.

### #7 — GitHub Actions deploy will fail (wrong working directory) and triggers on the wrong branch
`.github/workflows/deploy.yml`:
- `working-directory: abraao/abraaoalves.github.io` and `path: ./abraao/abraaoalves.github.io/out`, plus `cache-dependency-path: abraao/abraaoalves.github.io/package-lock.json`. These mirror the **local** nested folder (`~/s/abraao/abraaoalves.github.io`), not the actual GitHub repo layout, where `package.json` sits at the repo root. On CI the checkout has no `abraao/…` subdir, so `npm ci` / build / artifact upload will all fail.
- `on.push.branches: ["feature/new-site"]` — deploys from the feature branch, not `master` (there's a TODO comment acknowledging it, but it's still wired wrong).

**Fix direction:** remove the `abraao/abraaoalves.github.io` path prefixes (run at repo root, `out` artifact at root) and switch the trigger to `master` before/at merge. Marking Task 4.2 done is premature until a CI run is green.

---

## MEDIUM

### #8 — SEO/social metadata incomplete (Task 4.3)
- `layout.tsx` declares OpenGraph + `twitter: { card: "summary_large_image" }` but **no image** exists, so social shares get no card image.
- No `sitemap.(ts|xml)` or `robots.(ts|txt)` despite `robots: { index, follow }` in metadata.
- `lang="en"` while some content/UX is Portuguese-leaning; fine if the site is intentionally English, just confirm.

### #9 — Default Next.js boilerplate still in the repo
- `public/` still holds the create-next-app placeholders: `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` (unused).
- `README.md` is still the **stock create-next-app README** (talks about Vercel deploy, editing `app/page.tsx`) — doesn't match this project, the `--webpack` workflow, or GitHub Pages.
- `favicon.ico` is the **default Next.js favicon** (25KB), not an Abraão Alves mark — pair this with the #4 logo fix.

### #10 — Hero animation is a perpetual, expensive render loop
`hero-ascii.tsx` runs an unconditional `requestAnimationFrame` loop that, every frame, redraws the canvas, calls `getImageData`, rebuilds a multi-thousand-char string, and calls `setAscii` — forcing a **React re-render every frame, forever**, even when the hero is scrolled out of view. On laptops/mobile this is a constant CPU/GPU and battery drain and will hurt the Task 4.3 performance audit. (`willReadFrequently` is set, which helps a little, but the per-frame `setState` is the real cost.) No pause-on-offscreen, no `prefers-reduced-motion`.

### #11 — Content / authority gaps
- **Mentorship quotes are inconsistent.** Two are attributed to people ("Juan Pujol", "Bruno Lázaro"); two are written *about* mentees but labeled "Mentoring Hiléo" / "Mentoring Lamartine" and read in third person — the framing is confusing (who is speaking?). One even contains "Working with Hiléo Andersson…" as if quoting someone else. Tighten attribution.
- **Date inconsistency.** The single Lab post is dated **May 30, 2026** and "AI & Compliance Architecture" card says **2024 – 2026** while Beakyn says **2017 – Present** but the prose says "first Brazilian engineer hired" — reconcile the timeline/claims.
- **Footer social links are unverified placeholders** (`linkedin.com/in/abraaoalves`, `github.com/abraaoalves`) — confirm both resolve before launch.

---

## LOW / POLISH

### #12 — `next start` is meaningless with `output: "export"`
`package.json` keeps `"start": "next start"`, which doesn't apply to a static export. Replace with a static preview (e.g. `npx serve out`) or drop it, to avoid confusing future contributors.

### #13 — Console warnings: font preloaded-but-unused
Repeated browser warnings: the two Geist `.woff2` files are `<link rel=preload>`'d but "not used within a few seconds." Harmless but noisy; worth confirming the font subset/`display` strategy once typography is reworked (#2/#3).

### #14 — Minor a11y / semantics
- Hero `<canvas>` is `hidden` and the visible name is only in a decorative `<pre>` of ASCII — there is **no real accessible text node for "ABRAÃO ALVES"** in the hero (screen readers get a wall of punctuation). Add a visually-hidden `<h1>` with the actual name.
- Theme toggle button has `sr-only` text (good) but see #1 for the broken behavior behind it.

---

## Suggested priority order
1. #1 theme toggle + #4 logo + #2 hero name — the three things the user named first, all high-visibility and self-contained.
2. #3 + #6 — the design-language gap and the load-time invisibility (these define whether it "feels like" Ettrics/Javis).
3. #7 — fix CI before claiming 4.2 done; #8 SEO and #9 boilerplate cleanup for launch readiness.
4. #10/#11/#12–#14 — performance, copy accuracy, and polish.

## Evidence (local screenshots captured during review)
- `/tmp/site-default.png` — home, light/system (black hero box, dotty name)
- `/tmp/site-dark.png` — home, dark (white hero box)
- `/tmp/lab.png`, `/tmp/lab2.png` — Lab index (blank mid-fade vs settled)
- `/tmp/post.png` — the-goto-lesson post (blank mid-fade)
- `/tmp/mobile.png` — mobile home
- `/tmp/codepen-shot.png` — the REAL logo (isometric blue "A")
- `/tmp/ettrics.png`, `/tmp/javis.png` — the two design references
