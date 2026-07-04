import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { RouteScrollManager } from "@/components/route-scroll-manager";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle =
  "Connor Dibble — Senior Software Engineer, Platform Engineering & Design Systems";
const siteDescription =
  "Senior software engineer working across platform engineering, design systems, and AI tooling for reliable software at scale.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: "Connor Dibble" }],
  creator: "Connor Dibble",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: "connordibble.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(97% 0.004 235)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(13% 0.012 45)" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `
(function() {
  try {
    var key = "connordibble-theme";
    var stored = localStorage.getItem(key);
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
  } catch (_) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-text font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-sm focus:border focus:border-border-strong focus:bg-panel-raised focus:px-4 focus:py-2 focus:font-mono focus:text-caption focus:text-text"
        >
          Skip to content
        </a>
        <RouteScrollManager />
        {children}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </body>
    </html>
  );
}
