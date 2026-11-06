import Image from "next/image";
import Link from "next/link";
import type { sectors } from "@/content/home";
import { cn } from "@/lib/utils";

type Sector = (typeof sectors)[number];

export function SectorCard({ sector, className }: { sector: Sector; className?: string }) {
  return (
    <Link href={sector.href} className={cn("theme-night group relative block overflow-hidden", className)}>
      <Image
        src={sector.image.src}
        alt={sector.image.alt}
        width={sector.image.width}
        height={sector.image.height}
        sizes="(min-width: 1024px) 30vw, 80vw"
        className="aspect-[3/4] h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="scrim-bottom absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 lg:p-8">
        <span className="text-xs font-medium tracking-brand text-gold">{sector.number}</span>
        <h3 className="font-display text-4xl font-light text-beige lg:text-5xl">{sector.name}</h3>
        <p className="max-w-xs text-[15px] leading-relaxed text-beige/85">{sector.line}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-[15px] text-beige underline decoration-gold/60 underline-offset-[6px] group-hover:text-gold">
          Explore
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
