"use client";

import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { InfluencerCarousel, type Creator } from "./InfluencerCarousel";

const CREATORS: Creator[] = [
  { id: "c1" },
  { id: "c2" },
  { id: "c3" },
  { id: "c4" },
  { id: "c5" },
  { id: "c6" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-2xl">
          <Eyebrow>Criadores UGC</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Vozes reais para marcas reais.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Uma rede de criadores selecionados para dar rosto e voz ao seu conteúdo.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-14 md:mt-20">
        <InfluencerCarousel creators={CREATORS} />
      </Reveal>
    </section>
  );
}
