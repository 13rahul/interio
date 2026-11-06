import { GateMark, Ornament } from "@/components/brand/GateMark";
import { cn } from "@/lib/utils";

export const arabicName = "أوبيولنت ليفينغ";

export function Logo({
  stacked = false,
  inverse = false,
  className,
}: {
  stacked?: boolean;
  inverse?: boolean;
  className?: string;
}) {
  const medallion = inverse ? "var(--color-emerald)" : "var(--color-ivory)";
  const monogram = inverse ? "var(--color-ivory)" : "var(--color-emerald)";

  if (stacked) {
    return (
      <span className={cn("inline-flex flex-col items-center text-center leading-none", className)}>
        <GateMark className="w-16" medallion={medallion} monogram={monogram} />
        <span className="mt-5 font-display text-2xl font-medium tracking-[0.34em] text-beige uppercase">
          Opulent Living
        </span>
        <Ornament className="mt-3 w-24 text-brass" />
        <span lang="ar" dir="rtl" className="mt-1 font-arabic text-xl font-bold text-brass">
          {arabicName}
        </span>
        <span className="mt-3 text-[10px] tracking-[0.5em] text-ash uppercase">Design Services · Dubai</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex min-h-11 items-center gap-3 leading-none", className)}>
      <GateMark tone={inverse ? "foil" : "gold"} className="w-8" medallion={medallion} monogram={monogram} />
      <span className="flex flex-col">
        <span className="font-display text-lg font-medium tracking-[0.3em] text-beige uppercase">Opulent Living</span>
        <span lang="ar" dir="rtl" className="mt-1 self-start font-arabic text-sm font-bold text-brass">
          {arabicName}
        </span>
      </span>
    </span>
  );
}
