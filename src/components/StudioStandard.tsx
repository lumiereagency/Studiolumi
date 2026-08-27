import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

export function StudioStandard() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-ink py-24 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src="/videos/case-paola.mp4"
          poster="/videos/case-paola-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div className="grain absolute inset-0 opacity-40" />
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
