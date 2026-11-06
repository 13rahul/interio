"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { GateMark } from "@/components/brand/GateMark";
import { Lattice } from "@/components/brand/Lattice";
import { closing, hero } from "@/content/home";
import { consultationLabel, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { FadeUp } from "../Reveal";

export function Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="theme-night relative overflow-hidden py-24 lg:py-32" id="consultation">
      <Lattice className="opacity-[0.08]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="text-center lg:col-span-7 lg:text-left">
          <div ref={ref} className="mx-auto w-20 lg:mx-0">
            {inView ? (
              <GateMark draw medallion="var(--color-emerald)" monogram="var(--color-ivory)" />
            ) : (
              <div className="aspect-[4/5]" />
            )}
          </div>
          <FadeUp>
            <h2 className="mt-8 font-display text-5xl leading-[1.02] font-light text-beige sm:text-6xl lg:text-7xl">
              {closing.title.replace(/\.$/, "")}
              <em className="text-foil">.</em>
            </h2>
            <p lang="ar" dir="rtl" className="text-foil mx-auto mt-4 w-fit font-ruqaa text-3xl leading-[1.6] lg:mx-0">
              {hero.arabic}
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash lg:mx-0">{closing.body}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild>
                <Link href="/enquiry">{consultationLabel}</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp a designer
                </a>
              </Button>
            </div>
          </FadeUp>
        </div>
        <FadeUp className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="arch-ogee relative aspect-[3/4] bg-pine">
            <Image src={closing.image.src} alt={closing.image.alt} fill sizes="30vw" className="object-cover" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
