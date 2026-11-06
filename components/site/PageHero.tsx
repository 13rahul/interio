import type { ReactNode } from "react";
import { GateMark } from "@/components/brand/GateMark";
import { Lattice } from "@/components/brand/Lattice";
import { Container } from "./Container";

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="theme-sand relative overflow-hidden border-b border-graphite pt-36 pb-20">
      <div className="absolute inset-y-0 right-0 w-2/3" aria-hidden="true">
        <Lattice className="opacity-[0.12] [mask-image:linear-gradient(to_left,black,transparent)]" />
      </div>
      <GateMark
        tone="gold"
        className="absolute -right-10 -bottom-16 hidden w-72 opacity-20 lg:block"
        medallion="var(--color-pearl)"
      />
      <Container className="relative">
        <p className="flex items-center gap-3 text-xs font-medium tracking-brand text-gold uppercase">
          <span className="h-px w-10 bg-brass" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] font-light text-beige md:text-7xl">{title}</h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ash">{lede}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
