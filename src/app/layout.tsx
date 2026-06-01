import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 selection:bg-neutral-200 dark:selection:bg-neutral-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
