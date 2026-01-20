import { useEffect, useMemo, useState } from "react";
import {
  buildWhatsAppLink,
  type DentalService,
  type WhatsAppQuizAnswers,
} from "../lib/whatsapp";
import { trackEvent } from "../lib/analytics";
import {
  Button,
  Card,
  Modal,
  Typography,
  Space,
  Steps,
  Radio,
  Input,
} from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

const { Paragraph, Text } = Typography;
const CLINIC_PHONE = "5562986018386";

interface CTAWhatsAppProps {
  selectedService: DentalService | null;
}

type OpenQuizEventDetail = {
  phone?: string;
  service?: DentalService | null;
};

function isOpenQuizEvent(
  value: unknown,
): value is CustomEvent<OpenQuizEventDetail> {
  return (
    typeof value === "object" &&
    value !== null &&
    "detail" in (value as Record<string, unknown>)
  );
}

export function CTAWhatsApp({ selectedService }: CTAWhatsAppProps) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [serviceOverride, setServiceOverride] = useState<DentalService | null>(
    null,
  );
  const [phoneOverride, setPhoneOverride] = useState<string | null>(null);

  const [quizAnswers, setQuizAnswers] = useState<WhatsAppQuizAnswers>({});

  const activeService = serviceOverride ?? selectedService;
  const activePhone = phoneOverride ?? CLINIC_PHONE;

  const href = useMemo(
    () =>
      buildWhatsAppLink({
        phone: activePhone,
        service: activeService,
        quiz: quizAnswers,
      }),
    [activePhone, activeService, quizAnswers],
  );

  const canGoNext = useMemo(() => {
    if (quizStep === 0) return Boolean(quizAnswers.goal);
    if (quizStep === 1) return Boolean(quizAnswers.urgency);
    if (quizStep === 2) return true;
    return true;
  }, [quizAnswers.goal, quizAnswers.urgency, quizStep]);

  const openQuiz = (detail?: OpenQuizEventDetail) => {
    setPhoneOverride(detail?.phone ?? null);
    setServiceOverride(detail?.service ?? null);
    setQuizOpen(true);
    setQuizStep(0);
    setQuizAnswers({});
  };

  const handleClick = () => {
    openQuiz({ phone: CLINIC_PHONE, service: selectedService });
  };

  useEffect(() => {
    const handler = (event: Event) => {
      if (!isOpenQuizEvent(event)) return;
      openQuiz(event.detail);
    };

    window.addEventListener("lp:open-whatsapp-quiz", handler);
    return () => window.removeEventListener("lp:open-whatsapp-quiz", handler);
  }, []);

  const closeQuiz = () => {
    setQuizOpen(false);
    setServiceOverride(null);
    setPhoneOverride(null);
  };

  const goNext = () => setQuizStep((prev) => Math.min(prev + 1, 2));
  const goBack = () => setQuizStep((prev) => Math.max(prev - 1, 0));

  const sendToWhatsApp = () => {
    trackEvent("cta_whatsapp_click", {
      serviceId: activeService?.id ?? null,
      quizGoal: quizAnswers.goal ?? null,
      quizUrgency: quizAnswers.urgency ?? null,
      quizBestTime: quizAnswers.bestTime ?? null,
    });

    window.open(href, "_blank", "noopener,noreferrer");
    closeQuiz();
  };

  const quizTitle = activeService
    ? `Agendar avaliação — ${activeService.name}`
    : "Agendar avaliação";

  return (
    <section className="lp-section lp-cta-section">
      <div className="lp-container">
        <Card variant={"borderless"} className="lp-cta">
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
                  Responda rapidinho um mini-questionário e já abrimos o
                  WhatsApp com a mensagem pronta.
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
            aria-label="Enviar mensagem no WhatsApp"
          >
            Enviar mensagem no WhatsApp
          </Button>
        </Card>
      </div>

      <Modal
        open={quizOpen}
        onCancel={closeQuiz}
        footer={null}
        title={quizTitle}
        destroyOnClose
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Steps
            current={quizStep}
            items={[
              {
                icon: <span className="lp-step-icon">1</span>,
                title: "Objetivo",
              },
              {
                icon: <span className="lp-step-icon">2</span>,
                title: "Urgência",
              },
              {
                icon: <span className="lp-step-icon">3</span>,
                title: "Horário",
              },
            ]}
          />

          {quizStep === 0 && (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Paragraph style={{ marginBottom: 0 }}>
                Qual é o seu objetivo agora?
              </Paragraph>
              <Radio.Group
                value={quizAnswers.goal}
                onChange={(e) =>
                  setQuizAnswers((prev) => ({ ...prev, goal: e.target.value }))
                }
              >
                <Space direction="vertical">
                  <Radio value="Avaliação e orçamento">
                    Avaliação e orçamento
                  </Radio>
                  <Radio value="Alívio de dor / urgência">
                    Alívio de dor / urgência
                  </Radio>
                  <Radio value="Estética (clareamento / facetas)">
                    Estética (clareamento / facetas)
                  </Radio>
                  <Radio value="Aparelho / alinhamento">
                    Aparelho / alinhamento
                  </Radio>
                  <Radio value="Outro">Outro</Radio>
                </Space>
              </Radio.Group>
            </Space>
          )}

          {quizStep === 1 && (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Paragraph style={{ marginBottom: 0 }}>
                Com que urgência você precisa de atendimento?
              </Paragraph>
              <Radio.Group
                value={quizAnswers.urgency}
                onChange={(e) =>
                  setQuizAnswers((prev) => ({
                    ...prev,
                    urgency: e.target.value,
                  }))
                }
              >
                <Space direction="vertical">
                  <Radio value="Hoje / o quanto antes">
                    Hoje / o quanto antes
                  </Radio>
                  <Radio value="Nesta semana">Nesta semana</Radio>
                  <Radio value="Sem pressa">Sem pressa</Radio>
                </Space>
              </Radio.Group>
              <Paragraph type="secondary" style={{ margin: 0 }}>
                Se quiser, descreva rapidamente sua necessidade:
              </Paragraph>
              <Input.TextArea
                value={quizAnswers.notes}
                onChange={(e) =>
                  setQuizAnswers((prev) => ({ ...prev, notes: e.target.value }))
                }
                rows={3}
                placeholder="Ex: sensibilidade, dor ao mastigar, dente quebrado..."
              />
            </Space>
          )}

          {quizStep === 2 && (
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Paragraph style={{ marginBottom: 0 }}>
                Qual o melhor horário para te responder?
              </Paragraph>
              <Radio.Group
                value={quizAnswers.bestTime}
                onChange={(e) =>
                  setQuizAnswers((prev) => ({
                    ...prev,
                    bestTime: e.target.value,
                  }))
                }
              >
                <Space direction="vertical">
                  <Radio value="Manhã">Manhã</Radio>
                  <Radio value="Tarde">Tarde</Radio>
                  <Radio value="Noite">Noite</Radio>
                  <Radio value="Qualquer horário">Qualquer horário</Radio>
                </Space>
              </Radio.Group>
            </Space>
          )}

          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Button onClick={quizStep === 0 ? closeQuiz : goBack}>
              {quizStep === 0 ? "Cancelar" : "Voltar"}
            </Button>
            {quizStep < 2 ? (
              <Button type="primary" onClick={goNext} disabled={!canGoNext}>
                Próximo
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<WhatsAppOutlined />}
                onClick={sendToWhatsApp}
              >
                Abrir WhatsApp
              </Button>
            )}
          </Space>
        </Space>
      </Modal>
    </section>
  );
}
