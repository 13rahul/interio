import { cn } from "@/lib/utils";

export function Logo({
  withPlace = false,
  className,
}: {
  withPlace?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex min-h-11 flex-col items-start justify-center leading-none", className)}>
      <span className="font-display text-2xl tracking-brand text-beige uppercase">Liwan</span>
      <svg viewBox="0 0 72 12" className="mt-1 h-2 w-20" aria-hidden="true">
        <path d="M2 10 Q36 0 70 10" fill="none" stroke="var(--color-gold)" strokeWidth="1.25" />
      </svg>
      {withPlace ? (
        <span className="mt-2 text-xs tracking-brand text-ash uppercase">Dubai</span>
      ) : null}
    </span>
  );
}
