import { Steps, Card, Typography } from "antd";

const { Paragraph } = Typography;

export function FlowSteps() {
  return (
    <section className="lp-section" id="flow">
      <div className="lp-container lp-flow-grid">
        <div>
          <header className="lp-section-header">
            <h2>Como funciona o seu atendimento</h2>
            <p>Do primeiro contato ao sorriso pronto em três etapas simples.</p>
          </header>
        </div>
        <Card bordered={false} className="lp-card">
          <Steps
            orientation="vertical"
            current={0}
            items={[
              {
                icon: <span className="lp-step-icon">1</span>,
                title: "Agendamento pelo WhatsApp",
                description: (
                  <Paragraph type="secondary">
                    Você escolhe o tipo de serviço e envia sua mensagem com
                    todos os detalhes já preenchidos. Nossa equipe responde
                    rapidamente para confirmar o melhor horário.
                  </Paragraph>
                ),
              },
              {
                icon: <span className="lp-step-icon">2</span>,
                title: "Avaliação completa na clínica",
                description: (
                  <Paragraph type="secondary">
                    Realizamos uma avaliação personalizada, explicamos o plano
                    de tratamento, valores, formas de pagamento e tiramos todas
                    as suas dúvidas.
                  </Paragraph>
                ),
              },
              {
                icon: <span className="lp-step-icon">3</span>,
                title: "Tratamento e acompanhamento",
                description: (
                  <Paragraph type="secondary">
                    Iniciamos o tratamento com foco em conforto, resultado
                    estético e saúde bucal a longo prazo, acompanhando você em
                    cada etapa.
                  </Paragraph>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </section>
  );
}
