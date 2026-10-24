import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ClientRoster } from "@/components/ClientRoster";
import { Positioning } from "@/components/Positioning";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { RealTimeReel } from "@/components/RealTimeReel";
import { Process } from "@/components/Process";
import { Partners } from "@/components/Partners";
import { Packages } from "@/components/Packages";
import { Manifesto } from "@/components/Manifesto";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ClientRoster />
        <Positioning />
        <Work />
        <About />
        <Services />
        <RealTimeReel />
        <Process />
        <Partners />
        <Packages />
        <Manifesto />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
