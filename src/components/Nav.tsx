"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { ArrowLink } from "./ui/arrow-link";

const LINKS = [
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#tempo-real", label: "Tempo real" },
  { href: "#partners", label: "Partners" },
  { href: "#pacotes", label: "Pacotes" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        open ? "bg-ink" : scrolled ? "bg-ink/70 backdrop-blur-xl md:bg-transparent md:backdrop-blur-none" : "bg-transparent"
      )}
    >
      <nav className="container-lumi relative z-10 flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          onClick={close}
          className="flex items-center gap-2.5 text-paper"
          aria-label="Página inicial da StudioLumi"
        >
          <LogoMark className="h-6 w-9 text-paper" strokeWidth={11} />
          <span className="font-display text-[15px] font-medium">StudioLumi</span>
        </a>

        <ul
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border p-1 transition-colors duration-500 md:flex",
            scrolled ? "border-line-strong bg-ink/60 backdrop-blur-xl" : "border-line bg-paper/[0.04] backdrop-blur-md"
          )}
        >
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-full px-4 py-2 text-[13px] text-paper/70 transition-colors hover:bg-paper/10 hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ArrowLink href="#contato" className="hidden md:inline-flex">
          Iniciar projeto
        </ArrowLink>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line-strong md:hidden"
        >
          <span className={cn("h-px w-4 bg-paper transition-transform duration-300", open && "translate-y-[3.5px] rotate-45")} />
          <span className={cn("h-px w-4 bg-paper transition-transform duration-300", open && "-translate-y-[3.5px] -rotate-45")} />
        </button>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          open={open}
          showOverlay={false}
          className="inset-x-0 top-16 h-[calc(100dvh-4rem)] w-full overflow-y-auto bg-ink md:hidden"
        >
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
          <SheetDescription className="sr-only">Links de navegação do StudioLumi</SheetDescription>
          <ul className="container-lumi flex flex-col pb-20 pt-6">
            {[...LINKS, { href: "#contato", label: "Contato" }].map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.45,
                  delay: reduceMotion ? 0 : 0.06 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-line"
              >
                <a
                  href={link.href}
                  onClick={close}
                  className="font-display block py-4 text-4xl font-medium text-paper transition-colors active:text-orange-bright"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
            <li className="mt-8" onClick={close}>
              <ArrowLink href="#contato" variant="orange">
                Iniciar um projeto
              </ArrowLink>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
