"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ReelPattern } from "./ReelPatterns";
import { cn } from "@/lib/utils";

type Project = {
  client: string;
  type: string;
  year: string;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    client: "Martorelli",
    type: "Brand Content",
    year: "2026",
    gradient: "linear-gradient(135deg, #000 0%, #c10801 55%, #f16001 100%)",
  },
  {
    client: "Meu Pé de Jacarandá",
    type: "Experiência & Eventos",
    year: "2026",
    gradient: "linear-gradient(135deg, #0c0a09 0%, #333333 60%, #d9c3ab 130%)",
  },
  {
    client: "Sargento's",
    type: "Social & Brand Content",
    year: "2026",
    gradient: "linear-gradient(135deg, #000 0%, #e85002 70%, #d9c3ab 140%)",
  },
];

const CARD_BASE =
  "absolute overflow-hidden rounded-xl border border-line shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-2xl">
          <Eyebrow>Portfólio</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Algumas histórias que já ganharam imagem.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Projetos, marcas e pessoas que confiaram suas histórias ao
            StudioLumi.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="relative mx-auto mt-16 h-[560px] w-full max-w-5xl px-6 sm:h-[600px] md:mt-24 md:h-[640px]">
        {/* decorative filler — top-left */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            CARD_BASE,
            "left-[6%] top-[2%] z-0 h-[28%] w-[32%] -rotate-4 sm:left-[4%] sm:h-[32%] sm:w-[28%] sm:-rotate-6 md:left-[6%] md:top-[3%] md:h-[36%] md:w-[20%]"
          )}
          aria-hidden
        >
          <ReelPattern pattern="camera" />
        </motion.div>

        {/* project — Martorelli */}
        <motion.article
          whileHover="hover"
          initial="rest"
          className={cn(
            CARD_BASE,
            "group left-[10%] top-[20%] z-10 h-[52%] w-[46%] rotate-2 cursor-default hover:z-40 sm:left-[6%] sm:top-[12%] sm:h-[62%] sm:w-[42%] sm:rotate-3 md:left-[4%] md:top-[10%] md:h-[68%] md:w-[32%]"
          )}
        >
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{ background: PROJECTS[0].gradient }}
          />
          <div className="grain absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
            <span className="text-[10px] uppercase tracking-[0.22em] text-paper/50">
              {PROJECTS[0].type} — {PROJECTS[0].year}
            </span>
            <h3 className="font-display mt-1.5 text-xl font-medium uppercase tracking-tight text-paper md:text-2xl">
              {PROJECTS[0].client}
            </h3>
          </div>
        </motion.article>

        {/* decorative filler — top-right */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className={cn(
            CARD_BASE,
            "right-[6%] top-[0%] z-0 h-[24%] w-[28%] rotate-4 sm:right-[2%] sm:h-[28%] sm:w-[26%] sm:rotate-6 md:right-[6%] md:top-[2%] md:h-[32%] md:w-[18%]"
          )}
          aria-hidden
        >
          <ReelPattern pattern="drone" />
        </motion.div>

        {/* project — Sargento's */}
        <motion.article
          whileHover="hover"
          initial="rest"
          className={cn(
            CARD_BASE,
            "group right-[6%] top-[32%] z-20 h-[42%] w-[38%] -rotate-3 cursor-default hover:z-40 sm:right-[4%] sm:top-[24%] sm:h-[54%] sm:w-[36%] sm:-rotate-4 md:right-[10%] md:top-[22%] md:h-[56%] md:w-[26%]"
          )}
        >
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{ background: PROJECTS[2].gradient }}
          />
          <div className="grain absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
            <span className="text-[10px] uppercase tracking-[0.22em] text-paper/50">
              {PROJECTS[2].type} — {PROJECTS[2].year}
            </span>
            <h3 className="font-display mt-1.5 text-xl font-medium uppercase tracking-tight text-paper md:text-2xl">
              {PROJECTS[2].client}
            </h3>
          </div>
        </motion.article>

        {/* project — Meu Pé de Jacarandá, front */}
        <motion.article
          whileHover="hover"
          initial="rest"
          className={cn(
            CARD_BASE,
            "group left-[24%] bottom-[0%] z-30 h-[38%] w-[46%] -rotate-2 cursor-default hover:z-40 sm:left-[30%] sm:h-[46%] sm:w-[38%] md:left-[36%] md:h-[50%] md:w-[28%]"
          )}
        >
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{ background: PROJECTS[1].gradient }}
          />
          <div className="grain absolute inset-0 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7">
            <span className="text-[10px] uppercase tracking-[0.22em] text-paper/50">
              {PROJECTS[1].type} — {PROJECTS[1].year}
            </span>
            <h3 className="font-display mt-1.5 text-xl font-medium uppercase tracking-tight text-paper md:text-2xl">
              {PROJECTS[1].client}
            </h3>
          </div>
        </motion.article>
      </Reveal>
    </section>
  );
}
