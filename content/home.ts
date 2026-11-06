export type Img = { src: string; width: number; height: number; alt: string };

const wide = { width: 1280, height: 720 };
const tall = { width: 864, height: 1152 };
const square = { width: 1024, height: 1024 };

export const hero = {
  eyebrow: "Affordable luxury interiors · Dubai",
  lead: "Luxury,",
  rest: "within reach.",
  sub: "Villas, apartments, hotels, and workplaces, designed and delivered turnkey by one Dubai studio, at a fixed and honest price.",
  image: {
    src: "/images/hero.jpg",
    ...wide,
    alt: "A villa majlis at dusk: long linen seating, a travertine wall with a brass inlay, an oak screen, and an arched view to a lit courtyard.",
  },
  hotspots: [
    { label: "Oak screen", x: 44, y: 30 },
    { label: "Brushed brass", x: 63, y: 46 },
    { label: "Travertine", x: 64, y: 20 },
  ],
} as const;

export type StoryChapter = {
  label: string;
  title: string;
  accent: string;
  body: string;
  image: Img;
};

// Frame 0 carries the hero headline; the last frame is hero.image with the hotspots.
export const story: StoryChapter[] = [
  {
    label: "Prologue · First light",
    title: "",
    accent: "",
    body: "",
    image: {
      src: "/images/story-dawn.jpg",
      ...wide,
      alt: "First light over the desert, with the Dubai skyline and the Burj Khalifa on the horizon.",
    },
  },
  {
    label: "I · The city",
    title: "Shade came",
    accent: "first.",
    body: "Before the towers, Dubai built wind towers, courtyards, and deep doorways. Every Opulent Living home still starts there.",
    image: {
      src: "/images/story-heritage.jpg",
      ...wide,
      alt: "A lane in Al Fahidi at golden hour, with coral-stone houses, wind towers, and an abra on Dubai Creek.",
    },
  },
  {
    label: "II · The hand",
    title: "Made by",
    accent: "hand.",
    body: "Every screen is drawn in our studio, then carved, inlaid, and fitted by our own craftsmen.",
    image: {
      src: "/images/story-craft.jpg",
      ...wide,
      alt: "A craftsman's hands carving a geometric oak mashrabiya screen with a thin brass inlay.",
    },
  },
  {
    label: "III · The welcome",
    title: "Every house begins in the",
    accent: "majlis.",
    body: "Gahwa poured, dates on walnut, the light kept low. We design the room around the welcome.",
    image: {
      src: "/images/story-majlis.jpg",
      ...wide,
      alt: "An Emirati host in a kandura pouring Arabic coffee from a brass dallah for a guest in a travertine majlis.",
    },
  },
  {
    label: "IV · The family",
    title: "Rooms for a",
    accent: "Friday.",
    body: "Courtyards cool enough to cross at noon, and doorways that glow when everyone comes home.",
    image: {
      src: "/images/story-family.jpg",
      ...wide,
      alt: "A mother in an abaya, seen from behind, walking with her child toward a glowing arched doorway in a villa courtyard.",
    },
  },
  {
    label: "V · The room",
    title: "This is",
    accent: "Opulent Living.",
    body: hero.sub,
    image: hero.image,
  },
];

// Placeholder figures, to replace with the client's real numbers.
export const stats = [
  { value: "140+", label: "Projects delivered" },
  { value: "18", label: "Years of design experience" },
  { value: "3", label: "Cities: Dubai, Abu Dhabi, Riyadh" },
  { value: "1", label: "Studio from concept to keys" },
] as const;

// Placeholder credentials, to confirm with the client or swap for real press and awards.
export const credentials = [
  "Dubai Municipality approved fit-out",
  "DDA and Trakhees approvals in-house",
  "Own joinery workshop in Al Quoz",
  "Fixed, itemised quotes",
] as const;

export const manifesto =
  "We design for the light at four in the afternoon, the family on a Friday, and the guest who stays late.";

