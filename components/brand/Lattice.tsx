"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** The mashrabiya brand pattern, as a tiling background layer. */
export function Lattice({
  size = 64,
  className,
  stroke = "var(--color-dallah)",
}: {
  size?: number;
  className?: string;
  stroke?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={cn("pointer-events-none absolute inset-0 h-full w-full", className)} aria-hidden="true">
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g transform={`scale(${size / 40})`} fill="none" stroke={stroke} strokeWidth={40 / size}>
            <path d="M20 6L34 20L20 34L6 20Z" />
            <path d="M10.1 10.1H29.9V29.9H10.1Z" />
            <path d="M10.1 10.1L0 0M29.9 10.1L40 0M29.9 29.9L40 40M10.1 29.9L0 40M20 6V0M34 20H40M20 34V40M6 20H0" />
            <circle cx="20" cy="20" r="3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
