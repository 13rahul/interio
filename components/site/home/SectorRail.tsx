"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { sectors } from "@/content/home";
import { SectorCard } from "./SectorCard";

function RailHeading() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="text-xs font-medium tracking-brand text-ash uppercase">What we design</p>
        <h2 className="mt-4 font-display text-5xl leading-none font-light text-beige lg:text-7xl">
          Five <em>sectors</em>, one studio.
        </h2>
      </div>
      <p className="max-w-sm text-[15px] leading-relaxed text-ash">
        The same people take a project from the first sketch to the last cushion, whether it is a villa or a
        hotel lobby.
      </p>
    </div>
  );
}

function PinnedRail() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [stops, setStops] = useState<number[]>([0]);
  const [active, setActive] = useState(0);
  const x = useSpring(0, { stiffness: 140, damping: 26, mass: 0.9 });

  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const cards = listRef.current ? [...listRef.current.children] as HTMLElement[] : [];
      if (!stage || cards.length < 2) return;
      const gutter = cards[0].offsetLeft;
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      const last = cards[cards.length - 1];
      const maxShift = Math.max(0, last.offsetLeft + last.offsetWidth + gutter - stage.clientWidth);
      const next = cards.map((_, i) => Math.min(i * step, maxShift)).filter((v, i, all) => all.indexOf(v) === i);
      setStops(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(stops.length - 1, Math.max(0, Math.round(v * (stops.length - 1)))));
  });

  useEffect(() => {
    x.set(-(stops[active] ?? 0));
  }, [active, stops, x]);

  return (
    <section ref={ref} className="theme-stone rail-pin relative h-[240vh] border-b border-graphite" id="sectors">
      <div ref={stageRef} className="sticky top-0 flex h-svh flex-col justify-center gap-[min(3rem,5svh)] overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-10">
          <RailHeading />
        </div>
        <motion.ul ref={listRef} style={{ x }} className="flex gap-6 pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          {sectors.map((sector) => (
            <li key={sector.name} className="h-[min(58svh,36rem)] w-[30vw] max-w-md shrink-0">
              <SectorCard sector={sector} className="h-full" />
            </li>
          ))}
        </motion.ul>
        <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-10">
          <span className="text-xs font-medium tracking-brand text-beige uppercase" aria-hidden="true">
            {String(active === stops.length - 1 ? sectors.length : active + 1).padStart(2, "0")}
            <span className="text-ash"> / {String(sectors.length).padStart(2, "0")}</span>
          </span>
          <div className="h-px flex-1 bg-graphite" aria-hidden="true">
            <motion.div
              className="h-px origin-left bg-brass"
              animate={{ scaleX: stops.length > 1 ? active / (stops.length - 1) : 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 26 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SwipeRail() {
  const listRef = useRef<HTMLUListElement>(null);
  const step = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    const card = list.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 16 : list.clientWidth * 0.8;
    list.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section className="theme-stone rail-swipe border-b border-graphite py-24" id="sectors-swipe">
      <div className="mx-auto max-w-7xl px-6">
        <RailHeading />
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous sector"
            className="grid size-11 place-items-center rounded-full border border-beige/30 text-beige hover:border-gold hover:text-gold"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next sector"
            className="grid size-11 place-items-center rounded-full border border-beige/30 text-beige hover:border-gold hover:text-gold"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <ul
        ref={listRef}
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6"
      >
        {sectors.map((sector) => (
          <li key={sector.name} className="w-[78vw] max-w-sm shrink-0 snap-start sm:w-[44vw]">
            <SectorCard sector={sector} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SectorRail() {
  return (
    <>
      <PinnedRail />
      <SwipeRail />
    </>
  );
}
