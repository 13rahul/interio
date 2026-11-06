import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/home";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FadeUp, Reveal } from "../Reveal";
import { Arrow, SectionHeading } from "./parts";

const layout = [
  { col: "lg:col-span-7", ratio: "aspect-[4/3]", arch: false },
  { col: "lg:col-span-5 lg:mt-24", ratio: "aspect-[4/5]", arch: true },
  { col: "lg:col-span-5", ratio: "aspect-[4/5]", arch: true },
  { col: "lg:col-span-7 lg:mt-24", ratio: "aspect-[4/3]", arch: false },
  { col: "lg:col-span-12", ratio: "aspect-[4/3] sm:aspect-[21/9]", arch: false },
];

type Project = (typeof projects)[number];

function Card({ project, index }: { project: Project; index: number }) {
  const l = layout[index % layout.length];
  const body = (
    <>
      <Reveal className={cn("relative bg-sand", l.ratio, l.arch && "arch-round")}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={index === 4 ? "100vw" : "(min-width: 1024px) 55vw, 100vw"}
          className="object-cover transition-transform duration-[1.6s] ease-lux group-hover:scale-105"
        />
        <span className="absolute top-5 left-5 bg-ivory/90 px-3 py-1.5 text-[10px] font-medium tracking-brand text-emerald uppercase backdrop-blur">
          {project.typology}
        </span>
        {project.slug ? (
          <span className="absolute right-5 bottom-5 grid size-14 translate-y-3 place-items-center rounded-full bg-brass text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <Arrow className="size-4" />
          </span>
        ) : null}
      </Reveal>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-display text-3xl text-beige">{project.name}</h3>
        <p className="text-xs tracking-brand text-gold uppercase">
          {project.place} · {project.area}
        </p>
      </div>
      <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ash">{project.line}</p>
    </>
  );

  return (
    <FadeUp className={l.col}>
      {project.slug ? (
        <Link href={`/residences/${project.slug}`} className="group block">
          {body}
        </Link>
      ) : (
        <div className="group">{body}</div>
      )}
    </FadeUp>
  );
}

export function Projects() {
  return (
    <section className="theme-sand py-24 lg:py-36" id="projects">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Selected work" title="Homes we have" accent="dressed." />
          <FadeUp>
            <Button asChild variant="outline">
              <Link href="/residences">All projects</Link>
            </Button>
          </FadeUp>
        </div>
        <div className="mt-16 grid gap-x-10 gap-y-16 lg:grid-cols-12">
          {projects.map((p, i) => (
            <Card key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
