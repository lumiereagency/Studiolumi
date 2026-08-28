"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Eyebrow";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink px-6 pb-16 pt-32 sm:pb-20 md:pt-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-lumi-radial" />

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -right-1/4 top-[-10%] h-[85vh] w-[85vh] rounded-full blur-[110px] sm:-right-[10%]"
          style={{
            background:
              "radial-gradient(circle, rgba(241,96,1,0.55) 0%, rgba(232,80,2,0.35) 40%, rgba(193,8,1,0.15) 62%, transparent 78%)",
          }}
        />
        {!reduceMotion && (
          <motion.div
            animate={{ opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-1/4 top-[-10%] h-[85vh] w-[85vh] rounded-full blur-[110px] sm:-right-[10%]"
            style={{
              background:
                "radial-gradient(circle, rgba(241,96,1,0.35) 0%, transparent 65%)",
            }}
          />
        )}

        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      </div>

      <div className="container-lumi relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-between"
        >
          <Eyebrow>Produção audiovisual</Eyebrow>
          <span className="hidden text-xs font-medium uppercase tracking-[0.28em] text-paper/55 sm:block">
            Direção criativa
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-8 max-w-5xl text-4xl font-medium uppercase leading-[1.08] text-paper sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Imagem que <span className="text-gradient-lumi">posiciona.</span>
          <br />
          Produção que entrega.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-md text-sm leading-relaxed text-paper/55 md:text-base"
        >
          Direção, produção e pós-produção em uma única operação, para marcas
          que não abrem mão de padrão.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contato"
            className={cn(buttonVariants({ variant: "primary" }), "group transition-transform duration-300 hover:scale-[1.03]")}
          >
            Iniciar um projeto
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a href="#experiencia" className={buttonVariants({ variant: "secondary" })}>
            Ver produções
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/55 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-paper/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
