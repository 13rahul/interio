import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { process } from "@/content/home";
import { consultationLabel, principles } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Liwan is an interior architecture and turnkey fit-out studio in Dubai Design District, with its own joinery workshop and site team.",
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        title="A Dubai studio, from sketch to keys."
        lede="Liwan is named after the shaded gallery of a Gulf house, the place between the court and the rooms where the heat is held back. Designers, architects, joiners, and site managers work under one roof in d3."
      />
      <section className="border-b border-graphite py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:col-span-6">
            <Image
              src="/images/story-craft.jpg"
              alt="A craftsman's hands carving a geometric oak screen with a brass inlay in the Liwan workshop."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="font-display text-5xl font-light text-beige">
              How we <em>work</em>
            </h2>
            <ul className="mt-8 flex flex-col">
              {principles.map((item) => (
                <li key={item.title} className="border-t border-graphite py-5">
                  <p className="font-display text-2xl text-beige">{item.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ash">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="theme-sand border-b border-graphite py-16 lg:py-24">
        <Container>
          <h2 className="font-display text-5xl font-light text-beige">
            Brief to <em>keys</em>
          </h2>
          <ol className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((step) => (
              <li key={step.number} className="border-t border-graphite pt-5 last:sm:col-span-2 last:lg:col-span-1">
                <p className="text-xs font-medium tracking-brand text-gold uppercase">
                  {step.number} · {step.time}
                </p>
                <p className="mt-3 font-display text-2xl text-beige">{step.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ash">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="py-20">
        <Container className="flex flex-wrap items-center justify-between gap-8">
          <p className="max-w-xl text-[15px] leading-relaxed text-ash">
            The first meeting is at your site or our studio in Dubai Design District, with no obligation.
          </p>
          <Button asChild>
            <Link href="/enquiry">{consultationLabel}</Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
