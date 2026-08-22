import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const HIGHLIGHTS = [
  {
    n: "01",
    label: "Direção precisa",
    text: "Do briefing ao último take, cada decisão tem uma função.",
  },
  {
    n: "02",
    label: "Olhar criativo",
    text: "Estética, narrativa e linguagem trabalham juntas para construir percepção.",
  },
  {
    n: "03",
    label: "Entrega com propósito",
    text: "O material não termina na exportação. Ele precisa funcionar no canal, no contexto e para o objetivo definido.",
  },
];

export function HumanExperience() {
  return (
    <section className="relative border-y border-line bg-ink-soft py-20 md:py-36">
      <div className="container-lumi grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Experiência</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Uma produção premium começa antes da câmera.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
            Cada projeto recebe atenção proporcional ao que precisa
            entregar. Entendemos o contexto, alinhamos objetivos, definimos
            a linguagem e construímos a produção antes da captação. O
            resultado é mais controle, mais consistência e uma entrega
            pensada para funcionar de verdade.
          </p>
        </Reveal>

        <div className="flex flex-col justify-center gap-8 divide-y divide-line">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal
              key={item.n}
              delay={0.1 + i * 0.08}
              className={i === 0 ? "flex gap-6 pb-8" : "flex gap-6 pt-8 pb-8 last:pb-0"}
            >
              <span className="font-display shrink-0 text-sm text-orange-bright/80">
                {item.n}
              </span>
              <div>
                <span className="font-display block text-2xl font-medium text-paper md:text-3xl">
                  {item.label}
                </span>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/55 md:text-base">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
