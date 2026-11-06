import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResidence, residences } from "@/content/residences";
import { consultationLabel } from "@/content/site";
import { Button } from "@/components/ui/button";
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
      <header className="border-b border-graphite pt-28 pb-16">
        <Container className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs tracking-brand text-ash uppercase">
              {residence.place}
              <span aria-hidden="true"> · </span>
              {residence.typology}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-beige md:text-7xl">{residence.name}</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ash">{residence.line}</p>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden lg:col-span-5 lg:col-start-8">
            <Image
              src={residence.image.src}
              alt={residence.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </header>
      <section className="border-b border-graphite py-16">
        <Container className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {residence.facts.map((fact) => (
            <div key={fact.label} className="border-t border-graphite pt-5">
              <p className="text-xs tracking-brand text-ash uppercase">{fact.label}</p>
              <p className="mt-3 font-display text-2xl text-beige">{fact.value}</p>
            </div>
          ))}
        </Container>
      </section>
      <section className="border-b border-graphite py-16">
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
