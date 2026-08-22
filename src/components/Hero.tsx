"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink px-6 pb-16 pt-32 text-center sm:pb-20 md:pt-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-lumi-radial" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-[-45vh] h-[90vh] w-[90vh] -translate-x-1/2 sm:h-[105vh] sm:w-[105vh]"
        >
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, transparent 0%, transparent 54%, rgba(241,96,1,0.7) 61%, rgba(232,80,2,0.45) 70%, transparent 82%)",
              filter: "blur(30px)",
            }}
            animate={reduceMotion ? {} : { x: [-24, 24, -24] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="container-lumi relative z-10 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg text-sm leading-relaxed text-paper/70 sm:text-base"
        >
          Estratégia, imagem e direção em um único lugar. Sem terceirização.
          Sem fórmulas prontas. Apenas produção audiovisual que projeta sua
          marca para o próximo nível.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contato"
            className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            Conheça o StudioLumi
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-300 hover:border-orange-bright hover:text-orange-bright"
          >
            Ver produções
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/40 md:flex"
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
