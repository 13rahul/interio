import type { Metadata } from "next";
import { residences } from "@/content/residences";
import { PageHero } from "@/components/site/PageHero";
import { ResidenceCard } from "@/components/site/ResidenceCard";
import { Container } from "@/components/site/Container";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected villas, apartments, and majlis interiors in Dubai by Opulent Living, designed and delivered turnkey.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Rooms we have finished."
        lede="A selection of villas, apartments, and majlis interiors across Dubai, each designed and delivered by the same team. Hospitality and commercial work is shared privately on request."
      />
      <section className="py-20">
        <Container>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-14">
            {residences.map((residence) => (
              <li key={residence.slug} className="flex w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <ResidenceCard residence={residence} titleAs="h2" />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
