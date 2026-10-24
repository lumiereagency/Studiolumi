import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const PRINCIPLES = [
  { n: "01", label: "Direção precisa", text: "Do briefing ao último take, cada decisão tem uma função." },
  { n: "02", label: "Olhar criativo", text: "Estética, narrativa e linguagem trabalham juntas para construir percepção." },
  {
    n: "03",
    label: "Entrega com propósito",
    text: "O material precisa funcionar no canal, no contexto e para o objetivo definido.",
  },
];

const TEAM_FACES = ["gustavo-turques", "ingrid-cardoso", "mariene-beatriz", "attaner-peixoto", "jonny-lucas"];

export function About() {
  return (
    <section id="sobre" className="relative scroll-mt-20 bg-ink pb-24 md:pb-36">
      <div className="container-lumi">
        <div className="rounded-[28px] border border-line bg-ink-soft p-5 md:rounded-[40px] md:p-10 lg:p-14">
          <Reveal>
            <Eyebrow>Sobre o estúdio</Eyebrow>
            <h2 className="heading-lg mt-6 max-w-4xl text-paper">
              Nada no resultado final <span className="text-orange-bright">é por acaso.</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6">
            <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:aspect-auto lg:min-h-[560px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/videos/realtime-keynote-poster.jpg"
                alt="Palestrante em palco captado pela equipe StudioLumi"
                className="absolute inset-0 h-full w-full object-cover grayscale brightness-110 contrast-110"
              />
              <div aria-hidden className="absolute inset-0 bg-orange-bright mix-blend-color opacity-90" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <p className="font-display absolute inset-x-5 bottom-5 text-2xl font-medium leading-tight text-paper md:text-3xl">
                Direção, estética e entrega são decisões conscientes.
              </p>
            </Reveal>

            <div className="flex flex-col gap-4 lg:gap-6">
              <Reveal delay={0.1} className="flex flex-col gap-6 py-2 md:flex-row md:items-end md:justify-between lg:py-4">
                <p className="max-w-md text-base leading-relaxed text-paper/65 md:text-lg">
                  Decisões tomadas por quem já viu o que dá errado quando não são.
                  É esse nível de controle que separa uma produção de qualidade de
                  uma produção de sorte.
                </p>
                <div className="flex shrink-0 items-center gap-3">
                  <div className="flex -space-x-3">
                    {TEAM_FACES.map((id) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={id}
                        src={`/team/${id}.jpg`}
                        alt=""
                        className="h-11 w-11 rounded-full border-2 border-ink-soft object-cover object-top"
                      />
                    ))}
                  </div>
                  <span className="text-xs leading-tight text-paper/60">
                    Equipe
                    <br />
                    integrada
                  </span>
                </div>
              </Reveal>

              <div className="grid flex-1 gap-4 md:grid-cols-2 lg:gap-6">
                <Reveal delay={0.15} className="flex flex-col justify-between gap-8 rounded-3xl bg-cream p-6 text-ink md:p-7">
                  <span className="text-sm text-ink/55">Como pensamos</span>
                  <ol className="flex flex-col divide-y divide-ink/10">
                    {PRINCIPLES.map((p) => (
                      <li key={p.n} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                        <span className="pt-1 text-xs text-orange">{p.n}</span>
                        <div>
                          <p className="font-display text-lg font-medium leading-tight">{p.label}</p>
                          <p className="mt-1 text-sm leading-snug text-ink/60">{p.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Reveal>

                <Reveal delay={0.2} className="bg-orange-card relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl p-6 md:p-7">
                  <span className="text-sm text-paper/80">Operação completa</span>
                  <div>
                    <p className="font-display text-3xl font-medium leading-[1.02] text-paper md:text-4xl">
                      Do roteiro à entrega.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-paper/90">
                      A mesma equipe em todas as etapas, mantendo uma única visão do
                      início ao fim.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
