import Link from "next/link";
import { Lattice } from "@/components/brand/Lattice";
import { sectors } from "@/content/home";
import { consultationLabel, nav, site } from "@/content/site";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";
import { ScrollRise } from "./ScrollRise";

const linkClass = "inline-flex h-10 items-center text-[15px] text-beige/85 transition-colors hover:text-gold lg:text-base";

const contacts = [
  { label: "WhatsApp", value: "WhatsApp", href: site.whatsappHref, icon: <WhatsAppIcon className="size-5 lg:size-4" />, external: true },
  { label: "Call", value: site.phone, href: site.phoneHref, icon: <PhoneIcon className="size-5 lg:size-4" /> },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: <MailIcon className="size-5 lg:size-4" /> },
];

export function Footer() {
  return (
    <footer className="theme-pine relative overflow-hidden pt-16 pb-24 sm:pb-10 lg:pt-24">
      <Lattice className="opacity-[0.05]" size={96} />
      <div className="bg-foil absolute inset-x-0 top-0 h-px" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-6 lg:grid-cols-12 lg:gap-14 lg:px-10">
        <div className="col-span-2 text-center lg:col-span-4 lg:text-left">
          <Link href="/" aria-label="Opulent Living, home" className="inline-flex">
            <Logo stacked inverse />
          </Link>
          <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-ash lg:mx-0 lg:mt-8 lg:text-[15px]">
            Affordable luxury interiors, founded by {site.founder}.
            <br />
            {site.address}
          </p>
        </div>

        <div className="col-span-2 lg:col-span-3 lg:col-start-6">
          <p className="text-center text-xs font-medium tracking-brand text-gold uppercase lg:text-left">Visit or call</p>
          <ul className="mt-5 grid grid-cols-3 gap-2 lg:hidden">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex flex-col items-center gap-2 border border-graphite py-4 text-[10px] tracking-brand text-beige uppercase transition-colors hover:border-brass hover:text-gold"
                >
                  <span className="text-gold">{c.icon}</span>
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-5 hidden flex-col lg:flex">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`${linkClass} gap-3`}
                >
                  <span className="text-gold">{c.icon}</span>
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-graphite pt-8 lg:col-span-2 lg:border-0 lg:pt-0">
          <p className="text-xs font-medium tracking-brand text-gold uppercase">Services</p>
          <ul className="mt-3 flex flex-col lg:mt-5">
            {sectors.map((sector) => (
              <li key={sector.name}>
                <Link href={sector.href} className={linkClass}>
                  {sector.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer" className="border-t border-graphite pt-8 lg:col-span-2 lg:border-0 lg:pt-0">
          <p className="text-xs font-medium tracking-brand text-gold uppercase">Studio</p>
          <ul className="mt-3 flex flex-col lg:mt-5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="hidden lg:block">
              <Link href="/enquiry" className="inline-flex h-10 items-center text-gold hover:text-beige">
                {consultationLabel}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="col-span-2 lg:hidden">
          <Link
            href="/enquiry"
            className="inline-flex h-12 w-full items-center justify-center bg-brass text-xs font-medium tracking-brand text-ink uppercase"
          >
            {consultationLabel}
          </Link>
        </div>
      </div>
      <div className="relative mx-auto mt-12 max-w-7xl lg:mt-20 px-6 lg:px-10" aria-hidden="true">
        <ScrollRise>
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
        </ScrollRise>
      </div>
      <div className="relative mx-auto mt-8 flex max-w-7xl flex-wrap justify-center gap-x-4 gap-y-2 border-t text-center lg:justify-between lg:text-left border-graphite px-6 pt-6 text-xs text-ash lg:px-10">
        <p>
          © {new Date().getFullYear()} {site.legalName}. Dubai, United Arab Emirates.
        </p>
        <p>Design · Turnkey fit-out · Joinery</p>
      </div>
    </footer>
  );
}
