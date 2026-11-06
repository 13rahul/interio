"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { materials } from "@/content/home";
import { usePrefersReducedMotion } from "@/lib/motion";

const calloutPositions = [
  "lg:top-[14%] lg:left-0",
  "lg:top-[46%] lg:right-0",
  "lg:bottom-[12%] lg:left-[6%]",
];

export function MaterialHotspots() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduce = usePrefersReducedMotion();
  const material = materials[active] ?? materials[0];

  function move(next: number) {
    const index = (next + materials.length) % materials.length;
    setActive(index);
    tabs.current[index]?.focus();
  }

  return (
    <section className="theme-night border-b border-graphite py-24 lg:py-32" id="materials">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <p className="text-xs font-medium tracking-brand text-ash uppercase">Material library</p>
          <h2 className="mt-4 font-display text-5xl leading-none font-light text-beige lg:text-6xl">
            Four materials, <em>held</em> before chosen.
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ash">
            Every project starts with samples on the studio table. These four return to most of our rooms.
          </p>
          <div
            role="tablist"
            aria-label="Materials"
            className="mt-10 flex flex-col"
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                move(active + 1);
              }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                move(active - 1);
              }
            }}
          >
            {materials.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.name}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`material-tab-${index}`}
                  aria-selected={selected}
                  aria-controls="material-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className="flex min-h-14 items-center justify-between gap-4 border-b border-graphite text-left"
                >
                  <span
                    className={
                      selected
                        ? "font-display text-3xl font-light text-beige"
                        : "font-display text-3xl font-light text-ash hover:text-beige"
                    }
                  >
                    {item.name}
                  </span>
                  <span
                    className={selected ? "h-px w-10 bg-aqua" : "h-px w-4 bg-graphite"}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id="material-panel"
          aria-labelledby={`material-tab-${active}`}
          className="relative lg:col-span-7 lg:col-start-6"
        >
          <div className="relative mx-auto aspect-square w-full max-w-xl bg-charcoal">
            <AnimatePresence mode="wait">
              <motion.div
                key={material.name}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={material.image.src}
                  alt={material.image.alt}
                  fill
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <ul className="mt-6 flex flex-wrap gap-3 lg:mt-0" aria-label={`${material.name} details`}>
            {material.callouts.map((callout, i) => (
              <li
                key={callout}
                className={`flex items-center gap-3 rounded-full border border-beige/25 bg-charcoal/80 py-1.5 pr-1.5 pl-4 lg:absolute ${calloutPositions[i] ?? ""}`}
              >
                <span className="text-xs font-medium tracking-brand text-beige uppercase">{callout}</span>
                <span className="grid size-8 place-items-center rounded-full border border-gold text-gold" aria-hidden="true">
                  <span className="size-1.5 rounded-full bg-aqua" />
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center font-display text-2xl font-light text-beige italic">{material.note}</p>
        </div>
      </div>
    </section>
  );
}
