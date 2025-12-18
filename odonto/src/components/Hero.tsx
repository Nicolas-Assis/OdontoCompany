import { buildWhatsAppLink, type DentalService } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Row, Col, Typography, Button, Rate, Space, Card, Avatar } from "antd";
import { WhatsAppOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const CLINIC_PHONE = "5562986018386";

interface HeroProps {
  highlightedService?: DentalService | null;
}

export function Hero({ highlightedService }: HeroProps) {
  const href = buildWhatsAppLink({
    phone: CLINIC_PHONE,
    service: highlightedService,
  });

  const handleClick = () => {
    trackEvent("hero_whatsapp_click", {
      serviceId: highlightedService?.id ?? null,
    });
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="lp-hero">
      <div className="lp-container">
        <Row gutter={[32, 32]} align="middle" className="lp-hero-grid">
          <Col xs={24} md={14} className="lp-hero-text">
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Text className="lp-pill">
                Clínica Odontológica Especializada
              </Text>
              <Title level={1} style={{ margin: 0 }}>
                Sorriso saudável,
                <span className="lp-highlight"> atendimento humanizado</span> em
                um só lugar.
              </Title>
              <Paragraph>
                Equipe experiente, tecnologia moderna e planos acessíveis para
                cuidar do seu sorriso com conforto e segurança.
              </Paragraph>
              <Space size="middle" wrap className="lp-hero-actions">
                <Button
                  type="primary"
                  size="large"
                  icon={<WhatsAppOutlined />}
                  onClick={handleClick}
                  className="lp-btn-primary"
                >
                  Agendar avaliação pelo WhatsApp
                </Button>
                <Button type="default" size="large" onClick={scrollToServices}>
                  Ver tratamentos
                </Button>
              </Space>
              <Space direction="vertical" size={4}>
                <Space size="middle" align="center">
                  <Rate allowHalf disabled defaultValue={4.9} />
                  <Text strong>4.9/5</Text>
                  <Text type="secondary">+200 avaliações reais</Text>
                </Space>
                <Space size="small" align="center" className="lp-hero-badges">
                  <Avatar.Group maxCount={3}>
                    <Avatar icon={<TeamOutlined />} />
                    <Avatar icon={<TeamOutlined />} />
                    <Avatar icon={<TeamOutlined />} />
                  </Avatar.Group>
                  <Text type="secondary">Equipe pronta para receber você</Text>
                </Space>
              </Space>
            </Space>
          </Col>
          <Col xs={24} md={10} className="lp-hero-card">
            <Card className="lp-hero-card-inner" bordered={false}>
              <Text className="lp-hero-card-title">Agenda desta semana</Text>
              <Paragraph className="lp-hero-card-subtitle">
                Poucas vagas disponíveis para primeira avaliação.
              </Paragraph>
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Text>Clareamento dental</Text>
                  <span className="lp-tag">Mais procurado</span>
                </Space>
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Text>Aparelho ortodôntico</Text>
                  <Text type="secondary">3 vagas</Text>
                </Space>
                <Space
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Text>Implantes</Text>
                  <Text type="secondary">2 vagas</Text>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
