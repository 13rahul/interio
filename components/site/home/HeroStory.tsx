"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { GateMark } from "@/components/brand/GateMark";
import { Lattice } from "@/components/brand/Lattice";
import { hero, packages, story } from "@/content/home";
import { consultationLabel } from "@/content/site";
import { gsap, media, SplitText, useGSAP } from "@/lib/gsap";
import { INTRO_SECONDS, introPlays } from "@/lib/intro";
import { Button } from "@/components/ui/button";

const n = story.length;
const EXPAND = 1.2;
const pad = (i: number) => String(i + 1).padStart(2, "0");

/** The Majlis Gate arch in pixels; k = 1 is the full ogee top, k = 0 a plain rectangle. */
function archPath(x: number, y: number, w: number, h: number, k: number) {
  const t = (v: number) => (y + v * h * k).toFixed(1);
  const X = (v: number) => (x + v * w).toFixed(1);
  return (
    `M${X(0)} ${(y + h).toFixed(1)}V${t(0.4)}` +
    `C${X(0)} ${t(0.26)} ${X(0.17)} ${t(0.22)} ${X(0.32)} ${t(0.165)}` +
    `C${X(0.43)} ${t(0.126)} ${X(0.48)} ${t(0.073)} ${X(0.5)} ${y.toFixed(1)}` +
    `C${X(0.52)} ${t(0.073)} ${X(0.57)} ${t(0.126)} ${X(0.68)} ${t(0.165)}` +
    `C${X(0.83)} ${t(0.22)} ${X(1)} ${t(0.26)} ${X(1)} ${t(0.4)}` +
    `V${(y + h).toFixed(1)}Z`
  );
}

function ConsultBadge() {
  return (
    <Link
      href="/enquiry"
      aria-label={consultationLabel}
      className="hs-extra group absolute -top-4 -right-2 z-10 hidden size-32 place-items-center rounded-full bg-emerald text-champagne shadow-xl shadow-pine/30 transition-transform duration-500 hover:scale-105 lg:grid xl:-right-8"
    >
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <text fontSize="9.2" letterSpacing="2.6" fill="currentColor" style={{ fontFamily: "var(--font-jost)" }}>
          <textPath href="#badge-circle">FREE CONSULTATION ✦ BOOK YOUR VISIT ✦</textPath>
        </text>
      </svg>
      <GateMark className="w-9" medallion="var(--color-emerald)" monogram="var(--color-ivory)" />
    </Link>
  );
}

