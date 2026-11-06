import { marquee } from "@/content/home";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-display text-3xl font-light whitespace-nowrap text-ivory italic sm:text-4xl">
            {item}
          </span>
          <span className="bg-foil size-2.5 rotate-45" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export function Marquee() {
  return (
    <section className="theme-night relative overflow-hidden border-y border-brass/40 py-7" aria-label="What we design">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
