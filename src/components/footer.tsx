import Link from "next/link";

// Internal page links (left column). Mirror the header nav.
const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Mentorship", href: "/#mentorship" },
  { label: "Lab", href: "/lab" },
];

// External profiles (right column). Opens in a new tab.
// TODO: verify these handles — placeholders based on the `abraaoalves` pattern.
// Stack Overflow in particular uses a numeric user id, not a slug.
const externalLinks = [
  { label: "GitHub", href: "https://github.com/abraaoalves" },
  { label: "X", href: "https://x.com/abraaoalves" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abraaoalves" },
  { label: "Stack Overflow", href: "https://stackoverflow.com/users/abraaoalves" },
  { label: "HackerRank", href: "https://www.hackerrank.com/abraaoalves" },
  { label: "CodePen", href: "https://codepen.io/abraaoalves" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 mt-auto">
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        {/* Two link columns: page nav (left) / external profiles (right) */}
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <nav aria-label="Site" className="flex flex-col gap-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
              Navigate
            </h2>
            <ul className="flex flex-col gap-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere" className="flex flex-col gap-3 sm:text-right">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
              Elsewhere
            </h2>
            <ul className="flex flex-col gap-2">
              {externalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom strip: copyright (left) / meta (right) */}
        <div className="mt-12 flex flex-col gap-2 border-t border-neutral-100 pt-6 text-sm text-neutral-500 dark:border-neutral-800/60 dark:text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Abraão Alves. All rights reserved.</p>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Built with ASCII
          </p>
        </div>
      </div>
    </footer>
  );
}
