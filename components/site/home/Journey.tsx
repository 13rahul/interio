"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { process, transformation } from "@/content/home";
import { SectionHeading } from "./parts";

function Step({
  step,
  index,
  progress,
}: {
  step: (typeof process)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const at = (index + 0.5) / process.length;
  const lit = useTransform(progress, [at - 0.08, at], [0, 1]);
  const bg = useTransform(lit, [0, 1], ["#fbf7f0", "#c9a23f"]);

  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] gap-6 pb-14 last:pb-0 sm:grid-cols-[3rem_1fr]">
      <motion.span
        className="relative z-10 mt-2 size-4 rotate-45 justify-self-center border border-brass"
        style={{ backgroundColor: bg }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-medium tracking-brand text-gold uppercase">
          {step.number} · {step.time}
        </p>
        <h3 className="mt-2 font-display text-3xl text-beige">{step.title}</h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ash">{step.body}</p>
      </motion.div>
    </li>
  );
}

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="theme-linen py-24 lg:py-36" id="process">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="Brief to keys" title="One journey," accent="one team.">
              <p className="mt-6 text-base leading-relaxed text-ash">
                The designer who sketches your first plan walks the site at handover. You always know who to call.
              </p>
            </SectionHeading>
            <div className="arch-round relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden lg:block">
              <Image
                src={transformation.after.src}
                alt={transformation.after.alt}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <ol ref={ref} className="relative lg:col-span-6 lg:col-start-7 lg:pt-6">
          <span className="absolute top-3 bottom-3 left-5 w-px bg-graphite sm:left-6" aria-hidden="true" />
          <motion.span
            className="bg-foil absolute top-3 bottom-3 left-5 w-px origin-top sm:left-6"
            style={{ scaleY: progress }}
            aria-hidden="true"
          />
          {process.map((step, i) => (
            <Step key={step.number} step={step} index={i} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  );
}
