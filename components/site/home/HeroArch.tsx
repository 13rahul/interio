"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GateMark } from "@/components/brand/GateMark";
import { Lattice } from "@/components/brand/Lattice";
import { hero, packages, stats } from "@/content/home";
import { consultationLabel } from "@/content/site";
import { INTRO_SECONDS, introPlays } from "@/lib/intro";
import { Button } from "@/components/ui/button";
import { CountUp } from "./parts";

const ease = [0.22, 1, 0.36, 1] as const;
const ARCH = "M0 100V40C0 26 17 22 32 16.5 43 12.6 48 7.3 50 0 52 7.3 57 12.6 68 16.5 83 22 100 26 100 40V100";

function Line({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function ConsultBadge({ delay }: { delay: number }) {
  const text = "Free consultation ✦ Book your visit ✦ ";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease, delay }}
      className="absolute -top-4 right-0 z-10 hidden sm:block lg:-right-6"
    >
      <Link
        href="/enquiry"
        aria-label={consultationLabel}
        className="group relative grid size-32 place-items-center rounded-full bg-emerald text-champagne shadow-xl shadow-pine/30 transition-transform duration-500 hover:scale-105"
      >
        <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0" aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
          </defs>
          <text fontSize="9.2" letterSpacing="2.6" fill="currentColor" style={{ fontFamily: "var(--font-jost)" }}>
            <textPath href="#badge-circle">{text.toUpperCase()}</textPath>
          </text>
        </svg>
        <GateMark className="w-9" medallion="var(--color-emerald)" monogram="var(--color-ivory)" />
      </Link>
    </motion.div>
  );
}

export function HeroArch() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const d = introPlays() ? INTRO_SECONDS - 0.5 : 0;
  const signature = packages.find((p) => p.featured);

  return (
    <section ref={ref} className="theme-linen relative overflow-hidden pt-28 pb-16 lg:min-h-svh lg:pt-32 lg:pb-20">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]" aria-hidden="true">
        <Lattice className="opacity-[0.09] [mask-image:linear-gradient(to_left,black,transparent)]" />
      </div>
      <div
        className="absolute -top-40 -left-40 size-[38rem] rounded-full bg-champagne/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <motion.div className="lg:col-span-6" style={{ y: textY }}>
          <motion.p
            className="flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-gold uppercase sm:text-xs sm:tracking-brand"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: d + 0.1 }}
          >
            <span className="h-px w-10 bg-brass" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>
          <h1 className="mt-6 font-display font-light text-beige">
            <Line delay={d + 0.2} className="text-6xl leading-[0.9] sm:text-7xl xl:text-[7.5rem]">
              {hero.lead}
            </Line>
            <Line delay={d + 0.35} className="text-foil-deep animate-sheen text-6xl leading-[0.95] italic sm:text-7xl xl:text-[7.5rem]">
              {hero.rest}
            </Line>
          </h1>
          <motion.p
            lang="ar"
            dir="rtl"
            className="text-foil-deep mt-4 w-fit font-ruqaa text-3xl leading-[1.6] sm:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: d + 0.6 }}
          >
            {hero.arabic}
          </motion.p>
          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-ash sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: d + 0.75 }}
          >
            {hero.sub}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: d + 0.9 }}
          >
            <Button asChild>
              <Link href="/enquiry">{consultationLabel}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/residences">View our projects</Link>
            </Button>
          </motion.div>
          <motion.dl
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-graphite pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: d + 1.1 }}
          >
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <CountUp value={s.value} className="block font-display text-4xl text-beige" />
                  <span className="mt-1 block text-xs leading-snug text-ash" aria-hidden="true">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:col-span-6 lg:max-w-none lg:pl-8">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem]">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] overflow-visible text-brass"
              aria-hidden="true"
            >
              <motion.path
                d={ARCH}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: d + 0.3 }}
              />
            </svg>
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: d + 0.15 }}
            >
              <div className="arch-ogee absolute inset-0 overflow-hidden bg-sand">
                <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
                  <Image
                    src={hero.image.src}
                    alt={hero.image.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover object-[60%_center]"
                  />
                </motion.div>
              </div>
            </motion.div>
            <ConsultBadge delay={d + 1.3} />
            {signature ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: d + 1.5 }}
                className="absolute -bottom-6 -left-2 z-10 sm:-left-10"
              >
                <div className="animate-float flex items-center gap-4 bg-ivory/95 py-4 pr-6 pl-4 shadow-2xl shadow-pine/20 backdrop-blur">
                  <span className="grid size-12 place-items-center bg-emerald">
                    <GateMark className="w-6" medallion="var(--color-emerald)" monogram="var(--color-ivory)" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-medium tracking-brand text-gold uppercase">
                      {signature.name} package
                    </span>
                    <span className="mt-1 block font-display text-2xl leading-none text-beige">
                      from {signature.price}
                      <span className="ml-1 font-sans text-xs text-ash">{signature.unit}</span>
                    </span>
                  </span>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>

      <motion.a
        href="#welcome"
        className="absolute right-6 bottom-8 hidden flex-col items-center gap-2 text-[10px] font-medium tracking-brand text-ash uppercase [writing-mode:vertical-rl] lg:flex xl:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 1.8 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-graphite" aria-hidden="true">
          <span className="animate-cue absolute inset-x-0 top-0 h-1/2 bg-brass" />
        </span>
      </motion.a>
    </section>
  );
}
