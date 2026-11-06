"use client";

import Link from "next/link";
import { useRef } from "react";
import { GateMark } from "@/components/brand/GateMark";
import { Lattice } from "@/components/brand/Lattice";
import { packages } from "@/content/home";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { gsap, media, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "./parts";

export function Packages() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: "(min-width: 1024px)", motion: media.motion }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        const cards = gsap.utils.toArray<HTMLElement>(".pk-card", ref.current);
        if (ctx.conditions.desktop) {
          gsap.from(cards, {
            xPercent: (i) => (i - 1) * -100,
            yPercent: (i) => (i === 1 ? 6 : 14),
            rotate: (i) => (i - 1) * 7,
            scale: (i) => (i === 1 ? 0.94 : 0.88),
            ease: "none",
            scrollTrigger: { trigger: ".pk-grid", start: "top 90%", end: "top 30%", scrub: 0.8 },
          });
        } else {
          cards.forEach((card) =>
            gsap.from(card, {
              y: 60,
              opacity: 0,
              rotate: 2,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            }),
          );
        }
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="theme-stone relative overflow-hidden py-24 lg:py-36" id="packages">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading align="center" eyebrow="Affordable luxury" title="Five-star rooms," accent="honest prices." className="max-w-3xl">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash">
            Every quote is fixed and itemised before work begins. Pick a starting point; we tailor it to your home.
          </p>
        </SectionHeading>

        <div className="pk-grid mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <div key={p.name} className={cn("pk-card h-full", p.featured && "relative z-10")}>
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden p-8 transition-transform duration-500 ease-lux hover:-translate-y-2 lg:p-10",
                  p.featured
                    ? "theme-night shadow-2xl shadow-pine/30 ring-1 ring-brass lg:-my-6 lg:py-16"
                    : "bg-ivory shadow-lg shadow-pine/5",
                )}
              >
                {p.featured ? (
                  <>
                    <Lattice className="opacity-[0.07]" />
                    <span className="bg-foil absolute top-0 right-8 px-3 py-2 text-[10px] font-medium tracking-brand text-ink uppercase">
                      Most chosen
                    </span>
                  </>
                ) : null}
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium tracking-brand text-gold uppercase">{p.name}</p>
                    <p lang="ar" dir="rtl" className="mt-1 w-fit font-arabic text-lg font-bold text-ash">
                      {p.arabic}
                    </p>
                  </div>
                  <GateMark
                    tone={p.featured ? "foil" : "gold"}
                    className="w-9 opacity-80 transition-transform duration-700 group-hover:-translate-y-1"
                    medallion={p.featured ? "var(--color-emerald)" : "var(--color-ivory)"}
                    monogram={p.featured ? "var(--color-ivory)" : "var(--color-emerald)"}
                  />
                </div>
                <p className="relative mt-8 font-display leading-none text-beige">
                  {p.price !== "Bespoke" ? <span className="mr-2 align-top text-sm text-ash">from</span> : null}
                  <span className={cn("text-6xl font-light", p.featured && "text-foil")}>{p.price}</span>
                </p>
                <p className="relative mt-2 text-xs tracking-brand text-ash uppercase">{p.unit}</p>
                <p className="relative mt-6 text-[15px] leading-relaxed text-ash">{p.line}</p>
                <ul className="relative mt-8 flex flex-col gap-3 border-t border-graphite pt-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] text-beige">
                      <svg viewBox="0 0 16 16" className="mt-1 size-3.5 shrink-0 text-brass" fill="none" aria-hidden="true">
                        <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-auto pt-10">
                  <Button asChild variant={p.featured ? "primary" : "dark"} className="w-full">
                    <Link href="/enquiry">Ask for a quote</Link>
                  </Button>
                </div>
              </article>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-xs text-ash">
          Indicative starting prices for design and fit-out. Final quotes depend on the size, finishes, and approvals.
        </p>
      </div>
    </section>
  );
}
