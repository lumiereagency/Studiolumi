import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const PARTNERS = ["Sergio Mallandro", "Sr. Bemvindo Sequeira", "Gustavo Mendes"];

export function Partners() {
  return (
    <section id="partners" className="relative scroll-mt-20 bg-ink py-24 md:py-36">
      <div className="container-lumi">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Partners</Eyebrow>
            <h2 className="heading-lg mt-6 max-w-3xl text-paper">
              Figuras públicas que <span className="text-orange-bright">produzimos de ponta a ponta.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-base leading-relaxed text-paper/60">
              Gestão de perfil e edição de vídeo como uma operação contínua, não
              um projeto avulso.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-line md:mt-20">
          {PARTNERS.map((name, i) => (
            <Reveal as="li" key={name} delay={i * 0.06} y={16} className="border-b border-line">
              <div className="group flex items-center justify-between gap-6 py-6 md:py-9">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-xs text-paper/40 md:text-sm">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-3xl font-medium text-paper transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-orange-bright sm:text-5xl md:text-7xl">
                    {name}
                  </span>
                </div>
                <span className="hidden shrink-0 text-sm text-paper/50 md:block">Gestão de perfil · Edição de vídeo</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
