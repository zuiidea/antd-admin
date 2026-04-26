import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { App, Badge, Button, Flex, List, Segmented, Space, Tag, Tooltip, Typography, theme } from "antd";
import { AtSign, CheckCheck, ClipboardList, Info, AlertTriangle, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { httpClient } from "@/utils/http";
import { NOTIFICATION_ENDPOINTS } from "@/api/notification";
import { NotificationSchema } from "@/api/schemas-ext";
import type { Notification } from "@/api/schemas-ext";

export const Route = createFileRoute("/_auth/notifications/")({ component: NotificationsPage });

const TYPE_META = {
  system: { Icon: Info, color: "blue", label: "System" },
  mention: { Icon: AtSign, color: "purple", label: "Mention" },
  task: { Icon: ClipboardList, color: "green", label: "Task" },
  alert: { Icon: AlertTriangle, color: "red", label: "Alert" },
} as const;

function NotificationsPage() {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const qc = useQueryClient();
  const [type, setType] = useState("all");

  const { data: raw = [], isLoading } = useQuery({
    queryKey: ["notifications", type],
    queryFn: () =>
      httpClient.get<Notification[]>(NOTIFICATION_ENDPOINTS.list, {
        params: type !== "all" ? { type } : undefined,
      }),
  });

  const items = useMemo(
    () => raw
      .filter((n) => NotificationSchema.safeParse(n).success)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [raw],
  );

  const inv = () => { void qc.invalidateQueries({ queryKey: ["notifications"] }); };

  const mark = useMutation({
    mutationFn: (id: string) => httpClient.put(NOTIFICATION_ENDPOINTS.markRead(id)),
    onSuccess: inv,
  });

  const markAll = useMutation({
    mutationFn: () => httpClient.put(NOTIFICATION_ENDPOINTS.markAllRead),
    onSuccess: () => { message.success("All marked as read"); inv(); },
  });

  const del = useMutation({
    mutationFn: (id: string) => httpClient.delete(NOTIFICATION_ENDPOINTS.delete(id)),
    onSuccess: () => { message.success("Deleted"); inv(); },
  });

  const unread = items.filter((n) => !n.read).length;

  return (
    <Flex vertical gap={token.marginMD} style={{ flex: 1, minHeight: 0 }}>
      <Flex justify="space-between" align="center" wrap="wrap" gap={token.marginSM}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Notifications
          {unread > 0 && <Badge count={unread} style={{ marginInlineStart: token.marginSM }} overflowCount={99} />}
        </Typography.Title>
        <Space>
          <Segmented
            size="small"
            value={type}
            onChange={(v) => setType(v as string)}
            options={[
              { label: "All", value: "all" },
              { label: "Unread", value: "unreadOnly" },
              ...Object.entries(TYPE_META).map(([k, m]) => ({ label: m.label, value: k })),
            ]}
          />
          {unread > 0 && (
            <Button size="small" icon={<CheckCheck size={token.fontSize} />}
              onClick={() => markAll.mutate()} loading={markAll.isPending}>
              Mark all read
            </Button>
          )}
        </Space>
      </Flex>

      <List
        loading={isLoading}
        dataSource={items}
        style={{ flex: 1, overflow: "auto" }}
        locale={{ emptyText: "No notifications" }}
        renderItem={(item) => {
          const { Icon, color } = TYPE_META[item.type];
          return (
            <List.Item
              key={item.id}
              onClick={() => !item.read && mark.mutate(item.id)}
              style={{
                padding: `${token.paddingSM}px ${token.padding}px`,
                borderRadius: token.borderRadiusLG,
                background: item.read ? "transparent" : token.colorFillQuaternary,
                cursor: item.read ? "default" : "pointer",
                marginBottom: token.marginXXS,
              }}
              actions={[
                <Tooltip title="Delete" key="x">
                  <Button type="text" size="small" danger icon={<Trash2 size={token.fontSize} />}
                    onClick={(e) => { e.stopPropagation(); del.mutate(item.id); }} />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                avatar={<Tag color={color} style={{ display: "inline-flex", alignItems: "center", gap: 4, marginInlineEnd: 0 }}><Icon size={12} /></Tag>}
                title={
                  <Flex align="center" gap={token.marginXS}>
                    {!item.read && <Badge status="processing" style={{ flexShrink: 0 }} />}
                    <Typography.Text strong={!item.read}>{item.title}</Typography.Text>
                  </Flex>
                }
                description={
                  <Flex vertical gap={4}>
                    <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ margin: 0, fontSize: token.fontSizeSM }}>
                      {item.content}
                    </Typography.Paragraph>
                    <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Typography.Text>
                  </Flex>
                }
              />
            </List.Item>
          );
        }}
      />
    </Flex>
  );
}
