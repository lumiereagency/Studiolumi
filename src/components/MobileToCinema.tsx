import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

export function MobileToCinema() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-lumi-radial opacity-60" />

      <div className="container-lumi relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Mobile → Cinema</Eyebrow>
          <h2 className="font-display mt-6 text-4xl font-medium leading-[1.05] text-paper md:text-6xl">
            A ferramenta muda.
            <br />
            O objetivo, não.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-paper/60 md:text-lg">
            Um smartphone resolve. Uma câmera de cinema também. A diferença
            está em saber qual das duas entrega o resultado que sua marca
            precisa — e temos experiência com as duas.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mx-auto mt-16 max-w-3xl border-t border-line pt-10 text-center md:mt-24">
          <p className="font-display text-2xl font-light leading-snug text-paper/80 md:text-3xl">
            Do conteúdo que cabe na palma da mão ao filme que ocupa uma tela
            inteira.
            <span className="text-gradient-lumi"> Nós entregamos os dois.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
