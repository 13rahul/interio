"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { consultationLabel, nav, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

function isCurrent(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const path = usePathname();
  const overHero = path === "/";
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(!overHero);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const heroEnd = overHero ? document.getElementById("after-story") : null;
    const onScroll = () => {
      const y = window.scrollY;
      const limit = heroEnd ? heroEnd.offsetTop - 80 : window.innerHeight * 0.85;
      setSolid(!overHero || y > limit);
      if (!menuOpen) {
        if (y > last + 8 && y > 160) setHidden(true);
        if (y < last - 8 || y < 80) setHidden(false);
      }
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen, overHero]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[transform,background-color,border-color] duration-500",
        solid ? "theme-linen border-graphite" : "theme-night border-transparent bg-transparent",
        hidden && !menuOpen && "-translate-y-full",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
        <Link href="/" aria-label="Liwan, home" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent(path, item.href) ? "page" : undefined}
              className={cn(
                "inline-flex h-11 items-center text-xs font-medium tracking-brand uppercase",
                isCurrent(path, item.href) ? "text-beige" : "text-ash hover:text-beige",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant={solid ? "primary" : "outline"} className="hidden sm:inline-flex">
            <Link href="/enquiry" aria-current={path === "/enquiry" ? "page" : undefined}>
              {consultationLabel}
            </Link>
          </Button>
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger className="inline-flex h-11 items-center px-3 text-xs font-medium tracking-brand text-beige uppercase lg:hidden">
              Menu
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-charcoal/80" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-charcoal px-6 py-6">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-xs tracking-brand text-ash uppercase">Menu</Dialog.Title>
                  <Dialog.Close className="inline-flex h-11 items-center px-3 text-xs font-medium tracking-brand text-beige uppercase">
                    Close
                  </Dialog.Close>
                </div>
                <nav className="mt-10 flex flex-col" aria-label="Mobile">
                  {nav.map((item) => (
                    <Dialog.Close asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isCurrent(path, item.href) ? "page" : undefined}
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
                    className="mt-10 inline-flex h-11 items-center justify-center bg-brass text-xs font-medium tracking-brand text-ink uppercase"
                  >
                    {consultationLabel}
                  </Link>
                </Dialog.Close>
                <div className="mt-auto flex flex-col gap-1 text-sm text-ash">
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
