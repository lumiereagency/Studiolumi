import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ContactForm } from "./ContactForm";

export function FinalCTA() {
  return (
    <section id="contato" className="relative scroll-mt-24 bg-ink py-28 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-lumi-radial opacity-50" />

      <div className="container-lumi relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Vamos começar</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Vamos dar imagem à sua próxima história?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
            Conte o que você está construindo. Nós pensamos em como
            transformar isso em audiovisual.
          </p>
          <p className="mt-10 text-sm text-paper/40">
            Do mobile ao cinema.
            <br />
            Do primeiro frame ao último detalhe.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
