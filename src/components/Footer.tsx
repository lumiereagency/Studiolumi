import { LogoMark } from "./LogoMark";

const NAV = [
  { label: "Experiência", href: "#experiencia" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Processo", href: "#processo" },
  { label: "Pacotes", href: "#pacotes" },
  { label: "Contato", href: "#contato" },
];

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="container-lumi flex flex-col gap-12 py-16 md:flex-row md:items-start md:justify-between md:py-20">
        <div className="max-w-sm">
          <a href="#top" className="flex items-center gap-2.5 text-paper" aria-label="Página inicial da StudioLumi">
            <LogoMark className="h-6 w-12 text-paper" strokeWidth={18} />
            <span className="font-display text-sm font-medium tracking-[0.18em] uppercase">
              StudioLumi
            </span>
          </a>
          <p className="mt-5 text-sm leading-relaxed text-paper/50">
            Produção audiovisual responsiva e estratégica. Do mobile ao
            cinema, uma linguagem para cada história.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-paper/40">Navegação</span>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-paper/65 transition-colors hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-paper/40">Social</span>
            <ul className="mt-4 flex flex-col gap-3">
              {SOCIAL.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-paper/65 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-paper/40">Contato</span>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:contato@studiolumi.com.br"
                  className="text-sm text-paper/65 transition-colors hover:text-paper"
                >
                  contato@studiolumi.com.br
                </a>
              </li>
              <li>
                <a href="#contato" className="text-sm text-orange-bright">
                  Agendar conversa →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-lumi flex flex-col gap-3 border-t border-line py-6 text-xs text-paper/35 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} StudioLumi. Todos os direitos reservados.</span>
        <span>Produções que comunicam antes mesmo da primeira palavra.</span>
      </div>
    </footer>
  );
}
