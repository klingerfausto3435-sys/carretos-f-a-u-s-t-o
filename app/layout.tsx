import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Analytics } from "@/components/Analytics";
import { GoogleTag } from "@/components/GoogleTag";
import "./globals.css";

/* Duas famílias, variáveis, auto-hospedadas pelo next/font. `swap` evita
   texto invisível durante o carregamento (§12.3). */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `Carreto em ${siteConfig.cityShort} e Pequenas Mudanças | ${siteConfig.brandName}`,
  description: `Carreto em ${siteConfig.cityShort}, carreto pequeno e pequenas mudanças. ${siteConfig.yearsExperience} anos de estrada, atendimento direto pelo WhatsApp em ${siteConfig.city} e região.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: siteConfig.brandName,
    title: `Carreto em ${siteConfig.cityShort} e Pequenas Mudanças | ${siteConfig.brandName}`,
    description: `Carretos e pequenas mudanças em ${siteConfig.city}. ${siteConfig.yearsExperience} anos de estrada e atendimento direto pelo WhatsApp.`,
    images: [
      {
        url: "/og-fausto-transportes.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} — carretos e pequenas mudanças em ${siteConfig.city}`,
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1,
};

/**
 * JSON-LD com APENAS campos confirmados (§14).
 * Deliberadamente sem address, aggregateRating, priceRange e openingHours:
 * nenhum deles foi confirmado pelo cliente (pendências §27).
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: siteConfig.brandName,
  description: `Carretos e pequenas mudanças em ${siteConfig.city}.`,
  url: siteConfig.siteUrl,
  telephone: `+${siteConfig.phoneRaw}`,
  image: `${siteConfig.siteUrl}/og-fausto-transportes.jpg`,
  areaServed: {
    "@type": "City",
    name: siteConfig.city,
    addressRegion: siteConfig.state,
    addressCountry: "BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
        <GoogleTag />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
