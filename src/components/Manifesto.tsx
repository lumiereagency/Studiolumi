import { Reveal } from "./Reveal";
import { LogoMark } from "./LogoMark";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-lumi-gradient py-20 md:py-40">
      <div className="grain absolute inset-0 opacity-[0.08]" aria-hidden />
      <div className="container-lumi relative text-center">
        <Reveal>
          <p className="font-display mx-auto max-w-4xl text-3xl font-medium leading-[1.15] text-paper md:text-5xl">
            A imagem é o meio.
            <br />
            O posicionamento é o resultado.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-paper/70 md:text-lg">
            Produzimos para marcas que entendem audiovisual como parte da
            sua presença no mercado. Cada projeto nasce de uma necessidade
            real: apresentar, posicionar, vender, lançar, fortalecer ou
            gerar percepção. Por isso, qualidade visual é ponto de partida.
            O que importa é o que essa imagem faz pela marca depois que sai
            do estúdio.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-14 flex flex-col items-center gap-3">
          <LogoMark className="h-7 w-14 text-paper" strokeWidth={16} />
          <span className="font-display text-sm uppercase tracking-[0.28em] text-paper">
            StudioLumi
          </span>
          <span className="text-sm text-paper/60">
            Produção audiovisual pensada para marcas que levam sua imagem a
            sério.
          </span>
        </Reveal>
      </div>
    </section>
  );
}
