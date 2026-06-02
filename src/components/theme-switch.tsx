"use client";

import * as React from "react";
import { Monitor, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const options = [
  { value: "system", label: "System theme", Icon: Monitor },
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
] as const;

/**
 * Descriptive theme switch (system / light / dark) shown in the footer, like
 * ettrics.com. Uses `theme` (the stored preference, incl. "system") to mark the
 * active option. Mount-guarded so SSR and first client paint agree.
 */
export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  return (
    <div className={"flex items-center gap-5 " + (className ?? "")}>
      {options.map(({ value, label, Icon }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            className={
              "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded " +
              (active
                ? "text-neutral-900 dark:text-neutral-50"
                : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300")
            }
          >
            <Icon className="h-[1.15rem] w-[1.15rem]" />
          </button>
        );
      })}
    </div>
  );
}
