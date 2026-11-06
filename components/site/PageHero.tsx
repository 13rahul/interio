import type { ReactNode } from "react";
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
    <header className="border-b border-graphite pb-16 pt-32">
      <Container>
        <p className="text-xs tracking-brand text-ash uppercase">{eyebrow}</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.95] text-beige md:text-7xl">{title}</h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ash">{lede}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </header>
  );
}
