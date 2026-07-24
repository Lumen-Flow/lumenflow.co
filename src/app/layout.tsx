import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/footer";
import { AnimatedHeader } from "@/components/layout/animated-header";
import { siteConfig } from "@/content/site";

import { apfelGrotezk, apfelGrotezkBrukt, plusJakartaSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Lumen&Flow",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0F2F5" },
    { media: "(prefers-color-scheme: dark)", color: "#081C30" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${apfelGrotezk.variable} ${apfelGrotezkBrukt.variable} ${plusJakartaSans.variable} flex min-h-screen flex-col`}
      >
        <AnimatedHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
