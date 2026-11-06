export const INTRO_KEY = "ol-intro-seen";
const KEY = INTRO_KEY;
let plays: boolean | undefined;

/** Whether the opening doors play on this page load: once per session, never with reduced motion. */
export function introPlays() {
  if (typeof window === "undefined") return false;
  if (plays === undefined) {
    plays = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !sessionStorage.getItem(KEY);
    if (plays) sessionStorage.setItem(KEY, "1");
  }
  return plays;
}

/** After the doors have opened once, later visits to the home page in this tab skip them. */
export function markIntroDone() {
  plays = false;
  document.documentElement.dataset.intro = "skip";
}

export const INTRO_SECONDS = 2.6;
