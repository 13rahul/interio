import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { site } from "@/content/site";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Liwan — Interior architecture & design, Dubai",
    template: "%s — Liwan",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "Liwan",
    locale: "en_AE",
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#studio`,
  name: "Liwan",
  description: site.description,
  url: site.url,
  image: `${site.url}/images/hero.jpg`,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Dubai Design District",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: ["Dubai", "Abu Dhabi", "Riyadh"],
  knowsAbout: ["Interior architecture", "Interior design", "Turnkey fit-out", "Hospitality interiors"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${jost.variable} ${cormorant.variable} theme-linen antialiased`}>
        <MotionConfig reducedMotion="user">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brass focus:px-4 focus:py-3 focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionConfig>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
