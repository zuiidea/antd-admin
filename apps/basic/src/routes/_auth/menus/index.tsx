import { createFileRoute } from "@tanstack/react-router";
import {
  App,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Switch,
  Tree,
  Typography,
  theme,
} from "antd";
import type { DataNode } from "antd/es/tree";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpClient } from "@/utils/http";
import { MENU_ENDPOINTS } from "@/api/menu";
import { MenuItemSchema } from "@/api/schemas";
import type { MenuItem } from "@/api/schemas";
import { fetchSessionAndApplyToStore } from "@/utils/session";
import { FolderPlus, Plus, Trash2 } from "lucide-react";

const { Text } = Typography;

export const Route = createFileRoute("/_auth/menus/")({
  component: MenusPage,
});

type MenuFormValues = {
  name: string;
  path: string;
  icon: string;
  sort: number;
  hidden: boolean;
  permissionsCsv: string;
};

type NodeContext = {
  node: MenuItem;
  parentId: string | null;
  index: number;
};

function cloneMenus(menus: MenuItem[]): MenuItem[] {
  return JSON.parse(JSON.stringify(menus)) as MenuItem[];
}

function nextNodeId(): string {
  return `menu-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function withChildren(item: MenuItem, children: MenuItem[]): MenuItem {
  if (item.kind === "group") {
    return { ...item, children };
  }
  return { ...item, children: children.length ? children : null };
}

function normalizeSort(items: MenuItem[]): MenuItem[] {
  return items.map((item, index) => {
    if (item.kind === "group") {
      return { ...item, sort: index, children: normalizeSort(item.children) };
    }
    if (!item.children?.length) {
      return { ...item, sort: index };
    }
    return { ...item, sort: index, children: normalizeSort(item.children) };
  });
}

function buildTreeData(items: MenuItem[]): DataNode[] {
  return items
    .slice()
    .sort((a, b) => a.sort - b.sort)
    .map((item) => {
      const suffix = item.hidden ? " (hidden)" : "";
      const title = `${item.name}${suffix}`;
      return {
        key: item.id,
        title: item.kind === "group" ? `${title}` : `${title}  ${item.path}`,
        children: item.children?.length ? buildTreeData(item.children) : undefined,
      };
    });
}

function findNodeContext(items: MenuItem[], id: string, parentId: string | null = null): NodeContext | null {
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    if (item.id === id) return { node: item, parentId, index };
    if (item.children?.length) {
      const found = findNodeContext(item.children, id, item.id);
      if (found) return found;
    }
  }
  return null;
}

function findNode(items: MenuItem[], id: string): MenuItem | null {
  return findNodeContext(items, id)?.node ?? null;
}

function updateNode(items: MenuItem[], id: string, patch: Partial<MenuItem>): MenuItem[] {
  return items.map((item) => {
    if (item.id === id) {
      if (item.kind === "group") {
        return {
          ...item,
          name: patch.name ?? item.name,
          icon: patch.icon ?? item.icon,
          permissions: patch.permissions ?? item.permissions,
          sort: patch.sort ?? item.sort,
          hidden: patch.hidden ?? item.hidden,
        };
      }
      return {
        ...item,
        name: patch.name ?? item.name,
        path: patch.path && typeof patch.path === "string" ? patch.path : item.path,
        icon: patch.icon ?? item.icon,
        permissions: patch.permissions ?? item.permissions,
        sort: patch.sort ?? item.sort,
        hidden: patch.hidden ?? item.hidden,
      };
    }
    if (!item.children?.length) return item;
    return withChildren(item, updateNode(item.children, id, patch));
  });
}

function removeNode(items: MenuItem[], id: string): { next: MenuItem[]; removed: MenuItem | null } {
  let removed: MenuItem | null = null;
  const next: MenuItem[] = [];

  for (const item of items) {
    if (item.id === id) {
      removed = item;
      continue;
    }

    if (item.children?.length) {
      const childResult = removeNode(item.children, id);
      if (childResult.removed) {
        removed = childResult.removed;
        next.push(withChildren(item, childResult.next));
        continue;
      }
    }

    next.push(item);
  }

  return { next, removed };
}

function insertChild(items: MenuItem[], parentId: string, child: MenuItem): MenuItem[] {
  return items.map((item) => {
    if (item.id === parentId) {
      const currentChildren = item.children ? [...item.children] : [];
      return withChildren(item, normalizeSort([...currentChildren, child]));
    }
    if (!item.children?.length) return item;
    return withChildren(item, insertChild(item.children, parentId, child));
  });
}

function replaceSiblingList(
  items: MenuItem[],
  parentId: string | null,
  transform: (siblings: MenuItem[]) => MenuItem[],
): MenuItem[] {
  if (parentId == null) {
    return normalizeSort(transform(items));
  }
  return items.map((item) => {
    if (item.id === parentId) {
      const siblings = item.children ? [...item.children] : [];
      return withChildren(item, normalizeSort(transform(siblings)));
    }
    if (!item.children?.length) return item;
    return withChildren(item, replaceSiblingList(item.children, parentId, transform));
  });
}

function permissionsToCsv(permissions: string[] | null): string {
  return permissions?.join(",") ?? "";
}

function csvToPermissions(csv: string): string[] | null {
  const list = csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length ? list : null;
}

function MenusPage() {
  const { message } = App.useApp();
  const { token } = theme.useToken();
  const [form] = Form.useForm<MenuFormValues>();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draftMenus, setDraftMenus] = useState<MenuItem[] | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["menus"],
    queryFn: () => httpClient.get(MENU_ENDPOINTS.list),
    select: (raw) => MenuItemSchema.array().parse(raw),
  });

  const menus = draftMenus ?? data ?? [];
  const selectedNode = selectedId ? findNode(menus, selectedId) : null;
  const selectedContext = selectedId ? findNodeContext(menus, selectedId) : null;

  const treeData = useMemo(() => buildTreeData(menus), [menus]);

  const saveMutation = useMutation({
    mutationFn: (nextMenus: MenuItem[]) => httpClient.put(MENU_ENDPOINTS.update, { menus: nextMenus }),
    onSuccess: async () => {
      setDraftMenus(null);
      await fetchSessionAndApplyToStore();
      message.success("Menus saved");
    },
    onError: (error) => {
      const content = error instanceof Error ? error.message : "Save menus failed";
      message.error(content);
    },
  });

  const bindForm = (node: MenuItem | null) => {
    if (!node) {
      form.resetFields();
      return;
    }
    form.setFieldsValue({
      name: node.name,
      path: node.path ?? "",
      icon: node.icon ?? "",
      sort: node.sort,
      hidden: node.hidden,
      permissionsCsv: permissionsToCsv(node.permissions),
    });
  };

  const createDefaultItem = (name: string): MenuItem => ({
    id: nextNodeId(),
    kind: "item",
    name,
    path: `/path-${Date.now()}`,
    icon: "IconLucideCircleDashed",
    permissions: null,
    sort: 0,
    hidden: false,
    children: null,
  });

  const createDefaultGroup = (): MenuItem => ({
    id: nextNodeId(),
    kind: "group",
    name: "New Group",
    path: null,
    icon: "IconLucideSettings",
    permissions: null,
    sort: 0,
    hidden: false,
    children: [],
  });

  const canDrop = () => true;

  const handleDrop = (info: {
    dragNode: DataNode;
    node: DataNode;
    dropToGap: boolean;
    dropPosition: number;
  }) => {
    const dragId = String(info.dragNode.key);
    const targetId = String(info.node.key);
    if (dragId === targetId) return;

    const removed = removeNode(menus, dragId);
    if (!removed.removed) return;

    const targetPosStr = String((info.node as { pos?: string }).pos ?? "0");
    const rawPosition = Number(targetPosStr.split("-").at(-1) ?? 0);
    const relativeDrop = info.dropPosition - rawPosition;

    if (!info.dropToGap) {
      const withChild = insertChild(removed.next, targetId, removed.removed);
      setDraftMenus(normalizeSort(withChild));
      return;
    }

    const targetCtx = findNodeContext(removed.next, targetId);
    if (!targetCtx) return;

    const insertIndex = relativeDrop < 0 ? targetCtx.index : targetCtx.index + 1;
    const withSibling = replaceSiblingList(removed.next, targetCtx.parentId, (siblings) => {
      const next = [...siblings];
      next.splice(insertIndex, 0, removed.removed as MenuItem);
      return next;
    });
    setDraftMenus(normalizeSort(withSibling));
  };

  return (
    <Flex vertical gap={token.marginLG} style={{ flex: 1, minHeight: 0 }}>
      <Card title="Menus Editor" loading={isLoading}>
        <Flex gap={token.marginSM} wrap style={{ marginBottom: token.margin }}>
          <Button
            icon={<FolderPlus size={token.fontSize} />}
            onClick={() => {
              const next = normalizeSort([...menus, createDefaultGroup()]);
              setDraftMenus(next);
            }}
          >
            Add Group
          </Button>
          <Button
            icon={<Plus size={token.fontSize} />}
            disabled={!selectedContext}
            onClick={() => {
              if (!selectedContext) return;
              const next = replaceSiblingList(menus, selectedContext.parentId, (siblings) => {
                const copy = [...siblings];
                copy.splice(selectedContext.index + 1, 0, createDefaultItem("New Item"));
                return copy;
              });
              setDraftMenus(normalizeSort(next));
            }}
          >
            Add Sibling Item
          </Button>
          <Button
            icon={<Plus size={token.fontSize} />}
            disabled={!selectedNode}
            onClick={() => {
              if (!selectedNode) return;
              const next = insertChild(menus, selectedNode.id, createDefaultItem("New Child Item"));
              setDraftMenus(normalizeSort(next));
            }}
          >
            Add Child Item
          </Button>
          <Button
            danger
            icon={<Trash2 size={token.fontSize} />}
            disabled={!selectedNode}
            onClick={() => {
              if (!selectedNode) return;
              const removed = removeNode(menus, selectedNode.id);
              setDraftMenus(normalizeSort(removed.next));
              setSelectedId(null);
              form.resetFields();
            }}
          >
            Delete
          </Button>
        </Flex>

        <Divider style={{ marginBlock: token.marginSM }} />

        <Flex gap={token.marginLG} align="stretch" style={{ minHeight: 420 }}>
          <Card
            style={{ flex: "0 0 360px", overflow: "auto" }}
            styles={{ body: { padding: token.paddingSM } }}
          >
            <Tree
              draggable
              allowDrop={canDrop}
              selectedKeys={selectedId ? [selectedId] : []}
              treeData={treeData}
              onDrop={handleDrop}
              onSelect={(keys) => {
                const nextId = String(keys[0] ?? "");
                setSelectedId(nextId || null);
                bindForm(nextId ? findNode(menus, nextId) : null);
              }}
            />
          </Card>

          <Card style={{ flex: 1 }}>
            {selectedNode ? (
              <Form
                form={form}
                layout="vertical"
                onValuesChange={(_, values) => {
                  if (!selectedId) return;
                  const next = updateNode(menus, selectedId, {
                    name: values.name,
                    path: selectedNode.kind === "item" ? (values.path || "/") : null,
                    icon: values.icon || null,
                    sort: values.sort ?? 0,
                    hidden: !!values.hidden,
                    permissions: csvToPermissions(values.permissionsCsv || ""),
                  });
                  setDraftMenus(normalizeSort(next));
                }}
              >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Path" name="path" extra="Group nodes should keep path empty">
                  <Input disabled={selectedNode.kind === "group"} />
                </Form.Item>
                <Form.Item label="Icon" name="icon">
                  <Input placeholder="IconLucideSettings" />
                </Form.Item>
                <Form.Item label="Sort" name="sort">
                  <InputNumber style={{ width: 180 }} />
                </Form.Item>
                <Form.Item label="Permissions (comma separated)" name="permissionsCsv">
                  <Input placeholder="admin:view,user:view" />
                </Form.Item>
                <Form.Item label="Hidden" name="hidden" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Form>
            ) : (
              <Text type="secondary">Select one menu node to edit, or use the actions above to create nodes.</Text>
            )}
          </Card>
        </Flex>

        <Flex justify="flex-end" style={{ marginTop: token.margin }}>
          <Button
            type="primary"
            loading={saveMutation.isPending}
            onClick={() => {
              void saveMutation.mutate(cloneMenus(menus));
            }}
          >
            Save Menus
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
