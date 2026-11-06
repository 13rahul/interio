import { ClientVoice } from "@/components/site/home/ClientVoice";
import { ConsultationClose } from "@/components/site/home/ConsultationClose";
import { Hero } from "@/components/site/home/Hero";
import { Manifesto } from "@/components/site/home/Manifesto";
import { MaterialHotspots } from "@/components/site/home/MaterialHotspots";
import { ProcessTimeline } from "@/components/site/home/ProcessTimeline";
import { ProofStrip } from "@/components/site/home/ProofStrip";
import { SectorRail } from "@/components/site/home/SectorRail";
import { SelectedProjects } from "@/components/site/home/SelectedProjects";
import { ShellToHome } from "@/components/site/home/ShellToHome";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Manifesto />
      <SectorRail />
      <ShellToHome />
      <SelectedProjects />
      <MaterialHotspots />
      <ProcessTimeline />
      <ClientVoice />
      <ConsultationClose />
    </>
  );
}
