export type ProviderKey = 'openai' | 'qwen' | 'deepseek' | 'custom';

export type ProviderConfig = {
  apiKey: string;
  baseURL: string;
  model: string;
};

export const PROVIDER_OPTIONS: Array<{ value: ProviderKey; label: string }> = [
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'qwen', label: '千问' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'custom', label: '其他' },
];

export type ConfigState = Record<ProviderKey, ProviderConfig>;

export type AISettings = {
  activeProvider: ProviderKey;
  providers: ConfigState;
};

export const AI_SETTINGS_STORAGE_KEY = 'ai-provider-settings';

export const DEFAULT_CONFIG: ConfigState = {
  openai: {
    apiKey: '',
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
  },
  qwen: {
    apiKey: '',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: 'qwen-plus',
  },
  deepseek: {
    apiKey: '',
    baseURL: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
  },
  custom: {
    apiKey: '',
    baseURL: '',
    model: '',
  },
};

export const DEFAULT_SETTINGS: AISettings = {
  activeProvider: 'deepseek',
  providers: DEFAULT_CONFIG,
};

export function loadAISettings(): AISettings {
  try {
    const raw = localStorage.getItem(AI_SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(raw) as Partial<AISettings>;
    const activeProvider = parsed.activeProvider;
    return {
      activeProvider:
        activeProvider === 'openai' ||
        activeProvider === 'qwen' ||
        activeProvider === 'deepseek' ||
        activeProvider === 'custom'
          ? activeProvider
          : 'openai',
      providers: {
        ...DEFAULT_CONFIG,
        ...(parsed.providers || {}),
      },
    };
  } catch (error) {
    return DEFAULT_SETTINGS;
  }
}

export function saveAISettings(settings: AISettings) {
  localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export function loadAIConfig(): ConfigState {
  return loadAISettings().providers;
}

export function saveAIConfig(config: ConfigState) {
  const settings = loadAISettings();
  saveAISettings({
    ...settings,
    providers: config,
  });
}

export function loadActiveProvider(): ProviderKey {
  return loadAISettings().activeProvider;
}

export function saveActiveProvider(provider: ProviderKey) {
  const settings = loadAISettings();
  saveAISettings({
    ...settings,
    activeProvider: provider,
  });
}

export function getProviderLabel(provider: ProviderKey) {
  const item = PROVIDER_OPTIONS.find((option) => option.value === provider);
  return item?.label || '其他';
}

export function getProviderSummary(
  provider: ProviderKey,
  config: ProviderConfig,
) {
  return `${getProviderLabel(provider)} / ${config.model || '未配置模型'}`;
}
