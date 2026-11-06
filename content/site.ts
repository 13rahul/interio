// Placeholder contact details until the client confirms them.
export const site = {
  name: "Opulent Living",
  legalName: "Opulent Living Design Services",
  founder: "Jyoti Joshi",
  place: "Dubai",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://opulentliving.ae",
  email: "hello@opulentliving.ae",
  phone: "+971 4 000 0000",
  phoneHref: "tel:+97140000000",
  whatsappHref: "https://wa.me/971500000000",
  address: "Dubai Design District, Dubai, United Arab Emirates",
  description:
    "Opulent Living Design Services is an affordable luxury interior design studio in Dubai for villas, apartments, hospitality, and commercial spaces, with turnkey fit-out.",
};

export const nav = [
  { href: "/residences", label: "Projects" },
  { href: "/practice", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/atelier", label: "Studio" },
] as const;

export const consultationLabel = "Book a consultation";

export const principles = [
  {
    title: "One team, start to finish",
    body: "The designer who sketches your first plan walks the site at handover. Nothing is passed to a contractor you have never met.",
  },
  {
    title: "Luxury, honestly priced",
    body: "A fixed quote with every line itemised. We choose finishes that look and feel expensive, without paying for a label.",
  },
  {
    title: "Climate first",
    body: "Shade, glare, and heat are solved in the plan before a single finish is chosen. Rooms stay calm at three in the afternoon.",
  },
  {
    title: "Restraint over display",
    body: "Gold as a single line, not a surface. Stone chosen for the house, not repeated from villa to villa.",
  },
] as const;
