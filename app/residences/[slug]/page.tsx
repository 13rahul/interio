import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResidence, residences } from "@/content/residences";
import { consultationLabel } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Lattice } from "@/components/brand/Lattice";
import { Container } from "@/components/site/Container";
import { RoomFrame } from "@/components/site/RoomFrame";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return residences.map((residence) => ({ slug: residence.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const residence = getResidence(slug);
  if (!residence) return { title: "Residence" };
  return {
    title: residence.name,
    description: `${residence.name} in ${residence.place}. ${residence.line}`,
  };
}

export default async function ResidencePage({ params }: Props) {
  const { slug } = await params;
  const residence = getResidence(slug);
  if (!residence) notFound();

  return (
    <article>
      <header className="theme-sand relative overflow-hidden border-b border-graphite pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="absolute inset-y-0 left-0 w-1/2" aria-hidden="true">
          <Lattice className="opacity-[0.1] [mask-image:linear-gradient(to_right,black,transparent)]" />
        </div>
        <Container className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Link
              href="/residences"
              className="inline-flex h-11 items-center gap-2 text-xs font-medium tracking-brand text-ash uppercase transition-colors hover:text-gold"
            >
              <span aria-hidden="true">←</span> All projects
            </Link>
            <p className="mt-6 flex items-center gap-3 text-xs font-medium tracking-brand text-gold uppercase">
              <span className="h-px w-10 bg-brass" aria-hidden="true" />
              <span>
                {residence.place} · {residence.typology}
              </span>
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[0.95] font-light text-beige sm:text-6xl xl:text-7xl">
              {residence.name}
            </h1>
            <p className="text-foil-deep mt-6 max-w-md font-display text-2xl leading-snug italic sm:text-3xl">
              {residence.line}
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-graphite pt-6">
              {residence.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[10px] font-medium tracking-brand text-ash uppercase sm:text-xs">{fact.label}</dt>
                  <dd className="mt-2 font-display text-lg leading-tight text-beige sm:text-2xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/enquiry">{consultationLabel}</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="#the-house">Read the story</a>
              </Button>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <div className="absolute -inset-3 arch-round border border-brass/60" aria-hidden="true" />
            <div className="arch-round relative aspect-[4/5] w-full overflow-hidden bg-pine lg:aspect-auto lg:h-[min(72svh,42rem)]">
              <Image
                src={residence.image.src}
                alt={residence.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </header>
      <section id="the-house" className="scroll-mt-24 border-b border-graphite py-16">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 className="font-display text-4xl text-beige lg:col-span-4">The house</h2>
          <p className="max-w-xl text-base leading-relaxed text-ash lg:col-span-7 lg:col-start-6">{residence.story}</p>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <h2 className="font-display text-4xl text-beige">Materials</h2>
          <ul className="mt-10 flex flex-wrap justify-center gap-6">
            {residence.materials.map((material) => (
              <li key={material.name} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <RoomFrame variant={material.variant} className="aspect-[4/5] w-full" />
                <h3 className="mt-4 font-display text-2xl text-beige">{material.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{material.note}</p>
              </li>
            ))}
          </ul>
          <Button asChild className="mt-14">
            <Link href="/enquiry">{consultationLabel}</Link>
          </Button>
        </Container>
      </section>
    </article>
  );
}
