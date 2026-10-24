import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const TEAM = [
  { id: "gustavo-turques", name: "Gustavo Turques", role: "Fundador" },
  { id: "ingrid-cardoso", name: "Ingrid Cardoso", role: "Cofundadora" },
  { id: "mariene-beatriz", name: "Mariene Beatriz", role: "Social Media" },
  { id: "attaner-peixoto", name: "Attaner Peixoto", role: "Fotógrafo" },
  { id: "jonny-lucas", name: "Jonny Lucas", role: "Videomaker" },
];

export function LumiTeam() {
  return (
    <section id="equipe" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 md:py-36">
      <div className="container-lumi flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow>Lumi Team</Eyebrow>
          <h2 className="heading-lg mt-6 max-w-3xl text-paper">
            Especialidades diferentes. <span className="text-orange-bright">Um mesmo padrão.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="max-w-sm">
          <p className="text-base leading-relaxed text-paper/60">
            Direção, produção, imagem, edição e estratégia trabalham de forma
            integrada. Cada profissional entra com uma função clara.
          </p>
        </Reveal>
      </div>

      <div className="container-lumi">
      <ul className="no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-6 px-6 md:mx-0 md:mt-16 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0">
        {TEAM.map((m, i) => (
          <Reveal as="li" key={m.id} delay={i * 0.06} className="w-[62vw] shrink-0 snap-start sm:w-[38vw] md:w-auto">
            <figure className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-ink-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/team/${m.id}.jpg`}
                  alt={`${m.name}, ${m.role} no StudioLumi`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top grayscale brightness-110 contrast-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-orange-bright mix-blend-color opacity-90 transition-opacity duration-700 group-hover:opacity-0"
                />
                <span className="absolute left-3 top-3 rounded-full border border-paper/20 bg-ink/30 px-3 py-1 text-[11px] text-paper/90 backdrop-blur-md">
                  {m.role}
                </span>
              </div>
              <figcaption className="font-display mt-3 text-lg font-medium text-paper md:text-xl">{m.name}</figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
      </div>
    </section>
  );
}
