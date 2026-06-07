import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingControls } from "@/components/floating-controls";
import { BootSplash } from "@/components/boot-splash";

// Type system from proto/index.html (the source of truth):
//   Space Grotesk 700 — display (headings, ghost text, names, brand)
//   Hanken Grotesk    — body copy and leads
//   JetBrains Mono    — eyebrows, meta, labels, buttons
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      className={`${hanken.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* Background/foreground come from the token system in globals.css. */}
      <body className="min-h-full flex flex-col">
        {/* Arm scroll-reveal before paint. `.reveal` is visible by default; this
            adds the hidden start state, so content shows if JS never runs. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{document.documentElement.classList.add('js-anim')}catch(e){}",
          }}
        />
        {/* Cold-load splash — paints on first byte, fades out after hydration. */}
        <BootSplash />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <LenisProvider>
              <div className="app-layer flex flex-1 flex-col">
                <Header />
                {/* pt-16 clears the fixed 64px nav for every route. */}
                <div className="flex flex-1 flex-col pt-16">
                  {children}
                </div>
                <Footer />
                <FloatingControls />
              </div>
            </LenisProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
