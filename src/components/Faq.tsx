import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { FAQ } from "@/lib/seo";

export function Faq() {
  return (
    <section id="perguntas" className="relative scroll-mt-20 bg-ink py-24 md:py-36">
      <div className="container-lumi grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <h2 className="heading-lg mt-6 text-paper">
              Antes de <span className="text-orange-gradient">começar.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
              O que mais perguntam sobre a StudioLumi, produtora audiovisual no
              Rio de Janeiro que atende todo o Brasil.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-xl font-medium text-paper md:text-2xl">{item.q}</h3>
                  <span
                    aria-hidden
                    className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-paper transition-colors group-open:border-transparent group-open:bg-orange-grad"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current transition-transform duration-300 group-open:rotate-90" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-base leading-relaxed text-paper/65">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
