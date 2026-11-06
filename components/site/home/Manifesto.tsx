"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { manifesto } from "@/content/home";
import { usePrefersReducedMotion } from "@/lib/motion";

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block pr-[0.25em] text-beige">
      {word}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const words = manifesto.split(" ");

  return (
    <section ref={ref} className="theme-sand border-b border-graphite py-28 lg:py-40" id="manifesto">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-xs font-medium tracking-brand text-ash uppercase">The studio</p>
        <p className="mt-10 max-w-6xl font-display text-4xl leading-[1.12] font-light sm:text-5xl lg:text-7xl">
          {reduce ? (
            <span className="text-beige">{manifesto}</span>
          ) : (
            <>
              <span className="sr-only">{manifesto}</span>
              <span aria-hidden="true">
                {words.map((word, i) => (
                  <Word key={`${word}-${i}`} word={word} index={i} total={words.length} progress={scrollYProgress} />
                ))}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
