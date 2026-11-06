"use client";

import { useRef } from "react";
import { gsap, media, useGSAP } from "@/lib/gsap";

/** Lifts its content up into place as it scrolls into view, scrubbed to the scroll. */
export function ScrollRise({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.from(ref.current, {
          yPercent: 70,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div className="overflow-hidden">
      <div ref={ref} className={className}>
        {children}
      </div>
    </div>
  );
}