function Slide({ chapter, index }: { chapter: (typeof story)[number]; index: number }) {
  const last = index === n - 1;
  return (
    <article className="hs-slide relative h-full shrink-0 overflow-hidden bg-pine" style={{ width: `${100 / n}%` }}>
      <div className="hs-img absolute inset-y-0 -inset-x-[12%]">
        <Image
          src={chapter.image.src}
          alt={chapter.image.alt}
          fill
          priority={index < 2}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0 bg-[linear-gradient(100deg,rgb(11_46_39/0.88)_0%,rgb(11_46_39/0.55)_42%,rgb(11_46_39/0.05)_75%)]"
        aria-hidden="true"
      />
      <div className="scrim-bottom absolute inset-0 opacity-70" aria-hidden="true" />
      {index > 0 ? (
        <div className="absolute inset-y-0 left-0 w-10 overflow-hidden" aria-hidden="true">
          <Lattice className="opacity-30" size={40} stroke="var(--color-champagne)" />
          <div className="bg-foil absolute inset-y-0 left-0 w-px" />
        </div>
      ) : null}
      <span
        className="hs-num pointer-events-none absolute right-[6%] bottom-[14%] font-display text-[min(38vw,24rem)] leading-none font-light text-transparent [-webkit-text-stroke:1px_rgb(232_203_122/0.35)] select-none"
        aria-hidden="true"
      >
        {pad(index)}
      </span>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pt-28 pb-28 sm:px-10 lg:pb-32">
        <div className="max-w-2xl text-ivory">
          <p className="hs-fade flex items-center gap-3 text-xs font-medium tracking-brand text-champagne uppercase">
            <span className="h-px w-10 bg-champagne" aria-hidden="true" />
            {pad(index)} · {chapter.label}
          </p>
          <h2 className="hs-title mt-5 font-display text-[2.6rem] leading-[1] font-light sm:text-6xl lg:text-7xl">
            {chapter.title} <em className="text-foil">{chapter.accent}</em>
          </h2>
          <p lang="ar" dir="rtl" className="hs-fade text-foil mt-4 w-fit font-ruqaa text-2xl leading-[1.7] sm:text-3xl">
            {chapter.arabic}
          </p>
          <p className="hs-fade mt-3 max-w-md text-[15px] leading-relaxed text-ivory/85 sm:text-base">{chapter.body}</p>
          {last ? (
            <div className="hs-fade mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/enquiry">{consultationLabel}</Link>
              </Button>
              <Button asChild variant="outline" className="border-ivory/40 text-ivory">
                <Link href="/residences">View our projects</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function StaticStory() {
  return (
    <div className="hs-stack theme-night">
      {story.slice(1).map((chapter, i) => (
        <section key={chapter.label} className="relative flex min-h-[85svh] items-end overflow-hidden">
          <Image src={chapter.image.src} alt={chapter.image.alt} fill sizes="100vw" className="object-cover" />
          <div className="scrim-bottom absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-14 lg:px-10">
            <p className="text-xs font-medium tracking-brand text-champagne uppercase">
              {pad(i + 1)} · {chapter.label}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-none font-light text-ivory sm:text-6xl">
              {chapter.title} <em className="text-foil">{chapter.accent}</em>
            </h2>
            <p lang="ar" dir="rtl" className="text-foil mt-3 w-fit font-ruqaa text-2xl leading-[1.7]">
              {chapter.arabic}
            </p>
            <p className="mt-3 max-w-md text-base text-ivory/85">{chapter.body}</p>
          </div>
        </section>
      ))}
    </div>
  );
}

export function HeroStory() {
  const root = useRef<HTMLDivElement>(null);
  const signature = packages.find((p) => p.featured);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add({ desktop: media.desktop, mobile: media.mobile }, (ctx) => {
        const desktop = Boolean(ctx.conditions?.desktop);
        const q = gsap.utils.selector(el);
        const stage = q(".hs-stage")[0] as HTMLElement;
        const slot = q(".hs-slot")[0] as HTMLElement;
        const layer = q(".hs-layer")[0] as HTMLElement;
        const track = q(".hs-track")[0] as HTMLElement;
        const clip = el.querySelector<SVGPathElement>(".hs-clip-path")!;
        const outline = el.querySelector<SVGPathElement>(".hs-outline")!;
        const counter = q(".hs-counter")[0] as HTMLElement;
        const label = q(".hs-label")[0] as HTMLElement;
        const bar = q(".hs-bar")[0] as HTMLElement;
        const slides = q(".hs-slide") as HTMLElement[];

        el.classList.add("is-animated");

        let from = { x: 0, y: 0, w: 0, h: 0 };
        const state = { p: 0 };
        const measure = () => {
          const s = stage.getBoundingClientRect();
          const r = slot.getBoundingClientRect();
          from = { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
        };
        const draw = () => {
          const W = stage.clientWidth;
          const H = stage.clientHeight;
          const p = state.p;
          const x = gsap.utils.interpolate(from.x, 0, p);
          const y = gsap.utils.interpolate(from.y, 0, p);
          const w = gsap.utils.interpolate(from.w, W, p);
          const h = gsap.utils.interpolate(from.h, H, p);
          const k = 1 - gsap.parseEase("power2.out")(p);
          clip.setAttribute("d", archPath(x, y, w, h, k));
          outline.setAttribute("d", archPath(x - 14, y - 14, w + 28, h + 28, k));
        };
        measure();
        draw();

        let shown = -1;
        const hud = (time: number) => {
          const i = gsap.utils.clamp(0, n - 1, Math.round(time - EXPAND));
          if (i !== shown) {
            shown = i;
            counter.textContent = pad(i);
            label.textContent = story[i].label;
          }
          bar.style.transform = `scaleX(${gsap.utils.clamp(0, 1, (time - EXPAND) / (n - 1))})`;
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.1 + (n - 1) * window.innerWidth * (desktop ? 1 : 1.15)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              state.p = 0;
              draw();
            },
            onRefresh: () => {
              measure();
              draw();
            },
          },
          onUpdate: () => hud(tl.time()),
        });

        tl.to(state, { p: 1, duration: EXPAND, ease: "power2.inOut", onUpdate: draw }, 0)
          .to(q(".hs-copy"), { xPercent: desktop ? -25 : 0, yPercent: desktop ? 0 : -20, opacity: 0, duration: 0.7, ease: "power2.in" }, 0)
          .to(q(".hs-extra"), { opacity: 0, scale: 0.7, duration: 0.5, ease: "power2.in" }, 0)
          .to(outline, { opacity: 0, duration: 0.5 }, 0.5)
          .fromTo(q(".hs-hud"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3 }, EXPAND - 0.3)
          .to(track, { x: () => -(n - 1) * stage.clientWidth, duration: n - 1 }, EXPAND);

        slides.forEach((slide, i) => {
          const title = slide.querySelector(".hs-title");
          const at = i === 0 ? EXPAND - 0.45 : EXPAND + i - 0.4;
          if (title) {
            const split = SplitText.create(title, { type: "lines", mask: "lines" });
            tl.from(split.lines, { yPercent: 110, stagger: 0.07, duration: 0.35, ease: "power3.out" }, at);
          }
          tl.from(slide.querySelectorAll(".hs-fade"), { y: 28, opacity: 0, stagger: 0.06, duration: 0.3, ease: "power2.out" }, at + 0.08);
          const img = slide.querySelector(".hs-img");
          const num = slide.querySelector(".hs-num");
          const start = i === 0 ? EXPAND : EXPAND + i - 1;
          const span = i === 0 ? 1 : 2;
          tl.fromTo(img, { xPercent: i === 0 ? 0 : -8 }, { xPercent: 8, duration: span }, start);
          tl.fromTo(num, { xPercent: i === 0 ? 0 : 40 }, { xPercent: -40, duration: span }, start);
          if (i === 0) tl.from(num, { opacity: 0, duration: 0.4 }, EXPAND - 0.4);
        });

        const delay = introPlays() ? INTRO_SECONDS - 0.4 : 0.1;
        const intro = gsap.timeline({ delay });
        const h1 = SplitText.create(q(".hs-h1"), { type: "lines", mask: "lines" });
        intro
          .from(layer, { opacity: 0, scale: 1.04, duration: 1.4, ease: "power3.out" }, 0)
          .from(h1.lines, { yPercent: 110, stagger: 0.12, duration: 1.1, ease: "power4.out" }, 0.1)
          .from(q(".hs-in"), { y: 24, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" }, 0.4)
          .from(outline, { opacity: 0, duration: 1.2 }, 0.6)
          .from(q(".hs-extra"), { opacity: 0, scale: 0.6, stagger: 0.15, duration: 0.9, ease: "back.out(1.6)" }, 1);

        return () => {
          el.classList.remove("is-animated");
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section className="hs-stage theme-linen relative h-svh min-h-[560px] overflow-hidden" aria-label="Opulent Living, the story">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]" aria-hidden="true">
          <Lattice className="opacity-[0.09] [mask-image:linear-gradient(to_left,black,transparent)]" />
        </div>
        <div className="absolute -top-40 -left-40 size-[38rem] rounded-full bg-champagne/25 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col gap-6 px-6 pt-24 pb-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-24 lg:pb-10 lg:px-10">
          <div className="hs-copy lg:col-span-6">
            <p className="hs-in flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-gold uppercase sm:text-xs sm:tracking-brand">
              <span className="h-px w-10 bg-brass" aria-hidden="true" />
              {hero.eyebrow}
            </p>
            <h1 className="hs-h1 mt-4 font-display text-[3.2rem] leading-[0.95] font-light text-beige sm:text-7xl lg:mt-6 xl:text-[7.25rem]">
              {hero.lead} <em className="text-foil-deep block">{hero.rest}</em>
            </h1>
            <p lang="ar" dir="rtl" className="hs-in text-foil-deep mt-2 w-fit font-ruqaa text-2xl leading-[1.7] sm:text-4xl">
              {hero.arabic}
            </p>
            <p className="hs-in mt-3 hidden max-w-lg text-base leading-relaxed text-ash sm:block sm:text-lg">{hero.sub}</p>
            <div className="hs-in mt-5 flex flex-wrap items-center gap-3 lg:mt-8">
              <Button asChild>
                <Link href="/enquiry">{consultationLabel}</Link>
              </Button>
              <Button asChild variant="outline" className="hidden sm:inline-flex">
                <Link href="/residences">View our projects</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1 lg:col-span-6 lg:h-[min(78svh,44rem)] lg:flex-none lg:pl-6">
            <div className="hs-slot arch-ogee relative mx-auto h-full max-h-full w-full max-w-[22rem] sm:max-w-[28rem] lg:aspect-[4/5] lg:h-auto lg:max-h-full lg:max-w-[34rem]">
              <div className="hs-static absolute inset-0 bg-sand">
                <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 z-30 lg:pl-6">
              <div className="relative mx-auto h-full w-full max-w-[22rem] sm:max-w-[28rem] lg:aspect-[4/5] lg:h-auto lg:max-w-[34rem]">
                <ConsultBadge />
                {signature ? (
                  <div className="hs-extra pointer-events-auto absolute -bottom-6 -left-10 z-10 hidden lg:block">
                    <div className="animate-float flex items-center gap-4 bg-ivory/95 py-4 pr-6 pl-4 shadow-2xl shadow-pine/20 backdrop-blur">
                      <span className="grid size-12 place-items-center bg-emerald">
                        <GateMark className="w-6" medallion="var(--color-emerald)" monogram="var(--color-ivory)" />
                      </span>
                      <span>
                        <span className="block text-[10px] font-medium tracking-brand text-gold uppercase">
                          {signature.name} package
                        </span>
                        <span className="mt-1 block font-display text-2xl leading-none text-beige">
                          from {signature.price}
                          <span className="ml-1 font-sans text-xs text-ash">{signature.unit}</span>
                        </span>
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <clipPath id="hs-clip" clipPathUnits="userSpaceOnUse">
            <path className="hs-clip-path" />
          </clipPath>
        </svg>
        <div className="hs-layer invisible absolute inset-0 z-20 [clip-path:url(#hs-clip)]">
          <div className="hs-track flex h-full" style={{ width: `${n * 100}%` }}>
            {story.map((chapter, i) => (
              <Slide key={chapter.label} chapter={chapter} index={i} />
            ))}
          </div>
        </div>
        <svg className="pointer-events-none invisible absolute inset-0 z-20 h-full w-full text-brass [.is-animated_&]:visible" aria-hidden="true">
          <path className="hs-outline" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="hs-hud invisible absolute inset-x-0 bottom-0 z-30 opacity-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 pb-6 sm:px-10 lg:pb-8">
            <div className="flex items-center justify-between gap-4 text-xs font-medium tracking-brand text-ivory uppercase">
              <span aria-live="polite">
                <span className="hs-counter">01</span>
                <span className="text-ivory/50"> / {pad(n - 1)}</span>
                <span className="hs-label ml-3 hidden text-champagne sm:inline">{story[0].label}</span>
              </span>
              <a href="#welcome" className="inline-flex h-11 items-center text-ivory/70 hover:text-ivory">
                Skip the story ↓
              </a>
            </div>
            <div className="h-px w-full bg-ivory/20" aria-hidden="true">
              <div className="hs-bar bg-foil h-px origin-left scale-x-0" />
            </div>
          </div>
        </div>
      </section>
      <StaticStory />
    </div>
  );
}
