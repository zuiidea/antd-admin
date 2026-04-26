import { createPersistentStore } from "./createPersistentStore";

type AIProvider = "openai" | "azure-openai" | "anthropic";

interface AIState {
  enabled: boolean;
  provider: AIProvider;
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  setConfig: (next: Partial<Omit<AIState, "setConfig">>) => void;
}

export const useAIStore = createPersistentStore<AIState>(
  (set) => ({
    enabled: true,
    provider: "openai",
    model: "gpt-5.3-codex",
    systemPrompt: "You are an enterprise assistant for admin operations.",
    temperature: 0.2,
    maxTokens: 2048,
    setConfig: (next) => set((state) => ({ ...state, ...next })),
  }),
  {
    name: "ai-settings-storage",
  },
);
