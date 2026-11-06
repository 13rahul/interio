"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

const OUTER = "M28 236V108C28 74 52 64 72 52C88 42 97 30 100 12C103 30 112 42 128 52C148 64 172 74 172 108V236";
const INNER = "M40 236V112C40 84 60 75 78 64C91 56 98 45 100 30C102 45 109 56 122 64C140 75 160 84 160 112V236";
const LATTICE = 15;

type Tone = "foil" | "gold" | "emerald" | "ivory";

const lineColour: Record<Tone, string> = {
  foil: "",
  gold: "var(--color-dallah)",
  emerald: "var(--color-emerald)",
  ivory: "var(--color-ivory)",
};

/**
 * The Majlis Gate emblem from the brand book: an ogee arch filled with a
 * mashrabiya lattice and an "OL" medallion at the threshold.
 */
export function GateMark({
  tone = "foil",
  monogram = "var(--color-emerald)",
  medallion = "var(--color-ivory)",
  draw = false,
  delay = 0,
  className,
  title,
}: {
  tone?: Tone;
  monogram?: string;
  medallion?: string;
  draw?: boolean;
  delay?: number;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, "");
  const line = tone === "foil" ? `url(#${id}f)` : lineColour[tone];
  const ease = [0.65, 0, 0.35, 1] as const;
  const stroke = (d: number) =>
    draw
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration: 1.6, ease, delay: delay + d }, opacity: { duration: 0.2, delay: delay + d } },
        }
      : {};
  const appear = (d: number) =>
    draw
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, delay: delay + d } }
      : {};

  return (
    <svg
      viewBox="0 0 200 250"
      className={cn("block h-auto", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="200" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9c7424" />
          <stop offset=".3" stopColor="#ecd38b" />
          <stop offset=".55" stopColor="#b88a2c" />
          <stop offset=".78" stopColor="#f4dd99" />
          <stop offset="1" stopColor="#a77d27" />
        </linearGradient>
        <pattern id={`${id}p`} width={LATTICE} height={LATTICE} patternUnits="userSpaceOnUse" x="2.5" y="0">
          <g transform={`scale(${LATTICE / 40})`} fill="none" stroke={line} strokeWidth="1.5">
            <path d="M20 6L34 20L20 34L6 20Z" />
            <path d="M10.1 10.1H29.9V29.9H10.1Z" />
            <path d="M10.1 10.1L0 0M29.9 10.1L40 0M29.9 29.9L40 40M10.1 29.9L0 40M20 6V0M34 20H40M20 34V40M6 20H0" />
          </g>
        </pattern>
        <clipPath id={`${id}c`}>
          <path d={`${INNER}Z`} />
        </clipPath>
      </defs>
      <motion.rect
        width="200"
        height="250"
        fill={`url(#${id}p)`}
        clipPath={`url(#${id}c)`}
        opacity={0.85}
        {...(draw
          ? { initial: { opacity: 0 }, animate: { opacity: 0.85 }, transition: { duration: 1.2, delay: delay + 1 } }
          : {})}
      />
      <motion.path d={OUTER} fill="none" stroke={line} strokeWidth="3.4" {...stroke(0)} />
      <motion.path d={INNER} fill="none" stroke={line} strokeWidth="1.3" {...stroke(0.25)} />
      <motion.g fill={line} {...appear(0.9)}>
        <rect x="20" y="106.5" width="22" height="3" />
        <rect x="158" y="106.5" width="22" height="3" />
        <rect x="22" y="113.5" width="18" height="1" />
        <rect x="160" y="113.5" width="18" height="1" />
        <rect x="12" y="234.3" width="176" height="3.4" />
        <rect x="4" y="244.3" width="192" height="1.4" />
        <circle cx="100" cy="4.5" r="4" />
      </motion.g>
      <motion.g {...appear(1.3)}>
        <circle cx="100" cy="162" r="38" fill={medallion} stroke={line} strokeWidth="2.6" />
        <circle cx="100" cy="162" r="32.5" fill="none" stroke={line} strokeWidth=".9" />
        <path d="M100 120l3 4-3 4-3-4z M100 196l3 4-3 4-3-4z" fill={line} />
        <text
          x="100"
          y="174.5"
          textAnchor="middle"
          fontWeight="600"
          fontSize="36"
          letterSpacing="-3"
          fill={monogram}
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          OL
        </text>
      </motion.g>
    </svg>
  );
}

/** The bead-and-diamond divider that sits between the English and Arabic names. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 14" className={cn("block", className)} fill="currentColor" aria-hidden="true">
      <rect x="2" y="6.4" width="50" height="1.2" />
      <rect x="78" y="6.4" width="50" height="1.2" />
      <path d="M65 1l6 6-6 6-6-6z" />
      <circle cx="56" cy="7" r="1.6" />
      <circle cx="74" cy="7" r="1.6" />
    </svg>
  );
}
