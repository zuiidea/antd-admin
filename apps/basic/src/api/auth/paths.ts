import { API_PREFIX } from "@/api/shared/prefix";

const AUTH_BASE = `${API_PREFIX}/auth`;

export const AUTH_ENDPOINTS = {
  login: `${AUTH_BASE}/login`,
  register: `${AUTH_BASE}/register`,
  refresh: `${AUTH_BASE}/refresh`,
  logout: `${AUTH_BASE}/logout`,
  user: `${AUTH_BASE}/user`,
  permissions: `${AUTH_BASE}/permissions`,
} as const;
