export type DentalService = {
  id: string;
  name: string;
  description: string;
};

export type WhatsAppQuizAnswers = {
  goal?: string;
  urgency?: string;
  bestTime?: string;
  notes?: string;
};

interface WhatsAppParams {
  phone: string;
  service?: DentalService | null;
  quiz?: WhatsAppQuizAnswers;
}

export function buildWhatsAppLink({ phone, service, quiz }: WhatsAppParams) {
  const base = `https://wa.me/${phone}`;

  const defaultText =
    "Olá, gostaria de agendar uma avaliação na clínica odontológica.";

  const lines: string[] = [defaultText];

  if (service != null) {
    lines.push(`\nServiço de interesse: ${service.name}.`);
  }

  if (quiz?.goal) lines.push(`\nObjetivo: ${quiz.goal}.`);
  if (quiz?.urgency) lines.push(`\nUrgência: ${quiz.urgency}.`);
  if (quiz?.bestTime) lines.push(`\nMelhor horário: ${quiz.bestTime}.`);
  if (quiz?.notes) lines.push(`\nObservações: ${quiz.notes}.`);

  const text = lines.join("");

  const params = new URLSearchParams({ text });

  return `${base}?${params.toString()}`;
}
