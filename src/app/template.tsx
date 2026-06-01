"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Per-route entrance animation. Two correctness constraints:
 *
 * 1. Respect `prefers-reduced-motion` — when set, render with no animation
 *    (`initial={false}` makes Framer mount directly at the target state).
 * 2. Never ship invisible content. The reveal is transform-only (a small slide),
 *    not an opacity fade, so the server-rendered HTML is always visible even
 *    before/without JS — important for a static export and for crawlers.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { y: 8 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col flex-1 w-full"
    >
      {children}
    </motion.div>
  );
}
