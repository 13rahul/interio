"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { materials } from "@/content/home";
import { cn } from "@/lib/utils";
import { FadeUp } from "../Reveal";
import { SectionHeading } from "./parts";

export function Materials() {
  const [active, setActive] = useState(0);
  const id = useId();
  const m = materials[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + materials.length) % materials.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section className="theme-sand py-24 lg:py-36" id="materials">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="The material library" title="Rich to the touch," accent="kind to the budget.">
            <p className="mt-6 text-base leading-relaxed text-ash">
              Four materials carry every Opulent Living room. Choose them in our studio, hold them in your hand, and
              see exactly what they cost.
            </p>
          </SectionHeading>

          <FadeUp delay={0.1}>
            <div role="tablist" aria-orientation="vertical" aria-label="Materials" className="mt-10 flex flex-col" onKeyDown={onKey}>
              {materials.map((item, i) => (
                <button
                  key={item.name}
                  id={`${id}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  aria-controls={`${id}-panel`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex items-center gap-5 border-t border-graphite py-4 text-left transition-colors last:border-b",
                    active === i ? "text-beige" : "text-ash hover:text-beige",
                  )}
                >
                  <span
                    className={cn(
                      "relative size-14 shrink-0 overflow-hidden rounded-full ring-offset-2 ring-offset-pearl transition-[box-shadow]",
                      active === i ? "ring-2 ring-brass" : "ring-1 ring-graphite",
                    )}
                  >
                    <Image src={item.image.src} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-2xl">{item.name}</span>
                    <span className="mt-0.5 block text-sm text-ash">{item.note}</span>
                  </span>
                  <span
                    className={cn("h-px bg-brass transition-all duration-500", active === i ? "w-10" : "w-0")}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${active}`}
            className="relative aspect-square overflow-hidden bg-sand"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={m.name}
                className="absolute inset-0"
                initial={{ clipPath: "circle(0% at 50% 50%)" }}
                animate={{ clipPath: "circle(75% at 50% 50%)" }}
                exit={{ opacity: 1, transition: { duration: 1.1 } }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.3, rotate: -4 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-pine/80 to-transparent p-6 pt-20">
              {m.callouts.map((c, i) => (
                <motion.span
                  key={`${m.name}-${c}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="rounded-full border border-ivory/40 bg-pine/50 px-4 py-2 text-xs text-ivory backdrop-blur-sm"
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
