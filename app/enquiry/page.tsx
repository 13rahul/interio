import type { Metadata } from "next";
import Image from "next/image";
import { closing } from "@/content/home";
import { site } from "@/content/site";
import { sectorToProjectType } from "@/lib/enquiry";
import { EnquiryForm } from "./EnquiryForm";
import { Container } from "@/components/site/Container";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Book a consultation",
  description:
    "Book a private consultation with Liwan for a villa, penthouse, hospitality, commercial, or turnkey fit-out project in Dubai.",
};

type Props = { searchParams: Promise<{ sector?: string }> };

export default async function EnquiryPage({ searchParams }: Props) {
  const { sector } = await searchParams;
  const defaultProjectType = sector ? (sectorToProjectType[sector] ?? "") : "";

  return (
    <>
      <PageHero
        eyebrow="Consultation"
        title="Begin with a private consultation."
        lede="Tell us about the villa, the hotel, or the floor. We reply within one working day, and the first meeting is at your site or our studio in Dubai Design District."
      />
      <section className="py-16">
        <Container className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <EnquiryForm defaultProjectType={defaultProjectType} />
          </div>
          <aside className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image src={closing.image.src} alt={closing.image.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col border-t border-graphite text-[15px]">
              <p className="pt-5 text-xs font-medium tracking-brand text-ash uppercase">Prefer to talk?</p>
              <a href={site.whatsappHref} className="inline-flex h-11 items-center text-beige hover:text-gold">
                WhatsApp <span aria-hidden="true" className="ml-2">→</span>
              </a>
              <a href={site.phoneHref} className="inline-flex h-11 items-center text-beige hover:text-gold">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="inline-flex h-11 items-center text-beige hover:text-gold">
                {site.email}
              </a>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
