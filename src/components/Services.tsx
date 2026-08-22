"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  label: string;
  text: string;
  glow: string;
};

const SERVICES: Service[] = [
  {
    id: "institucional",
    label: "Filme Institucional",
    text: "Autoridade e posicionamento em vídeo: a peça que apresenta sua marca como ela merece ser vista.",
    glow: "rgba(232,80,2,0.42)",
  },
  {
    id: "redes",
    label: "Conteúdo para Redes",
    text: "Séries ágeis pensadas para performance social, do roteiro ao corte vertical.",
    glow: "rgba(193,8,1,0.4)",
  },
  {
    id: "eventos",
    label: "Cobertura de Eventos",
    text: "Sua marca registrada com direção, não só câmera, presente do início ao encerramento.",
    glow: "rgba(241,96,1,0.42)",
  },
  {
    id: "motion",
    label: "Motion & Branding",
    text: "Identidade em movimento: vinhetas, logo animada e motion graphics que sustentam a marca em tela.",
    glow: "rgba(217,195,171,0.38)",
  },
  {
    id: "drone",
    label: "Aéreas & Drone",
    text: "Escala e perspectiva que elevam a narrativa: outra dimensão para o mesmo objetivo.",
    glow: "rgba(193,8,1,0.34)",
  },
  {
    id: "fotografia",
    label: "Fotografia de Produção",
    text: "Still que sustenta a campanha em qualquer formato, da vitrine ao feed.",
    glow: "rgba(232,80,2,0.36)",
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
    <section id="servicos" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ backgroundColor: SERVICES[active].glow }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[46vh] w-[46vh] rounded-full blur-[130px]"
        />
      </div>

      <div className="container-lumi relative">
        <Reveal className="max-w-xl">
          <Eyebrow>Serviços</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Seis formas de colocar sua marca em movimento.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Do filme institucional à cobertura de evento, cada serviço nasce
            do mesmo processo: entender o objetivo antes de escolher o
            formato.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-2xl md:mt-20">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              data-index={i}
              className="relative flex min-h-[18vh] flex-col justify-center border-b border-line py-6 pl-7 first:pt-0 last:border-b-0 lg:min-h-[24vh]"
            >
              {active === i && (
                <motion.span
                  layoutId="service-indicator"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  className="absolute left-0 top-1/2 h-9 w-1 -translate-y-1/2 rounded-full bg-orange-bright"
                />
              )}
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
