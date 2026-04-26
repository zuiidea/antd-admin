import { createFileRoute } from "@tanstack/react-router";
import { App, Button, Card, Flex, Form, Input, InputNumber, Select, Switch, Typography, theme } from "antd";
import { useMemo } from "react";
import { useAIStore } from "@/stores/ai";

const { Text } = Typography;

type AIFormValues = {
  enabled: boolean;
  provider: "openai" | "azure-openai" | "anthropic";
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
};

export const Route = createFileRoute("/_auth/ai-settings/")({
  component: AISettingsPage,
});

function AISettingsPage() {
  const { message } = App.useApp();
  const { token } = theme.useToken();
  const [form] = Form.useForm<AIFormValues>();
  const { enabled, provider, model, systemPrompt, temperature, maxTokens, setConfig } = useAIStore();

  const initialValues = useMemo(
    () => ({ enabled, provider, model, systemPrompt, temperature, maxTokens }),
    [enabled, provider, model, systemPrompt, temperature, maxTokens],
  );

  return (
    <Flex vertical gap={token.marginLG} style={{ flex: 1, minHeight: 0 }}>
      <Card title="AI Configuration">
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => {
            setConfig(values);
            message.success("AI settings saved");
          }}
        >
          <Form.Item label="Enable AI" name="enabled" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Provider" name="provider" rules={[{ required: true }]}>
            <Select
              options={[
                { label: "OpenAI", value: "openai" },
                { label: "Azure OpenAI", value: "azure-openai" },
                { label: "Anthropic", value: "anthropic" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Model" name="model" rules={[{ required: true, message: "Model is required" }]}>
            <Input placeholder="gpt-5.3-codex" />
          </Form.Item>
          <Form.Item
            label="System Prompt"
            name="systemPrompt"
            rules={[{ required: true, message: "System prompt is required" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Temperature" name="temperature">
            <InputNumber min={0} max={1} step={0.1} style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label="Max Tokens" name="maxTokens">
            <InputNumber min={256} max={8192} step={128} style={{ width: 200 }} />
          </Form.Item>

          <Text type="secondary" style={{ display: "block", marginBottom: token.margin }}>
            This page configures global AI behavior for the app shell and AI assistants.
          </Text>

          <Button type="primary" htmlType="submit">
            Save AI Settings
          </Button>
        </Form>
      </Card>
    </Flex>
  );
}
