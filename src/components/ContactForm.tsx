"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { buildWhatsappUrl } from "@/lib/contact";
import { ArrowCircle } from "./ui/arrow-link";

const PROJECT_TYPES = [
  "Mobile: conteúdo ágil",
  "Produção: câmera e narrativa",
  "Cinema: grande escala",
  "Ainda não sei, quero conversar",
];

type Status = "idle" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const url = buildWhatsappUrl({
      name: data.name,
      email: data.email,
      phone: data.phone,
      projectType: data.projectType,
      message: data.message,
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("sent");
    form.reset();
  };

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-orange-bright/40 bg-ink-elevated p-8 text-center md:p-12">
        <p className="font-display text-2xl text-paper">Abrimos o WhatsApp para você.</p>
        <p className="mt-3 text-paper/60">
          Complete o envio por lá para falar direto com o StudioLumi.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-orange-bright underline underline-offset-4"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-ink-soft p-5 md:p-9"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Nome" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Seu nome"
          />
        </Field>

        <Field label="E-mail" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="voce@marca.com"
          />
        </Field>

        <Field label="Telefone (opcional)" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="(00) 00000-0000"
          />
        </Field>

        <Field label="Tipo de projeto" htmlFor="projectType">
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={cn(inputClass, "appearance-none")}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-ink-soft">
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Conte o que você está construindo" htmlFor="message" className="md:col-span-2">
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className={cn(inputClass, "resize-none")}
            placeholder="Sua marca, o objetivo da produção, prazos e qualquer referência que ajude a entender a história."
          />
        </Field>
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex w-full items-center justify-between gap-3 rounded-full bg-orange-bright py-1.5 pl-6 pr-1.5 text-sm font-medium text-paper transition-colors hover:bg-orange md:w-auto"
      >
        Falar com o StudioLumi no WhatsApp
        <ArrowCircle tone="paper" />
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-line-strong bg-ink/40 px-4 py-3.5 text-sm text-paper placeholder:text-paper/45 outline-none transition-colors focus:border-orange-bright";

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-xs text-paper/55">
        {label}
      </label>
      {children}
    </div>
  );
}
