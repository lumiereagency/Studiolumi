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
  price: string;
  note?: string;
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
    price: "R$ 1.500",
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
    price: "R$ 4.500",
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
    price: "R$ 12.000",
  },
];

const SPECIAL: Tier[] = [
  {
    id: "gestao-edicao",
    name: "Gestão + Edição",
    tagline: "Para figuras públicas.",
    description:
      "Gestão de perfil e edição de vídeo como operação contínua, para quem precisa de presença constante sem perder padrão.",
    features: [
      "Gestão de perfil",
      "Planejamento de conteúdo",
      "Edição de vídeos",
      "Cortes para Reels, TikTok e Shorts",
      "Acompanhamento contínuo",
    ],
    price: "R$ 2.800",
  },
  {
    id: "casamento",
    name: "Casamento",
    tagline: "O dia inteiro, com direção.",
    description:
      "Cobertura do casamento com o mesmo olhar cinematográfico das nossas produções de marca.",
    features: [
      "Captação da cerimônia e da festa",
      "Filme do casamento editado",
      "Versão curta para redes sociais",
      "Colorização e finalização",
    ],
    price: "R$ 1.800",
    note: "Combo pré-wedding + casamento por R$ 2.990",
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
              Ritmos diferentes. <span className="text-orange-gradient">O mesmo padrão.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-base leading-relaxed text-paper/60">
              Da produção ágil para redes a projetos com linguagem
              cinematográfica. Valores de referência: o escopo final é definido
              pelo objetivo de cada projeto.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 md:mt-20 lg:grid-cols-3 lg:gap-4">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} delay={i * 0.08} />
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col gap-3 md:mt-28 md:flex-row md:items-end md:justify-between">
          <h3 className="font-display text-3xl font-medium text-paper md:text-5xl">Planos especiais</h3>
          <p className="max-w-sm text-sm leading-relaxed text-paper/55">
            Para figuras públicas que precisam de operação contínua e para quem
            quer o casamento registrado com direção.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-3 md:mt-10 lg:grid-cols-2 lg:gap-4">
          {SPECIAL.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, delay }: { tier: Tier; delay: number }) {
  return (
    <Reveal
      delay={delay}
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
          <p className={cn("text-xs", tier.highlighted ? "text-paper/85" : "text-paper/50")}>A partir de</p>
          <p className="font-display mt-0.5 text-3xl font-medium">{tier.price}</p>
          {tier.note && (
        <p className="mt-3 inline-flex rounded-full border border-orange-bright/40 bg-orange-bright/10 px-3 py-1 text-xs text-paper">
          {tier.note}
        </p>
      )}
        </div>
        <ArrowLink href="#contato" variant={tier.highlighted ? "light" : "dark"}>
          Quero este
        </ArrowLink>
      </div>
    </Reveal>
  );
}
