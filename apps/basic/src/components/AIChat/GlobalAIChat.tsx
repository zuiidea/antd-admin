import { useState } from "react";
import { Button, Drawer, Empty, Flex, Input, Tag, Typography, theme } from "antd";
import { Bot, Send, Sparkles } from "lucide-react";
import { useAIStore } from "@/stores/ai";

const { Text } = Typography;

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

function buildAssistantReply(prompt: string): string {
  const lower = prompt.toLowerCase();
  if (lower.includes("menu")) {
    return "You can edit menu names, icons, visibility and permissions in Menus page, then save to apply globally.";
  }
  if (lower.includes("permission") || lower.includes("auth")) {
    return "Try checking user permissions first, then route mapping in app menu rules, and finally API response payload.";
  }
  if (lower.includes("dashboard")) {
    return "Dashboard now supports timeline blocks. You can add monthly milestones or deployment events to make it useful.";
  }
  return "I can help with admin, users, menus, and dashboard changes. Tell me what you want to update.";
}

export function GlobalAIChat() {
  const { token } = theme.useToken();
  const enabled = useAIStore((s) => s.enabled);
  const model = useAIStore((s) => s.model);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  if (!enabled) return null;

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };
    const assistantMessage: ChatMessage = {
      id: `a-${Date.now()}`,
      role: "assistant",
      content: buildAssistantReply(text),
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <>
      {!open ? (
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<Sparkles size={token.fontSize} />}
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            right: token.marginLG,
            bottom: token.marginLG,
            zIndex: 1001,
            boxShadow: token.boxShadowSecondary,
          }}
        >
          Ask AI
        </Button>
      ) : null}

      <Drawer
        open={open}
        title={
          <Flex align="center" gap={token.marginXS}>
            <Bot size={token.fontSizeLG} />
            <span>Global AI Assistant</span>
          </Flex>
        }
        size="large"
        onClose={() => setOpen(false)}
        destroyOnClose={false}
      >
        <Flex vertical gap={token.margin} style={{ height: "100%" }}>
          <Tag color="blue" variant="filled" style={{ width: "fit-content" }}>
            Context: current admin workspace
          </Tag>
          <Tag color="purple" variant="filled" style={{ width: "fit-content" }}>
            Model: {model}
          </Tag>

          <Flex
            vertical
            gap={token.marginSM}
            style={{
              flex: 1,
              overflow: "auto",
              border: `1px solid ${token.colorBorderSecondary}`,
              borderRadius: token.borderRadius,
              padding: token.paddingSM,
            }}
          >
            {messages.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Start a conversation about users, admins, menus, or dashboard."
              />
            ) : (
              messages.map((msg) => (
                <Flex
                  key={msg.id}
                  justify={msg.role === "user" ? "flex-end" : "flex-start"}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: `${token.paddingXS}px ${token.paddingSM}px`,
                      borderRadius: token.borderRadius,
                      background:
                        msg.role === "user" ? token.colorPrimaryBgHover : token.colorFillQuaternary,
                    }}
                  >
                    <Text>{msg.content}</Text>
                  </div>
                </Flex>
              ))
            )}
          </Flex>

          <Input.TextArea
            value={input}
            rows={3}
            placeholder="Ask anything about this admin app..."
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />

          <Button type="primary" icon={<Send size={token.fontSize} />} onClick={send}>
            Send
          </Button>
        </Flex>
      </Drawer>
    </>
  );
}
