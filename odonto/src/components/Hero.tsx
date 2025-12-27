import type { DentalService } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Typography, Button, Rate, Space, Card, Avatar } from "antd";
import { WhatsAppOutlined, TeamOutlined } from "@ant-design/icons";
import heroPhoto from "../assets/salaoprincipal.jpg";
import heroGif from "../assets/gifodonto.gif";
import photoRoom from "../assets/salaatendimetno.jpg";
import photoThumbsUp from "../assets/joianha.jpg";
import photoClient from "../assets/cliente1.jpg";

const { Title, Paragraph, Text } = Typography;
const CLINIC_PHONE = "5562986018386";

interface HeroProps {
  highlightedService?: DentalService | null;
}

export function Hero({ highlightedService }: HeroProps) {
  const handleClick = () => {
    trackEvent("hero_whatsapp_click", {
      serviceId: highlightedService?.id ?? null,
    });
    window.dispatchEvent(
      new CustomEvent("lp:open-whatsapp-quiz", {
        detail: { phone: CLINIC_PHONE, service: highlightedService ?? null },
      })
    );
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="lp-hero">
      <div className="lp-container">
        <div className="lp-hero-grid">
          <div className="lp-hero-text">
            <Space
              orientation="vertical"
              size="middle"
              style={{ width: "100%" }}
            >
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
              <Space orientation="vertical" size={4}>
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
          </div>

          <div className="lp-hero-card">
            <Card className="lp-hero-card-inner" bordered={false}>
              <img
                src={heroPhoto}
                alt="Ambiente da clínica"
                className="lp-hero-photo"
                loading="eager"
              />
              <Text className="lp-hero-card-title">Agenda desta semana</Text>
              <Paragraph className="lp-hero-card-subtitle">
                Poucas vagas disponíveis para primeira avaliação.
              </Paragraph>
              <Space
                orientation="vertical"
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
          </div>
        </div>

        <div className="lp-hero-gallery" aria-label="Galeria da clínica">
          <div className="lp-hero-gallery-header">
            <Text strong>Conheça a clínica</Text>
            <Text type="secondary">
              Estrutura moderna, ambiente acolhedor e atendimento humano.
            </Text>
          </div>

          <div className="lp-media-grid">
            <div className="lp-media-tile">
              <img
                src={heroGif}
                alt="Animação de limpeza dental"
                className="lp-media-img lp-media-img--contain"
                loading="lazy"
                decoding="async"
              />
              <Text className="lp-media-caption">Higiene e prevenção</Text>
            </div>

            <div className="lp-media-tile">
              <img
                src={photoRoom}
                alt="Sala de atendimento"
                className="lp-media-img"
                loading="lazy"
                decoding="async"
              />
              <Text className="lp-media-caption">Conforto no atendimento</Text>
            </div>

            <div className="lp-media-tile">
              <img
                src={heroPhoto}
                alt="Recepção da clínica"
                className="lp-media-img"
                loading="lazy"
                decoding="async"
              />
              <Text className="lp-media-caption">Ambiente acolhedor</Text>
            </div>

            <div className="lp-media-tile">
              <img
                src={photoClient}
                alt="Pessoa sorrindo"
                className="lp-media-img"
                loading="lazy"
                decoding="async"
              />
              <Text className="lp-media-caption">Resultados reais</Text>
            </div>

            <div className="lp-media-tile lp-media-tile--wide">
              <img
                src={photoThumbsUp}
                alt="Satisfação do paciente"
                className="lp-media-img"
                loading="lazy"
                decoding="async"
              />
              <Text className="lp-media-caption">
                Atendimento humanizado e acompanhamento
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