export const sectors = [
  {
    number: "01",
    slug: "villas",
    name: "Villas",
    line: "Whole houses composed from the courtyard inward.",
    href: "/practice#villas",
    body: "The court, the majlis, and the family rooms are drawn as one sequence, so shade and privacy arrive before decoration. We work on new builds and full renovations across Emirates Hills, Jumeirah, and Al Barari.",
    scope: ["Interior architecture", "Majlis and family wings", "Landscape thresholds", "Furniture and art curation"],
    image: {
      src: "/images/sector-villas.jpg",
      ...tall,
      alt: "Double-height villa living room with a curved travertine staircase and a planted courtyard behind glass.",
    },
  },
  {
    number: "02",
    slug: "penthouses",
    name: "Apartments",
    line: "Apartments and penthouses with the glare edited out.",
    href: "/practice#penthouses",
    body: "An apartment in Dubai is mostly a problem of light. We screen, layer, and soften the edges until the view can be lived with at three in the afternoon, then finish the rooms around it.",
    scope: ["Layout reconfiguration", "Glare and acoustic control", "Bespoke joinery", "Smart lighting"],
    image: {
      src: "/images/sector-penthouses.jpg",
      ...tall,
      alt: "Penthouse living room at blue hour, a boucle sofa and travertine table facing the Burj Khalifa.",
    },
  },
  {
    number: "03",
    slug: "hospitality",
    name: "Hospitality",
    line: "Hotels and restaurants guests remember by feel.",
    href: "/practice#hospitality",
    body: "Lobbies, suites, restaurants, and lounges designed to the operator's brief and brand standards, with materials chosen to age well under heavy use.",
    scope: ["Hotel lobbies and suites", "Restaurants and lounges", "Operator brand standards", "FF&E specification"],
    image: {
      src: "/images/sector-hospitality.jpg",
      ...tall,
      alt: "Hotel lobby with a travertine reception desk edged in brass and a sequence of limestone arches.",
    },
  },
  {
    number: "04",
    slug: "commercial",
    name: "Commercial",
    line: "Family offices and boardrooms with a residential calm.",
    href: "/practice#commercial",
    body: "Family offices, private banks, and headquarters floors that receive guests the way a home would, while meeting Dubai's authority and landlord requirements.",
    scope: ["Family offices", "Boardrooms and reception", "Executive floors", "Authority approvals"],
    image: {
      src: "/images/sector-commercial.jpg",
      ...tall,
      alt: "Boardroom with a long walnut table, beige chairs, a travertine wall, and brass pendant lights.",
    },
  },
  {
    number: "05",
    slug: "fit-out",
    name: "Turnkey fit-out",
    line: "Drawings, joinery, and site, under one contract.",
    href: "/practice#fit-out",
    body: "One contract from concept to keys: design, approvals, our own joinery workshop, and site delivery, with a weekly report and a single person to call.",
    scope: ["Design and build", "Dubai Municipality and DDA approvals", "In-house joinery", "Handover and aftercare"],
    image: {
      src: "/images/sector-fitout.jpg",
      ...tall,
      alt: "Atelier bench with travertine samples, folded linen, brass trims, and a pencil floor plan.",
    },
  },
] as const;

export const transformation = {
  title: "From shell to home",
  caption: "Palm Jumeirah — from shell to handover in 14 months.",
  before: {
    src: "/images/shell.jpg",
    ...wide,
    alt: "The living room as a bare concrete shell with exposed conduit and building materials.",
  },
  after: {
    src: "/images/finished.jpg",
    ...wide,
    alt: "The same living room finished in travertine and limestone with a linen sofa and a sea view.",
  },
} as const;

