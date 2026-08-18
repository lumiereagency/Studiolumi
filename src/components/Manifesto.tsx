import { Reveal } from "./Reveal";
import { LogoMark } from "./LogoMark";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-lumi-gradient py-28 md:py-40">
      <div className="grain absolute inset-0 opacity-[0.08]" aria-hidden />
      <div className="container-lumi relative text-center">
        <Reveal>
          <p className="font-display mx-auto max-w-4xl text-3xl font-medium leading-[1.15] text-paper md:text-5xl">
            Não fazemos conteúdo para preencher espaço.
            <br />
            Fazemos imagens para ocupar memória.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg">
            Porque o audiovisual não existe apenas para ser visto. Existe
            para fazer alguém parar. Sentir. Lembrar. E agir. Essa é a nossa
            forma de produzir.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-14 flex flex-col items-center gap-3">
          <LogoMark className="h-7 w-14" />
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
