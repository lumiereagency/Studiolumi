"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

type Project = {
  client: string;
  type: string;
  year: string;
  gradient: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    client: "Martorelli",
    type: "Brand Content",
    year: "2026",
    gradient: "linear-gradient(135deg, #000 0%, #c10801 55%, #f16001 100%)",
    featured: true,
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

export function Portfolio() {
  return (
    <section id="portfolio" className="relative scroll-mt-24 bg-ink py-28 md:py-36">
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

        <div className="mt-16 grid gap-5 md:mt-20 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal
              key={project.client}
              delay={i * 0.1}
              className={project.featured ? "md:col-span-2" : ""}
            >
              <motion.article
                whileHover="hover"
                initial="rest"
                className={`group relative overflow-hidden rounded-xl border border-line ${
                  project.featured ? "aspect-[21/9]" : "aspect-[4/5] md:aspect-[16/10]"
                }`}
              >
                <motion.div
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                  style={{ background: project.gradient }}
                />
                <div className="grain absolute inset-0 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-paper/50">
                    {project.type} — {project.year}
                  </span>
                  <h3 className="font-display mt-2 text-2xl font-medium uppercase tracking-tight text-paper md:text-4xl">
                    {project.client}
                  </h3>
                </div>

                <motion.span
                  variants={{
                    rest: { opacity: 0, x: -6 },
                    hover: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.35 }}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-paper md:right-8 md:top-8"
                  aria-hidden
                >
                  ↗
                </motion.span>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
