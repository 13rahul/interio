import Image from "next/image";
import Link from "next/link";
import type { Residence } from "@/content/residences";

export function ResidenceCard({
  residence,
  titleAs = "h3",
}: {
  residence: Residence;
  titleAs?: "h2" | "h3";
}) {
  const Title = titleAs;
  return (
    <Link href={`/residences/${residence.slug}`} className="group flex h-full w-full flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={residence.image.src}
          alt={residence.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
      </div>
      <p className="mt-5 text-[15px] text-ash">
        {residence.place}
        <span aria-hidden="true"> · </span>
        {residence.typology}
      </p>
      <Title className="mt-3 font-display text-3xl leading-tight font-light text-beige">{residence.name}</Title>
      <p className="mt-3 text-[15px] leading-relaxed text-ash">{residence.line}</p>
      <span className="mt-auto w-fit pt-6 text-[15px] text-beige underline decoration-gold/50 underline-offset-[6px] group-hover:text-gold">
        View project →
      </span>
    </Link>
  );
}
