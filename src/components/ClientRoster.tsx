import { Marquee } from "./ui/marquee";

const CLIENTS = [
  { name: "Meu Pé de Jacarandá", role: "Experiência & Eventos" },
  { name: "Sérgio Mallandro", role: "Conteúdo & Redes" },
  { name: "Bruno Carvalho", role: "CEO & Fundador, BBox Training" },
  { name: "Joyce Turques", role: "Esteticista & Biomédica" },
  { name: "Paola Passos", role: "Fundadora, Uniher" },
];

export function ClientRoster() {
  return (
    <section className="relative border-y border-line bg-ink py-8 md:py-10">
      <div className="container-lumi flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        <p className="shrink-0 text-sm leading-snug text-paper/50 md:max-w-[11rem]">
          Marcas e profissionais que já produziram com a gente
        </p>
        <div className="min-w-0 flex-1">
        <Marquee>
          <ul className="flex shrink-0 items-center gap-14">
            {CLIENTS.map((client) => (
              <li key={client.name} className="flex items-baseline gap-3 whitespace-nowrap">
                <span className="font-display text-xl font-medium text-paper md:text-2xl">{client.name}</span>
                <span className="text-xs text-paper/45">{client.role}</span>
              </li>
            ))}
          </ul>
        </Marquee>
        </div>
      </div>
    </section>
  );
}
