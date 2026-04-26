import type { MenuItem } from "./schemas";

export const MENU_ENDPOINTS = {
  list: "/api/menus",
  update: "/api/menus",
} as const;

export type { MenuItem };
