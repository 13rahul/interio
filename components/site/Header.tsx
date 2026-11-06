"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Lattice } from "@/components/brand/Lattice";
import { consultationLabel, nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

function isCurrent(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
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

  return (
    <header
      className={cn(
        "theme-linen fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color,box-shadow] duration-500",
        solid
          ? "border-graphite bg-ivory/90 shadow-[0_10px_30px_-20px_rgb(11_46_39/0.35)] backdrop-blur-md"
          : "border-transparent bg-transparent",
        hidden && !menuOpen && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
        <Link href="/" aria-label="Opulent Living, home" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const current = isCurrent(path, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "group relative inline-flex h-11 items-center text-xs font-medium tracking-brand uppercase transition-colors",
                  current ? "text-beige" : "text-ash hover:text-beige",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-2 h-px origin-left bg-brass transition-transform duration-500 ease-lux",
                    current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/enquiry" aria-current={path === "/enquiry" ? "page" : undefined}>
              {consultationLabel}
            </Link>
          </Button>
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger className="inline-flex h-11 items-center gap-3 px-3 text-xs font-medium tracking-brand text-beige uppercase lg:hidden">
              Menu
              <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
                <span className="h-px bg-current" />
                <span className="h-px w-3 bg-current" />
              </span>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-pine/70 backdrop-blur-sm" />
              <Dialog.Content className="theme-night fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col overflow-hidden px-6 py-6">
                <Lattice className="opacity-[0.08]" />
                <div className="relative flex items-center justify-between">
                  <Dialog.Title className="text-xs tracking-brand text-ash uppercase">Menu</Dialog.Title>
                  <Dialog.Close className="inline-flex h-11 items-center px-3 text-xs font-medium tracking-brand text-beige uppercase">
                    Close
                  </Dialog.Close>
                </div>
                <nav className="relative mt-10 flex flex-col" aria-label="Mobile">
                  {[{ href: "/", label: "Home" }, ...nav].map((item) => (
                    <Dialog.Close asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={path === item.href ? "page" : undefined}
                        className="flex min-h-16 items-center border-b border-graphite font-display text-4xl text-beige"
                      >
                        {item.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </nav>
                <Dialog.Close asChild>
                  <Link
                    href="/enquiry"
                    className="relative mt-10 inline-flex h-12 items-center justify-center bg-brass text-xs font-medium tracking-brand text-ink uppercase"
                  >
                    {consultationLabel}
                  </Link>
                </Dialog.Close>
                <div className="relative mt-auto flex flex-col gap-1 text-sm text-ash">
                  <a href={site.whatsappHref} className="inline-flex h-11 items-center hover:text-beige">
                    WhatsApp
                  </a>
                  <a href={site.phoneHref} className="inline-flex h-11 items-center hover:text-beige">
                    {site.phone}
                  </a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
