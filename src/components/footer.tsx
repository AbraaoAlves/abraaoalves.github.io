export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 py-8 mt-auto">
      <div className="container mx-auto max-w-4xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <p>© {currentYear} Abraão Alves. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://linkedin.com/in/abraaoalves" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/abraaoalves" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
