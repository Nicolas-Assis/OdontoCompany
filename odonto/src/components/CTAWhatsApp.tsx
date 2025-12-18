import { useState } from "react";
import { buildWhatsAppLink, type DentalService } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Button, Card, Modal, Typography, Space } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;
const CLINIC_PHONE = "5562986018386"; // Substitua pelo número real

interface CTAWhatsAppProps {
  selectedService: DentalService | null;
}

export function CTAWhatsApp({ selectedService }: CTAWhatsAppProps) {
  const [showSelectModal, setShowSelectModal] = useState(false);

  const href =
    selectedService != null
      ? buildWhatsAppLink({ phone: CLINIC_PHONE, service: selectedService })
      : undefined;

  const handleClick = () => {
    if (!selectedService || !href) {
      setShowSelectModal(true);
      return;
    }

    trackEvent("cta_whatsapp_click", {
      serviceId: selectedService.id,
    });

    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleGoToServices = () => {
    setShowSelectModal(false);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="lp-section lp-cta-section">
      <div className="lp-container">
        <Card bordered={false} className="lp-cta">
          <Space direction="vertical" size="small">
            <h2>Pronto para cuidar do seu sorriso?</h2>
            <Paragraph>
              {selectedService ? (
                <>
                  Você selecionou: <Text strong>{selectedService.name}</Text>.
                  Clique no botão abaixo para falar com nossa equipe agora
                  mesmo.
                </>
              ) : (
                <>
                  Selecione um tratamento para montar sua mensagem
                  personalizada.
                </>
              )}
            </Paragraph>
          </Space>
          <Button
            type="primary"
            size="large"
            icon={<WhatsAppOutlined />}
            className="lp-btn-primary lp-btn-large"
            onClick={handleClick}
          >
            Enviar mensagem no WhatsApp
          </Button>
        </Card>
      </div>

      <Modal
        open={showSelectModal}
        onCancel={() => setShowSelectModal(false)}
        footer={null}
        title="Escolha um tratamento primeiro"
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Paragraph>
            Para personalizar sua mensagem no WhatsApp, selecione primeiro um
            tratamento na seção{" "}
            <Text strong>"Tratamentos que transformam sorrisos"</Text>.
          </Paragraph>
          <Button type="primary" onClick={handleGoToServices} block>
            Ver tratamentos
          </Button>
        </Space>
      </Modal>
    </section>
  );
}
