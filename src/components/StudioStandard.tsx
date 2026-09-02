import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

export function StudioStandard() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink py-24 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-1/4 top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,80,2,0.3) 0%, rgba(193,8,1,0.14) 45%, transparent 75%)",
          }}
        />
        <div className="grain absolute inset-0 opacity-30" />
      </div>

      <div className="container-lumi relative">
        <Reveal className="max-w-xl">
          <Eyebrow>Como trabalhamos</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Cada projeto recebe atenção do início ao fim.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-paper/70 md:text-lg">
            Não trabalhamos em série. Conte sua ideia e vamos conversar
            sobre o próximo passo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
