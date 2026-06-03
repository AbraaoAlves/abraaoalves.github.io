import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Ettrics uses Saans (commercial). Hanken Grotesk is the closest free variable
// grotesque; IBM Plex Mono matches their eyebrow/label mono exactly.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abraaoalves.github.io"),
  title: {
    default: "Abraão Alves | Software Engineering & Mentorship",
    template: "%s | Abraão Alves"
  },
  description: "18+ years of high-impact engineering, architecture, and building people. From Assembly to AI Infrastructure.",
  openGraph: {
    title: "Abraão Alves | Software Engineering & Mentorship",
    description: "Building software that lasts. High-impact engineering, mentorship, and architecture since 2008.",
    url: "https://abraaoalves.github.io",
    siteName: "Abraão Alves",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abraão Alves",
    description: "18+ years of high-impact engineering and mentorship.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#faf9f7] text-[#121212] dark:bg-[#121212] dark:text-[#faf9f7] selection:bg-[#121212] selection:text-[#faf9f7] dark:selection:bg-[#faf9f7] dark:selection:text-[#121212]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <Header />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
