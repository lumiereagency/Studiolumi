"use client";

import { useRef } from "react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { InViewVideo } from "./InViewVideo";
import { ArrowIcon } from "./ui/arrow-link";

const CLIPS = [
  { id: "keynote", caption: "Captação de palco durante keynote" },
  { id: "bastidores", caption: "Dos bastidores ao palco, no mesmo take" },
  { id: "plateia", caption: "Cobertura do público durante o evento" },
  { id: "palco", caption: "Captação de palco em tempo real" },
  { id: "painel", caption: "Painel e bate-papo captados ao vivo" },
  { id: "ativacao", caption: "Ativação de marca em tempo real" },
];

export function RealTimeReel() {
  const track = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="tempo-real" className="relative scroll-mt-20 overflow-hidden bg-ink-soft py-24 md:py-36">
      <div className="container-lumi flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow>Em tempo real</Eyebrow>
          <h2 className="heading-lg mt-6 max-w-3xl text-paper">
            Direto do evento, <span className="text-orange-gradient">enquanto ele acontece.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-paper/60 md:text-lg">
            Equipe em campo, edição em tempo real e publicação ainda durante o
            evento.
          </p>
        </Reveal>

        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Clipe anterior"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <ArrowIcon className="-rotate-[135deg]" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Próximo clipe"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <ArrowIcon className="rotate-45" />
          </button>
        </div>
      </div>

      <Reveal delay={0.1}>
        <ul
          ref={track}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 md:mt-16 md:gap-4 md:scroll-px-12 md:px-12 xl:scroll-px-20 xl:px-20"
        >
          {CLIPS.map((clip) => (
            <li key={clip.id} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-[300px] lg:w-[340px]">
              <figure className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-ink">
                <InViewVideo src={`/videos/realtime-${clip.id}.mp4`} poster={`/videos/realtime-${clip.id}-poster.jpg`} />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-paper/20 bg-paper/10 px-3 py-1 text-[11px] text-paper/90 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-bright" />
                  Tempo real
                </span>
                <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-paper/15 bg-ink/40 p-3.5 text-sm leading-snug text-paper/90 backdrop-blur-md">
                  {clip.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
