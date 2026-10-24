"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { InViewVideo } from "./InViewVideo";
import { ArrowLink } from "./ui/arrow-link";
import { cn } from "@/lib/utils";

const REEL = [
  { src: "/videos/realtime-keynote.mp4", poster: "/videos/realtime-keynote-poster.jpg" },
  { src: "/videos/case-bruno.mp4", poster: "/videos/case-bruno-poster.jpg", desktopOnly: true },
  { src: "/videos/realtime-palco.mp4", poster: "/videos/realtime-palco-poster.jpg" },
  { src: "/videos/case-joyce.mp4", poster: "/videos/case-joyce-poster.jpg", desktopOnly: true },
];

const TEAM_FACES = ["gustavo-turques", "ingrid-cardoso", "mariene-beatriz"];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "start 0.15"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 20]);

  const intro = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24, filter: reduceMotion ? "none" : "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: reduceMotion ? 0.01 : 1.1, delay: reduceMotion ? 0 : delay, ease },
  });

  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-28 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-20%] top-[-30%] h-[80vh] w-[80vh] rounded-full opacity-70 blur-[120px] md:right-[-5%]"
        style={{ background: "radial-gradient(circle, rgba(241,96,1,0.45) 0%, rgba(193,8,1,0.15) 55%, transparent 75%)" }}
      />

      <div className="container-lumi relative">
        <motion.span {...intro(0.1)} className="inline-flex items-center gap-2 text-sm text-paper/60">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-bright" />
          Produção audiovisual e direção criativa
        </motion.span>

        <motion.h1 {...intro(0.2)} className="heading-xl mt-6 text-paper">
          Imagem que <span className="text-orange-gradient">posiciona.</span>
          <br />
          Produção que entrega.
        </motion.h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <motion.p {...intro(0.35)} className="max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
            Direção, produção e pós-produção em uma única operação, para marcas
            que não abrem mão de padrão.
          </motion.p>

          <motion.div {...intro(0.45)} className="flex flex-wrap items-center gap-3">
            <ArrowLink href="#contato">Iniciar um projeto</ArrowLink>
            <ArrowLink href="#trabalhos" variant="dark">
              Ver trabalhos
            </ArrowLink>
          </motion.div>
        </div>
      </div>

      <div className="container-lumi relative mt-14 pb-6 md:mt-20 md:pb-10">
        <motion.div
          ref={frameRef}
          style={reduceMotion ? { borderRadius: 20 } : { scale, borderRadius: radius }}
          className="relative grid aspect-[9/8] origin-top grid-cols-2 overflow-hidden bg-ink-soft md:aspect-[2.25/1] md:grid-cols-4"
        >
          {REEL.map((clip) => (
            <div key={clip.src} className={cn("relative h-full", clip.desktopOnly && "hidden md:block")}>
              <InViewVideo src={clip.src} poster={clip.poster} />
            </div>
          ))}

          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 md:inset-x-6 md:bottom-6">
            <div className="rounded-2xl border border-paper/15 bg-ink/35 p-4 backdrop-blur-xl md:p-5">
              <p className="font-display text-lg font-medium leading-tight text-paper md:text-2xl">
                Da estratégia à imagem.
              </p>
              <p className="font-display text-lg font-medium leading-tight text-paper/55 md:text-2xl">
                Da imagem ao resultado.
              </p>
            </div>

            <div className="hidden items-center gap-3 rounded-full border border-paper/15 bg-ink/35 py-1.5 pl-1.5 pr-4 backdrop-blur-xl sm:flex">
              <div className="flex -space-x-2.5">
                {TEAM_FACES.map((id) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={id}
                    src={`/team/${id}.jpg`}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-ink object-cover object-top"
                  />
                ))}
              </div>
              <span className="text-xs leading-tight text-paper/80">
                Uma equipe,
                <br />
                do roteiro à entrega
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
