# TODO — v-next (conteúdo do Abraão)

Itens que **dependem de conteúdo real do Abraão** — não dá pra fabricar.
Fecham as pontas que sobraram do épico "currículo → quartel-general"
(branch `feat/refact`, já concluída e mergeada no resto). Cada item = 1 commit
atômico quando o conteúdo chegar.

## 🧩 Pendências

- [ ] **V1 — Depoimentos reais.** Substituir os depoimentos anonimizados
  (`"Senior engineer — mentored at Beakyn"` etc.) por texto + nome + cargo/empresa
  reais em `src/lib/content.ts → ment.quotes` (editar **EN e PT** — o TS quebra se
  divergir; o avatar deriva a inicial via `initialOf()` em `mentorship.tsx`).
  Foto opcional.

- [ ] **V2 — Revisar a narrativa dos cases.** O MDX atual de
  `work/(cases)/smartscout-geospatial/content.mdx` e `.../notasocial/content.mdx`
  é meu rascunho v1 a partir de fatos públicos. Abraão revisa: o problema de
  negócio, a decisão de arquitetura mais difícil, 1–2 tradeoffs honestos e o
  resultado. (Estrutura/markup já prontos — é só o texto.)

- [ ] **V3 — CV em PDF.** Gerar `/public/abraao-alves-cv.pdf` (1 página) a partir
  do conteúdo de currículo atualizado do Abraão + link discreto no Hero e/ou
  Footer (recrutador ainda quer baixar). Era a tarefa T0.4 do plano original,
  não feita por falta do conteúdo.

---
*Estes três fecham o plano de carreira (`~/.claude/plans/adaptive-snuggling-alpaca.md`).
Tudo que é código já está pronto na branch.*
