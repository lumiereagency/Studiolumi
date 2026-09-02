import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { InfluencerCarousel, type Creator } from "./InfluencerCarousel";

const TEAM: Creator[] = [
  { id: "gustavo-turques", name: "Gustavo Turques", handle: "Fundador", image: "/team/gustavo-turques.jpg" },
  { id: "ingrid-cardoso", name: "Ingrid Cardoso", handle: "Cofundadora", image: "/team/ingrid-cardoso.jpg" },
  { id: "mariene-beatriz", name: "Mariene Beatriz", handle: "Social Media", image: "/team/mariene-beatriz.jpg" },
  { id: "attaner-peixoto", name: "Attaner Peixoto", handle: "Fotógrafo", image: "/team/attaner-peixoto.jpg" },
  { id: "jonny-lucas", name: "Jonny Lucas", handle: "Videomaker", image: "/team/jonny-lucas.jpg" },
];

export function LumiTeam() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-36">
      <div className="container-lumi">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Lumi Team</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Uma equipe. Diferentes especialidades. Um mesmo padrão.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/60 md:text-lg">
            Direção, produção, imagem, edição e estratégia trabalham de
            forma integrada. Cada profissional entra no projeto com uma
            função clara, e todos trabalham para manter a mesma visão do
            início à entrega.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-14 md:mt-20">
        <InfluencerCarousel
          creators={TEAM}
          regionLabel="Carrossel da equipe StudioLumi. Arraste ou use as setas para navegar."
          itemLabel="integrante"
        />
      </Reveal>
    </section>
  );
}
