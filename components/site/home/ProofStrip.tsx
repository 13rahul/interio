import { credentials, stats } from "@/content/home";
import { FadeUp } from "../Reveal";

export function ProofStrip() {
  return (
    <section className="border-b border-graphite" aria-label="Studio in numbers">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:grid-cols-4 lg:px-10">
        {stats.map((stat, i) => (
          <FadeUp
            key={stat.label}
            delay={i * 0.08}
            className="flex flex-col-reverse gap-3 border-graphite py-10 odd:border-r lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 max-lg:odd:pr-6 max-lg:even:pl-6"
          >
            <dt className="text-[15px] text-ash">{stat.label}</dt>
            <dd className="font-display text-6xl font-light text-beige lg:text-7xl">{stat.value}</dd>
          </FadeUp>
        ))}
      </dl>
      <div className="theme-sand border-t border-graphite">
        <ul
          className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10"
          aria-label="Credentials"
        >
          {credentials.map((item) => (
            <li key={item} className="flex items-center gap-3 py-2 font-display text-xl text-beige">
              <span className="size-1.5 shrink-0 rotate-45 bg-brass" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
