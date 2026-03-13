import { BulbOutlined } from '@ant-design/icons';

import type { ProviderConfig, ProviderKey } from '../aiConfig';

export const PROMPT_ITEMS = [
  {
    key: 'prompt-1',
    icon: <BulbOutlined />,
    label: '介绍一下这个示例页',
    description: '页面能力说明',
  },
  {
    key: 'prompt-2',
    icon: <BulbOutlined />,
    label: '给我 3 个 React 性能优化建议',
    description: '开发常用问题',
  },
];

export function mockReply(
  question: string,
  _provider: ProviderKey,
  _providerConfig: ProviderConfig,
) {
  const text = question.toLowerCase();
  if (text.includes('react') && text.includes('性能')) {
    return [
      '1. 使用 memo/useMemo 减少不必要渲染。',
      '2. 大列表使用虚拟滚动。',
      '3. 拆分状态，避免顶层状态过大导致全树刷新。',
    ].join('\n');
  }

  return [
    '检测到未配置 API Key，当前使用本地模拟回复。',
    '填写 Key 后会自动切换到真实模型请求。',
  ].join('\n');
}
