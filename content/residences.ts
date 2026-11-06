export type FrameVariant = "arch" | "shade" | "stone" | "timber" | "gold" | "room";

export type Residence = {
  slug: string;
  name: string;
  place: string;
  typology: string;
  line: string;
  variant: FrameVariant;
  image: { src: string; width: number; height: number; alt: string };
  story: string;
  facts: { label: string; value: string }[];
  materials: { name: string; note: string; variant: FrameVariant }[];
};

export const residences: Residence[] = [
  {
    slug: "the-court-house",
    name: "The Court House",
    place: "Emirates Hills",
    typology: "Private house",
    line: "A courtyard that keeps the afternoon out of the rooms.",
    variant: "arch",
    image: {
      src: "/images/project-court-house.jpg",
      width: 1280,
      height: 720,
      alt: "Villa dining room at night with a travertine table, a sculptural brass chandelier, and an arched courtyard view.",
    },
    story:
      "The house turns its back on the west and opens through a liwan into a planted court. Rooms take light from that court, not from the street. Gold appears once, as the threshold under the main door.",
    facts: [
      { label: "Arrangement", value: "Six rooms, one court" },
      { label: "Shade", value: "A liwan along the west" },
      { label: "Metal", value: "One gold threshold" },
    ],
    materials: [
      { name: "Court", note: "Planted, and left open to the sky.", variant: "arch" },
      { name: "Stone", note: "A cool floor, bare underfoot.", variant: "stone" },
      { name: "Threshold", note: "The only gold in the house.", variant: "gold" },
    ],
  },
  {
    slug: "the-long-shade",
    name: "The Long Shade",
    place: "Palm Jumeirah",
    typology: "Private house",
    line: "A covered walk the length of the water, before any room begins.",
    variant: "shade",
    image: {
      src: "/images/finished.jpg",
      width: 1280,
      height: 720,
      alt: "Living room finished in travertine and limestone with a linen sofa and a view of the sea.",
    },
    story:
      "The first architecture is a walk in shade. Guests arrive along it. The rooms sit behind a timber screen, so the water is there without the glare that usually comes with it.",
    facts: [
      { label: "Arrival", value: "A shaded walk" },
      { label: "Screen", value: "Timber, floor to ceiling" },
      { label: "View", value: "Edited, not erased" },
    ],
    materials: [
      { name: "Walk", note: "Shade before the front door.", variant: "shade" },
      { name: "Screen", note: "Timber cut to the path of the sun.", variant: "timber" },
      { name: "Room", note: "The sitting room faces the walk.", variant: "room" },
    ],
  },
  {
    slug: "the-high-room",
    name: "The High Room",
    place: "Downtown",
    typology: "Penthouse",
    line: "A high room with the afternoon glare taken out of it.",
    variant: "gold",
    image: {
      src: "/images/project-high-room.jpg",
      width: 864,
      height: 1152,
      alt: "Penthouse bedroom with linen bedding, a walnut wall with a brass line, and sheer curtains.",
    },
    story:
      "Glass on three sides is not a luxury until the light is edited. A deep lining, a lower ceiling at the edge, and one gold line at the height of the eye make the room habitable after noon.",
    facts: [
      { label: "Height", value: "A lowered edge" },
      { label: "Light", value: "Lined, not blacked out" },
      { label: "Metal", value: "A gold line at eye height" },
    ],
    materials: [
      { name: "Edge", note: "The ceiling drops where the glass begins.", variant: "shade" },
      { name: "Line", note: "Gold, and nothing else metal.", variant: "gold" },
      { name: "Floor", note: "Stone, pale, and quiet.", variant: "stone" },
    ],
  },
  {
    slug: "the-family-court",
    name: "The Family Court",
    place: "Dubai Hills",
    typology: "Majlis",
    line: "A majlis sized for the family, not for a photograph.",
    variant: "timber",
    image: {
      src: "/images/project-family-majlis.jpg",
      width: 1280,
      height: 720,
      alt: "Family majlis with long linen seating along a walnut wall, a brass coffee set, and a garden view.",
    },
    story:
      "Seating runs the length of a timber wall. The court is outside the long window, shaded, so the room stays open through the evening. There is no second decorative scheme.",
    facts: [
      { label: "Seating", value: "One continuous run" },
      { label: "Wall", value: "Timber, unlacquered" },
      { label: "Court", value: "Shaded, immediately outside" },
    ],
    materials: [
      { name: "Wall", note: "Timber from floor to head height.", variant: "timber" },
      { name: "Court", note: "The view is shade, then planting.", variant: "arch" },
      { name: "Seat", note: "The length of a long supper.", variant: "room" },
    ],
  },
  {
    slug: "the-garden-liwan",
    name: "The Garden Liwan",
    place: "Jumeirah",
    typology: "Private house",
    line: "An old garden kept, and a new gallery of shade built along it.",
    variant: "stone",
    image: {
      src: "/images/project-garden-liwan.jpg",
      width: 864,
      height: 1152,
      alt: "Bathroom with a freestanding travertine tub, a brass spout, and slatted oak shade.",
    },
    story:
      "The garden was older than the brief. The new work is a liwan along its edge: stone floor, timber screen, and a single gold latch on the door that closes the house at night.",
    facts: [
      { label: "Garden", value: "Kept, not redesigned" },
      { label: "Gallery", value: "A new liwan" },
      { label: "Latch", value: "The gold note" },
    ],
    materials: [
      { name: "Floor", note: "Stone, level with the garden.", variant: "stone" },
      { name: "Screen", note: "Timber, so the garden filters through.", variant: "timber" },
      { name: "Latch", note: "One piece of gold.", variant: "gold" },
    ],
  },
];

export function getResidence(slug: string) {
  return residences.find((residence) => residence.slug === slug);
}
