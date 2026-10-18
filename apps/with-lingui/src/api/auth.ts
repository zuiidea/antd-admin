import { z } from "zod/v4";
import { defineApi } from "@/api/request";
import {
  AuthTokensSchema,
  AuthUserResponseSchema,
  LoginRequestSchema,
  PermissionsListSchema,
  RegisterRequestSchema,
  UserSchema,
} from "@/api/schemas";
import type {
  AuthTokens,
  LoginRequest,
  User,
  PermissionsList,
  RegisterRequest,
} from "@/api/schemas";
import { APP_MENU_TREE, filterMenuTreeByPermissions } from "@/utils/appMenu";
import { useAuthStore } from "@/stores/auth";

export const AUTH_ENDPOINTS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  refresh: "/api/auth/refresh",
  logout: "/api/auth/logout",
  user: "/api/auth/user",
  permissions: "/api/auth/permissions",
} as const;

export const login = defineApi({
  method: "POST",
  path: AUTH_ENDPOINTS.login,
  body: LoginRequestSchema,
  output: AuthTokensSchema,
});

export const register = defineApi({
  method: "POST",
  path: AUTH_ENDPOINTS.register,
  body: RegisterRequestSchema,
  output: AuthTokensSchema,
});

export const logout = defineApi({
  method: "POST",
  path: AUTH_ENDPOINTS.logout,
  output: z.null(),
});

export const getAuthUser = defineApi({
  path: AUTH_ENDPOINTS.user,
  output: AuthUserResponseSchema,
});

export const getPermissions = defineApi({
  path: AUTH_ENDPOINTS.permissions,
  output: PermissionsListSchema,
});

/** Fetches user + permissions, then updates auth store `user` and sidebar `menus`. */
export async function hydrateSession(): Promise<void> {
  const [userBase, permissions] = await Promise.all([getAuthUser(), getPermissions()]);
  const user = UserSchema.parse({ ...userBase, permissions });
  const menus = filterMenuTreeByPermissions(APP_MENU_TREE, permissions);
  const { setUser, setMenus } = useAuthStore.getState();
  setUser(user);
  setMenus(menus);
}

export type { AuthTokens, LoginRequest, User, PermissionsList, RegisterRequest };
