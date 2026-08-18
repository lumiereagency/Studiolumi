import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const STEPS = [
  { n: "01", title: "Imersão", text: "Entendemos seu negócio, seu público e o objetivo da produção." },
  { n: "02", title: "Estratégia", text: "Definimos o que precisa ser dito, para quem e com que resultado." },
  { n: "03", title: "Produção", text: "Executamos com direção técnica e artística." },
  { n: "04", title: "Pós-produção", text: "Edição, cor e ritmo — sem perder o prazo." },
  { n: "05", title: "Entrega", text: "Material pronto para performar no canal certo." },
];

export function Process() {
  return (
    <section id="processo" className="relative scroll-mt-24 border-y border-line bg-ink-soft py-28 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-2xl">
          <Eyebrow>Processo</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Grandes imagens não acontecem por acaso.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Existe estratégia antes da câmera. Direção durante a gravação. E
            precisão em cada detalhe depois dela.
          </p>
        </Reveal>

        <ol className="mt-16 divide-y divide-line border-t border-line md:mt-20">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06} y={18}>
              <li className="flex flex-col gap-2 py-7 md:flex-row md:items-baseline md:gap-10 md:py-8">
                <span className="font-display shrink-0 text-sm text-orange-bright/80 md:w-12">
                  {step.n}
                </span>
                <span className="font-display shrink-0 text-2xl font-medium text-paper md:w-56 md:text-3xl">
                  {step.title}
                </span>
                <span className="max-w-lg text-base text-paper/55 md:text-lg">
                  {step.text}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
