import { useState } from "react";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { FlowSteps } from "../components/FlowSteps";
import { CTAWhatsApp } from "../components/CTAWhatsApp";
import { RootLayout } from "./layout";
import type { DentalService } from "../lib/whatsapp";

const DENTAL_SERVICES: DentalService[] = [
  {
    id: "limpeza",
    name: "Limpeza e prevenção",
    description:
      "Limpeza profissional, profilaxia e orientações para manter sua saúde bucal em dia.",
  },
  {
    id: "clareamento",
    name: "Clareamento dental",
    description:
      "Tratamentos de clareamento seguros para um sorriso mais branco e bonito.",
  },
  {
    id: "aparelho",
    name: "Aparelho ortodôntico",
    description: "Correção de alinhamento e mordida para um sorriso harmônico.",
  },
  {
    id: "implantes",
    name: "Implantes dentários",
    description:
      "Substituição de dentes perdidos com conforto, segurança e estética.",
  },
  {
    id: "estetica",
    name: "Estética dental",
    description:
      "Lentes de contato, facetas e outros tratamentos para transformar seu sorriso.",
  },
];

export function LandingPage() {
  const [selectedService, setSelectedService] = useState<DentalService | null>(
    null
  );

  return (
    <RootLayout>
      <Hero highlightedService={selectedService ?? undefined} />
      <Services
        services={DENTAL_SERVICES}
        selectedService={selectedService}
        onSelect={setSelectedService}
      />
      <FlowSteps />
      <CTAWhatsApp selectedService={selectedService} />
    </RootLayout>
  );
}

export default LandingPage;
