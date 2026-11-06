import Image from "next/image";
import Link from "next/link";
import { closing } from "@/content/home";
import { consultationLabel, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { FadeUp } from "../Reveal";

export function ConsultationClose() {
  return (
    <section className="theme-night relative flex min-h-[85svh] items-center overflow-hidden" id="consultation">
      <Image src={closing.image.src} alt={closing.image.alt} fill sizes="100vw" className="object-cover" />
      <div className="scrim-center absolute inset-0" aria-hidden="true" />
      <FadeUp className="relative mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs font-medium tracking-brand text-ash uppercase">Consultation</p>
        <h2 className="mt-6 font-display text-5xl leading-[0.95] font-light text-beige sm:text-6xl lg:text-8xl">
          Begin with a <em>private</em> consultation.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-beige/85">{closing.body}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Button asChild>
            <Link href="/enquiry">{consultationLabel}</Link>
          </Button>
          <a
            href={site.whatsappHref}
            className="inline-flex h-11 items-center gap-2 text-[15px] text-beige underline decoration-gold/50 underline-offset-[6px] hover:text-gold"
          >
            WhatsApp <span aria-hidden="true">→</span>
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex h-11 items-center text-[15px] text-beige underline decoration-gold/50 underline-offset-[6px] hover:text-gold"
          >
            {site.phone}
          </a>
        </div>
      </FadeUp>
    </section>
  );
}
