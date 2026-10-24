import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ArrowCircle, ArrowLink } from "./ui/arrow-link";
import { cn } from "@/lib/utils";

type Tone = "cream" | "orange" | "dark";

const SERVICES: { id: string; label: string; text: string; tone: Tone }[] = [
  {
    id: "institucional",
    label: "Filme Institucional",
    text: "Autoridade e posicionamento em vídeo: a peça que apresenta sua marca como ela merece ser vista.",
    tone: "cream",
  },
  {
    id: "redes",
    label: "Conteúdo para Redes",
    text: "Séries ágeis pensadas para performance social, do roteiro ao corte vertical.",
    tone: "orange",
  },
  {
    id: "eventos",
    label: "Cobertura de Eventos",
    text: "Sua marca registrada com direção, não só câmera, do início ao encerramento.",
    tone: "cream",
  },
  {
    id: "motion",
    label: "Motion & Branding",
    text: "Vinhetas, logo animada e motion graphics que sustentam a marca em tela.",
    tone: "dark",
  },
  {
    id: "tempo-real",
    label: "Conteúdo em Tempo Real",
    text: "Captação, edição e publicação durante o próprio evento, enquanto a pauta ainda está quente.",
    tone: "orange",
  },
  {
    id: "fotografia",
    label: "Fotografia de Produção",
    text: "Still que sustenta a campanha em qualquer formato, da vitrine ao feed.",
    tone: "cream",
  },
  {
    id: "drone",
    label: "Aéreas & Drone",
    text: "Escala e perspectiva que elevam a narrativa: outra dimensão para o mesmo objetivo.",
    tone: "dark",
  },
];

const toneClass: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  orange: "bg-orange-card text-paper",
  dark: "border border-line-strong bg-ink-elevated text-paper",
};

const textClass: Record<Tone, string> = {
  cream: "text-ink/60",
  orange: "text-paper/90",
  dark: "text-paper/60",
};

export function Services() {
  return (
    <section id="servicos" className="relative scroll-mt-20 bg-ink py-24 md:py-36">
      <div className="container-lumi">
        <Reveal className="flex flex-col items-start gap-6 md:items-end md:text-right">
          <Eyebrow>Serviços</Eyebrow>
          <h2 className="heading-lg max-w-4xl text-paper">
            <span className="text-orange-gradient">Sete formas</span> de colocar sua marca em movimento.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-4">
          <Reveal as="li" className="flex flex-col justify-between gap-8 py-2 sm:col-span-2 lg:col-span-1 lg:pr-6">
            <p className="max-w-xs text-base leading-relaxed text-paper/60">
              Cada serviço nasce do mesmo processo: entender o objetivo antes de
              escolher o formato.
            </p>
            <ArrowLink href="#contato" variant="dark" className="self-start">
              Montar meu projeto
            </ArrowLink>
          </Reveal>

          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 4) * 0.06}>
              <a
                href="#contato"
                className={cn(
                  "group flex min-h-[220px] flex-col justify-between gap-10 rounded-3xl p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:min-h-[300px] md:p-7",
                  toneClass[s.tone]
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[1.75rem] font-medium leading-[1.02] md:text-3xl">{s.label}</h3>
                  <ArrowCircle tone={s.tone === "orange" ? "paper" : s.tone === "cream" ? "ink" : "orange"} />
                </div>
                <p className={cn("max-w-xs text-sm leading-relaxed", textClass[s.tone])}>{s.text}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
