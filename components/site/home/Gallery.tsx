import Image from "next/image";
import { gallery } from "@/content/home";
import { FadeUp } from "../Reveal";
import { SectionHeading } from "./parts";

export function Gallery() {
  return (
    <section className="theme-linen py-24 lg:py-32" aria-label="Inspiration gallery">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Your home is your majlis" arabic="بيتك مجلسك" title="A little" accent="inspiration." />
          <FadeUp>
            <p className="text-sm text-ash">Follow the studio on Instagram</p>
            <p className="font-display text-2xl text-beige">@opulentliving.ae</p>
          </FadeUp>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {gallery.map((g, i) => (
            <li key={g.src} className={i % 2 ? "lg:mt-10" : ""}>
              <FadeUp delay={i * 0.06}>
                <div className="group relative aspect-[3/4] overflow-hidden bg-sand">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-emerald/0 transition-colors duration-500 group-hover:bg-emerald/40" aria-hidden="true" />
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
