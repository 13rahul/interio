"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Ornament } from "@/components/brand/GateMark";
import { credentials, stats, welcome } from "@/content/home";
import { site } from "@/content/site";
import { gsap, media, SplitText, useGSAP } from "@/lib/gsap";
import { FadeUp, Reveal } from "../Reveal";
import { Arrow, CountUp, SectionHeading } from "./parts";

export function Welcome() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const split = SplitText.create(".wl-quote", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ".wl-quote", start: "top 85%", end: "bottom 45%", scrub: true },
          },
        );
        gsap.from(".wl-figure", {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".wl-figure", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="welcome" className="theme-linen relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="relative lg:col-span-6">
          <motion.div style={{ y: bigY }} className="relative mr-10 sm:mr-24">
            <Reveal className="arch-round relative aspect-[4/5]">
              <Image
                src={welcome.image.src}
                alt={welcome.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover object-[70%_center]"
              />
            </Reveal>
          </motion.div>
          <motion.div
            style={{ y: smallY }}
            className="absolute right-0 bottom-0 w-[46%] border-[6px] border-ivory shadow-2xl shadow-pine/25"
          >
            <div className="arch-ogee relative aspect-[3/4] bg-sand">
              <Image src={welcome.inset.src} alt={welcome.inset.alt} fill sizes="22vw" className="object-cover" />
            </div>
          </motion.div>
          <div
            className="absolute top-10 -left-6 hidden h-48 w-px bg-gradient-to-b from-transparent via-brass to-transparent lg:block"
            aria-hidden="true"
          />
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading eyebrow={welcome.eyebrow} arabic={welcome.arabic} title={welcome.title} accent={welcome.accent}>
            <p className="mt-6 text-base leading-relaxed text-ash sm:text-lg">{welcome.body}</p>
          </SectionHeading>

          <div>
            <figure className="wl-figure mt-10 border-l-2 border-brass bg-pearl py-6 pr-6 pl-7">
              <blockquote className="wl-quote font-display text-2xl leading-snug text-beige italic">
                “{welcome.founderNote}”
              </blockquote>
              <figcaption className="mt-4 text-xs font-medium tracking-brand text-gold uppercase">
                {site.founder} · <span className="text-ash">{welcome.founderRole}</span>
              </figcaption>
            </figure>
          </div>

          <FadeUp delay={0.15}>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3">
              {credentials.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-beige">
                  <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-brass" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-10 flex items-center gap-6">
            <Link
              href="/atelier"
              className="group inline-flex h-11 items-center gap-3 text-xs font-medium tracking-brand text-beige uppercase"
            >
              Meet the studio
              <span className="grid size-9 place-items-center rounded-full border border-brass text-gold transition-colors group-hover:bg-brass group-hover:text-ink">
                <Arrow />
              </span>
            </Link>
            <Ornament className="w-20 text-brass" />
          </FadeUp>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-10">
        <dl className="grid grid-cols-2 border-y border-graphite lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeUp
              key={s.label}
              delay={i * 0.08}
              className="border-graphite px-2 py-10 text-center odd:border-r lg:border-r lg:last:border-r-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <CountUp value={s.value} className="text-foil-deep block font-display text-6xl font-light lg:text-7xl" />
                <span className="mt-2 block text-xs tracking-brand text-ash uppercase" aria-hidden="true">
                  {s.label}
                </span>
              </dd>
            </FadeUp>
          ))}
        </dl>
      </div>
    </section>
  );
}
