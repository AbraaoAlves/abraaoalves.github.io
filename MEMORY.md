# Session Memory: abraaoalves.github.io Rebuild

Este arquivo contém o registro histórico dos prompts do usuário e as principais lições aprendidas durante esta sessão de consultoria e desenvolvimento.

## 1. Histórico de Prompts (User Journey)

1. **A Visão:** "seu meu consultor de carreira para um staff software developer com mais de 18 anos de experiência... Preciso refazer meu site abraaoalves.github.io... A ideia é criar algo tão profissional como o ythecombinator.space... Minha maior inspiração como dev é o rodrigo pombo (pomb.us)... gostaria de usar o codehike."
2. **Refinando a Narrativa:** "Miture B, C e A. Nessa ordem. Gostei de onde descidiu focar. Mas lembre-se não quero que faça uma copia de desses sites, na verdade quero que me dê referencias antes de começar a trabalhar para ter certeza que você vai começar corretamente."
3. **Definição Visual:** "Quero a tipografia e motion desing do ettrics.com E a estrutura do javisperez.com... uma animação do ettrics... versão light/dark/system mode."
4. **Escolha Técnica:** [Resposta do usuário selecionando Next.js App Router e integração Pretext].
5. **Ajuste de Posicionamento:** "Não quero me prender a um cargo, quero deixar as portas abertas para freelance, consultoria, senior, staff e o que precisar. Frizar staff não parece uma coisa inteligente nesse sentido. Acredito que o meu nome deve ser lembrado no Hero."
6. **Início da Execução:** "Sim, vamos lá, mas crie um um novo branch antes de começar os trabalhos. Lembre-se de fazer commits pequenos para podermos auditar os trabalhos posteriormente. Para poder fazer commits pequenos, faça um plan.md detalhando pequenas tarefas que possam ser executadas a cada commit."
7. **Organização:** "Atualize o plan-abraao-site.md com o que definimos e link isso no TASKS.md para poder lembrar do que estamos trabalhando a cada tarefa."
8. **Autorização de Ciclos:** "ok, pode seguir com cada task sequencialmente até a fase 3. Você pode e deve usar o chrome para conferir o resultado entre cada task que impacte em mudança no desing final. Faça todas s verificações necessarias antes de fazer o commit (build and visual test)."
9. **Intervenção Técnica:** "see the output from npm run dev. I'll be able to see a error like this: 'Error: loader ... does not have serializable options'... Use the npm run dev output command error to fix before try to find running process."
10. **Finalização:** "continue" -> "crie um arquivo MEMORY.md, com todos os meus prompts e com tudo que aprendemos nessa sessão."

## 2. O que Aprendemos (Technical & Strategic Insights)

### Estratégia de Carreira (Staff Versatility)
- **Nome como Marca:** Para um profissional com 18+ anos, o nome próprio carrega mais valor que um título de cargo mutável. A marca "Abraão Alves" deve evocar confiança em qualquer modalidade de contrato.
- **Narrativa de Impacto:** O valor real está em mostrar a evolução de longo prazo (9 anos na Beakyn) e a capacidade de multiplicador (Mentoria).

### Frontend & Motion Design
- **ASCII Canvas Renderer:** O efeito visual agressivo do Ettrics pode ser recriado em React usando um canvas oculto para renderizar texto com fontes variáveis e converter os dados de pixel (luminância) em caracteres ASCII dinamicamente.
- **Logo SVG Customizada:** Integramos uma logo geométrica complexa (baseada em um trabalho anterior do Abraão no CodePen) como um componente React funcional, permitindo controle dinâmico de cores via Tailwind.
- **Next.js 16 + Turbopack:** Descobrimos que o Turbopack ainda tem limitações com MDX loaders ao passar opções não-serializáveis (como instâncias de plugins remark). O uso de `next dev --webpack` e `next build --webpack` é necessário para compatibilidade com ecossistemas complexos como o Code Hike.
- **Tailwind CSS 4:** Iniciamos o uso da versão 4, que simplifica a importação de plugins (ex: `@plugin "@tailwindcss/typography"`) diretamente no CSS.

### Integração de Conteúdo
- **Code Hike v1.1:** Requer tanto `remarkCodeHike` quanto `recmaCodeHike` para funcionar plenamente no App Router. A estilização dos blocos de código deve ser feita via CSS customizado para garantir o visual "premium".
- **Estrutura Modular:** O layout inspirado no Javis Perez funciona bem para separar seções de impacto (Work) de seções de autoridade técnica (Lab).

### Workflow de Engenharia
- **Atomic Commits:** O uso de um `TASKS.md` dinâmico permite que o progresso seja auditável e que problemas técnicos sejam isolados rapidamente.
- **Visual-Driven Development:** A validação constante via browser (Chrome snapshots) é essencial para garantir que o motion design e o layout se comportem bem em diferentes temas e resoluções.
