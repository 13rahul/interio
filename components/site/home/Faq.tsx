import { faqs } from "@/content/home";
import { site } from "@/content/site";
import { FadeUp } from "../Reveal";
import { SectionHeading } from "./parts";

export function Faq() {
  return (
    <section className="theme-sand py-24 lg:py-32" id="faq">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Questions" title="Before you" accent="ask.">
            <p className="mt-6 text-base leading-relaxed text-ash">
              Something else on your mind? Message us on{" "}
              <a href={site.whatsappHref} className="text-gold underline decoration-brass/50 underline-offset-4 hover:decoration-brass">
                WhatsApp
              </a>{" "}
              and a designer will reply the same day.
            </p>
          </SectionHeading>
        </div>
        <FadeUp className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-graphite">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-graphite">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-2xl text-beige [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="relative grid size-10 shrink-0 place-items-center rounded-full border border-graphite transition-colors group-open:border-brass group-open:bg-brass"
                    aria-hidden="true"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-ash">{f.a}</p>
              </details>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