export const projects = [
  {
    slug: "the-court-house",
    name: "The Court House",
    place: "Emirates Hills",
    typology: "Villa",
    area: "1,850 m²",
    line: "A dining room that opens onto a lit court, under one brass line.",
    shape: "wide",
    image: {
      src: "/images/project-court-house.jpg",
      ...wide,
      alt: "Villa dining room at night with a travertine table, a sculptural brass chandelier, and an arched courtyard view.",
    },
  },
  {
    slug: "the-high-room",
    name: "The High Room",
    place: "Downtown",
    typology: "Penthouse",
    area: "620 m²",
    line: "A bedroom with the afternoon glare taken out of it.",
    shape: "tall",
    image: {
      src: "/images/project-high-room.jpg",
      ...tall,
      alt: "Penthouse bedroom with linen bedding, a walnut wall with a brass line, and sheer curtains.",
    },
  },
  {
    slug: "the-garden-liwan",
    name: "The Garden Liwan",
    place: "Jumeirah",
    typology: "Villa",
    area: "940 m²",
    line: "A travertine bath in the shade of an oak screen.",
    shape: "tall",
    image: {
      src: "/images/project-garden-liwan.jpg",
      ...tall,
      alt: "Bathroom with a freestanding travertine tub, a brass spout, and slatted oak shade.",
    },
  },
  {
    slug: null,
    name: "Arches, DIFC",
    place: "DIFC",
    typology: "Restaurant",
    area: "410 m²",
    line: "Banquettes set under limestone arches, lit for a long dinner.",
    shape: "wide",
    image: {
      src: "/images/project-difc-restaurant.jpg",
      ...wide,
      alt: "Restaurant with curved beige banquettes, walnut tables, and a travertine bar under limestone arches.",
    },
  },
  {
    slug: "the-family-court",
    name: "The Family Court",
    place: "Dubai Hills",
    typology: "Majlis",
    area: "280 m²",
    line: "A majlis sized for the family, not for a photograph.",
    shape: "wide",
    image: {
      src: "/images/project-family-majlis.jpg",
      ...wide,
      alt: "Family majlis with long linen seating along a walnut wall, a brass coffee set, and a garden view.",
    },
  },
] as const;

export const materials = [
  {
    name: "Travertine",
    note: "Honed, left open-pored. Cool underfoot after noon.",
    image: { src: "/images/material-travertine.jpg", ...square, alt: "An upright slab of honed beige travertine." },
    callouts: ["Honed finish", "Cool in summer", "Sourced from Tivoli"],
  },
  {
    name: "Brushed brass",
    note: "One metal, used as a line rather than a surface.",
    image: {
      src: "/images/material-brass.jpg",
      ...square,
      alt: "A beige stone panel with a slim brushed brass inlay.",
    },
    callouts: ["Inlaid by hand", "Ages to a soft gold", "One line per room"],
  },
  {
    name: "Walnut",
    note: "Oiled and fluted, for doors, screens, and long tables.",
    image: { src: "/images/material-walnut.jpg", ...square, alt: "A fluted walnut joinery sample." },
    callouts: ["Oiled, not lacquered", "Made in our workshop", "Fluted by hand"],
  },
  {
    name: "Linen",
    note: "Belgian linen in sand and stone, for seating that softens.",
    image: { src: "/images/material-linen.jpg", ...square, alt: "A folded stack of natural beige linen." },
    callouts: ["Belgian weave", "Washable covers", "Sand and stone tones"],
  },
] as const;

export const process = [
  { number: "01", title: "Brief", time: "Week 1", body: "A walk through the house and how the family lives in it, including the hour the light becomes too much." },
  { number: "02", title: "Concept", time: "Weeks 2–6", body: "Plans, a material board, and a mood film, presented in the studio with samples you can hold." },
  { number: "03", title: "Design development", time: "Months 2–4", body: "Every joinery piece, light, and finish drawn, priced, and signed off before site begins." },
  { number: "04", title: "Build", time: "Months 4–12", body: "Our own site team and workshop, with a weekly report and one person to call." },
  { number: "05", title: "Handover", time: "Keys", body: "Styled, cleaned, and photographed. We return after three months to adjust what living reveals." },
] as const;

// Placeholder testimonial until the client supplies a real one.
export const testimonial = {
  quote:
    "They listened to how we actually live — Friday lunches, the afternoon heat, the children — and the house now feels calm in a way we didn't know to ask for.",
  name: "Mariam A.",
  role: "Villa owner, Emirates Hills",
  projectHref: "/residences/the-court-house",
  image: {
    src: "/images/portrait.jpg",
    ...square,
    alt: "A villa owner seated in her travertine and walnut living room.",
  },
} as const;

export const closing = {
  title: "Begin with a private consultation.",
  body: "Tell us about the house, the hotel, or the floor. We reply within one working day, and the first meeting is at your site or our studio in d3.",
  image: {
    src: "/images/close.jpg",
    ...wide,
    alt: "A villa colonnade of limestone arches at night, lit by a single brass lantern.",
  },
} as const;
