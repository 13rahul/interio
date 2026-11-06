"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lattice } from "@/components/brand/Lattice";
import { testimonial, testimonials } from "@/content/home";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./parts";

export function Voices() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = usePrefersReducedMotion();
  const t = testimonials[i];

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => window.clearInterval(id);
  }, [paused, reduce]);

  return (
    <section
      className="theme-pine relative overflow-hidden py-24 lg:py-36"
      aria-roledescription="carousel"
      aria-label="What clients say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Lattice className="opacity-[0.05]" size={96} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="relative mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none">
          <div className="arch-ogee relative aspect-[4/5] bg-emerald">
            <Image src={testimonial.image.src} alt={testimonial.image.alt} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
          </div>
          <span
            className="text-foil absolute -top-10 -right-4 font-display text-[10rem] leading-none select-none"
            aria-hidden="true"
          >
            “
          </span>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <SectionHeading eyebrow="Client voices" title="Said over" accent="gahwa." />
          <div className="relative mt-10 min-h-[17rem] sm:min-h-[14rem]" aria-live={paused ? "polite" : "off"}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="font-display text-2xl leading-snug font-light text-beige sm:text-3xl lg:text-4xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-brass" aria-hidden="true" />
                  <span className="text-sm text-beige">{t.name}</span>
                  <span className="text-xs tracking-brand text-ash uppercase">{t.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center gap-3">
            {testimonials.map((item, n) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Show quote ${n + 1} of ${testimonials.length}`}
                aria-current={n === i ? "true" : undefined}
                className="group grid h-11 place-items-center px-1"
              >
                <span
                  className={cn(
                    "block h-px transition-all duration-500",
                    n === i ? "w-14 bg-brass" : "w-6 bg-graphite group-hover:bg-ash",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
