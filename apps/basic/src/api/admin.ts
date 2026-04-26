import type { CreateAdminRequest, UpdateAdminRequest, User } from "./schemas";

export const ADMIN_ENDPOINTS = {
  list: "/api/admins",
  create: "/api/admins",
  detail: (id: string) => `/api/admins/${id}`,
  update: (id: string) => `/api/admins/${id}`,
  delete: (id: string) => `/api/admins/${id}`,
} as const;

export type Admin = User;

export type { CreateAdminRequest, UpdateAdminRequest };
