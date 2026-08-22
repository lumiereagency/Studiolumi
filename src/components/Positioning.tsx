import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const HIGHLIGHTS = [
  "Estratégia",
  "Direção",
  "Captação",
  "Edição",
  "Motion",
  "Fotografia",
  "Drone",
  "Conteúdo",
];

export function Positioning() {
  return (
    <section className="relative border-y border-line bg-ink-soft py-20 md:py-36">
      <div className="container-lumi">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Posicionamento</Eyebrow>
            <h2 className="font-display mt-5 max-w-xl text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
              Produção sem direção
              <br />
              <span className="text-gradient-lumi">é apenas execução.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-between gap-10">
            <p className="text-base leading-relaxed text-paper/60 md:text-lg">
              Antes de produzir, entendemos o que precisa ser comunicado.
              Objetivo, público, contexto, linguagem e onde aquela imagem
              precisa funcionar. É isso que transforma uma produção
              audiovisual em uma ferramenta real de posicionamento para a
              marca.
            </p>

            <ul className="flex flex-wrap gap-x-3 gap-y-3 text-sm">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line-strong px-4 py-2 text-paper/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
