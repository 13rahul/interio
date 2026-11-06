"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { hero, story, type StoryChapter } from "@/content/home";
import { consultationLabel } from "@/content/site";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;
const count = story.length;
const seg = 1 / count;
const fade = seg * 0.4;

function ArrowChip() {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-gold text-gold" aria-hidden="true">
      <svg viewBox="0 0 16 16" className="size-3" fill="none">
        <path d="M4 12 L12 4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 4 H12 V9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </span>
  );
}

function Intro({ animate }: { animate: boolean }) {
  const enter = (delay: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, ease, delay },
        }
      : {};

  return (
    <>
      <motion.p className="text-xs font-medium tracking-brand text-ash uppercase" {...enter(0.2)}>
        {hero.eyebrow}
      </motion.p>
      <h1 className="mt-4 font-display font-light text-beige">
        <motion.span
          className="block text-[min(5.5rem,15svh)] leading-[0.85] sm:text-[min(8rem,17svh)] lg:text-[min(11rem,19svh)]"
          {...enter(0.35)}
        >
          {hero.lead}
        </motion.span>
        <motion.span
          className="block pl-[0.15em] text-[min(3rem,7svh)] leading-[1] italic sm:text-[min(3.75rem,8svh)] lg:pl-[1.2em] lg:text-[min(4.5rem,9svh)]"
          {...enter(0.5)}
        >
          {hero.rest}
        </motion.span>
      </h1>
    </>
  );
}

function ChapterText({ chapter }: { chapter: StoryChapter }) {
  return (
    <>
      <p className="text-xs font-medium tracking-brand text-gold uppercase">{chapter.label}</p>
      <h2 className="mt-4 font-display text-[min(3rem,8svh)] leading-[0.95] font-light text-beige sm:text-[min(4.5rem,10svh)] lg:text-[min(6rem,11svh)]">
        {chapter.title} <em>{chapter.accent}</em>
      </h2>
      <p className="mt-[min(1.5rem,2.5svh)] max-w-md text-base leading-relaxed text-beige/85">{chapter.body}</p>
    </>
  );
}

// Scroll-linked values run on native animations, so every offset must stay within 0..1.
const first = (index: number) => index === 0;
const last = (index: number) => index === count - 1;

function fadeIn(index: number) {
  const start = index * seg;
  return first(index) ? { input: [0, 1], output: [1, 1] } : { input: [start - fade / 2, start + fade / 2], output: [0, 1] };
}

function captionWindow(index: number) {
  const start = index * seg;
  const inPart = first(index) ? [0] : [start - fade / 2, start + fade / 2];
  const outPart = last(index) ? [1] : [start + seg - fade / 2, start + seg + fade / 2];
  const opacity = [...(first(index) ? [1] : [0, 1]), ...(last(index) ? [1] : [1, 0])];
  const y = [...(first(index) ? [0] : [32, 0]), ...(last(index) ? [0] : [0, -32])];
  return { input: [...inPart, ...outPart], opacity, y };
}

function Layer({ chapter, index, progress }: { chapter: StoryChapter; index: number; progress: MotionValue<number> }) {
  const start = index * seg;
  const shown = fadeIn(index);
  const opacity = useTransform(progress, shown.input, shown.output);
  const scale = useTransform(progress, [Math.max(0, start - seg), Math.min(1, start + seg)], [1.12, 1]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity }}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        <div className={index % 2 === 0 ? "animate-drift absolute inset-0" : "animate-drift absolute inset-0 [animation-direction:alternate-reverse]"}>
          <Image
            src={chapter.image.src}
            alt={chapter.image.alt}
            fill
            priority={index < 2}
            sizes="100vw"
            className="object-cover object-[65%_center]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Caption({
  chapter,
  index,
  progress,
}: {
  chapter: StoryChapter;
  index: number;
  progress: MotionValue<number>;
}) {
  const range = captionWindow(index);
  const opacity = useTransform(progress, range.input, range.opacity);
  const y = useTransform(progress, range.input, range.y);

  return (
    <motion.div className="pointer-events-none col-start-1 row-start-1 self-end" style={{ opacity, y }}>
      {index === 0 ? (
        <>
          <Intro animate />
          <motion.p
            className="mt-[min(2rem,3svh)] flex items-center gap-3 text-xs font-medium tracking-brand text-beige/90 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            <span className="relative h-8 w-px overflow-hidden bg-beige/20" aria-hidden="true">
              <span className="animate-cue absolute inset-x-0 top-0 h-1/2 bg-brass" />
            </span>
            Scroll to begin the story
          </motion.p>
        </>
      ) : (
        <ChapterText chapter={chapter} />
      )}
    </motion.div>
  );
}

