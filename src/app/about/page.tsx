import type { Metadata } from "next";
import { Roots } from "@/components/sections";

export const metadata: Metadata = {
  title: "About",
  description:
    "The foundation behind 18+ years of engineering — from Assembly and microcontrollers in 2002 to Staff Engineer and software architect.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Roots />
    </main>
  );
}
