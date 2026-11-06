import Link from "next/link";
import { Lattice } from "@/components/brand/Lattice";
import { sectors } from "@/content/home";
import { consultationLabel, nav, site } from "@/content/site";
import { Logo } from "./Logo";

const linkClass = "inline-flex h-10 items-center text-beige/85 transition-colors hover:text-gold";

export function Footer() {
  return (
    <footer className="theme-pine relative overflow-hidden pt-24 pb-10">
      <Lattice className="opacity-[0.05]" size={96} />
      <div className="bg-foil absolute inset-x-0 top-0 h-px" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <Link href="/" aria-label="Opulent Living, home" className="inline-flex">
            <Logo stacked inverse />
          </Link>
          <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-ash">
            Affordable luxury interiors, founded by {site.founder}.
            <br />
            {site.address}
          </p>
        </div>
        <div className="lg:col-span-3 lg:col-start-6">
          <p className="text-xs font-medium tracking-brand text-gold uppercase">Visit or call</p>
          <ul className="mt-5 flex flex-col">
            <li>
              <a href={site.whatsappHref} className={linkClass}>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className={linkClass}>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="text-xs font-medium tracking-brand text-gold uppercase">Services</p>
          <ul className="mt-5 flex flex-col">
            {sectors.map((sector) => (
              <li key={sector.name}>
                <Link href={sector.href} className={linkClass}>
                  {sector.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="text-xs font-medium tracking-brand text-gold uppercase">Studio</p>
          <ul className="mt-5 flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/enquiry" className="inline-flex h-10 items-center text-gold hover:text-beige">
                {consultationLabel}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="relative mx-auto mt-20 max-w-7xl px-6 lg:px-10" aria-hidden="true">
        <svg viewBox="0 0 1000 118" className="block w-full select-none">
          <defs>
            <linearGradient id="footer-foil" x1="0" y1="0" x2="1000" y2="118" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#9c7424" />
              <stop offset=".3" stopColor="#ecd38b" />
              <stop offset=".55" stopColor="#b88a2c" />
              <stop offset=".78" stopColor="#f4dd99" />
              <stop offset="1" stopColor="#a77d27" />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="104"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            fontSize="132"
            fontWeight="300"
            fill="url(#footer-foil)"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            OPULENT LIVING
          </text>
        </svg>
      </div>
      <div className="relative mx-auto mt-8 flex max-w-7xl flex-wrap justify-between gap-4 border-t border-graphite px-6 pt-6 text-xs text-ash lg:px-10">
        <p>
          © {new Date().getFullYear()} {site.legalName}. Dubai, United Arab Emirates.
        </p>
        <p>Design · Turnkey fit-out · Joinery</p>
      </div>
    </footer>
  );
}