function Hotspots({ progress }: { progress: MotionValue<number> }) {
  const start = (count - 1) * seg;
  const opacity = useTransform(progress, [start + fade / 2, Math.min(1, start + fade * 1.5)], [0, 1]);

  return (
    <motion.ul className="absolute inset-0 hidden lg:block" style={{ opacity }} aria-label="Materials in this room">
      {hero.hotspots.map((spot) => (
        <li key={spot.label} className="absolute" style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
          <span className="flex items-center gap-3 rounded-full border border-beige/25 bg-charcoal/60 py-1.5 pr-1.5 pl-4 backdrop-blur-sm">
            <span className="text-xs font-medium tracking-brand text-beige uppercase">{spot.label}</span>
            <ArrowChip />
          </span>
        </li>
      ))}
    </motion.ul>
  );
}

function StoryFilm() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const scrimOpacity = useTransform(scrollYProgress, [0, seg], [0.72, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count + 0.25))));
  });

  return (
    <section ref={ref} className="theme-night story-film relative h-[420vh]" id="top" aria-label="The Liwan story">
      <div className="sticky top-0 h-svh overflow-hidden">
        {story.map((chapter, i) => (
          <Layer key={chapter.image.src} chapter={chapter} index={i} progress={scrollYProgress} />
        ))}
        <motion.div className="absolute inset-0" style={{ opacity: scrimOpacity }} aria-hidden="true">
          <div className="scrim-left absolute inset-0" />
          <div className="scrim-bottom absolute inset-0" />
        </motion.div>
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/80 to-transparent" aria-hidden="true" />

        <Hotspots progress={scrollYProgress} />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end gap-[min(2.5rem,4svh)] px-6 pt-24 pb-[min(2.5rem,4svh)] lg:px-10">
          <div className="grid max-w-3xl">
            {story.map((chapter, i) => (
              <Caption key={chapter.label} chapter={chapter} index={i} progress={scrollYProgress} />
            ))}
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex w-full max-w-md flex-col gap-3">
              <div className="flex items-center justify-between gap-4 text-xs font-medium tracking-brand uppercase">
                <span className="text-beige" aria-live="polite">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-ash"> / {String(count).padStart(2, "0")}</span>
                  <span className="sr-only">, {story[active].label}</span>
                </span>
                <a href="#after-story" className="inline-flex h-11 items-center text-ash hover:text-beige">
                  Skip the story ↓
                </a>
              </div>
              <div className="h-px w-full bg-beige/20" aria-hidden="true">
                <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-brass" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.85 }}
            >
              <Button
                asChild
                variant="circle"
                className="hidden sm:inline-flex [@media(max-height:700px)]:size-32 [@media(max-height:700px)]:px-3 [@media(max-height:700px)]:tracking-[0.18em]"
              >
                <Link href="/enquiry">{consultationLabel}</Link>
              </Button>
              <Button asChild className="w-full sm:hidden">
                <Link href="/enquiry">{consultationLabel}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryStack() {
  return (
    <section className="theme-night story-stack" aria-label="The Liwan story">
      {story.map((chapter, i) => (
        <div key={chapter.label} className="relative flex min-h-[85svh] items-end overflow-hidden">
          <Image
            src={chapter.image.src}
            alt={chapter.image.alt}
            fill
            sizes="100vw"
            className="object-cover object-[65%_center]"
          />
          <div className="scrim-left absolute inset-0" aria-hidden="true" />
          <div className="scrim-bottom absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-14 lg:px-10">
            <div className="max-w-3xl">{i === 0 ? <Intro animate={false} /> : <ChapterText chapter={chapter} />}</div>
            {(i === 0 || i === count - 1) && (
              <Button asChild className="mt-10">
                <Link href="/enquiry">{consultationLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export function Hero() {
  return (
    <>
      <StoryFilm />
      <StoryStack />
      <div id="after-story" />
    </>
  );
}
