import { LogoMark } from "./LogoMark";

const NAV = [
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Tempo real", href: "#tempo-real" },
  { label: "Partners", href: "#partners" },
  { label: "Pacotes", href: "#pacotes" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-ink">
      <div className="container-lumi flex flex-col gap-12 py-14 md:flex-row md:items-start md:justify-between md:py-20">
        <div className="max-w-sm">
          <a href="#top" className="flex items-center gap-2.5 text-paper" aria-label="Página inicial da StudioLumi">
            <LogoMark className="h-6 w-9 text-paper" strokeWidth={11} />
            <span className="font-display text-[15px] font-medium">StudioLumi</span>
          </a>
          <p className="mt-5 text-sm leading-relaxed text-paper/50">
            Produção audiovisual estratégica para marcas que querem ser lembradas,
            não apenas vistas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <span className="text-xs text-paper/45">Navegação</span>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-paper/70 transition-colors hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-xs text-paper/45">Social</span>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href="https://www.instagram.com/studiolumi_co/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-xs text-paper/45">Contato</span>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href="mailto:lumiereagencyoficial@gmail.com"
                  className="break-all text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  lumiereagencyoficial@gmail.com
                </a>
              </li>
              <li>
                <a href="#contato" className="text-sm text-orange-bright">
                  Iniciar um projeto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-lumi">
        <p
          aria-hidden
          className="font-display select-none whitespace-nowrap text-center text-[19vw] font-medium leading-[0.8] tracking-[-0.06em] text-paper/[0.06] xl:text-[17rem]"
        >
          StudioLumi
        </p>
      </div>

      <div className="container-lumi flex flex-col gap-2 border-t border-line py-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} StudioLumi. Todos os direitos reservados.</span>
        <span>Produções que comunicam antes mesmo da primeira palavra.</span>
      </div>
    </footer>
  );
}
