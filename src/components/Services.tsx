"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ReelPattern, type ReelCategory } from "./ReelPatterns";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  label: string;
  text: string;
  pattern: ReelCategory["pattern"];
};

const SERVICES: Service[] = [
  {
    id: "institucional",
    label: "Filme Institucional",
    text: "Autoridade e posicionamento em vídeo — a peça que apresenta sua marca como ela merece ser vista.",
    pattern: "cinema",
  },
  {
    id: "redes",
    label: "Conteúdo para Redes",
    text: "Séries ágeis pensadas para performance social, do roteiro ao corte vertical.",
    pattern: "social",
  },
  {
    id: "eventos",
    label: "Cobertura de Eventos",
    text: "Sua marca registrada com direção, não só câmera — presente do início ao encerramento.",
    pattern: "camera",
  },
  {
    id: "motion",
    label: "Motion & Branding",
    text: "Identidade em movimento: vinhetas, logo animada e motion graphics que sustentam a marca em tela.",
    pattern: "brandfilm",
  },
  {
    id: "drone",
    label: "Aéreas & Drone",
    text: "Escala e perspectiva que elevam a narrativa — outra dimensão para o mesmo objetivo.",
    pattern: "drone",
  },
  {
    id: "fotografia",
    label: "Fotografia de Produção",
    text: "Still que sustenta a campanha em qualquer formato, da vitrine ao feed.",
    pattern: "mobile",
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicos" className="relative scroll-mt-24 bg-ink py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-xl">
          <Eyebrow>Serviços</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Seis formas de colocar sua marca em movimento.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Do filme institucional à cobertura de evento, cada serviço nasce
            do mesmo processo — entender o objetivo antes de escolher o
            formato.
          </p>
        </Reveal>
      </div>

      <div className="container-lumi mt-14 flex flex-col gap-8 md:mt-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="sticky top-24 z-10">
          <div className="relative h-[46vh] min-h-[280px] overflow-hidden rounded-2xl border border-line sm:h-[50vh] lg:h-[60vh]">
            {SERVICES.map((service, i) => (
              <div
                key={service.id}
                className="absolute inset-0 transition-opacity duration-700 ease-out"
                style={{ opacity: active === i ? 1 : 0 }}
                aria-hidden={active !== i}
              >
                <ReelPattern pattern={service.pattern} />
              </div>
            ))}
            <div className="grain absolute inset-0 opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 font-display text-sm uppercase tracking-[0.24em] text-paper/70">
              0{active + 1} / 0{SERVICES.length}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              data-index={i}
              className="flex min-h-[20vh] flex-col justify-center border-b border-line py-6 first:pt-0 last:border-b-0 lg:min-h-[45vh]"
            >
              <span
                className={cn(
                  "font-display text-3xl font-medium transition-colors duration-500 md:text-4xl",
                  active === i ? "text-paper" : "text-paper/25"
                )}
              >
                {service.label}
              </span>
              <p
                className={cn(
                  "mt-3 max-w-sm text-sm leading-relaxed transition-colors duration-500 md:text-base",
                  active === i ? "text-paper/60" : "text-paper/20"
                )}
              >
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
