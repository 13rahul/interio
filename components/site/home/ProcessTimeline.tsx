"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { process } from "@/content/home";
import { FadeUp } from "../Reveal";

export function ProcessTimeline() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });

  return (
    <section ref={ref} className="border-b border-graphite py-24 lg:py-32" id="process">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeUp className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-brand text-ash uppercase">How we work</p>
            <h2 className="mt-4 font-display text-5xl leading-none font-light text-beige lg:text-7xl">
              Brief to <em>keys</em>.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ash">
            Five stages, one team, and a single person to call from the first visit to the handover.
          </p>
        </FadeUp>

        <div className="relative mt-16">
          <div className="absolute top-[7px] right-0 left-0 hidden h-px bg-graphite lg:block" aria-hidden="true">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-aqua" />
          </div>
          <ol className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {process.map((step, i) => (
              <li
                key={step.number}
                className="border-l border-graphite pl-6 last:sm:col-span-2 lg:border-l-0 lg:pl-0 last:lg:col-span-1"
              >
                <FadeUp delay={i * 0.08} className="flex flex-col">
                  <span className="hidden size-[15px] rounded-full border border-brass bg-charcoal lg:block" aria-hidden="true" />
                  <span className="text-xs font-medium tracking-brand text-gold uppercase lg:mt-8">
                    {step.number} · {step.time}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-light text-beige">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ash">{step.body}</p>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
