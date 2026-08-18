"use client";

import { useRef } from "react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ReelCard, type ReelCategory } from "./ReelCard";

const CATEGORIES: ReelCategory[] = [
  { id: "mobile", label: "Mobile", tagline: "Conteúdo ágil. Impacto imediato.", pattern: "mobile" },
  { id: "camera", label: "Câmera", tagline: "Mais controle. Mais narrativa.", pattern: "camera" },
  { id: "cinema", label: "Cinema", tagline: "Grande escala. Experiências memoráveis.", pattern: "cinema" },
  { id: "drone", label: "Drone", tagline: "Uma nova perspectiva. Outra dimensão.", pattern: "drone" },
  { id: "brandfilm", label: "Brand Film", tagline: "Sua marca como história.", pattern: "brandfilm" },
  { id: "social", label: "Social", tagline: "Conteúdo feito para conectar.", pattern: "social" },
];

export function MotionReel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[role='group']") as HTMLElement | null;
    const distance = card ? card.offsetWidth + 20 : track.clientWidth * 0.6;
    track.scrollBy({ left: dir * distance, behavior: "smooth" });
  };

  return (
    <section id="experiencia" className="relative scroll-mt-24 bg-ink py-28 md:py-36">
      <div className="container-lumi">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
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

          <Reveal delay={0.15} className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Item anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-orange-bright hover:text-orange-bright"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Próximo item"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:border-orange-bright hover:text-orange-bright"
            >
              →
            </button>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.2} className="mt-14 md:mt-20">
        <div
          ref={trackRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 md:px-12 xl:px-20 [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((category, i) => (
            <ReelCard key={category.id} category={category} index={i} />
          ))}
          <div className="w-1 shrink-0" aria-hidden />
        </div>
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
