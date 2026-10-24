import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ScrollWords } from "./ScrollWords";

const HIGHLIGHTS = ["Estratégia", "Direção", "Captação", "Edição", "Motion", "Fotografia", "Drone", "Conteúdo"];

export function Positioning() {
  return (
    <section className="relative bg-ink py-24 md:py-44">
      <div className="container-lumi">
        <Reveal>
          <Eyebrow>Posicionamento</Eyebrow>
        </Reveal>

        <ScrollWords
          className="font-display mt-8 max-w-6xl text-[2rem] font-medium leading-[1.08] text-paper md:text-6xl lg:text-7xl"
          segments={[
            { text: "Produção sem direção é apenas execução." , accent: true },
            {
              text: "Antes de produzir, entendemos o que precisa ser comunicado. Objetivo, público, contexto e linguagem. É isso que transforma imagem em posicionamento.",
            },
          ]}
        />

        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <ul className="flex flex-wrap gap-2.5 text-sm">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="rounded-full border border-line-strong px-4 py-2 text-paper/70">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
