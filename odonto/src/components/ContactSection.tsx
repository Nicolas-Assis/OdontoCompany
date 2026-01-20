import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Space,
  message,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  WhatsAppOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactSection() {
  const [form] = Form.useForm<ContactFormValues>();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ContactFormValues) => {
    setLoading(true);
    // Simula envio
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form values:", values);
    message.success(
      "Mensagem enviada com sucesso! Em breve entraremos em contato.",
      5,
    );
    form.resetFields();
    setLoading(false);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  return (
    <section
      className="lp-section bg-gradient-to-b from-slate-50 to-white py-16"
      id="contact"
    >
      <div className="lp-container">
        <div className="text-center mb-12 animate-fade-in">
          <Title
            level={2}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Entre em Contato
          </Title>
          <Paragraph className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Estamos prontos para atender você. Escolha a melhor forma de contato
            ou preencha o formulário abaixo.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} className="items-stretch">
          <Col xs={24} lg={10}>
            <Card
              className="h-full shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-shadow duration-300"
              styles={{ body: { padding: "2rem" } }}
            >
              <Title level={3} className="mb-6 text-emerald-700">
                Informações de Contato
              </Title>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div className="hover:translate-x-1 transition-transform duration-200">
                  <Space align="center" size="middle" className="mb-3">
                    <EnvironmentOutlined className="text-2xl text-emerald-600" />
                    <Text strong className="text-lg text-slate-800">
                      Localização
                    </Text>
                  </Space>
                  <div className="pl-10">
                    <Text className="text-slate-600 block">
                      R. Saldanha Marinho, nº 386 - Centro
                    </Text>
                    <Text className="text-slate-600 block">
                      Itapetininga - SP - CEP 18200-001
                    </Text>
                  </div>
                </div>

                <Divider className="my-2" />

                <div className="hover:translate-x-1 transition-transform duration-200">
                  <Space align="center" size="middle" className="mb-3">
                    <PhoneOutlined className="text-2xl text-emerald-600" />
                    <Text strong className="text-lg text-slate-800">
                      Telefones
                    </Text>
                  </Space>
                  <div className="pl-10">
                    <Space direction="vertical" size="small">
                      <Text className="text-slate-600">(15) 98188-7574</Text>
                      <Text className="text-slate-600">(15) 98188-7574</Text>
                    </Space>
                  </div>
                </div>

                <Divider className="my-2" />

                <div className="hover:translate-x-1 transition-transform duration-200">
                  <Space align="center" size="middle" className="mb-3">
                    <MailOutlined className="text-2xl text-emerald-600" />
                    <Text strong className="text-lg text-slate-800">
                      E-mail
                    </Text>
                  </Space>
                  <div className="pl-10">
                    <Text className="text-slate-600">
                      contato@odontoclinica.com.br
                    </Text>
                  </div>
                </div>

                <Divider className="my-2" />

                <div className="hover:translate-x-1 transition-transform duration-200">
                  <Space align="center" size="middle" className="mb-3">
                    <ClockCircleOutlined className="text-2xl text-emerald-600" />
                    <Text strong className="text-lg text-slate-800">
                      Horário
                    </Text>
                  </Space>
                  <div className="pl-10">
                    <Space direction="vertical" size="small">
                      <Text className="text-slate-600">
                        Segunda a Sexta: 8h às 18h
                      </Text>
                      <Text className="text-slate-600">Sábado: 8h às 12h</Text>
                    </Space>
                  </div>
                </div>
              </Space>

              <Divider />

              <Button
                type="primary"
                size="large"
                icon={<WhatsAppOutlined />}
                className="w-full bg-emerald-600 hover:bg-emerald-700 border-0 h-12 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                href="https://wa.me/5562986018386"
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar pelo WhatsApp
              </Button>
            </Card>
          </Col>

          <Col xs={24} lg={14}>
            <Card
              className="h-full shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-shadow duration-300"
              styles={{ body: { padding: "2rem" } }}
            >
              <Title level={3} className="mb-6 text-emerald-700">
                Envie sua Mensagem
              </Title>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark="optional"
                size="large"
              >
                <Form.Item
                  label={<Text strong>Nome completo</Text>}
                  name="name"
                  rules={[
                    { required: true, message: "Por favor, insira seu nome" },
                    {
                      min: 3,
                      message: "Nome deve ter pelo menos 3 caracteres",
                    },
                    { max: 100, message: "Nome muito longo" },
                  ]}
                >
                  <Input
                    placeholder="Seu nome completo"
                    className="rounded-lg"
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<Text strong>E-mail</Text>}
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira seu e-mail",
                        },
                        { type: "email", message: "E-mail inválido" },
                      ]}
                    >
                      <Input
                        placeholder="seu@email.com"
                        className="rounded-lg"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<Text strong>Telefone</Text>}
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira seu telefone",
                        },
                        {
                          pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
                          message: "Formato: (62) 99999-9999",
                        },
                      ]}
                      normalize={(value) => formatPhone(value)}
                    >
                      <Input
                        placeholder="(62) 99999-9999"
                        maxLength={15}
                        className="rounded-lg"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label={<Text strong>Mensagem</Text>}
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, escreva sua mensagem",
                    },
                    {
                      min: 10,
                      message: "Mensagem muito curta (mínimo 10 caracteres)",
                    },
                    {
                      max: 500,
                      message: "Mensagem muito longa (máximo 500 caracteres)",
                    },
                  ]}
                >
                  <TextArea
                    rows={5}
                    placeholder="Como podemos ajudá-lo? Descreva sua necessidade..."
                    maxLength={500}
                    showCount
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    loading={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 border-0 h-12 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    {loading ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}
