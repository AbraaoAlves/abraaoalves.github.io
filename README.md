# Abraão Alves | Engineering Portfolio

Professional portfolio built with Next.js 16, Tailwind CSS 4, and Framer Motion. 

## 🚀 Key Features
- **Dynamic ASCII Hero:** Custom WebGL/Canvas implementation for variable typographic ASCII art.
- **Strategic Narrative:** Focused on Staff Engineer impact, mentorship (building people), and technical foundations.
- **The Lab:** MDX-powered technical blog with optimized typography and Code Hike support.
- **Dark/Light Mode:** Seamless theme switching with `next-themes`.
- **Static Export:** Fully optimized for GitHub Pages.

## 🛠 Tech Stack
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Motion:** [Framer Motion](https://www.framer.com/motion/)
- **Content:** [MDX](https://mdxjs.com/)
- **Typography:** Geist & Geist Mono

## 💻 Development

### Prerequisites
- Node.js 20+
- npm

### Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```
   *Note: Using `--webpack` flag in the script for MDX plugin compatibility.*

3. Build for production (Static Export):
   ```bash
   npm run build
   ```

## 🚢 Deployment
Deployments are handled automatically via **GitHub Actions** whenever a push is made to the `master` (or `main`) branch. The site is exported as a static site and pushed to the `gh-pages` branch.

---
Built with ☕ and strategic engineering by Abraão Alves.
