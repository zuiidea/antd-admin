import type { MenuItem } from "@/api/schemas";

export const APP_PERMISSION_OPTIONS = [
  { label: "Users: View", value: "user:view" },
  { label: "Users: Create", value: "user:create" },
  { label: "Users: Edit", value: "user:edit" },
  { label: "Users: Delete", value: "user:delete" },
  { label: "Admins: View", value: "admin:view" },
  { label: "Admins: Create", value: "admin:create" },
  { label: "Admins: Edit", value: "admin:edit" },
  { label: "Admins: Delete", value: "admin:delete" },
] as const;

/**
 * Built-in menu tree. Visibility is computed with {@link filterMenuTreeByPermissions}
 * from `GET /api/auth/permissions` (must stay consistent with route permission map below).
 */
export const APP_MENU_TREE: MenuItem[] = [
  {
    id: "g-platform",
    kind: "group",
    name: "Platform",
    path: null,
    icon: "IconLucideSparkles",
    permissions: null,
    sort: 0,
    hidden: false,
    children: [
      {
        id: "1",
        kind: "item",
        name: "Dashboard",
        path: "/dashboard",
        icon: "IconLucideLayoutDashboard",
        children: null,
        permissions: null,
        sort: 0,
        hidden: false,
      },
      {
        id: "2",
        kind: "item",
        name: "Users",
        path: "/users",
        icon: "IconLucideUsers",
        children: null,
        permissions: ["user:view"],
        sort: 1,
        hidden: false,
      },
      {
        id: "5",
        kind: "item",
        name: "Admins",
        path: "/admins",
        icon: "IconLucideShieldCheck",
        children: null,
        permissions: ["admin:view"],
        sort: 2,
        hidden: false,
      },
      {
        id: "8",
        kind: "item",
        name: "Notifications",
        path: "/notifications",
        icon: "IconLucideHistory",
        children: null,
        permissions: null,
        sort: 3,
        hidden: false,
      },
      {
        id: "10",
        kind: "item",
        name: "Logs",
        path: "/logs",
        icon: "IconLucideBookOpen",
        children: null,
        permissions: ["admin:view"],
        sort: 5,
        hidden: false,
      },
    ],
  },
  {
    id: "g-settings",
    kind: "group",
    name: "Settings",
    path: null,
    icon: "IconLucideSettings",
    permissions: ["admin:view"],
    sort: 1,
    hidden: false,
    children: [
      {
        id: "6",
        kind: "item",
        name: "Menus",
        path: "/menus",
        icon: "IconLucideSettings",
        children: null,
        permissions: ["admin:view"],
        sort: 0,
        hidden: false,
      },
      {
        id: "7",
        kind: "item",
        name: "AI Settings",
        path: "/ai-settings",
        icon: "IconLucideSparkles",
        children: null,
        permissions: ["admin:view"],
        sort: 1,
        hidden: false,
      },
    ],
  },
];

function hasRequiredPermissions(
  required: string[] | null | undefined,
  granted: Set<string>,
): boolean {
  if (!required || required.length === 0) return true;
  return required.every((p) => granted.has(p));
}

export function filterMenuTreeByPermissions(
  nodes: MenuItem[],
  permissionList: string[],
): MenuItem[] {
  const granted = new Set(permissionList);

  const walk = (list: MenuItem[]): MenuItem[] =>
    list
      .map((node) => {
        if (!hasRequiredPermissions(node.permissions ?? null, granted)) return null;

        if (node.kind === "group") {
          const children = walk(node.children);
          if (children.length === 0) return null;
          return { ...node, children };
        }

        if (node.children?.length) {
          const children = walk(node.children);
          if (children.length === 0) return null;
          return { ...node, children };
        }

        return node;
      })
      .filter((n): n is MenuItem => n != null);

  return walk(nodes);
}

/** Normalized pathname (no trailing slash except `/`) */
export function normalizeAppPath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

/**
 * Route → permission required to open the page. `null` = no permission gate.
 * Keep in sync with {@link APP_MENU_TREE} paths.
 */

// 更严格的路径权限判断，避免误判/绕过
export function requiredPermissionForPath(pathname: string): string | null {
  const p = normalizeAppPath(pathname);
  // 只允许精确匹配和一级子路由
  if (p === "/admins" || /^\/admins\/[\w-]+$/.test(p)) return "admin:view";
  if (p === "/users" || /^\/users\/[\w-]+$/.test(p)) return "user:view";
  const map: Record<string, string | null> = {
    "/dashboard": null,
    "/notifications": null,
    "/logs": "admin:view",
    "/profile": null,
    "/menus": "admin:view",
    "/ai-settings": "admin:view",
    "/403": null,
  };
  return map[p] ?? null;
}

export function canAccessPath(pathname: string, permissions: string[] | undefined): boolean {
  const required = requiredPermissionForPath(pathname);
  if (required == null) return true;
  if (!permissions?.length) return false;
  return permissions.includes(required);
}
