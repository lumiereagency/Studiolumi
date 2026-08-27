import { Reveal } from "./Reveal";

const CLIENTS = [
  { name: "Meu Pé de Jacarandá", role: "Experiência & Eventos" },
  { name: "Sérgio Mallandro", role: "Conteúdo & Redes" },
  { name: "Bruno Carvalho", role: "CEO & Fundador, BBox Training" },
  { name: "Joyce Turques", role: "Esteticista & Biomédica" },
  { name: "Paola Passos", role: "Fundadora, Uniher" },
  { name: "Luciana Grion", role: "CEO & Fundadora, Studio9" },
];

export function ClientRoster() {
  return (
    <section className="relative border-t border-line bg-ink py-14 md:py-20">
      <div className="container-lumi">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.28em] text-paper/55">
            Marcas e profissionais que já produziram com o StudioLumi
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 md:mt-12">
          <ul className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-6 md:gap-x-14">
            {CLIENTS.map((client) => (
              <li key={client.name} className="flex flex-col items-center text-center">
                <span className="font-display text-lg font-medium text-paper/85 md:text-xl">
                  {client.name}
                </span>
                <span className="mt-1 text-xs text-paper/55">{client.role}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
