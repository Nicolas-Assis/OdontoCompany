import type { DentalService } from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import { Typography, Button, Rate, Space, Card, Avatar } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import heroPhoto from "../assets/salaoprincipal.jpg";
import photoRoom from "../assets/salaatendimetno.jpg";
import dentistsCard from "../assets/cardDentistas.png";
import photoClient from "../assets/cliente1.jpg";
import dentist1 from "../assets/dentista1.jpg";
import dentist2 from "../assets/dentista2.jpg";
import dentist3 from "../assets/dentista3.jpg";
import dentist4 from "../assets/dentista4.jpg";
import dentist5 from "../assets/dentista5.jpg";

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
                  <Avatar.Group>
                    <Avatar src={dentist1} size={34} />
                    <Avatar src={dentist2} size={34} />
                    <Avatar src={dentist3} size={34} />
                    <Avatar src={dentist4} size={34} />
                    <Avatar src={dentist5} size={34} />
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
                src={photoRoom}
                alt="Sala de atendimento"
                className="lp-media-img"
                loading="lazy"
                decoding="async"
              />
              <div className="lp-media-caption">
                <Text strong className="lp-media-caption-title">
                  Conforto no atendimento
                </Text>
                <Text type="secondary" className="lp-media-caption-text">
                  Salas climatizadas, cadeiras novas e tecnologia para um
                  atendimento confortável.
                </Text>
              </div>
            </div>

            <div className="lp-media-tile">
              <img
                src={heroPhoto}
                alt="Recepção da clínica"
                className="lp-media-img"
                loading="lazy"
                decoding="async"
              />
              <div className="lp-media-caption">
                <Text strong className="lp-media-caption-title">
                  Ambiente acolhedor
                </Text>
                <Text type="secondary" className="lp-media-caption-text">
                  Recepcionistas bem treinados, sistema de cadastro e sala de
                  espera climatizada.
                </Text>
              </div>
            </div>

            <div className="lp-media-tile">
              <img
                src={photoClient}
                alt="Pessoa sorrindo"
                className="lp-media-img"
                loading="lazy"
                decoding="async"
              />
              <div className="lp-media-caption">
                <Text strong className="lp-media-caption-title">
                  Resultados reais
                </Text>
                <Text type="secondary" className="lp-media-caption-text">
                  Atendimento humanizado e acompanhamento em cada etapa do seu
                  tratamento.
                </Text>
              </div>
            </div>

            <div className="lp-media-tile lp-media-tile--wide">
              <img
                src={dentistsCard}
                alt="Equipe de dentistas"
                className="lp-media-img"
                loading="lazy"
                decoding="async"
              />
              <div className="lp-media-caption">
                <Text strong className="lp-media-caption-title">
                  Equipe preparada
                </Text>
                <Text type="secondary" className="lp-media-caption-text">
                  Dentistas bem treinados e capacitados, prontos para te atender
                  com os melhores equipamentos.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
