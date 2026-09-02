import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ContactForm } from "./ContactForm";

export function FinalCTA() {
  return (
    <section id="contato" className="relative scroll-mt-24 bg-ink py-20 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-lumi-radial opacity-50" />

      <div className="container-lumi relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>Vamos começar</Eyebrow>
          <h2 className="font-display mt-5 text-4xl font-medium leading-[1.05] text-paper md:text-5xl">
            Vamos construir a próxima produção da sua marca.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
            Conte o que você precisa produzir. A partir do objetivo,
            construímos a estrutura, a equipe e o formato ideal para o
            projeto.
          </p>
          <p className="mt-10 text-sm text-paper/55">
            A mesma equipe, do roteiro à entrega.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
