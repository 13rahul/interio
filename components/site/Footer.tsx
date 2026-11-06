import Link from "next/link";
import { nav, site } from "@/content/site";
import { sectors } from "@/content/home";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="theme-stone border-t border-graphite pt-20 pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <Link href="/" aria-label="Liwan, home" className="inline-flex">
            <Logo withPlace />
          </Link>
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-ash">{site.address}</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-brand text-ash uppercase">Contact</p>
          <ul className="mt-4 flex flex-col">
            <li>
              <a href={site.whatsappHref} className="inline-flex h-11 items-center text-beige hover:text-gold">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="inline-flex h-11 items-center text-beige hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex h-11 items-center text-beige hover:text-gold">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-brand text-ash uppercase">Sectors</p>
          <ul className="mt-4 flex flex-col">
            {sectors.map((sector) => (
              <li key={sector.name}>
                <Link href={sector.href} className="inline-flex h-11 items-center text-beige hover:text-gold">
                  {sector.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-medium tracking-brand text-ash uppercase">Studio</p>
          <ul className="mt-4 flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex h-11 items-center text-beige hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/enquiry" className="inline-flex h-11 items-center text-gold hover:text-beige">
                Book a consultation
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-20 max-w-7xl overflow-hidden px-6 lg:px-10" aria-hidden="true">
        <p className="font-display text-[min(20vw,18rem)] leading-[0.8] font-light tracking-[0.06em] text-graphite uppercase select-none">
          Liwan
        </p>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap justify-between gap-4 border-t border-graphite px-6 pt-6 text-xs text-ash lg:px-10">
        <p>© {new Date().getFullYear()} Liwan Interiors. Dubai.</p>
        <p>Interior architecture · Design · Turnkey fit-out</p>
      </div>
    </footer>
  );
}
