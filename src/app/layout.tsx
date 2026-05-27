import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "Connor Dibble — Senior Software Engineer",
  description:
    "Enterprise design systems. AI tooling. The platform that turns design intent into production code.",
  authors: [{ name: "Connor Dibble" }],
  creator: "Connor Dibble",
  metadataBase: new URL("https://connordibble.dev"),
  openGraph: {
    title: "Connor Dibble — Senior Software Engineer",
    description:
      "Enterprise design systems. AI tooling. The platform that turns design intent into production code.",
    url: "https://connordibble.dev",
    siteName: "connordibble.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connor Dibble — Senior Software Engineer",
    description:
      "Enterprise design systems. AI tooling. The platform that turns design intent into production code.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f3f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0908" },
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
        {children}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </body>
    </html>
  );
}
