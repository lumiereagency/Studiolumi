"use client";

import { useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

type Clip = {
  id: string;
  src: string;
  poster: string;
  caption: string;
};

const CLIPS: Clip[] = [
  {
    id: "keynote",
    src: "/videos/realtime-keynote.mp4",
    poster: "/videos/realtime-keynote-poster.jpg",
    caption: "Captação de palco durante keynote",
  },
  {
    id: "bastidores",
    src: "/videos/realtime-bastidores.mp4",
    poster: "/videos/realtime-bastidores-poster.jpg",
    caption: "Dos bastidores ao palco, no mesmo take",
  },
  {
    id: "plateia",
    src: "/videos/realtime-plateia.mp4",
    poster: "/videos/realtime-plateia-poster.jpg",
    caption: "Cobertura do público durante o evento",
  },
  {
    id: "palco",
    src: "/videos/realtime-palco.mp4",
    poster: "/videos/realtime-palco-poster.jpg",
    caption: "Captação de palco em tempo real",
  },
  {
    id: "painel",
    src: "/videos/realtime-painel.mp4",
    poster: "/videos/realtime-painel-poster.jpg",
    caption: "Painel e bate-papo captados ao vivo",
  },
  {
    id: "ativacao",
    src: "/videos/realtime-ativacao.mp4",
    poster: "/videos/realtime-ativacao-poster.jpg",
    caption: "Ativação de marca em tempo real",
  },
];

export function RealTimeReel() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-line bg-ink-soft py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-xl">
          <Eyebrow>Em tempo real</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Direto do evento, enquanto ele acontece.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Equipe em campo, edição em tempo real e publicação ainda durante
            o evento. Alguns momentos de produções recentes, sem cortes
            editados para esta vitrine.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-3 md:gap-5">
          {CLIPS.map((clip, i) => (
            <Reveal key={clip.id} delay={i * 0.06}>
              <figure className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-line-strong bg-ink">
                <video
                  src={clip.src}
                  poster={clip.poster}
                  muted
                  loop
                  playsInline
                  autoPlay={!reduceMotion}
                  preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 text-xs leading-snug text-paper/80 md:p-4 md:text-sm">
                  {clip.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
