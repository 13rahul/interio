"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lattice } from "@/components/brand/Lattice";
import { sectors } from "@/content/home";
import { cn } from "@/lib/utils";
import { FadeUp } from "../Reveal";
import { Arrow, SectionHeading } from "./parts";

export function Services() {
  const [active, setActive] = useState(0);
  const current = sectors[active];

  return (
    <section className="theme-night relative overflow-hidden py-24 lg:py-36" id="services">
      <Lattice className="opacity-[0.06]" size={80} />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="What we design" title="Five ways to live" accent="grandly." />
          <FadeUp>
            <p className="max-w-sm text-base leading-relaxed text-ash">
              One studio for the whole journey: design, approvals, joinery, and the site, at a price fixed before we
              begin.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7">
            {sectors.map((s, i) => (
              <motion.li
                key={s.slug}
                className="border-t border-graphite last:border-b"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              >
                  <Link
                    href={s.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-7 sm:grid-cols-[4rem_1fr_auto]"
                  >
                    <span
                      className={cn(
                        "font-display text-xl transition-colors",
                        active === i ? "text-gold" : "text-ash",
                      )}
                    >
                      {s.number}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-display text-3xl font-light transition-[color,transform] duration-500 ease-lux sm:text-5xl",
                          active === i ? "translate-x-2 text-beige" : "text-beige/70 group-hover:text-beige",
                        )}
                      >
                        {s.name}
                      </span>
                      <span className="mt-2 block text-sm text-ash">{s.line}</span>
                    </span>
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-full border transition-all duration-500",
                        active === i
                          ? "rotate-0 border-brass bg-brass text-ink"
                          : "-rotate-45 border-graphite text-beige group-hover:border-brass",
                      )}
                    >
                      <Arrow />
                    </span>
                  </Link>
                  <div className="relative mb-7 aspect-[16/10] overflow-hidden lg:hidden">
                    <Image src={s.image.src} alt={s.image.alt} fill sizes="90vw" className="object-cover" />
                  </div>
              </motion.li>
            ))}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="arch-ogee relative aspect-[3/4] overflow-hidden bg-pine">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={current.image.src} alt={current.image.alt} fill sizes="36vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="scrim-bottom absolute inset-0" aria-hidden="true" />
                <div className="absolute inset-x-8 bottom-8">
                  <p className="text-[10px] font-medium tracking-brand text-champagne uppercase">Scope</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {current.scope.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ivory/30 bg-pine/40 px-3 py-1.5 text-xs text-ivory backdrop-blur-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
