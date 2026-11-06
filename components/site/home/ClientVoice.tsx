import Image from "next/image";
import Link from "next/link";
import { testimonial } from "@/content/home";
import { FadeUp, Reveal } from "../Reveal";

export function ClientVoice() {
  return (
    <section className="theme-sand border-b border-graphite py-24 lg:py-32" id="voice">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-10">
        <Reveal className="relative aspect-[4/5] lg:col-span-4">
          <Image
            src={testimonial.image.src}
            alt={testimonial.image.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover object-[60%_center]"
          />
        </Reveal>
        <FadeUp className="lg:col-span-7 lg:col-start-6">
          <figure>
            <span className="font-display text-8xl leading-none text-gold" aria-hidden="true">
              “
            </span>
            <blockquote className="-mt-6 font-display text-3xl leading-[1.2] font-light text-beige sm:text-4xl lg:text-5xl">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span>
                <span className="block text-base text-beige">{testimonial.name}</span>
                <span className="block text-[15px] text-ash">{testimonial.role}</span>
              </span>
              <Link
                href={testimonial.projectHref}
                className="inline-flex h-11 items-center gap-2 text-[15px] text-beige underline decoration-gold/50 underline-offset-[6px] hover:text-gold"
              >
                See the project <span aria-hidden="true">→</span>
              </Link>
            </figcaption>
          </figure>
        </FadeUp>
      </div>
    </section>
  );
}
