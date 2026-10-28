import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { kgm, absoluteUrl } from "@/data/kgm-data";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  // Solo el origen: las rutas que genera Next ya incluyen el basePath.
  metadataBase: new URL(kgm.site.origin),
  title: { default: kgm.seo.title, template: `%s | ${kgm.identity.name}` },
  description: kgm.seo.description,
  keywords: kgm.seo.keywords,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: kgm.seo.title,
    description: kgm.seo.description,
    siteName: kgm.identity.name,
    url: absoluteUrl("/"),
    locale: "es_PE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: kgm.seo.title, description: kgm.seo.description },
};

export const viewport: Viewport = {
  themeColor: "#F4F3EE",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: kgm.identity.name,
  url: absoluteUrl("/"),
  email: kgm.contact.email,
  ...(kgm.contact.phone ? { telephone: kgm.contact.phone } : {}),
  taxID: kgm.identity.ruc,
  foundingDate: kgm.identity.foundedISO,
  areaServed: "Lima Metropolitana",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. La Paz 2420, Urb. Miramar",
    addressLocality: "San Miguel",
    addressRegion: "Lima",
    addressCountry: "PE",
  },
  openingHours: "Mo-Fr 08:00-18:00",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[2px] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Saltar al contenido
        </a>
        <SiteShell>{children}</SiteShell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
