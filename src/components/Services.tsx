"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

const AUTO_ADVANCE_MS = 4800;

export function Services() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return;
      setActive((i) => (i + 1) % SERVICES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  const select = (i: number) => {
    paused.current = true;
    setActive(i);
  };

  const service = SERVICES[active];
  const fadeDuration = reduceMotion ? 0.01 : 0.55;

  return (
    <section id="servicos" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ backgroundColor: service.glow }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[46vh] w-[46vh] rounded-full blur-[130px]"
        />
      </div>

      <div className="container-lumi relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center">Serviços</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Seis formas de colocar sua marca em movimento.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Do filme institucional à cobertura de evento, cada serviço nasce
            do mesmo processo: entender o objetivo antes de escolher o
            formato.
          </p>
        </Reveal>

        <div
          className="relative mx-auto mt-16 flex min-h-[280px] max-w-2xl flex-col items-center justify-center text-center md:mt-20 md:min-h-[320px]"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18, filter: reduceMotion ? "none" : "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -18, filter: reduceMotion ? "none" : "blur(6px)" }}
              transition={{ duration: fadeDuration, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
            >
              <span className="font-display text-sm text-orange-bright/80">
                {String(active + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-4xl font-medium text-paper md:text-6xl">
                {service.label}
              </h3>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
                {service.text}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-current={active === i}
                aria-label={`Ir para ${s.label}`}
                onClick={() => select(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  active === i ? "w-8 bg-orange-bright" : "w-1.5 bg-line-strong hover:bg-paper/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
