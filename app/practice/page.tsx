import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sectors } from "@/content/home";
import { consultationLabel } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interior architecture, design, and turnkey fit-out in Dubai for villas, apartments, hospitality, and commercial spaces.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Five sectors, one studio."
        lede="The same team takes every project from the first sketch to the last cushion, whether it is a villa in Emirates Hills or a hotel lobby."
      >
        <nav aria-label="Sectors" className="flex flex-wrap gap-x-8 gap-y-1">
          {sectors.map((sector) => (
            <a
              key={sector.slug}
              href={`#${sector.slug}`}
              className="inline-flex h-11 items-center text-sm text-beige underline-offset-8 hover:text-gold hover:underline"
            >
              {sector.name}
            </a>
          ))}
        </nav>
      </PageHero>
      {sectors.map((sector, index) => (
        <section
          key={sector.slug}
          id={sector.slug}
          className={`border-b border-graphite py-16 lg:py-24 ${index % 2 ? "theme-sand" : ""}`}
        >
          <Container className="grid items-center gap-10 lg:grid-cols-12">
            <div
              className={`relative aspect-[3/4] w-full overflow-hidden lg:col-span-5 ${index % 2 ? "lg:order-2 lg:col-start-8" : ""}`}
            >
              <Image
                src={sector.image.src}
                alt={sector.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className={index % 2 ? "lg:col-span-6 lg:col-start-1" : "lg:col-span-6 lg:col-start-7"}>
              <p className="text-xs font-medium tracking-brand text-gold">{sector.number}</p>
              <h2 className="mt-3 font-display text-5xl font-light text-beige md:text-6xl">{sector.name}</h2>
              <p className="mt-4 font-display text-2xl text-beige">{sector.line}</p>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ash">{sector.body}</p>
              <ul className="mt-8 grid max-w-lg grid-cols-1 border-t border-graphite sm:grid-cols-2">
                {sector.scope.map((item) => (
                  <li key={item} className="border-b border-graphite py-3 text-[15px] text-beige">
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="mt-8">
                <Link href={`/enquiry?sector=${sector.slug}`}>Discuss a {sector.name.toLowerCase()} project</Link>
              </Button>
            </div>
          </Container>
        </section>
      ))}
      <section className="theme-stone py-20">
        <Container className="flex flex-wrap items-center justify-between gap-8">
          <p className="max-w-xl font-display text-4xl leading-tight font-light text-beige">
            Not sure which fits? <em>Start with a conversation.</em>
          </p>
          <Button asChild>
            <Link href="/enquiry">{consultationLabel}</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
