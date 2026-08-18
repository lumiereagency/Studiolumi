import { NextResponse } from "next/server";

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

  // TODO: conectar a um serviço real de envio (ex. Resend, SMTP) ou CRM
  // assim que o StudioLumi definir a ferramenta oficial. Por ora, o pedido
  // é validado e recebido com sucesso para permitir testar o fluxo do form.
  console.log("[studiolumi/contact] novo pedido de call:", {
    name,
    email,
    phone,
    projectType,
    message,
  });

  return NextResponse.json({ ok: true });
}
