import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MotionReel } from "@/components/MotionReel";
import { ClientRoster } from "@/components/ClientRoster";
import { Positioning } from "@/components/Positioning";
import { Services } from "@/components/Services";
import { HumanExperience } from "@/components/HumanExperience";
import { LumiTeam } from "@/components/LumiTeam";
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
        <ClientRoster />
        <Positioning />
        <Services />
        <HumanExperience />
        <LumiTeam />
        {/* <Portfolio /> — Criadores UGC volta quando tivermos criadores parceiros reais para mostrar. */}
        <Process />
        <Manifesto />
        <Packages />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
