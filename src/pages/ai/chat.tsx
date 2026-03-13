import { RobotOutlined } from '@ant-design/icons';
import { Bubble, Conversations, Prompts, Sender, Welcome } from '@ant-design/x';
import { type AbstractXRequestClass, XRequest } from '@ant-design/x-sdk';
import {
  Button,
  Card,
  Input,
  message,
  Modal,
  Select,
  Space,
  Typography,
} from 'antd';
import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getProviderLabel,
  getProviderSummary,
  loadActiveProvider,
  loadAIConfig,
  type ProviderConfig,
  type ProviderKey,
} from './aiConfig';
import AiModal from './components/Modal';
import { mockReply, PROMPT_ITEMS } from './components/mockData';

type MessageStatus = 'loading' | 'success';

type ChatMessage = {
  key: string;
  role: 'user' | 'ai';
  content: string;
  status?: MessageStatus;
};

type SessionItem = {
  key: string;
  label: string;
  messages: ChatMessage[];
};

type OpenAICompatResponse = {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isDirectExternalURL(url: string) {
  return /^https?:\/\//i.test(url.trim());
}

function extractAIContent(chunk?: OpenAICompatResponse) {
  const content = chunk?.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((item) => item?.text || '')
      .filter(Boolean)
      .join('\n');
  }
  return '';
}

function requestReplyByXSDK(params: {
  message: string;
  providerConfig: ProviderConfig;
  onSuccess: (content: string) => void;
  onError: (error: Error) => void;
}): AbstractXRequestClass<
  {
    model: string;
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    stream: boolean;
  },
  OpenAICompatResponse
> {
  const { message, providerConfig, onSuccess, onError } = params;
  const baseURL = providerConfig.baseURL.replace(/\/+$/, '');
  const request = XRequest<
    {
      model: string;
      messages: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
      }>;
      stream: boolean;
    },
    OpenAICompatResponse
  >(`${baseURL}/chat/completions`, {
    manual: true,
    timeout: 30000,
    streamTimeout: 90000,
    retryInterval: 1500,
    retryTimes: 1,
    headers: {
      Authorization: `Bearer ${providerConfig.apiKey}`,
    },
    callbacks: {
      onSuccess: (chunks) => {
        const last = chunks[chunks.length - 1];
        const content = extractAIContent(last);
        if (content) {
          onSuccess(content);
          return;
        }
        onError(
          new Error(last?.error?.message || '响应为空，请检查模型返回格式。'),
        );
      },
      onError: (error) => {
        onError(error);
      },
    },
  });

  request.run({
    model: providerConfig.model,
    stream: false,
    messages: [{ role: 'user', content: message }],
  });

  return request;
}

function createWelcomeMessage(): ChatMessage {
  return {
    key: createId('ai'),
    role: 'ai',
    content: '你好，我是示例 AI 助手。你可以直接提问，或点击下方提示词。',
    status: 'success',
  };
}

function createSession(label: string): SessionItem {
  return {
    key: createId('session'),
    label,
    messages: [createWelcomeMessage()],
  };
}

