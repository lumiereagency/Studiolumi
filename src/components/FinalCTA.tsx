import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ContactForm } from "./ContactForm";

export function FinalCTA() {
  return (
    <section id="contato" className="relative scroll-mt-20 bg-ink py-24 md:py-36">
      <div className="container-lumi grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex flex-col justify-between gap-10">
          <div>
            <Eyebrow>Vamos começar</Eyebrow>
            <h2 className="heading-lg mt-6 text-paper">
              Vamos construir a próxima produção <span className="text-orange-bright">da sua marca.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
              Não trabalhamos em série. Conte o que você precisa produzir e, a
              partir do objetivo, montamos a estrutura, a equipe e o formato
              ideal.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-6 border-t border-line pt-8 text-sm">
            <div>
              <dt className="text-paper/45">Resposta</dt>
              <dd className="mt-1 text-paper">Direto no WhatsApp</dd>
            </div>
            <div>
              <dt className="text-paper/45">Instagram</dt>
              <dd className="mt-1">
                <a
                  href="https://www.instagram.com/studiolumi_co/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper transition-colors hover:text-orange-bright"
                >
                  @studiolumi_co
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
