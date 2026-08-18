"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Eyebrow";

const HEADLINE = ["Do", "mobile", "ao", "cinema."];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pb-16 pt-40 md:pb-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-lumi-radial" />
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(232,80,2,0.5) 0%, rgba(193,8,1,0.25) 45%, transparent 75%)",
          }}
        />
        {!reduceMotion && (
          <motion.div
            animate={{ opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[8%] top-[18%] h-[40vh] w-[40vh] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(241,96,1,0.35) 0%, transparent 70%)",
            }}
          />
        )}
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>

      <div className="container-lumi relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>Produção audiovisual responsiva</Eyebrow>
        </motion.div>

        <h1 className="font-display mt-6 text-[15vw] leading-[0.94] font-medium tracking-tight text-paper sm:text-[11vw] md:text-[8.5vw] lg:text-[7.5vw]">
          {HEADLINE.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-[0.05em] pr-[0.15em] align-top">
              <motion.span
                className={
                  i === HEADLINE.length - 1
                    ? "inline-block text-gradient-lumi"
                    : "inline-block"
                }
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1,
                  delay: 0.35 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex max-w-3xl flex-col gap-4 md:mt-14"
        >
          <p className="text-xl text-paper/85 md:text-2xl">
            Produções audiovisuais pensadas para transformar ideias em
            experiências que merecem ser vistas.
          </p>
          <p className="max-w-xl text-base text-paper/55 md:text-lg">
            Estratégia, direção e estética em uma produção singular, humana e
            feita para cada história.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4 md:mt-14"
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