export default function AIChatPage() {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
  );
  const [sessions, setSessions] = useState<SessionItem[]>([
    createSession('默认会话'),
    createSession('React 问答'),
  ]);
  const [activeKey, setActiveKey] = useState<string>(() => sessions[0].key);
  const [provider, setProvider] = useState<ProviderKey>('openai');
  const [providerConfig, setProviderConfig] = useState<ProviderConfig>({
    apiKey: '',
    baseURL: '',
    model: '',
  });
  const [configOpen, setConfigOpen] = useState(false);
  const [senderKey, setSenderKey] = useState(0);
  const currentRequestRef = useRef<AbstractXRequestClass<
    {
      model: string;
      messages: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
      }>;
      stream: boolean;
    },
    OpenAICompatResponse
  > | null>(null);
  const mockTimerRef = useRef<number | null>(null);
  const currentMessageRef = useRef<{
    sessionKey: string;
    aiKey: string;
  } | null>(null);
  const securityWarnedRef = useRef(false);

  const activeSession = useMemo(
    () => sessions.find((item) => item.key === activeKey) || sessions[0],
    [activeKey, sessions],
  );
  const messages = activeSession?.messages || [];
  const deferredMessages = useDeferredValue(messages);
  const chatRegionId = useId();

  useEffect(() => {
    const activeProvider = loadActiveProvider();
    const config = loadAIConfig();
    setProvider(activeProvider);
    setProviderConfig(config[activeProvider]);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const reloadProviderConfig = () => {
    const activeProvider = loadActiveProvider();
    const config = loadAIConfig();
    setProvider(activeProvider);
    setProviderConfig(config[activeProvider]);
  };

  const roles = useMemo(
    () => ({
      ai: {
        placement: 'start' as const,
        avatar: <RobotOutlined />,
        typing: { effect: 'typing' as const, interval: 20, step: 3 },
      },
      user: {
        placement: 'end' as const,
      },
    }),
    [],
  );

  const sendMessage = (rawMessage: string) => {
    const userText = rawMessage.trim();
    if (!userText || loading || !activeSession) return;
    // clear sender input immediately by remounting Sender
    setSenderKey((k) => k + 1);
    const useMock = !providerConfig.apiKey?.trim();
    if (!useMock && (!providerConfig.baseURL || !providerConfig.model)) {
      Modal.warning({
        title: '配置不完整',
        content: '已填写 API Key，但 Base URL 或 Model 为空，请补全后再发送。',
      });
      return;
    }

    if (
      !useMock &&
      isDirectExternalURL(providerConfig.baseURL) &&
      providerConfig.apiKey &&
      !securityWarnedRef.current
    ) {
      securityWarnedRef.current = true;
      message.warning(
        '当前为前端直连外部模型服务，API Key 将暴露在浏览器中。生产环境建议改为同域代理（如 /api/proxy/...）。',
      );
    }

    const targetSessionKey = activeSession.key;
    const userKey = createId('user');
    const aiKey = createId('ai');

    setLoading(true);
    currentMessageRef.current = { sessionKey: targetSessionKey, aiKey };
    setSessions((prev) =>
      prev.map((session) =>
        session.key === targetSessionKey
          ? {
              ...session,
              messages: [
                ...session.messages,
                {
                  key: userKey,
                  role: 'user',
                  content: userText,
                  status: 'success',
                },
                {
                  key: aiKey,
                  role: 'ai',
                  content: '正在思考中...',
                  status: 'loading',
                },
              ],
            }
          : session,
      ),
    );

    if (useMock) {
      const content = mockReply(userText, provider, providerConfig);
      mockTimerRef.current = window.setTimeout(() => {
        setSessions((prev) =>
          prev.map((session) =>
            session.key === targetSessionKey
              ? {
                  ...session,
                  messages: session.messages.map((item) =>
                    item.key === aiKey
                      ? { ...item, content, status: 'success' }
                      : item,
                  ),
                }
              : session,
          ),
        );
        mockTimerRef.current = null;
        currentMessageRef.current = null;
        setLoading(false);
      }, 450);
      return;
    }

    currentRequestRef.current = requestReplyByXSDK({
      message: userText,
      providerConfig,
      onSuccess: (content) => {
        setSessions((prev) =>
          prev.map((session) =>
            session.key === targetSessionKey
              ? {
                  ...session,
                  messages: session.messages.map((item) =>
                    item.key === aiKey
                      ? { ...item, content, status: 'success' }
                      : item,
                  ),
                }
              : session,
          ),
        );
        currentRequestRef.current = null;
        currentMessageRef.current = null;
        setLoading(false);
      },
      onError: (error) => {
        if (error.name === 'AbortError') {
          currentRequestRef.current = null;
          currentMessageRef.current = null;
          setLoading(false);
          return;
        }

        setSessions((prev) =>
          prev.map((session) =>
            session.key === targetSessionKey
              ? {
                  ...session,
                  messages: session.messages.map((item) =>
                    item.key === aiKey
                      ? {
                          ...item,
                          content: `请求失败：${
                            error.message || '请检查 Key 配置。'
                          }`,
                          status: 'success',
                        }
                      : item,
                  ),
                }
              : session,
          ),
        );
        currentRequestRef.current = null;
        currentMessageRef.current = null;
        setLoading(false);
      },
    });
  };

  const handleCancelRequest = () => {
    const current = currentMessageRef.current;
    if (current) {
      setSessions((prev) =>
        prev.map((session) =>
          session.key === current.sessionKey
            ? {
                ...session,
                messages: session.messages.map((item) =>
                  item.key === current.aiKey
                    ? { ...item, content: '已取消生成。', status: 'success' }
                    : item,
                ),
              }
            : session,
        ),
      );
    }

    currentRequestRef.current?.abort();
    currentRequestRef.current = null;
    if (mockTimerRef.current) {
      window.clearTimeout(mockTimerRef.current);
      mockTimerRef.current = null;
    }
    currentMessageRef.current = null;
    setLoading(false);
  };

  const handleCreateSession = () => {
    const next = createSession(`新会话 ${sessions.length + 1}`);
    setSessions((prev) => [next, ...prev]);
    setActiveKey(next.key);
  };

  const handleRenameSession = (sessionKey: string) => {
    const current = sessions.find((item) => item.key === sessionKey);
    if (!current) return;

    let nextLabel = current.label;

    Modal.confirm({
      title: '重命名会话',
      content: (
        <Input
          defaultValue={current.label}
          maxLength={30}
          onChange={(event) => {
            nextLabel = event.target.value;
          }}
          onPressEnter={(event) => {
            event.preventDefault();
          }}
        />
      ),
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const value = nextLabel.trim();
        if (!value) {
          message.warning('会话名称不能为空');
          return Promise.reject();
        }
        setSessions((prev) =>
          prev.map((item) =>
            item.key === sessionKey ? { ...item, label: value } : item,
          ),
        );
        return Promise.resolve();
      },
    });
  };

  const handleDeleteSession = (sessionKey: string) => {
    if (sessions.length <= 1) {
      message.warning('至少保留一个会话');
      return;
    }

    Modal.confirm({
      title: '删除会话',
      content: '删除后不可恢复，确定删除该会话吗？',
      okText: '删除',
      okButtonProps: { danger: true },
      cancelText: '取消',
      onOk: () => {
        const nextSessions = sessions.filter((item) => item.key !== sessionKey);
        setSessions(nextSessions);

        if (activeKey === sessionKey) {
          setActiveKey(nextSessions[0].key);
          setLoading(false);
        }
      },
    });
  };

  return (
    <Card style={{ minHeight: 680, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          gap: 16,
          minHeight: 0,
          flexDirection: isMobile ? ('column' as const) : ('row' as const),
        }}
      >
        {!isMobile ? (
          <div
            style={{
              width: 260,
              minWidth: 220,
              borderRight: '1px solid rgba(5, 5, 5, 0.06)',
              paddingRight: 12,
              minHeight: 0,
            }}
          >
            <Conversations
              items={sessions.map((item) => ({
                key: item.key,
                label: item.label,
              }))}
              activeKey={activeKey}
              onActiveChange={(key) => setActiveKey(String(key))}
              creation={{ label: '新建会话', onClick: handleCreateSession }}
              menu={(conversation) => ({
                items: [
                  { key: 'rename', label: '重命名' },
                  { key: 'delete', label: '删除' },
                ],
                onClick: ({ key }) => {
                  if (key === 'rename') handleRenameSession(conversation.key);
                  if (key === 'delete') handleDeleteSession(conversation.key);
                },
              })}
            />
          </div>
        ) : (
          <div style={{ width: '100%', marginBottom: 8 }}>
            <Select
              value={activeKey}
              onChange={(k) => setActiveKey(String(k))}
              options={sessions.map((s) => ({ label: s.label, value: s.key }))}
              style={{ width: '100%' }}
              popupMatchSelectWidth
            />
          </div>
        )}

        <Space
          orientation="vertical"
          size={16}
          style={{ width: '100%', minWidth: 0, minHeight: 0, flex: 1 }}
        >
          <Welcome
            variant="borderless"
            icon={<RobotOutlined />}
            title={activeSession?.label || 'AI 对话示例'}
            description={`多会话切换示例（Conversations + Bubble.List + Sender）。当前：${getProviderSummary(
              provider,
              providerConfig,
            )}`}
            extra={
              <Space>
                <Button type="default" onClick={() => setConfigOpen(true)}>
                  配置 Key（{getProviderLabel(provider)}）
                </Button>
              </Space>
            }
          />

          <Prompts
            title={<Typography.Text strong>试试这些问题</Typography.Text>}
            items={PROMPT_ITEMS}
            wrap
            onItemClick={({ data }) =>
              sendMessage(
                typeof data.label === 'string'
                  ? data.label
                  : String(data.description || '介绍这个页面'),
              )
            }
          />

          {/* main chat area with fixed-bottom input */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              maxHeight: 500,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* content area: give bottom padding equal to sender height to avoid overlap */}
            <div
              style={{
                flex: 1,
                minHeight: 300,
                overflow: 'auto',
                paddingBottom: 92,
              }}
            >
              <div style={{ minHeight: 0, height: '100%' }}>
                <div
                  id={chatRegionId}
                  role="region"
                  aria-label={activeSession?.label || '聊天信息'}
                  style={{ height: '100%' }}
                >
                  <Bubble.List
                    items={deferredMessages}
                    role={roles}
                    autoScroll
                    styles={{ scroll: { height: '100%' } }}
                  />
                </div>
              </div>
            </div>

            {/* fixed sender at bottom with fixed height and internal scroll */}
            <div
              className="ai-chat-sender"
              style={{
                flexShrink: 0,
                position: 'sticky',
                bottom: 0,
                zIndex: 2,
                background: '#fff',
                padding: 12,
                borderTop: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <Sender
                key={senderKey}
                loading={loading}
                placeholder="输入你的问题，按 Enter 发送"
                onSubmit={sendMessage}
                onCancel={handleCancelRequest}
                autoSize={false}
              />
            </div>

            {/* force textarea height and allow internal scroll when content overflows */}
            <style>{`.ai-chat-sender textarea{height:56px !important; max-height:56px; overflow:auto; resize:none;}`}</style>
          </div>
        </Space>
      </div>
      <AiModal
        open={configOpen}
        onClose={() => {
          setConfigOpen(false);
          reloadProviderConfig();
        }}
        onSaved={(nextProvider, nextConfig) => {
          setProvider(nextProvider);
          setProviderConfig(nextConfig);
        }}
      />
    </Card>
  );
}
