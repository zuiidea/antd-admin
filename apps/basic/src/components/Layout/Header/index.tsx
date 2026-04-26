/**
 * Header — breadcrumb + global actions (notification bell, fullscreen, theme).
 *
 * ── Architecture ──
 *   Left:    mobile sidebar toggle (lg-) + breadcrumb
 *   Right:   NotificationBell (popover) → Fullscreen → Theme toggle
 *
 * ── Data flow ──
 *   breadcrumb ← authStore.menus (flat-tree match) + current route path
 *   notification badge ← useQuery poll (30s interval)
 */

import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Layout,
  Popover,
  Space,
  Typography,
  theme,
} from "antd";
import { useSettingsStore } from "@/stores/settings";
import { useAuthStore } from "@/stores/auth";
import { Link, useLocation, useMatches } from "@tanstack/react-router";
import {
  Bell,
  Book,
  BrainCircuit,
  Briefcase,
  CheckCheck,
  CircleDashed,
  Fullscreen,
  History,
  Home,
  Minimize2,
  PanelLeft,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  User,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Theme } from "@/components/Icon";
import type { MenuItem } from "@/api/schemas";
import type { Notification } from "@/api/schemas-ext";
import { httpClient } from "@/utils/http";
import { NOTIFICATION_ENDPOINTS } from "@/api/notification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const { Header: AntHeader } = Layout;

// ── Route → label mapping (fallback when not found in menu tree) ──
const PATH_LABEL: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/notifications": "Notifications",
  "/logs": "Audit Logs",
  "/profile": "Profile",
  "/403": "403",
};

// ── Menu icon string → Lucide component ──
const MENU_ICON_MAP: Record<string, LucideIcon> = {
  IconLucideHistory: History,
  IconLucideLayoutDashboard: Home,
  IconLucideUsers: User,
  IconLucideUserList: Users,
  IconLucideStar: Star,
  IconLucideSettings: SlidersHorizontal,
  IconLucideBriefcase: Briefcase,
  IconLucideBookOpen: Book,
  IconLucideSparkles: Zap,
  IconLucideShieldCheck: ShieldCheck,
  IconLucideBrainCircuit: BrainCircuit,
};

// ── Utilities ──

/** Normalize pathname: strip trailing slash */
function normalizePath(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "") || "/";
}

/** Flatten a recursive menu tree into a flat list */
function flattenMenuItems(nodes: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.kind === "group") { result.push(...flattenMenuItems(node.children)); continue; }
    if (node.children?.length) result.push(...flattenMenuItems(node.children));
  }
  return result;
}

/** Find the deepest menu item matching the current path */
function findBestMenuMatch(nodes: MenuItem[], pathname: string): MenuItem | null {
  const p = normalizePath(pathname);
  const candidates = flattenMenuItems(nodes)
    .filter((n): n is Extract<MenuItem, { kind: "item" }> => {
      if (n.kind !== "item") return false;
      const target = normalizePath(n.path);
      return p === target || p.startsWith(`${target}/`);
    });
  if (!candidates.length) return null;
  candidates.sort((a, b) => b.path.length - a.path.length);
  return candidates[0];
}

function resolveMenuIcon(icon: string | null): LucideIcon {
  return (icon && MENU_ICON_MAP[icon]) || CircleDashed;
}

// ── Props ──
export type HeaderProps = {
  /** Hide breadcrumb; routes may override via `staticData.hideBreadcrumb` */
  showBreadcrumb?: boolean;
};

// ── Main component ──
export function Header({ showBreadcrumb: showProp = true }: HeaderProps) {
  const toggleSidebar = useSettingsStore((s) => s.toggleSidebar);
  const toggleDarkMode = useSettingsStore((s) => s.toggleDarkMode);
  const menus = useAuthStore((s) => s.menus);
  const location = useLocation();
  const matches = useMatches();
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.lg;
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    handler();
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ── Breadcrumb ──
  const path = normalizePath(location.pathname);
  const segments = path.split("/").filter(Boolean);
  const match = findBestMenuMatch(menus, path);
  const leafLabel = match?.name ?? PATH_LABEL[path] ?? segments[0] ?? "Dashboard";
  const leafIcon: LucideIcon = path === "/403" ? ShieldAlert : match ? resolveMenuIcon(match.icon) : Home;

  // Render a breadcrumb link label
  const crumb = (IconCmp: LucideIcon, label: ReactNode, link?: "/dashboard") => {
    const row = <><IconCmp size={token.fontSize} aria-hidden style={{ flexShrink: 0, opacity: 0.88 }} /><span>{label}</span></>;
    const rowStyle = { display: "inline-flex" as const, alignItems: "center" as const, gap: token.marginXS, color: "inherit" as const };
    return link ? <Link to={link} style={rowStyle}>{row}</Link> : <span style={rowStyle}>{row}</span>;
  };

  const onDashboard = path === "/dashboard" || path === "/";
  const items = onDashboard
    ? [{ title: crumb(Home, "Dashboard") }]
    : [{ title: crumb(Home, "Dashboard", "/dashboard") }, { title: crumb(leafIcon, leafLabel) },
        ...(segments.length > 1 ? [{ title: segments.slice(1).join(" / ") }] : [])];

  const hideByRoute = (matches.at(-1)?.staticData as { hideBreadcrumb?: boolean } | undefined)?.hideBreadcrumb === true;
  const showBc = showProp && !hideByRoute && items.length > 0;

  return (
    <AntHeader style={{ background: "transparent", borderBottom: `1px solid ${token.colorBorderSecondary}`, padding: `0 ${token.padding}px`, gap: token.sizeLG, display: "flex" }}>
      {/* Left */}
      <Flex align="center" flex={1} style={{ minWidth: 0, overflow: "hidden" }}>
        {isMobile && <Button type="text" size="small" onClick={toggleSidebar} icon={<PanelLeft size={token.size} />} aria-label="Toggle sidebar" />}
        {showBc && (
          <>
            {isMobile && <Divider vertical />}
            {isMobile ? (
              <Typography.Text ellipsis style={{ fontSize: token.fontSizeLG, fontWeight: 600 }}>
                {leafLabel}
              </Typography.Text>
            ) : (
              // Desktop: full Breadcrumb component
              <Flex align="center" style={{ minWidth: 0 }}>
                {/* antd Breadcrumb expects items, but we render them inline for simplicity */}
                {items.map((it, i) => (
                  <span key={i}>
                    {i > 0 && <span style={{ margin: `0 ${token.marginXXS}px`, color: token.colorTextQuaternary }}>/</span>}
                    {it.title}
                  </span>
                ))}
              </Flex>
            )}
          </>
        )}
      </Flex>

      {/* Right */}
      <Space>
        <NotificationTrigger />
        <Button type="text" onClick={() => document.fullscreenElement ? void document.exitFullscreen() : void document.documentElement.requestFullscreen()}
          icon={isFullscreen ? <Minimize2 size={token.size} /> : <Fullscreen size={token.size} />} aria-label="Toggle fullscreen" />
        <Button type="text" onClick={toggleDarkMode} icon={<Theme size={token.size} />} aria-label="Toggle theme" />
      </Space>
    </AntHeader>
  );
}

