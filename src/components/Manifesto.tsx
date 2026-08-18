import { Reveal } from "./Reveal";
import { LogoMark } from "./LogoMark";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-lumi-gradient py-28 md:py-40">
      <div className="grain absolute inset-0 opacity-[0.08]" aria-hidden />
      <div className="container-lumi relative text-center">
        <Reveal>
          <p className="font-display mx-auto max-w-4xl text-3xl font-medium leading-[1.15] text-paper md:text-5xl">
            Vídeo bonito não é o objetivo.
            <br />
            Resultado é.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg">
            Trabalhamos para marcas que entendem audiovisual como
            investimento, não como despesa de marketing. Cada produção nasce
            de um objetivo claro — presença, autoridade ou conversão. É isso
            que medimos, não curtidas.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-14 flex flex-col items-center gap-3">
          <LogoMark className="h-7 w-14 text-paper" strokeWidth={16} />
          <span className="font-display text-sm uppercase tracking-[0.28em] text-paper">
            StudioLumi
          </span>
          <span className="text-sm text-paper/60">
            Produções que comunicam antes mesmo da primeira palavra.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
