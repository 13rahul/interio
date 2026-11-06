"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

export function WhatsAppButton() {
  const path = usePathname();
  const onHome = path === "/";
  const [visible, setVisible] = useState(!onHome);

  useEffect(() => {
    if (!onHome) {
      setVisible(true);
      return;
    }
    // Hidden over the hero, which already has its own consultation calls to action.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  if (path === "/enquiry") return null;

  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Opulent Living on WhatsApp"
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={cn(
        "fixed right-5 bottom-5 z-30 grid size-14 place-items-center rounded-full bg-brass text-ink shadow-lg shadow-black/20 transition-[opacity,transform] duration-500 hover:bg-brass-light",
        visible ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <WhatsAppIcon />
    </a>
  );
}
