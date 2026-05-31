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

## 🛠 Componentes Chave
- **HeroAscii:** (`src/components/hero-ascii.tsx`) - Renderizador de canvas que transforma texto em ASCII dinâmico.
- **Logo:** (`src/components/icons/logo.tsx`) - Logo geométrica customizada importada do legado do usuário no CodePen.
- **Lab Engine:** (`src/app/lab/`) - Estrutura baseada em MDX para artigos técnicos de alta fidelidade.

---
*Este arquivo deve ser mantido atualizado a cada grande mudança na arquitetura ou fluxo de trabalho.*
