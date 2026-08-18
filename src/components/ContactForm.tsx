"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "Mobile — conteúdo ágil",
  "Produção — câmera e narrativa",
  "Cinema — grande escala",
  "Ainda não sei, quero conversar",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Não foi possível enviar agora.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Não foi possível enviar agora."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-orange-bright/40 bg-ink-elevated p-8 text-center md:p-12">
        <p className="font-display text-2xl text-paper">Recebemos sua mensagem.</p>
        <p className="mt-3 text-paper/60">
          Em breve alguém do StudioLumi entra em contato para agendar a
          conversa.
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
      className="rounded-2xl border border-line bg-ink-soft p-6 md:p-10"
      noValidate
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

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.01] disabled:opacity-60 md:w-auto"
      >
        {status === "loading" ? "Enviando..." : "Começar um projeto"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-line-strong bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper/35 outline-none transition-colors focus:border-orange-bright";

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
      <label htmlFor={htmlFor} className="text-xs uppercase tracking-[0.16em] text-paper/50">
        {label}
      </label>
      {children}
    </div>
  );
}
