"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { transformation } from "@/content/home";
import { FadeUp } from "../Reveal";
import { SectionHeading } from "./parts";

export function ShellToHome() {
  const [value, setValue] = useState(50);
  const id = useId();

  return (
    <section className="theme-linen py-24 lg:py-32" id="transformation">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Turnkey delivery" title="From shell" accent="to home." />
          <FadeUp className="max-w-sm text-[15px] leading-relaxed text-ash">
            Drag the line. One studio handles the drawings, the joinery, and the site, so the finished room looks
            like the first sketch.
          </FadeUp>
        </div>

        <figure className="mt-12">
          <div className="relative aspect-video w-full overflow-hidden select-none">
            <Image
              src={transformation.after.src}
              alt={transformation.after.alt}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
              <Image
                src={transformation.before.src}
                alt={transformation.before.alt}
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
            </div>
            <span className="absolute top-4 left-4 bg-charcoal/80 px-3 py-2 text-xs font-medium tracking-brand text-beige uppercase">
              Shell
            </span>
            <span className="absolute top-4 right-4 bg-charcoal/80 px-3 py-2 text-xs font-medium tracking-brand text-beige uppercase">
              Handover
            </span>
            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-brass"
              style={{ left: `${value}%` }}
              aria-hidden="true"
            >
              <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brass bg-pine/80 text-champagne backdrop-blur">
                ↔
              </span>
            </div>
            <label htmlFor={id} className="sr-only">
              Compare the shell and the finished room
            </label>
            <input
              id={id}
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(event) => setValue(Number(event.target.value))}
              aria-valuetext={`${value}% shell shown`}
              className="compare-range absolute inset-0 h-full w-full"
            />
          </div>
          <figcaption className="mt-5 text-[15px] text-ash">{transformation.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
