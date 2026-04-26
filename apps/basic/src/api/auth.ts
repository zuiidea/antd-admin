import type {
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  User,
  MenuItem,
  PermissionsList,
} from "./schemas";

export const AUTH_ENDPOINTS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  refresh: "/api/auth/refresh",
  logout: "/api/auth/logout",
  user: "/api/auth/user",
  permissions: "/api/auth/permissions",
} as const;

export type { AuthTokens, LoginRequest, RegisterRequest, User, MenuItem, PermissionsList };
