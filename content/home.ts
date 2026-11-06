export type Img = { src: string; width: number; height: number; alt: string };

const wide = { width: 1280, height: 720 };
const tall = { width: 864, height: 1152 };
const square = { width: 1024, height: 1024 };

export const hero = {
  eyebrow: "Affordable luxury interiors · Dubai",
  lead: "Opulence,",
  rest: "within reach.",
  arabic: "الفخامة في متناول يدك",
  sub: "Villas, apartments, majlis, and hospitality interiors, designed and delivered turnkey by one Dubai studio, at a fixed and honest price.",
  image: {
    src: "/images/hero.jpg",
    ...wide,
    alt: "A villa majlis at dusk: long linen seating, a travertine wall with a brass inlay, an oak screen, and an arched view to a lit courtyard.",
  },
} as const;

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

export const marquee = [
  "Villas",
  "Majlis",
  "Apartments",
  "Penthouses",
  "Hospitality",
  "Family offices",
  "Bespoke joinery",
  "Turnkey fit-out",
] as const;

export const welcome = {
  eyebrow: "Welcome",
  arabic: "أهلاً وسهلاً",
  title: "A home that welcomes",
  accent: "every guest.",
  body: "In an Emirati home, generosity to the guest is the truest wealth. We design around that: a majlis that feels grand, family rooms that feel calm, and a budget that is written down before a single finish is chosen.",
  founderNote:
    "Luxury is not a price tag. It is how a room makes you feel when the coffee is poured and the family arrives.",
  founderRole: "Founder and principal designer",
  image: {
    src: "/images/story-majlis.jpg",
    ...wide,
    alt: "An Emirati host pouring Arabic coffee from a brass dallah for a guest in a travertine majlis.",
  },
  inset: {
    src: "/images/story-craft.jpg",
    ...wide,
    alt: "A craftsman carving a geometric oak mashrabiya screen.",
  },
} as const;

// Placeholder packages and prices, to confirm with the client before launch.
export const packages = [
  {
    name: "Essential",
    arabic: "أساسي",
    price: "AED 85",
    unit: "per sq ft",
    line: "A room or apartment refreshed, designed in four weeks.",
    features: ["Concept and mood board", "3D visuals of every room", "Furniture and lighting plan", "Shopping list with prices"],
    featured: false,
  },
  {
    name: "Signature",
    arabic: "التوقيع",
    price: "AED 165",
    unit: "per sq ft",
    line: "Full design and fit-out for villas and apartments.",
    features: [
      "Everything in Essential",
      "Bespoke joinery and majlis seating",
      "Dubai Municipality approvals",
      "Site team and weekly report",
      "Styling and handover",
    ],
    featured: true,
  },
  {
    name: "Palace",
    arabic: "القصر",
    price: "Bespoke",
    unit: "fixed quote",
    line: "Whole villas, hospitality, and family offices.",
    features: ["Everything in Signature", "Interior architecture", "Art and antiques curation", "Aftercare for one year"],
    featured: false,
  },
] as const;

// Placeholder testimonials until the client supplies real ones.
export const testimonials = [
  {
    quote:
      "They listened to how we actually live — Friday lunches, the afternoon heat, the children — and the house now feels calm in a way we didn't know to ask for.",
    name: "Mariam A.",
    role: "Villa owner, Emirates Hills",
  },
  {
    quote:
      "Our majlis looks like a five-star hotel lounge, and the final bill matched the first quote to the dirham. Guests always ask who designed it.",
    name: "Khalid R.",
    role: "Villa owner, Al Barari",
  },
  {
    quote:
      "From the first sketch to the keys, one team and one phone number. The apartment was finished in ten weeks while we were abroad.",
    name: "Noura S.",
    role: "Apartment owner, Downtown",
  },
] as const;

export const faqs = [
  {
    q: "What does affordable luxury mean at Opulent Living?",
    a: "Rooms that look and feel like a five-star hotel, with finishes chosen for how they look and last rather than for a label. Every quote is fixed and itemised, so you know the full cost before work begins.",
  },
  {
    q: "Do you handle approvals and the fit-out?",
    a: "Yes. We prepare drawings for Dubai Municipality, DDA, and Trakhees, then deliver the fit-out with our own site team and joinery workshop under one contract.",
  },
  {
    q: "How long does a project take?",
    a: "A single room or apartment refresh takes four to ten weeks. A full villa usually takes six to twelve months from brief to handover.",
  },
  {
    q: "Can you design a traditional majlis and a modern family wing in one house?",
    a: "That is most of our work. The majlis can be grand and formal while the family rooms stay calm and practical, with one material language joining them.",
  },
  {
    q: "Is the first consultation free?",
    a: "Yes. The first meeting is at your home or our studio in Dubai Design District, with no obligation.",
  },
] as const;

export const gallery = [
  { src: "/images/project-family-majlis.jpg", alt: "A family majlis with long linen seating and a brass coffee set." },
  { src: "/images/sector-villas.jpg", alt: "A double-height villa living room with a curved travertine staircase." },
  { src: "/images/material-brass.jpg", alt: "A stone panel with a slim brushed brass inlay." },
  { src: "/images/project-garden-liwan.jpg", alt: "A travertine bath in the shade of an oak screen." },
  { src: "/images/sector-hospitality.jpg", alt: "A hotel lobby with a travertine desk and limestone arches." },
  { src: "/images/project-high-room.jpg", alt: "A penthouse bedroom with linen bedding and a walnut wall." },
] as const;

export const closing = {
  title: "Begin with a private consultation.",
  body: "Tell us about the house, the hotel, or the floor. We reply within one working day, and the first meeting is at your site or our studio in d3.",
  image: {
    src: "/images/close.jpg",
    ...wide,
    alt: "A villa colonnade of limestone arches at night, lit by a single brass lantern.",
  },
} as const;
