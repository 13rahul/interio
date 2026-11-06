"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { FadeUp } from "../Reveal";

export function SectionHeading({
  eyebrow,
  arabic,
  title,
  accent,
  align = "left",
  className,
  children,
}: {
  eyebrow: string;
  arabic?: string;
  title: string;
  accent?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <FadeUp className={cn(align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-medium tracking-brand text-gold uppercase",
          align === "center" && "justify-center",
        )}
      >
        <span className="size-1.5 rotate-45 bg-brass" aria-hidden="true" />
        {eyebrow}
        {arabic ? (
          <>
            <span aria-hidden="true">·</span>
            <span lang="ar" dir="rtl" className="font-arabic text-sm font-bold tracking-normal normal-case">
              {arabic}
            </span>
          </>
        ) : null}
      </p>
      <h2 className="mt-5 font-display text-4xl leading-[1.02] font-light text-beige sm:text-5xl lg:text-6xl">
        {title} {accent ? <em className="text-gold">{accent}</em> : null}
      </h2>
      {children}
    </FadeUp>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-3.5", className)} fill="none" aria-hidden="true">
      <path d="M4 12 L12 4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 4 H12 V10" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

/** Counts up to the numeric part of a value like "140+" once it scrolls into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = usePrefersReducedMotion();
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  // Server HTML carries the real figure; the count only replays once scripts run.
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!inView || !target || reduce) {
      setN(target);
      return;
    }
    const controls = animate(0, target, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, target]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {match[1]}
        {n}
        {match[3]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