// ═══════════════════════════════════════════════════════
// Notification Bell (Popover)
// ═══════════════════════════════════════════════════════

/** Inline notification item for the popover dropdown */
function NotifRow({ n, onMark }: { n: Notification; onMark: () => void }) {
  const { token } = theme.useToken();
  return (
    <div
      onClick={onMark}
      style={{
        padding: `${token.paddingXS}px ${token.paddingSM}px`,
        cursor: n.read ? "default" : "pointer",
        background: n.read ? "transparent" : token.colorFillQuaternary,
        borderRadius: token.borderRadius,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Flex justify="space-between" align="start" gap={token.marginXS}>
        <Flex vertical gap={2} style={{ minWidth: 0 }}>
          <Typography.Text strong={!n.read} ellipsis style={{ fontSize: token.fontSizeSM }}>
            {n.title}
          </Typography.Text>
          <Typography.Text type="secondary" ellipsis style={{ fontSize: 11 }}>
            {n.content}
          </Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 10 }}>
            {new Date(n.createdAt).toLocaleString()}
          </Typography.Text>
        </Flex>
        {!n.read && <Badge status="processing" style={{ flexShrink: 0 }} />}
      </Flex>
    </div>
  );
}

function NotificationTrigger() {
  const { token } = theme.useToken();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  // Poll unread-only + latest 5 for popover (lightweight)
  const { data: unreadList = [] } = useQuery({
    queryKey: ["notifications", "bell-unread"],
    queryFn: () =>
      httpClient.get<Notification[]>(NOTIFICATION_ENDPOINTS.list, {
        params: { unreadOnly: "true" },
      }),
    refetchInterval: 30_000,
  });

  const unreadCount = unreadList.length;

  // Load full list when popover opens (for any read ones)
  const { data: fullList = [] } = useQuery({
    queryKey: ["notifications", "bell-all"],
    queryFn: () => httpClient.get<Notification[]>(NOTIFICATION_ENDPOINTS.list),
    enabled: open,
  });

  const merged = open
    ? [...fullList].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
    : [];

  const markAsRead = useMutation({
    mutationFn: (id: string) => httpClient.put(NOTIFICATION_ENDPOINTS.markRead(id)),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["notifications"] }); },
  });

  const markAll = useMutation({
    mutationFn: () => httpClient.put(NOTIFICATION_ENDPOINTS.markAllRead),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["notifications"] }); },
  });

  const content = (
    <div style={{ width: 360, maxHeight: 440, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Flex justify="space-between" align="center" style={{ padding: `${token.paddingSM}px ${token.padding}px`, borderBottom: `1px solid ${token.colorBorderSecondary}` }}>
        <Typography.Text strong>Notifications</Typography.Text>
        {unreadCount > 0 && (
          <Button type="link" size="small" icon={<CheckCheck size={token.fontSize} />}
            loading={markAll.isPending} onClick={() => markAll.mutate()}>
            Mark all read
          </Button>
        )}
      </Flex>
      <div style={{ flex: 1, overflow: "auto" }}>
        {merged.length === 0 ? (
          <Flex justify="center" style={{ padding: token.paddingMD * 2 }}>
            <Typography.Text type="secondary">No notifications</Typography.Text>
          </Flex>
        ) : (
          merged.map((n) => <NotifRow key={n.id} n={n} onMark={() => !n.read && markAsRead.mutate(n.id)} />)
        )}
      </div>
      <Flex justify="center" style={{ padding: token.paddingSM, borderTop: `1px solid ${token.colorBorderSecondary}` }}>
        <Link to="/notifications" onClick={() => setOpen(false)}>
          <Typography.Link>View All Notifications</Typography.Link>
        </Link>
      </Flex>
    </div>
  );

  return (
    <Popover content={content} trigger="click" open={open} onOpenChange={setOpen} placement="bottomRight">
      <Badge count={unreadCount} size="small" offset={[-2, 4]}>
        <Button type="text" icon={<Bell size={token.size} />} aria-label="Notifications" />
      </Badge>
    </Popover>
  );
}
