import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { AnimatedHeader } from "@/components/layout/animated-header";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { ClosingSection } from "@/components/sections/closing-section";
import { siteConfig } from "@/content/site";
import { getGoogleConsentBootstrapScript } from "@/lib/cookie-consent";

import { apfelGrotezk, apfelGrotezkBrukt, plusJakartaSans } from "./fonts";
import "./globals.css";
import "./scrollbar.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const googleConsentBootstrap = getGoogleConsentBootstrapScript();

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
      <head>
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {googleConsentBootstrap}
        </Script>
      </head>
      <body
        className={`${apfelGrotezk.variable} ${apfelGrotezkBrukt.variable} ${plusJakartaSans.variable} flex min-h-screen flex-col bg-cool-frost`}
      >
        <AnimatedHeader />
        <main className="bg-cool-forest flex-1">{children}</main>
        <ClosingSection />
        <CookieConsent />
      </body>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
    </html>
  );
}
