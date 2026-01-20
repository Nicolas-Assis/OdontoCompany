import { useState } from "react";
import { type DentalService } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import {
  Row,
  Col,
  Card,
  Tag,
  Button,
  Space,
  Typography,
  Drawer,
  Divider,
  List,
} from "antd";
import {
  WhatsAppOutlined,
  ClearOutlined,
  SmileOutlined,
  MedicineBoxOutlined,
  DollarOutlined,
  ExperimentOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Paragraph, Text, Title } = Typography;
const CLINIC_PHONE = "5515981887574";

const serviceIcons: Record<string, React.ReactNode> = {
  limpeza: <ClearOutlined className="text-2xl text-emerald-600" />,
  clareamento: <SmileOutlined className="text-2xl text-emerald-600" />,
  aparelho: <MedicineBoxOutlined className="text-2xl text-emerald-600" />,
  implantes: <DollarOutlined className="text-2xl text-emerald-600" />,
  estetica: <ExperimentOutlined className="text-2xl text-emerald-600" />,
};

const serviceBenefits: Record<string, string[]> = {
  limpeza: [
    "Remoção completa de tártaro e placa bacteriana",
    "Prevenção de cáries e doenças gengivais",
    "Orientações personalizadas de higiene bucal",
    "Polimento e aplicação de flúor",
  ],
  clareamento: [
    "Dentes até 8 tons mais brancos",
    "Resultado visível já na primeira sessão",
    "Procedimento seguro e indolor",
    "Manutenção do esmalte dentário",
  ],
  aparelho: [
    "Correção de mordida e alinhamento",
    "Melhora na mastigação e fala",
    "Opções estéticas disponíveis",
    "Acompanhamento mensal incluído",
  ],
  implantes: [
    "Substituição permanente e natural",
    "Melhora na autoestima e confiança",
    "Preservação dos ossos faciais",
    "Garantia de 5 anos",
  ],
  estetica: [
    "Transformação completa do sorriso",
    "Lentes ultrafinas e resistentes",
    "Design digital do sorriso",
    "Resultado natural e duradouro",
  ],
};

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
    null,
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
      }),
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
                  className={`lp-card${isActive ? " lp-card--active" : ""} transition-all duration-300 hover:shadow-xl hover:scale-105`}
                >
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <Space
                      align="center"
                      style={{ justifyContent: "space-between", width: "100%" }}
                    >
                      <Space size="middle">
                        {serviceIcons[service.slug] || (
                          <SmileOutlined className="text-2xl text-emerald-600" />
                        )}
                        <Text strong className="text-lg">
                          {service.name}
                        </Text>
                      </Space>
                      {isActive && <Tag color="green">Selecionado</Tag>}
                    </Space>
                    <Paragraph
                      type="secondary"
                      ellipsis={{ rows: 3 }}
                      style={{ marginBottom: 8 }}
                    >
                      {service.description}
                    </Paragraph>
                    <Button
                      type="link"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDrawer(service);
                      }}
                      className="px-0"
                    >
                      Ver detalhes →
                    </Button>
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Drawer
          title={
            <Space size="middle">
              {detailService && serviceIcons[detailService.slug]}
              <span>{detailService?.name}</span>
            </Space>
          }
          placement="right"
          width={480}
          onClose={closeDrawer}
          open={detailService != null}
        >
          {detailService && (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Title level={5} className="text-emerald-600 mb-3">
                  Descrição
                </Title>
                <Paragraph className="text-base">
                  {detailService.description}
                </Paragraph>
              </div>

              <Divider />

              <div>
                <Title level={5} className="text-emerald-600 mb-3">
                  Benefícios
                </Title>
                <List
                  dataSource={serviceBenefits[detailService.slug] || []}
                  renderItem={(benefit) => (
                    <List.Item className="border-0 py-2">
                      <Space align="start" size="small">
                        <CheckCircleOutlined className="text-emerald-600 text-lg mt-1" />
                        <Text>{benefit}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </div>

              <Divider />

              <div className="bg-emerald-50 p-4 rounded-lg">
                <Title level={5} className="text-emerald-700 mb-2">
                  Agende sua avaliação
                </Title>
                <Paragraph type="secondary" className="mb-4">
                  Entre em contato via WhatsApp e informe que tem interesse em:{" "}
                  <Text strong className="text-emerald-700">
                    {detailService.name}
                  </Text>
                </Paragraph>
                <Button
                  type="primary"
                  size="large"
                  icon={<WhatsAppOutlined />}
                  block
                  className="bg-emerald-600 hover:bg-emerald-700 border-0 h-12"
                  onClick={() => {
                    trackEvent("cta_whatsapp_click", {
                      serviceId: detailService.id,
                    });
                    openWhatsAppQuiz(detailService);
                  }}
                >
                  Avaliar meu caso no WhatsApp
                </Button>
              </div>
            </Space>
          )}
        </Drawer>
      </div>
    </section>
  );
}
