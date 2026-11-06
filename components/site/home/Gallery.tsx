"use client";

import Image from "next/image";
import { useRef } from "react";
import { gallery } from "@/content/home";
import { gsap, media, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { FadeUp } from "../Reveal";
import { SectionHeading } from "./parts";

function Row({ items, className, hidden }: { items: readonly (typeof gallery)[number][]; className?: string; hidden?: boolean }) {
  return (
    <ul className={cn("flex w-max gap-3 sm:gap-4", className)} aria-hidden={hidden || undefined}>
      {items.map((g, i) => (
        <li key={`${g.src}-${i}`} className="w-[44vw] shrink-0 sm:w-[30vw] lg:w-[19vw]">
          <div className="group relative aspect-[3/4] overflow-hidden bg-sand">
            <Image
              src={g.src}
              alt={hidden || i >= gallery.length ? "" : g.alt}
              fill
              sizes="(min-width: 1024px) 19vw, (min-width: 640px) 30vw, 44vw"
              className="object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-emerald/0 transition-colors duration-500 group-hover:bg-emerald/40" aria-hidden="true" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const doubled = [...gallery, ...gallery];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const scrollTrigger = { trigger: ".gl-rows", start: "top bottom", end: "bottom top", scrub: 0.8 };
        gsap.fromTo(".gl-a", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger });
        gsap.fromTo(".gl-b", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="theme-linen overflow-hidden py-24 lg:py-32" aria-label="Inspiration gallery">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Your home is your majlis" arabic="بيتك مجلسك" title="A little" accent="inspiration." />
          <FadeUp>
            <p className="text-sm text-ash">Follow the studio on Instagram</p>
            <p className="font-display text-2xl text-beige">@opulentliving.ae</p>
          </FadeUp>
        </div>
      </div>
      <div className="gl-rows mt-14 flex flex-col gap-3 sm:gap-4">
        <Row items={doubled} className="gl-a pl-6 lg:pl-10" />
        <Row items={[...doubled].reverse()} hidden className="gl-b hidden pl-6 sm:flex lg:pl-10" />
      </div>
    </section>
  );
}
