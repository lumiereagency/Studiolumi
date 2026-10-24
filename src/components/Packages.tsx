import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ArrowLink } from "./ui/arrow-link";
import { cn } from "@/lib/utils";

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
    description: "Para marcas que precisam manter presença constante nas redes sem abrir mão de direção e qualidade.",
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
    description: "Uma produção completa para marcas que precisam de mais estrutura, direção e consistência visual.",
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
      "Para campanhas, brand films e projetos especiais que exigem estrutura cinematográfica e um nível superior de produção.",
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
    <section id="pacotes" className="relative scroll-mt-20 bg-ink py-24 md:py-36">
      <div className="container-lumi">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Pacotes</Eyebrow>
            <h2 className="heading-lg mt-6 max-w-3xl text-paper">
              Ritmos diferentes. <span className="text-orange-bright">O mesmo padrão.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-base leading-relaxed text-paper/60">
              Da produção ágil para redes a projetos com linguagem
              cinematográfica. O escopo final é definido pelo objetivo de cada
              projeto.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 md:mt-20 lg:grid-cols-3 lg:gap-4">
          {TIERS.map((tier, i) => (
            <Reveal
              key={tier.id}
              delay={i * 0.08}
              className={cn(
                "flex flex-col rounded-3xl p-7 md:p-9",
                tier.highlighted ? "bg-orange-card text-paper" : "border border-line-strong bg-ink-soft text-paper"
              )}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-4xl font-medium">{tier.name}</h3>
                {tier.highlighted && (
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink">Mais escolhido</span>
                )}
              </div>
              <p className={cn("mt-2 text-sm", tier.highlighted ? "text-paper/85" : "text-paper/50")}>{tier.tagline}</p>
              <p className={cn("mt-6 text-sm leading-relaxed", tier.highlighted ? "text-paper/90" : "text-paper/60")}>
                {tier.description}
              </p>

              <ul className={cn("mt-8 flex flex-1 flex-col border-t", tier.highlighted ? "border-paper/25" : "border-line")}>
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-center gap-3 border-b py-3 text-sm",
                      tier.highlighted ? "border-paper/25 text-paper" : "border-line text-paper/75"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", tier.highlighted ? "bg-paper" : "bg-orange-bright")} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-display text-xl font-medium">Sob consulta</p>
                  <p className={cn("mt-0.5 text-xs", tier.highlighted ? "text-paper/85" : "text-paper/50")}>
                    Investimento conforme briefing
                  </p>
                </div>
                <ArrowLink href="#contato" variant={tier.highlighted ? "light" : "dark"}>
                  Quero este
                </ArrowLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
