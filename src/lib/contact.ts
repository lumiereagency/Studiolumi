export const WHATSAPP_NUMBER = "5521966454367";

export function buildWhatsappUrl(fields: {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}) {
  const lines = [
    `Olá! Meu nome é ${fields.name}.`,
    `E-mail: ${fields.email}`,
    fields.phone ? `Telefone: ${fields.phone}` : null,
    `Tipo de projeto: ${fields.projectType}`,
    "",
    fields.message,
  ].filter((line) => line !== null);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
