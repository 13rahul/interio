import { Closing } from "@/components/site/home/Closing";
import { DoorsIntro } from "@/components/site/home/DoorsIntro";
import { Faq } from "@/components/site/home/Faq";
import { Gallery } from "@/components/site/home/Gallery";
import { HeroArch } from "@/components/site/home/HeroArch";
import { Journey } from "@/components/site/home/Journey";
import { Marquee } from "@/components/site/home/Marquee";
import { Materials } from "@/components/site/home/Materials";
import { Packages } from "@/components/site/home/Packages";
import { Projects } from "@/components/site/home/Projects";
import { Services } from "@/components/site/home/Services";
import { ShellToHome } from "@/components/site/home/ShellToHome";
import { Voices } from "@/components/site/home/Voices";
import { Welcome } from "@/components/site/home/Welcome";

export default function HomePage() {
  return (
    <>
      <DoorsIntro />
      <HeroArch />
      <Marquee />
      <Welcome />
      <Services />
      <Projects />
      <ShellToHome />
      <Packages />
      <Journey />
      <Materials />
      <Voices />
      <Gallery />
      <Faq />
      <Closing />
    </>
  );
}
