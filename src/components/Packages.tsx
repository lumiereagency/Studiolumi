import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { buttonVariants } from "./ui/button";
import { SpotlightCard } from "./ui/spotlight-card";

type Tier = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "mobile",
    name: "Mobile",
    tagline: "Conteúdo ágil. Produção inteligente.",
    description:
      "Para marcas que precisam manter presença constante nas redes sem abrir mão de direção e qualidade.",
    features: [
      "Roteiro e direção",
      "Captação mobile",
      "Edição para redes sociais",
      "Formatos verticais e quadrados",
      "Entrega otimizada para publicação",
    ],
  },
  {
    id: "producao",
    name: "Produção",
    tagline: "Mais controle. Mais possibilidades.",
    description:
      "Uma produção completa para marcas que precisam de mais estrutura, direção e consistência visual.",
    features: [
      "Estratégia e roteiro",
      "Direção criativa",
      "Captação profissional",
      "Equipe e equipamentos",
      "Direção de fotografia",
      "Edição e colorização",
      "Motion graphics",
      "Entrega multiplataforma",
    ],
    highlighted: true,
  },
  {
    id: "cinema",
    name: "Cinema",
    tagline: "Grande escala. Grande presença.",
    description:
      "Para campanhas, brand films e projetos especiais que exigem uma estrutura cinematográfica e um nível superior de produção.",
    features: [
      "Conceito e estratégia aprofundados",
      "Equipe e estrutura cinematográfica",
      "Direção e fotografia",
      "Captação aérea com drone",
      "Pós-produção avançada",
      "Colorização e finalização",
      "Acompanhamento completo da produção",
    ],
  },
];

export function Packages() {
  return (
    <section id="pacotes" className="relative scroll-mt-24 overflow-hidden bg-ink py-20 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[18%] top-[8%] h-[46vh] w-[46vh] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,80,2,0.55) 0%, rgba(193,8,1,0.3) 45%, transparent 75%)",
          }}
        />
        <div
          className="absolute right-[14%] top-[22%] h-[42vh] w-[42vh] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(217,195,171,0.32) 0%, rgba(241,96,1,0.18) 50%, transparent 75%)",
          }}
        />
      </div>

      <div className="container-lumi relative">
        <Reveal className="max-w-2xl">
          <Eyebrow>Pacotes</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Produção para diferentes ritmos.
            <br />O mesmo padrão de qualidade.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Nem toda marca precisa da mesma estrutura de produção. Por isso,
            organizamos diferentes níveis de operação, da produção ágil para
            redes sociais a projetos completos com equipe, direção e
            linguagem cinematográfica. O escopo final é definido de acordo
            com o objetivo de cada projeto.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.1}>
              <SpotlightCard
                className={cn(
                  "rounded-2xl border p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl md:p-9",
                  tier.highlighted
                    ? "border-orange-bright/40 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_0_60px_-15px_rgba(241,96,1,0.45)]"
                    : "border-white/10 bg-white/[0.05]"
                )}
              >
                {tier.highlighted && <Badge className="mb-6">Mais escolhido</Badge>}

                <h3 className="font-display text-2xl font-medium text-paper">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm text-paper/50">{tier.tagline}</p>

                <p className="mt-6 text-sm leading-relaxed text-paper/60">
                  {tier.description}
                </p>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-paper/70"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-bright" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 border-t border-line pt-6">
                  <p className="font-display text-lg text-paper">
                    Sob consulta
                  </p>
                  <p className="mt-1 text-xs text-paper/55">
                    Investimento definido conforme briefing
                  </p>
                  <a
                    href="#contato"
                    className={cn(
                      buttonVariants({
                        variant: tier.highlighted ? "primary" : "secondary",
                        size: "sm",
                      }),
                      "mt-5 w-full",
                      tier.highlighted && "hover:bg-orange-bright hover:text-ink"
                    )}
                  >
                    Falar sobre este pacote
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
