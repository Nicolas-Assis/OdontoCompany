import { Steps, Card, Typography } from "antd";
import {
  WhatsAppOutlined,
  MedicineBoxOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export function FlowSteps() {
  return (
    <section
      className="lp-section bg-gradient-to-br from-emerald-50 via-white to-slate-50 py-16"
      id="flow"
    >
      <div className="lp-container">
        <div className="text-center mb-12 animate-fade-in">
          <Title
            level={2}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Como funciona o seu atendimento
          </Title>
          <Paragraph className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Do primeiro contato ao sorriso perfeito em três etapas simples e
            rápidas.
          </Paragraph>
        </div>

        <Card className="shadow-xl border-0 max-w-4xl mx-auto rounded-2xl hover:shadow-2xl transition-shadow duration-300">
          <Steps
            direction="vertical"
            current={-1}
            className="py-4"
            items={[
              {
                title: (
                  <span className="text-lg font-semibold text-slate-800">
                    1. Agendamento pelo WhatsApp
                  </span>
                ),
                description: (
                  <p className="text-slate-600 text-base leading-relaxed mt-2">
                    Você escolhe o tipo de serviço e envia sua mensagem com
                    todos os detalhes já preenchidos. Nossa equipe responde
                    rapidamente para confirmar o melhor horário para você.
                  </p>
                ),
                icon: (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600">
                    <WhatsAppOutlined className="text-2xl" />
                  </div>
                ),
              },
              {
                title: (
                  <span className="text-lg font-semibold text-slate-800">
                    2. Avaliação completa na clínica
                  </span>
                ),
                description: (
                  <p className="text-slate-600 text-base leading-relaxed mt-2">
                    Realizamos uma avaliação personalizada e detalhada,
                    explicamos o plano de tratamento, valores transparentes,
                    formas de pagamento flexíveis e tiramos todas as suas
                    dúvidas.
                  </p>
                ),
                icon: (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                    <MedicineBoxOutlined className="text-2xl" />
                  </div>
                ),
              },
              {
                title: (
                  <span className="text-lg font-semibold text-slate-800">
                    3. Tratamento e acompanhamento
                  </span>
                ),
                description: (
                  <p className="text-slate-600 text-base leading-relaxed mt-2">
                    Iniciamos o tratamento com foco em conforto máximo,
                    resultado estético impecável e saúde bucal a longo prazo,
                    acompanhando você em cada etapa até o sorriso perfeito.
                  </p>
                ),
                icon: (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600">
                    <SmileOutlined className="text-2xl" />
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </section>
  );
}
