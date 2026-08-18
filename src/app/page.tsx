import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MotionReel } from "@/components/MotionReel";
import { LogoReveal } from "@/components/LogoReveal";
import { Positioning } from "@/components/Positioning";
import { Services } from "@/components/Services";
import { MobileToCinema } from "@/components/MobileToCinema";
import { HumanExperience } from "@/components/HumanExperience";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Manifesto } from "@/components/Manifesto";
import { Packages } from "@/components/Packages";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MotionReel />
        <LogoReveal />
        <Positioning />
        <Services />
        <MobileToCinema />
        <HumanExperience />
        <Portfolio />
        <Process />
        <Manifesto />
        <Packages />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
