import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
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
    tagline: "Agilidade que acompanha o ritmo das redes",
    description:
      "Conteúdo ágil, pensado para social media e para marcas que precisam publicar com frequência sem perder consistência.",
    features: [
      "Roteiro e direção enxutos",
      "Captação com celular ou câmera compacta",
      "Edição para redes sociais",
      "Entrega em formatos verticais e quadrados",
    ],
  },
  {
    id: "producao",
    name: "Produção",
    tagline: "Mais controle. Mais narrativa.",
    description:
      "Produção completa com câmera, equipe e direção, para marcas que precisam de uma narrativa mais elaborada.",
    features: [
      "Estratégia e roteiro dedicados",
      "Captação com equipe e equipamento profissional",
      "Direção de arte e fotografia",
      "Edição, color e motion graphics",
      "Entrega multiplataforma",
    ],
    highlighted: true,
  },
  {
    id: "cinema",
    name: "Cinema",
    tagline: "Grande escala. Experiências memoráveis.",
    description:
      "Produções cinematográficas para brand films, campanhas e projetos que exigem a maior régua de qualidade.",
    features: [
      "Imersão e estratégia aprofundadas",
      "Equipe completa e equipamento cinematográfico",
      "Direção, fotografia e drone",
      "Pós-produção e finalização premium",
      "Acompanhamento de ponta a ponta",
    ],
  },
];

export function Packages() {
  return (
    <section id="pacotes" className="relative scroll-mt-24 bg-ink py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="max-w-2xl">
          <Eyebrow>Pacotes</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Uma estrutura para cada escala de história.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/60 md:text-lg">
            Os valores ainda são definidos sob briefing, pois cada produção
            tem um escopo próprio. Estas são as três formas mais comuns de
            começar uma conversa com o StudioLumi.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.1}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-8 md:p-9",
                  tier.highlighted
                    ? "border-orange-bright/50 bg-ink-elevated"
                    : "border-line bg-ink-soft"
                )}
              >
                {tier.highlighted && (
                  <span className="mb-6 inline-flex w-fit items-center rounded-full border border-orange-bright/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-orange-bright">
                    Mais escolhido
                  </span>
                )}

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
                  <p className="mt-1 text-xs text-paper/40">
                    Investimento definido conforme briefing
                  </p>
                  <a
                    href="#contato"
                    className={cn(
                      "mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300",
                      tier.highlighted
                        ? "bg-paper text-ink hover:bg-orange-bright hover:text-ink"
                        : "border border-line-strong text-paper hover:border-orange-bright hover:text-orange-bright"
                    )}
                  >
                    Falar sobre este pacote
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
