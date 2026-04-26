import { httpClient } from "@/utils/http";
import { AUTH_ENDPOINTS } from "@/api/auth";
import { MENU_ENDPOINTS } from "@/api/menu";
import { AuthUserResponseSchema, PermissionsListSchema, UserSchema } from "@/api/schemas";
import { MenuItemSchema } from "@/api/schemas";
import { filterMenuTreeByPermissions } from "@/utils/appMenu";
import { useAuthStore } from "@/stores/auth";

/** Fetches `/api/auth/user` and `/api/auth/permissions`, then updates `user` and sidebar `menus`. */
export async function fetchSessionAndApplyToStore(): Promise<void> {
  const [userBase, permissions, menuTree] = await Promise.all([
    httpClient.get(AUTH_ENDPOINTS.user).then((d) => AuthUserResponseSchema.parse(d)),
    httpClient.get(AUTH_ENDPOINTS.permissions).then((d) => PermissionsListSchema.parse(d)),
    httpClient.get(MENU_ENDPOINTS.list).then((d) => MenuItemSchema.array().parse(d)),
  ]);
  const user = UserSchema.parse({ ...userBase, permissions });
  const menus = filterMenuTreeByPermissions(menuTree, permissions);
  const { setUser, setMenus } = useAuthStore.getState();
  setUser(user);
  setMenus(menus);
}
