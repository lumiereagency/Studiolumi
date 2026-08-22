"use client";

import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { CardCylinder } from "./CardCylinder";
import type { ReelCategory } from "./ReelPatterns";

const CATEGORIES: ReelCategory[] = [
  {
    id: "jacaranda",
    label: "Meu Pé de Jacarandá",
    tagline: "Experiência & Eventos.",
    pattern: "cinema",
    videoSrc: "/videos/case-evento.mp4",
    poster: "/videos/case-evento-poster.jpg",
  },
  {
    id: "sergio-mallandro",
    label: "Sérgio Mallandro",
    tagline: "Conteúdo & Redes.",
    pattern: "mobile",
    videoSrc: "/videos/case-social.mp4",
    poster: "/videos/case-social-poster.jpg",
  },
  {
    id: "bruno-carvalho",
    label: "Bruno Carvalho",
    tagline: "CEO & Fundador, BBox Training.",
    pattern: "camera",
    videoSrc: "/videos/case-bruno.mp4",
    poster: "/videos/case-bruno-poster.jpg",
  },
  {
    id: "joyce-turques",
    label: "Joyce Turques",
    tagline: "Esteticista & Biomédica.",
    pattern: "brandfilm",
    videoSrc: "/videos/case-joyce.mp4",
    poster: "/videos/case-joyce-poster.jpg",
  },
  {
    id: "paola-passos",
    label: "Paola Passos",
    tagline: "Fundadora, Uniher.",
    pattern: "cinema",
    videoSrc: "/videos/case-paola.mp4",
    poster: "/videos/case-paola-poster.jpg",
  },
  {
    id: "luciana-grion",
    label: "Luciana Grion",
    tagline: "CEO & Fundadora, Studio9.",
    pattern: "social",
    videoSrc: "/videos/case-luciana.mp4",
    poster: "/videos/case-luciana-poster.jpg",
  },
];

export function MotionReel() {
  return (
    <section id="experiencia" className="relative scroll-mt-24 bg-ink py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-xl">
          <Eyebrow>Cases</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Projetos que exigiram mais do que uma boa câmera.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Cada produção nasce de um objetivo diferente. Campanhas, conteúdo
            recorrente, posicionamento de marca, eventos, produtos e
            projetos especiais. Aqui estão alguns dos trabalhos que traduzem
            a forma como pensamos, dirigimos e entregamos.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-14 md:mt-20">
        <CardCylinder categories={CATEGORIES} />
      </Reveal>

      <Reveal delay={0.1} className="container-lumi mt-16 md:mt-24">
        <p className="font-display text-2xl font-light leading-snug text-paper/70 md:text-3xl">
          Da estratégia à imagem.
          <br />
          <span className="text-paper">Da imagem ao resultado.</span>
        </p>
      </Reveal>
    </section>
  );
}
