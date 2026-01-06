import { useState } from "react";
import { type DentalService } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Row, Col, Card, Tag, Button, Space, Typography, Drawer } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;
const CLINIC_PHONE = "5562986018386";

interface ServicesProps {
  services: DentalService[];
  selectedService: DentalService | null;
  onSelect(service: DentalService): void;
}

export function Services({
  services,
  selectedService,
  onSelect,
}: ServicesProps) {
  const [detailService, setDetailService] = useState<DentalService | null>(
    null
  );

  const handleSelect = (service: DentalService) => {
    onSelect(service);
    trackEvent("service_selected", { serviceId: service.id });
  };

  const openDrawer = (service: DentalService) => {
    setDetailService(service);
  };

  const closeDrawer = () => setDetailService(null);

  const openWhatsAppQuiz = (service: DentalService) => {
    window.dispatchEvent(
      new CustomEvent("lp:open-whatsapp-quiz", {
        detail: { phone: CLINIC_PHONE, service },
      })
    );
  };

  return (
    <section className="lp-section" id="services">
      <div className="lp-container">
        <header className="lp-section-header">
          <h2>Tratamentos que transformam sorrisos</h2>
          <p>Escolha o tipo de tratamento que você precisa agora.</p>
        </header>
        <Row gutter={[24, 24]}>
          {services.map((service) => {
            const isActive = selectedService?.id === service.id;
            return (
              <Col key={service.id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  onClick={() => handleSelect(service)}
                  className={`lp-card${isActive ? " lp-card--active" : ""}`}
                >
                  <Space
                    orientation="vertical"
                    size="small"
                    style={{ width: "100%" }}
                  >
                    <Space
                      align="center"
                      style={{ justifyContent: "space-between" }}
                    >
                      <Text strong>{service.name}</Text>
                      {isActive && <Tag color="green">Selecionado</Tag>}
                    </Space>
                    <Paragraph type="secondary" style={{ marginBottom: 8 }}>
                      {service.description}
                    </Paragraph>
                    <Space
                      style={{ justifyContent: "space-between", width: "100%" }}
                    >
                      <Button
                        type="link"
                        size="small"
                        onClick={() => openDrawer(service)}
                      >
                        Ver detalhes
                      </Button>
                    </Space>
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Drawer
          title={detailService?.name}
          placement="right"
          size={380}
          onClose={closeDrawer}
          open={detailService != null}
        >
          {detailService && (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Paragraph>{detailService.description}</Paragraph>
              <Paragraph type="secondary">
                Ao enviar mensagem pelo WhatsApp, informaremos que você tem
                interesse em:
                <br />
                <Text strong>{detailService.name}</Text>.
              </Paragraph>
              <Button
                type="primary"
                icon={<WhatsAppOutlined />}
                block
                onClick={() => {
                  trackEvent("cta_whatsapp_click", {
                    serviceId: detailService.id,
                  });
                  openWhatsAppQuiz(detailService);
                }}
              >
                Avaliar meu caso no WhatsApp
              </Button>
            </Space>
          )}
        </Drawer>
      </div>
    </section>
  );
}
