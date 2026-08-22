import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const HIGHLIGHTS = [
  { n: "01", label: "Olhar técnico" },
  { n: "02", label: "Sensibilidade humana" },
  { n: "03", label: "Resultado estratégico" },
];

export function HumanExperience() {
  return (
    <section className="relative border-y border-line bg-ink-soft py-20 md:py-36">
      <div className="container-lumi grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Experiência humana</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Seu projeto não é mais um projeto.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
            Antes da câmera, existe um briefing de negócio. Entendemos seu
            objetivo, seu público e o que precisa mudar depois da entrega.
            Produção premium não é sobre equipamento. É sobre decisão certa
            em cada etapa.
          </p>
        </Reveal>

        <div className="flex flex-col justify-center gap-8 divide-y divide-line">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal
              key={item.n}
              delay={0.1 + i * 0.08}
              className={i === 0 ? "flex items-baseline gap-6 pb-8" : "flex items-baseline gap-6 pt-8 pb-8 last:pb-0"}
            >
              <span className="font-display text-sm text-orange-bright/80">
                {item.n}
              </span>
              <span className="font-display text-2xl font-medium text-paper md:text-3xl">
                {item.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
