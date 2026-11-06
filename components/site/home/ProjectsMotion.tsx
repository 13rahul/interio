"use client";

import { useRef } from "react";
import { gsap, media, useGSAP } from "@/lib/gsap";

/** Scroll-scrubbed zoom on each project photo, plus a "View" disc that trails the pointer on desktop. */
export function ProjectsMotion({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(media.motion, () => {
        gsap.utils.toArray<HTMLElement>(".pj-img", ref.current).forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.25, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      mm.add("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const disc = cursor.current;
        const root = ref.current;
        if (!disc || !root) return;
        gsap.set(disc, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 1 });
        const x = gsap.quickTo(disc, "x", { duration: 0.5, ease: "power3" });
        const y = gsap.quickTo(disc, "y", { duration: 0.5, ease: "power3" });
        const move = (e: PointerEvent) => {
          x(e.clientX);
          y(e.clientY);
        };
        const over = (e: PointerEvent) => {
          const link = (e.target as HTMLElement).closest("[data-cursor]");
          gsap.to(disc, { scale: link ? 1 : 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        };
        root.addEventListener("pointermove", move);
        root.addEventListener("pointerover", over);
        root.addEventListener("pointerleave", over);
        return () => {
          root.removeEventListener("pointermove", move);
          root.removeEventListener("pointerover", over);
          root.removeEventListener("pointerleave", over);
        };
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
      <div
        ref={cursor}
        className="pointer-events-none invisible fixed top-0 left-0 z-50 grid size-24 place-items-center rounded-full bg-brass text-[11px] font-medium tracking-brand text-ink uppercase"
        aria-hidden="true"
      >
        View
      </div>
    </div>
  );
}
