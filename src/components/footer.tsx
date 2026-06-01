export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-stone-200 bg-[#f4f1ea] dark:border-stone-800 dark:bg-[#0c0a09] py-8 mt-auto">
      <div className="container mx-auto max-w-4xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500 dark:text-stone-400">
        <p>© {currentYear} Abraão Alves. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://linkedin.com/in/abraaoalves" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/abraaoalves" target="_blank" rel="noopener noreferrer" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
