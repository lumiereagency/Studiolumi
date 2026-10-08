"use client";

import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { InfluencerCarousel, type Creator } from "./InfluencerCarousel";

const PARTNERS: Creator[] = [
  { id: "p1", name: "Sergio Mallandro" },
  { id: "p2", name: "Sr. Bemvindo Sequeira" },
  { id: "p3", name: "Gustavo Mendes" },
];

export function Partners() {
  return (
    <section id="partners" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-2xl">
          <Eyebrow>Partners</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Figuras públicas que produzimos de ponta a ponta.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Para parceiros e criadores selecionados, cuidamos da gestão de
            perfil e da edição de vídeo como uma operação contínua, não um
            projeto avulso.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-14 md:mt-20">
        <InfluencerCarousel
          creators={PARTNERS}
          regionLabel="Carrossel de partners do StudioLumi. Arraste ou use as setas para navegar."
          itemLabel="parceiro"
        />
      </Reveal>
    </section>
  );
}
