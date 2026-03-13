import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Typography,
  message,
} from 'antd';
import { useEffect, useId } from 'react';

import useGlobalSync from '@/hooks/useGlobalSync';
import useGlobalStore from '@/store/useGlobalStore';
import {
  DEFAULT_CONFIG,
  PROVIDER_OPTIONS,
  type ProviderConfig,
  type ProviderKey,
} from '../aiConfig';

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: (provider: ProviderKey, config: ProviderConfig) => void;
};

export default function AiModal({ open, onClose, onSaved }: Props) {
  // use activeProvider from global store as the single source of truth
  const aiConfig = useGlobalSync((s) => s.aiConfig);
  const activeProvider = useGlobalSync((s) => s.activeProvider);
  const setAiConfig = useGlobalStore.getState().setAiConfig;
  const setActiveProvider = useGlobalStore.getState().setActiveProvider;
  const [form] = Form.useForm<ProviderConfig>();
  const formId = useId();
  const selectId = useId();

  useEffect(() => {
    if (!open) return;
    form.setFieldsValue(aiConfig[activeProvider]);
  }, [open, form, aiConfig, activeProvider]);

  const handleSave = async () => {
    const values = await form.validateFields();
    const provider = useGlobalStore.getState().activeProvider;
    const next = {
      ...aiConfig,
      [provider]: values,
    };
    setAiConfig(next);
    onSaved?.(provider, next[provider]);
    message.success('配置已保存到本地');
  };

  const handleReset = () => {
    const provider = useGlobalStore.getState().activeProvider;
    const nextValue = DEFAULT_CONFIG[provider];
    const next = {
      ...aiConfig,
      [provider]: nextValue,
    };
    setAiConfig(next);
    form.setFieldsValue(nextValue);
    onSaved?.(provider, next[provider]);
    message.success('当前服务商配置已重置');
  };

  const handleProviderChange = (provider: ProviderKey) => {
    setActiveProvider(provider);
    form.setFieldsValue(aiConfig[provider]);
    onSaved?.(provider, aiConfig[provider]);
    message.success('默认 Provider 已更新');
  };

  return (
    <Modal
      title="API Key 配置"
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
      destroyOnHidden
    >
      <Space style={{ marginBottom: 16 }}>
        <label htmlFor={selectId}>默认 Provider：</label>
        <Select
          id={selectId}
          value={activeProvider}
          style={{ width: 180 }}
          onChange={(value) => handleProviderChange(value as ProviderKey)}
          options={PROVIDER_OPTIONS}
        />
      </Space>

      {/* 移除多标签页切换：只根据“默认 Provider”选择展示对应配置 */}

      <Form id={formId} form={form} layout="vertical">
        <Typography.Text
          type="warning"
          style={{ display: 'block', marginBottom: 12 }}
        >
          安全提示：前端直连外部模型服务会暴露 API
          Key，生产环境建议使用同域代理地址（如 /api/proxy/openai/v1）。
        </Typography.Text>

        <Form.Item
          label="API Key"
          name="apiKey"
          rules={[{ required: true, message: '请输入 API Key' }]}
        >
          <Input.Password placeholder="请输入 API Key" allowClear />
        </Form.Item>

        <Form.Item
          label="Base URL"
          name="baseURL"
          rules={[{ required: true, message: '请输入 Base URL' }]}
        >
          <Input placeholder="https://api.example.com/v1" allowClear />
        </Form.Item>

        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: '请输入模型名称' }]}
        >
          <Input
            placeholder="例如：gpt-4o-mini / qwen-plus / deepseek-chat"
            allowClear
          />
        </Form.Item>

        <Space>
          <Button type="primary" onClick={handleSave}>
            保存配置
          </Button>
          <Button onClick={handleReset}>重置当前</Button>
          <Button onClick={onClose}>关闭</Button>
        </Space>
      </Form>
    </Modal>
  );
}
