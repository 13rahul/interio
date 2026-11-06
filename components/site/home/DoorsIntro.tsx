"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GateMark, Ornament } from "@/components/brand/GateMark";
import { Lattice } from "@/components/brand/Lattice";
import { INTRO_KEY, INTRO_SECONDS, introPlays, markIntroDone } from "@/lib/intro";
import { arabicName } from "../Logo";

const ease = [0.76, 0, 0.24, 1] as const;

// Runs before first paint so repeat visits and reduced-motion users never see the doors.
const skipScript = `try{if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.intro="skip"}catch(e){}`;

function Door({ side }: { side: "left" | "right" }) {
  return (
    <motion.div
      className={`absolute inset-y-0 w-1/2 overflow-hidden bg-emerald ${side === "left" ? "left-0" : "right-0"}`}
      initial={{ x: 0 }}
      exit={{ x: side === "left" ? "-100%" : "100%" }}
      transition={{ duration: 1.1, ease }}
    >
      <Lattice className="opacity-[0.14]" size={72} />
      <div
        className={`absolute inset-y-0 w-px bg-foil ${side === "left" ? "right-0" : "left-0"}`}
        aria-hidden="true"
      />
    </motion.div>
  );
}

/** Opening sequence: the gate draws itself, then the doors open onto the home page. */
export function DoorsIntro() {
  const [state, setState] = useState<"pending" | "play" | "done" | "skip">("pending");

  useEffect(() => {
    if (!introPlays()) {
      setState("skip");
      return;
    }
    setState("play");
    const t = window.setTimeout(() => setState("done"), INTRO_SECONDS * 1000);
    const end = window.setTimeout(markIntroDone, INTRO_SECONDS * 1000 + 1200);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(end);
    };
  }, []);

  if (state === "skip") return null;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipScript }} />
      <AnimatePresence>
        {state !== "done" ? (
          <motion.div
            key="intro"
            className="intro-fallback fixed inset-0 z-[60]"
            aria-hidden="true"
            exit={{ pointerEvents: "none" }}
            transition={{ duration: 1.1 }}
          >
            <Door side="left" />
            <Door side="right" />
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <GateMark draw className="w-24 sm:w-28" medallion="var(--color-emerald)" monogram="var(--color-ivory)" />
              <motion.p
                className="mt-6 font-display text-xl font-medium tracking-[0.4em] text-ivory uppercase sm:text-2xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Opulent Living
              </motion.p>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.5 }}
              >
                <Ornament className="mt-3 w-24 text-champagne" />
                <span lang="ar" className="text-foil mt-1 font-arabic text-xl font-bold">
                  {arabicName}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
