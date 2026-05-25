import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  themeColor: "#0b0908",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
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
    >
      <body className="min-h-full flex flex-col bg-canvas text-text font-sans">
        {children}
      </body>
    </html>
  );
}
