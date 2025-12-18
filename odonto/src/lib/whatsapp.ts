export type DentalService = {
  id: string;
  name: string;
  description: string;
};

interface WhatsAppParams {
  phone: string;
  service?: DentalService | null;
}

export function buildWhatsAppLink({ phone, service }: WhatsAppParams) {
  const base = `https://wa.me/${phone}`;

  const defaultText =
    "Olá, gostaria de agendar uma avaliação na clínica odontológica.";

  const text =
    service != null
      ? `${defaultText}\n\nServiço de interesse: ${service.name}.`
      : defaultText;

  const params = new URLSearchParams({ text });

  return `${base}?${params.toString()}`;
}
