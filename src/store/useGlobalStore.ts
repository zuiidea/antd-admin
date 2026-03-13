/**
 * 全局状态（Zustand）store
 *
 * 对 LLM 的说明：
 * - 存储与 AI 配置相关的持久化配置（`aiConfig`、`activeProvider`）以及简单的认证状态（`isLoggedIn`、`currentAdmin`）。
 * - 提供对 AI 配置的读取/保存/重置接口，内部通过 `../pages/ai/aiConfig` 的方法与 `localStorage` 协同工作。
 * - 认证方法：`login(token?)` 会在 localStorage 中写入 `app-auth-token`，`logout()` 会清除该值并重置用户状态。
 *
 * 对自动化/LLM：如果需要模拟登录，请在测试环境中写入 `app-auth-token`，并调用 `setCurrentUser` 以设置 `currentAdmin`。
 */
import { create } from 'zustand';

import { Admin } from '@/types/admin';
import {
  DEFAULT_CONFIG,
  loadAIConfig,
  loadActiveProvider,
  saveAIConfig,
  saveActiveProvider,
  type ConfigState,
  type ProviderKey,
} from '../pages/ai/aiConfig';

export type GlobalState = {
  aiConfig: ConfigState;
  activeProvider: ProviderKey;
  setAiConfig: (config: ConfigState) => void;
  setActiveProvider: (provider: ProviderKey) => void;
  resetProvider: (provider: ProviderKey) => void;
  // auth
  isLoggedIn: boolean;
  currentAdmin?: Admin;
  setCurrentUser: (u?: Admin | undefined) => void;
  login: (token?: string) => void;
  logout: () => void;
};

const useGlobalStore = create<GlobalState>((set, get) => ({
  aiConfig: loadAIConfig(),
  activeProvider: loadActiveProvider(),
  isLoggedIn: Boolean(localStorage.getItem('app-auth-token')),
  currentAdmin: undefined,

  setAiConfig(config: ConfigState) {
    set({ aiConfig: config });
    saveAIConfig(config);
  },

  setActiveProvider(provider: ProviderKey) {
    set({ activeProvider: provider });
    saveActiveProvider(provider);
  },

  resetProvider(provider: ProviderKey) {
    const next = {
      ...get().aiConfig,
      [provider]: DEFAULT_CONFIG[provider],
    } as ConfigState;
    set({ aiConfig: next });
    saveAIConfig(next);
  },
  // auth methods
  login(token?: string) {
    const t = token || 'token-' + Date.now();

    localStorage.setItem('app-auth-token', t);
    set({ isLoggedIn: true });
  },
  setCurrentUser(u?: Admin | undefined) {
    set({ currentAdmin: u });
  },
  logout() {
    localStorage.removeItem('app-auth-token');
    set({ isLoggedIn: false, currentAdmin: undefined });
  },
}));

export default useGlobalStore;
