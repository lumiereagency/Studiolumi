"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LogoMark } from "./LogoMark";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";

const LINKS = [
  { href: "#experiencia", label: "Experiência" },
  { href: "#processo", label: "Processo" },
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        open || scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container-lumi relative z-10 flex h-20 items-center justify-between py-4">
        <a
          href="#top"
          onClick={close}
          className="flex items-center gap-2.5 text-paper"
          aria-label="Página inicial da StudioLumi"
        >
          <LogoMark className="h-6 w-12 text-paper" strokeWidth={18} />
          <span className="font-display text-sm font-medium tracking-[0.18em] uppercase">
            StudioLumi
          </span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden rounded-full border border-line-strong px-5 py-2.5 text-sm text-paper transition-colors hover:border-orange-bright hover:text-orange-bright md:inline-block"
        >
          Iniciar um projeto
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-paper transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-paper transition-transform duration-300",
              open && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          open={open}
          showOverlay={false}
          className="inset-x-0 top-20 h-[calc(100dvh-5rem)] w-full overflow-y-auto md:hidden"
        >
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
          <SheetDescription className="sr-only">Links de navegação do StudioLumi</SheetDescription>
          <ul className="container-lumi flex flex-col gap-2 pb-20 pt-8">
            {LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.45,
                  delay: reduceMotion ? 0 : 0.08 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-line"
              >
                <a
                  href={link.href}
                  onClick={close}
                  className="font-display block py-4 text-3xl font-medium text-paper transition-colors active:text-orange-bright"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.45,
                delay: reduceMotion ? 0 : 0.08 + LINKS.length * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-6"
            >
              <a
                href="#contato"
                onClick={close}
                className="inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink"
              >
                Iniciar um projeto →
              </a>
            </motion.li>
          </ul>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
