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
    <span className={cn("group/logo inline-flex min-h-11 items-center gap-3 leading-none sm:gap-4", className)}>
      <span className="relative grid place-items-center">
        <span
          className="absolute inset-0 -z-10 scale-75 rounded-full bg-champagne/40 opacity-0 blur-md transition-all duration-700 group-hover/logo:scale-125 group-hover/logo:opacity-100"
          aria-hidden="true"
        />
        <GateMark
          tone={inverse ? "foil" : "gold"}
          className="w-8 transition-transform duration-700 ease-lux group-hover/logo:-translate-y-0.5 sm:w-10"
          medallion={medallion}
          monogram={monogram}
        />
      </span>
      <span className="h-9 w-px bg-gradient-to-b from-transparent via-brass to-transparent sm:h-10" aria-hidden="true" />
      <span className="flex flex-col">
        <span className="font-display text-[15px] font-medium tracking-[0.28em] whitespace-nowrap text-beige uppercase sm:text-xl sm:tracking-[0.3em]">
          Opulent Living
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span lang="ar" dir="rtl" className="font-arabic text-[13px] font-bold text-brass sm:text-sm">
            {arabicName}
          </span>
          <span className="hidden size-1 rotate-45 bg-brass sm:block" aria-hidden="true" />
          <span className="hidden text-[9px] font-medium tracking-[0.35em] whitespace-nowrap text-ash uppercase sm:block">
            Design · Dubai
          </span>
        </span>
      </span>
    </span>
  );
}
