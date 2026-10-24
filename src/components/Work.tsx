import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { InViewVideo } from "./InViewVideo";
import { ArrowCircle, ArrowLink } from "./ui/arrow-link";
import { getSiteUrl } from "@/lib/site-url";
import { STUDIO } from "@/lib/seo";

type Case = {
  id: string;
  label: string;
  tagline: string;
  category: string;
  videoSrc: string;
  poster: string;
  published: string;
};

const CASES: Case[] = [
  {
    id: "jacaranda",
    label: "Meu Pé de Jacarandá",
    tagline: "Experiência & Eventos",
    category: "Evento",
    videoSrc: "/videos/case-evento.mp4",
    poster: "/videos/case-evento-poster.jpg",
    published: "2026-08-21",
  },
  {
    id: "sergio-mallandro",
    label: "Sérgio Mallandro",
    tagline: "Conteúdo & Redes",
    category: "Redes",
    videoSrc: "/videos/case-social.mp4",
    poster: "/videos/case-social-poster.jpg",
    published: "2026-08-21",
  },
  {
    id: "bruno-carvalho",
    label: "Bruno Carvalho",
    tagline: "CEO & Fundador, BBox Training",
    category: "Posicionamento",
    videoSrc: "/videos/case-bruno.mp4",
    poster: "/videos/case-bruno-poster.jpg",
    published: "2026-08-22",
  },
  {
    id: "joyce-turques",
    label: "Joyce Turques",
    tagline: "Esteticista & Biomédica",
    category: "Brand film",
    videoSrc: "/videos/case-joyce.mp4",
    poster: "/videos/case-joyce-poster.jpg",
    published: "2026-08-22",
  },
  {
    id: "paola-passos",
    label: "Paola Passos",
    tagline: "Fundadora, Uniher",
    category: "Autoridade",
    videoSrc: "/videos/case-paola.mp4",
    poster: "/videos/case-paola-poster.jpg",
    published: "2026-08-22",
  },
];

const siteUrl = getSiteUrl();

const videoListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: CASES.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "VideoObject",
      name: `${c.label}: ${c.category} | StudioLumi`,
      description: `${c.category} para ${c.label} (${c.tagline}), produzido pela StudioLumi, produtora audiovisual no Rio de Janeiro.`,
      thumbnailUrl: `${siteUrl}${c.poster}`,
      contentUrl: `${siteUrl}${c.videoSrc}`,
      uploadDate: `${c.published}T12:00:00-03:00`,
      inLanguage: "pt-BR",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  })),
};

export function Work() {
  return (
    <section id="trabalhos" className="relative scroll-mt-20 bg-ink py-24 md:py-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoListJsonLd) }} />

      <div className="container-lumi">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>Trabalhos selecionados</Eyebrow>
            <h2 className="heading-lg mt-6 max-w-3xl text-paper">
              Projetos que exigiram mais do que <span className="text-orange-gradient">uma boa câmera.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-base leading-relaxed text-paper/60">
              Campanhas, conteúdo recorrente, posicionamento, eventos e projetos
              especiais. Trabalhos que traduzem como pensamos, dirigimos e
              entregamos.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-2.5 md:mt-20 md:gap-4 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 3) * 0.08}>
              <article className="group relative aspect-[9/14] overflow-hidden rounded-2xl bg-ink-soft md:rounded-3xl">
                <InViewVideo
                  src={c.videoSrc}
                  poster={c.poster}
                  className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/25" />

                <div className="absolute inset-x-3 top-3 flex items-start justify-between md:inset-x-5 md:top-5">
                  <span className="rounded-full border border-paper/20 bg-ink/30 px-3 py-1 text-[11px] text-paper/90 backdrop-blur-md">
                    {c.category}
                  </span>
                  <span className="hidden text-xs text-paper/60 sm:block">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <div className="absolute inset-x-3 bottom-3 md:inset-x-5 md:bottom-5">
                  <h3 className="font-display text-lg font-medium leading-tight text-paper md:text-3xl">{c.label}</h3>
                  <p className="mt-1 text-xs text-paper/60 md:text-sm">{c.tagline}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal as="li" delay={0.16}>
            <a
              href="#contato"
              className="group flex aspect-[9/14] flex-col justify-between rounded-2xl bg-cream p-4 text-ink md:rounded-3xl md:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs text-ink/55 md:text-sm">Próximo projeto</span>
                <ArrowCircle />
              </div>
              <div>
                <p className="font-display text-xl font-medium leading-[1.02] md:text-4xl">
                  A próxima produção pode ser a sua.
                </p>
                <p className="mt-3 hidden max-w-xs text-sm leading-relaxed text-ink/60 md:block">
                  Conte o objetivo. A gente estrutura direção, equipe e formato.
                </p>
              </div>
            </a>
          </Reveal>
        </ul>

        <Reveal className="mt-10 flex justify-center md:mt-14">
          <ArrowLink href={STUDIO.instagram} variant="dark" external>
            Mais produções no Instagram
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
