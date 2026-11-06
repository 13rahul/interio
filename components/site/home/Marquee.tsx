"use client";

import { useRef } from "react";
import { marquee } from "@/content/home";
import { gsap, media, ScrollTrigger, useGSAP } from "@/lib/gsap";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-display text-3xl font-light whitespace-nowrap text-ivory italic sm:text-4xl">
            {item}
          </span>
          <span className="mq-gem bg-foil size-2.5 rotate-45" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

/** Drifts on its own, speeds up with the scroll, and turns around when the reader scrolls back up. */
export function Marquee() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        const loop = gsap.to(".mq-track", { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
        loop.totalTime(loop.duration() * 50);
        let dir = 1;
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            dir = self.direction;
            const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(self.getVelocity()) / 250);
            gsap.timeline()
              .to(loop, { timeScale: dir * boost, duration: 0.2, overwrite: true })
              .to(loop, { timeScale: dir, duration: 1.2, ease: "power2.out" });
            gsap.to(".mq-gem", { rotate: 45 + dir * 90, duration: 0.8, overwrite: true });
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="theme-night relative overflow-hidden border-y border-brass/40 py-7" aria-label="What we design">
      <div className="mq-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
