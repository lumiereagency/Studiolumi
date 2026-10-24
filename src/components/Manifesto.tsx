import { Reveal } from "./Reveal";
import { LogoMark } from "./LogoMark";

export function Manifesto() {
  return (
    <section className="relative bg-ink pb-6 md:pb-10">
      <div className="container-lumi">
        <Reveal className="bg-orange-card relative overflow-hidden rounded-[28px] px-6 py-16 md:rounded-[40px] md:px-14 md:py-28">
          <div className="grain absolute inset-0 opacity-[0.12]" aria-hidden />
          <div className="relative flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <p className="heading-lg max-w-4xl text-paper">
              A imagem é o meio.
              <br />
              <span className="text-ink">O posicionamento é o resultado.</span>
            </p>
            <div className="max-w-sm">
              <LogoMark className="h-7 w-10 text-paper" strokeWidth={10} />
              <p className="mt-5 text-base leading-relaxed text-paper/90">
                Produzimos para marcas que entendem audiovisual como parte da sua
                presença no mercado. Qualidade visual é ponto de partida. O que
                importa é o que essa imagem faz pela marca depois que sai do
                estúdio.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
