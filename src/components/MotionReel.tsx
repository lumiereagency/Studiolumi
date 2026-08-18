"use client";

import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { CardCylinder } from "./CardCylinder";
import type { ReelCategory } from "./ReelPatterns";

const CATEGORIES: ReelCategory[] = [
  {
    id: "mobile",
    label: "Mobile",
    tagline: "Conteúdo ágil. Impacto imediato.",
    pattern: "mobile",
    videoSrc: "/videos/mobile-reel.mp4",
    poster: "/videos/mobile-reel-poster.jpg",
  },
  { id: "camera", label: "Câmera", tagline: "Mais controle. Mais narrativa.", pattern: "camera" },
  { id: "cinema", label: "Cinema", tagline: "Grande escala. Experiências memoráveis.", pattern: "cinema" },
  { id: "drone", label: "Drone", tagline: "Uma nova perspectiva. Outra dimensão.", pattern: "drone" },
  { id: "brandfilm", label: "Brand Film", tagline: "Sua marca como história.", pattern: "brandfilm" },
  { id: "social", label: "Social", tagline: "Conteúdo feito para conectar.", pattern: "social" },
];

export function MotionReel() {
  return (
    <section id="experiencia" className="relative scroll-mt-24 bg-ink py-28 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-xl">
          <Eyebrow>Uma linguagem para cada história</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Cada história pede uma linguagem.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Não acreditamos em uma fórmula única para produzir grandes
            imagens. Algumas histórias pedem agilidade. Outras,
            profundidade. Algumas nascem no celular. Outras precisam de uma
            câmera, uma equipe e uma grande produção. Nós encontramos a
            linguagem certa para cada uma.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-14 md:mt-20">
        <CardCylinder categories={CATEGORIES} />
      </Reveal>

      <Reveal delay={0.1} className="container-lumi mt-16 md:mt-24">
        <p className="font-display text-2xl font-light leading-snug text-paper/70 md:text-3xl">
          Da ideia à imagem.
          <br />
          <span className="text-paper">Da imagem à experiência.</span>
        </p>
      </Reveal>
    </section>
  );
}
