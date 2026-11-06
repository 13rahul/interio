"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GateMark } from "@/components/brand/GateMark";
import { Lattice } from "@/components/brand/Lattice";
import { consultationLabel, nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { Logo } from "./Logo";

function isCurrent(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}

const ease = [0.22, 1, 0.36, 1] as const;

function UtilityBar({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "theme-night relative hidden overflow-hidden transition-[height] duration-500 ease-lux lg:block",
        collapsed ? "h-0" : "h-9",
      )}
    >
      <Lattice className="opacity-[0.07]" size={36} />
      <div className="relative mx-auto flex h-9 max-w-7xl items-center justify-between px-10 text-[11px] tracking-[0.18em] text-ash uppercase">
        <p className="flex items-center gap-3">
          <span className="bg-foil size-1.5 rotate-45" aria-hidden="true" />
          Affordable luxury interiors · {site.place}
          <span lang="ar" dir="rtl" className="font-arabic text-[13px] font-bold tracking-normal text-gold normal-case">
            أهلاً وسهلاً
          </span>
        </p>
        <div className="flex items-center gap-6">
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-gold">
            <WhatsAppIcon className="size-3.5" />
            WhatsApp
          </a>
          <a href={site.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold">
            <PhoneIcon className="size-3.5" />
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 normal-case tracking-wider transition-colors hover:text-gold">
            <MailIcon className="size-3.5" />
            {site.email}
          </a>
        </div>
      </div>
    </div>
  );
}

function MenuButton({ open }: { open: boolean }) {
  return (
    <span className="relative grid size-11 place-items-center rounded-full border border-brass/60 text-beige transition-colors group-hover:bg-brass group-hover:text-ink">
      <span className="relative block h-3 w-5" aria-hidden="true">
        <span
          className={cn(
            "absolute top-0 right-0 h-px bg-current transition-all duration-500 ease-lux",
            open ? "top-1.5 w-5 rotate-45" : "w-5",
          )}
        />
        <span
          className={cn(
            "absolute right-0 bottom-0 h-px bg-current transition-all duration-500 ease-lux",
            open ? "bottom-1.5 w-5 -rotate-45" : "w-3 group-hover:w-5",
          )}
        />
      </span>
    </span>
  );
}

export function Header() {
  const path = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      if (!menuOpen) {
        if (y > last + 8 && y > 240) setHidden(true);
        if (y < last - 8 || y < 120) setHidden(false);
      }
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const links = [{ href: "/", label: "Home" }, ...nav];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-lux",
        hidden && !menuOpen && "-translate-y-full",
      )}
    >
      <UtilityBar collapsed={solid} />
      <div
        className={cn(
          "theme-linen relative transition-[background-color,box-shadow] duration-500",
          solid ? "bg-ivory/85 shadow-[0_12px_32px_-22px_rgb(11_46_39/0.45)] backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-[height] duration-500 ease-lux sm:px-6 lg:px-10",
            solid ? "h-16 lg:h-[4.5rem]" : "h-16 lg:h-24",
          )}
        >
          <Link href="/" aria-label="Opulent Living, home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item, i) => {
              const current = isCurrent(path, item.href);
              return (
                <span key={item.href} className="flex items-center">
                  {i > 0 ? <span className="size-1 rotate-45 bg-brass/50" aria-hidden="true" /> : null}
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex h-11 items-center px-5 text-xs font-medium tracking-brand uppercase transition-colors",
                      current ? "text-beige" : "text-ash hover:text-beige",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-5 bottom-1.5 flex items-center justify-center transition-[opacity,transform] duration-500 ease-lux",
                        current ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
                      )}
                      aria-hidden="true"
                    >
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brass" />
                      <span className="mx-1 size-1.5 rotate-45 bg-brass" />
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brass" />
                    </span>
                  </Link>
                </span>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="grid size-11 place-items-center rounded-full border border-brass/60 text-emerald transition-colors hover:bg-brass hover:text-ink lg:hidden"
            >
              <WhatsAppIcon className="size-[18px]" />
            </a>
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/enquiry" aria-current={path === "/enquiry" ? "page" : undefined}>
                {consultationLabel}
              </Link>
            </Button>
            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger aria-label="Open menu" className="group inline-flex items-center gap-3 text-xs font-medium tracking-brand text-beige uppercase lg:hidden">
                <span className="hidden sm:inline">Menu</span>
                <MenuButton open={menuOpen} />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-pine/70 backdrop-blur-sm" />
                <Dialog.Content className="theme-night fixed inset-0 z-50 flex flex-col overflow-x-hidden overflow-y-auto px-6 pt-5 pb-8 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-full sm:max-w-md">
                  <Lattice className="opacity-[0.08]" />
                  <GateMark
                    tone="gold"
                    className="pointer-events-none absolute -right-16 -bottom-10 w-72 opacity-[0.12]"
                    medallion="var(--color-emerald)"
                  />
                  <div className="relative flex items-center justify-between">
                    <Logo inverse />
                    <Dialog.Close className="group rounded-full" aria-label="Close menu">
                      <MenuButton open />
                    </Dialog.Close>
                  </div>
                  <Dialog.Title className="sr-only">Menu</Dialog.Title>

                  <motion.p
                    lang="ar"
                    dir="rtl"
                    className="text-foil relative mt-10 w-fit font-ruqaa text-3xl leading-[1.6]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    أهلاً وسهلاً
                  </motion.p>

                  <nav className="relative mt-4 flex flex-col" aria-label="Mobile">
                    {links.map((item, i) => {
                      const current = item.href === "/" ? path === "/" : isCurrent(path, item.href);
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease }}
                        >
                          <Dialog.Close asChild>
                            <Link
                              href={item.href}
                              aria-current={current ? "page" : undefined}
                              className="group flex min-h-16 items-center gap-5 border-b border-graphite"
                            >
                              <span className="w-6 font-display text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                              <span
                                className={cn(
                                  "flex-1 font-display text-4xl font-light transition-transform duration-500 ease-lux group-hover:translate-x-2",
                                  current ? "text-foil italic" : "text-beige",
                                )}
                              >
                                {item.label}
                              </span>
                              <span className="text-gold opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                                →
                              </span>
                            </Link>
                          </Dialog.Close>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <motion.div
                    className="relative mt-8"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45, ease }}
                  >
                    <Dialog.Close asChild>
                      <Link
                        href="/enquiry"
                        className="inline-flex h-12 w-full items-center justify-center bg-brass text-xs font-medium tracking-brand text-ink uppercase"
                      >
                        {consultationLabel}
                      </Link>
                    </Dialog.Close>
                  </motion.div>

                  <div className="relative mt-auto grid grid-cols-3 gap-2 pt-10 text-[10px] tracking-brand text-ash uppercase">
                    {[
                      { href: site.whatsappHref, label: "WhatsApp", icon: <WhatsAppIcon className="size-5" />, external: true },
                      { href: site.phoneHref, label: "Call", icon: <PhoneIcon className="size-5" /> },
                      { href: `mailto:${site.email}`, label: "Email", icon: <MailIcon className="size-5" /> },
                    ].map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex flex-col items-center gap-2 border border-graphite py-4 text-beige transition-colors hover:border-brass hover:text-gold"
                      >
                        <span className="text-gold">{c.icon}</span>
                        {c.label}
                      </a>
                    ))}
                  </div>
                  <p className="relative mt-5 text-center text-xs text-ash">{site.address}</p>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
        <div
          className={cn("bg-foil absolute inset-x-0 bottom-0 h-px transition-opacity duration-500", solid ? "opacity-70" : "opacity-0")}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
