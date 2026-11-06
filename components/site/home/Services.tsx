"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lattice } from "@/components/brand/Lattice";
import { sectors } from "@/content/home";
import { gsap, media, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { FadeUp } from "../Reveal";
import { Arrow, SectionHeading } from "./parts";

const n = sectors.length;
const PIN = "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";

/**
 * Desktop: the section pins and the scroll walks through the five services. Each one wipes up inside the
 * arch, a gold line fills under its row, the counter rolls, and its name drifts past in outline behind.
 * Mobile: the rows become cards that stack on top of each other as you scroll.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const current = sectors[active];
  const ref = useRef<HTMLElement>(null);
  const pinned = useRef(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(el);

      mm.add(PIN, () => {
        pinned.current = true;
        const imgs = q(".sv-img");
        const inners = q(".sv-img-inner");
        gsap.set(imgs, { opacity: 1, clipPath: (i) => (i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)") });

        let shown = 0;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${window.innerHeight * 0.75 * n}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            const i = gsap.utils.clamp(0, n - 1, Math.floor(tl.time()));
            if (i !== shown) {
              shown = i;
              setActive(i);
            }
          },
        });

        q(".sv-bar").forEach((bar, i) => tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1 }, i));
        for (let i = 1; i < n; i++) {
          const at = i - 0.3;
          tl.to(imgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.inOut" }, at)
            .fromTo(inners[i], { scale: 1.35, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 0.6, ease: "power2.out" }, at)
            .to(inners[i - 1], { scale: 1.12, yPercent: -10, duration: 0.6, ease: "power2.in" }, at)
            .to(q(".sv-odo"), { yPercent: (-100 / n) * i, duration: 0.5, ease: "power3.inOut" }, at + 0.05)
            .to(q(".sv-ghost"), { xPercent: (-100 / n) * i, duration: 0.6, ease: "power2.inOut" }, at);
        }
        tl.to({}, { duration: 0.01 }, n);

        return () => {
          pinned.current = false;
        };
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = q(".sv-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
          });
        });
      });

      mm.add(media.motion, () => {
        gsap.from(q(".sv-row"), {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: q("ul")[0], start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  useEffect(() => {
    if (pinned.current || !ref.current) return;
    gsap.to(ref.current.querySelectorAll(".sv-odo"), { yPercent: (-100 / n) * active, duration: 0.6, ease: "power3.inOut" });
    gsap.to(ref.current.querySelectorAll(".sv-ghost"), { xPercent: (-100 / n) * active, duration: 0.8, ease: "power2.inOut" });
  }, [active]);

  const hover = (i: number) => {
    if (!pinned.current) setActive(i);
  };

  return (
    <section
      ref={ref}
      className="theme-night relative overflow-clip py-24 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-12"
      id="services"
    >
      <Lattice className="opacity-[0.06]" size={80} />

      <div className="pointer-events-none absolute inset-x-0 bottom-[-3vw] hidden overflow-hidden lg:block" aria-hidden="true">
        <div className="sv-ghost flex" style={{ width: `${n * 100}%` }}>
          {sectors.map((s) => (
            <span
              key={s.slug}
              className="shrink-0 px-10 font-display text-[13vw] leading-none font-light whitespace-nowrap text-transparent italic [-webkit-text-stroke:1px_rgb(232_203_122/0.16)]"
              style={{ width: `${100 / n}%` }}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="What we design" title="Five ways to live" accent="grandly." />
          <FadeUp>
            <p className="max-w-sm text-base leading-relaxed text-ash">
              One studio for the whole journey: design, approvals, joinery, and the site, at a price fixed before we
              begin.
            </p>
          </FadeUp>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-[min(6vh,4rem)] lg:grid-cols-12 lg:items-center">
          <ul className="lg:col-span-7">
            {sectors.map((s, i) => (
              <li
                key={s.slug}
                className="sv-row max-lg:sticky"
                style={{ top: `calc(5.5rem + ${i * 0.85}rem)` }}
              >
                <div className="sv-card relative origin-top border-t border-graphite bg-charcoal lg:bg-transparent lg:[li:last-child_&]:border-b">
                  <span className="sv-bar bg-foil absolute -top-px left-0 hidden h-px w-full origin-left scale-x-0 lg:block" aria-hidden="true" />
                  <Link
                    href={s.href}
                    onMouseEnter={() => hover(i)}
                    onFocus={() => hover(i)}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[4rem_1fr_auto] lg:py-[min(2.2vh,1.5rem)]"
                  >
                    <span className={cn("font-display text-xl transition-colors duration-500", active === i ? "text-gold" : "text-ash")}>
                      {s.number}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-display text-3xl font-light transition-[color,transform] duration-500 ease-lux sm:text-5xl lg:text-[clamp(2.25rem,5.4vh,3rem)]",
                          active === i ? "lg:translate-x-3 text-beige" : "text-beige lg:text-beige/45 lg:group-hover:text-beige",
                        )}
                      >
                        {s.name}
                      </span>
                      <span className="mt-1.5 block text-sm text-ash">{s.line}</span>
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
                  <div className="arch-round relative mb-6 aspect-[16/11] overflow-hidden lg:hidden">
                    <Image src={s.image.src} alt={s.image.alt} fill sizes="90vw" className="object-cover" />
                    <div className="scrim-bottom absolute inset-0" aria-hidden="true" />
                    <p className="absolute bottom-4 left-5 text-[10px] font-medium tracking-brand text-champagne uppercase">
                      {s.scope.slice(0, 2).join(" · ")}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto aspect-[3/4] h-[min(62svh,38rem)] max-w-full">
              <div className="arch-ogee absolute -inset-3 bg-brass/60" aria-hidden="true" />
              <div className="arch-ogee absolute -inset-[11px] bg-charcoal" aria-hidden="true" />
              <div className="arch-ogee absolute inset-0 overflow-hidden bg-pine">
                {sectors.map((s, i) => (
                  <div
                    key={s.slug}
                    className={cn(
                      "sv-img absolute inset-0 transition-opacity duration-700",
                      active === i ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div className="sv-img-inner absolute inset-0">
                      <Image src={s.image.src} alt={s.image.alt} fill sizes="36vw" className="object-cover" />
                    </div>
                  </div>
                ))}
                <div className="scrim-bottom absolute inset-0" aria-hidden="true" />
                <div className="absolute inset-x-8 bottom-8">
                  <div className="flex items-end gap-2 font-display leading-none">
                    <span className="block h-[1em] overflow-hidden text-6xl font-light">
                      <span className="sv-odo text-foil flex flex-col">
                        {sectors.map((s) => (
                          <span key={s.slug} className="block h-[1em]">
                            {s.number}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="pb-1 text-lg text-ivory/60">/ {String(n).padStart(2, "0")}</span>
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.ul
                      key={current.slug}
                      className="mt-4 flex flex-wrap gap-2"
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                    >
                      {current.scope.map((item) => (
                        <motion.li
                          key={item}
                          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                          transition={{ duration: 0.35 }}
                          className="rounded-full border border-ivory/30 bg-pine/40 px-3 py-1.5 text-xs text-ivory backdrop-blur-sm"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
