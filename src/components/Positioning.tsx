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
    <section className="relative border-y border-line bg-ink-soft py-28 md:py-36">
      <div className="container-lumi">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Posicionamento</Eyebrow>
            <h2 className="font-display mt-5 max-w-xl text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
              Não produzimos apenas vídeos.
              <br />
              <span className="text-gradient-lumi">Criamos presença.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-between gap-10">
            <p className="text-base leading-relaxed text-paper/60 md:text-lg">
              Uma boa produção não termina quando a câmera para de gravar. Ela
              precisa funcionar onde sua marca vive. No Instagram. No
              YouTube. Em uma campanha. Em uma apresentação. Em uma tela
              grande. Por isso, cada produção nasce pensando em onde será
              vista, por quem será vista e, principalmente, no que precisa
              fazer essa pessoa sentir.
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
