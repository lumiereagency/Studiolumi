import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const STEPS = [
  { n: "01", title: "Imersão", text: "Entendemos a marca, o contexto e o objetivo da produção." },
  { n: "02", title: "Direção", text: "Transformamos o objetivo em conceito, linguagem e plano de produção." },
  { n: "03", title: "Produção", text: "Captação com direção técnica, criativa e controle de cada detalhe." },
  { n: "04", title: "Pós-produção", text: "Edição, tratamento, cor, motion e finalização para cada formato de entrega." },
];

export function Process() {
  return (
    <section id="processo" className="relative scroll-mt-20 bg-ink py-24 md:py-36">
      <div className="container-lumi grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Processo</Eyebrow>
            <h2 className="heading-lg mt-6 text-paper">
              Boas produções não começam <span className="text-orange-gradient">na câmera.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
              Da imersão à entrega, cada etapa existe para eliminar improviso.
            </p>
          </Reveal>
        </div>

        <ol className="flex flex-col gap-3 md:gap-4">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.05}>
              <div className="flex min-h-[180px] flex-col justify-between gap-8 rounded-3xl border border-line bg-ink-soft p-6 md:min-h-[220px] md:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm text-orange-bright">{step.n}</span>
                  <span className="text-xs text-paper/40">Etapa {i + 1} de {STEPS.length}</span>
                </div>
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
                  <h3 className="font-display text-4xl font-medium text-paper md:text-5xl">{step.title}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-paper/60 md:text-base">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
