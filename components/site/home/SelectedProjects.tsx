import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/home";
import { Reveal, FadeUp } from "../Reveal";

type Project = (typeof projects)[number];

const spans = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
];

function ProjectTile({ project, span }: { project: Project; span: string }) {
  const href = project.slug ? `/residences/${project.slug}` : "/residences";
  return (
    <li className={span}>
      <Link href={href} className="group flex h-full flex-col">
        <Reveal className="relative h-80 sm:h-96 lg:h-[34rem]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes={span.includes("2") ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        </Reveal>
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <p className="text-[15px] text-ash">
            {project.place} · {project.typology} · {project.area}
          </p>
        </div>
        <h3 className="mt-2 font-display text-3xl font-light text-beige lg:text-4xl">{project.name}</h3>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ash">{project.line}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[15px] text-beige underline decoration-gold/50 underline-offset-[6px] group-hover:text-gold">
          View project <span aria-hidden="true">→</span>
        </span>
      </Link>
    </li>
  );
}

export function SelectedProjects() {
  return (
    <section className="theme-sand border-b border-graphite py-24 lg:py-32" id="projects">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeUp className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-brand text-ash uppercase">Selected work</p>
            <h2 className="mt-4 font-display text-5xl leading-none font-light text-beige lg:text-7xl">
              Rooms we have <em>finished</em>.
            </h2>
          </div>
          <Link
            href="/residences"
            className="inline-flex h-11 items-center gap-2 text-xs font-medium tracking-brand text-beige uppercase hover:text-gold"
          >
            All projects <span aria-hidden="true">→</span>
          </Link>
        </FadeUp>
        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectTile key={project.name} project={project} span={spans[i] ?? "lg:col-span-1"} />
          ))}
          <li className="lg:col-span-1">
            <Link
              href="/enquiry"
              className="group flex h-80 flex-col justify-between border border-graphite bg-graphite/40 p-8 transition-colors hover:border-gold sm:h-96 lg:h-[34rem]"
            >
              <p className="text-xs font-medium tracking-brand text-ash uppercase">Next</p>
              <div>
                <p className="font-display text-5xl leading-none font-light text-beige">
                  Start your <em>project</em>.
                </p>
                <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ash">
                  A first meeting at your site or our studio, with no obligation.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-[15px] text-gold underline decoration-gold/50 underline-offset-[6px]">
                Book a consultation <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
