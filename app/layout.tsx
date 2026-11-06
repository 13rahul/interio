import type { Metadata, Viewport } from "next";
import { Amiri, Aref_Ruqaa, Cormorant_Garamond, Jost } from "next/font/google";
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
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const ruqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
});

// Hostinger's CDN honours s-maxage; without this, prerendered pages are cached for a year.
export const revalidate = 60;

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Opulent Living — Affordable luxury interior design, Dubai",
    template: "%s — Opulent Living",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "Opulent Living",
    locale: "en_AE",
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#studio`,
  name: site.name,
  legalName: site.legalName,
  founder: { "@type": "Person", name: site.founder },
  priceRange: "$$",
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
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${jost.variable} ${cormorant.variable} ${amiri.variable} ${ruqaa.variable} theme-linen antialiased`}
      >
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <clipPath id="arch-ogee" clipPathUnits="objectBoundingBox">
            <path d="M0 1V.4C0 .26.17.22.32.165.43.126.48.073.5 0 .52.073.57.126.68.165.83.22 1 .26 1 .4V1Z" />
          </clipPath>
        </svg>
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
