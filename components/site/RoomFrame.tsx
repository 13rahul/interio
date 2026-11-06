import { useId } from "react";
import type { FrameVariant } from "@/content/residences";
import { cn } from "@/lib/utils";

export function RoomFrame({
  variant,
  className,
}: {
  variant: FrameVariant;
  className?: string;
}) {
  const rawId = useId().replace(/:/g, "");
  const glow = `${rawId}-glow`;
  const shaft = `${rawId}-shaft`;
  const wide = variant === "gold";
  const slit = variant === "shade";
  const shaftWidth = wide ? 48 : slit ? 8 : 18;
  const shaftX = 400 - shaftWidth / 2;

  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)} aria-hidden="true">
      <svg
        viewBox="0 0 800 1000"
        width={800}
        height={1000}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id={glow} cx="50%" cy="48%" r="42%">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity={slit ? 0.18 : 0.45} />
            <stop offset="70%" stopColor="var(--color-gold)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={shaft} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--color-beige)" stopOpacity={wide ? 0.95 : 0.75} />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="800" height="1000" fill="var(--color-charcoal)" />
        <rect width="800" height="1000" fill={`url(#${glow})`} />
        <rect x={shaftX} y="230" width={shaftWidth} height="540" fill={`url(#${shaft})`} />
        {variant === "stone"
          ? Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d={`M150 ${320 + i * 58} H650`}
                stroke="var(--color-ash)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
            ))
          : null}
        {variant === "timber"
          ? Array.from({ length: 7 }, (_, i) => (
              <path
                key={i}
                d={`M${230 + i * 56} 250 V800`}
                stroke="var(--color-beige)"
                strokeOpacity="0.35"
                strokeWidth="1.25"
              />
            ))
          : null}
        <path
          d="M160 820 V440 C160 250 250 160 400 160 C550 160 640 250 640 440 V820"
          fill="none"
          stroke={variant === "gold" ? "var(--color-gold)" : "var(--color-beige)"}
          strokeWidth="1.6"
        />
        <path
          d="M210 820 V460 C210 300 280 214 400 214 C520 214 590 300 590 460 V820"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1"
          strokeOpacity="0.85"
        />
        {variant === "room" ? (
          <path d="M250 700 H550 V820 H250 Z" fill="none" stroke="var(--color-beige)" strokeWidth="1" />
        ) : null}
        <path d="M90 820 H710" stroke="var(--color-gold)" strokeWidth="1.25" />
      </svg>
    </div>
  );
}
