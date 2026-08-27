import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const { name, email, phone, projectType, message } = body;

  if (!name?.trim() || !email?.trim() || !projectType?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Preencha nome, e-mail, tipo de projeto e mensagem." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.warn(
      "[studiolumi/contact] RESEND_API_KEY/CONTACT_TO_EMAIL/CONTACT_FROM_EMAIL não configurados — pedido apenas logado, e-mail não enviado.",
      { name, email, phone, projectType, message }
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Novo pedido de projeto — ${name}`,
      html: `
        <h2>Novo pedido pelo site StudioLumi</h2>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <p><strong>Tipo de projeto:</strong> ${escapeHtml(projectType)}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("[studiolumi/contact] falha ao enviar via Resend:", error);
      return NextResponse.json({ error: "Não foi possível enviar sua mensagem agora." }, { status: 502 });
    }
  } catch (err) {
    console.error("[studiolumi/contact] erro inesperado ao enviar e-mail:", err);
    return NextResponse.json({ error: "Não foi possível enviar sua mensagem agora." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
