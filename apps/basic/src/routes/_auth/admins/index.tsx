import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Avatar, Button, Card, Dropdown, Flex, Form, Space, Tag, App, theme } from "antd";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod/v4";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { useResourceCRUD } from "@/hooks/useResourceCRUD";
import { ADMIN_ENDPOINTS } from "@/api/admin";
import type { Admin, CreateAdminRequest, UpdateAdminRequest } from "@/api/admin";
import {
  CreateAdminRequestSchema,
  PaginatedResponseSchema,
  UpdateAdminRequestSchema,
  UserSchema,
} from "@/api/schemas";
import { httpClient } from "@/utils/http";
import { useAuthStore } from "@/stores/auth";
import { FormModal, type AdminFormValues } from "./-FormModal";
import { Toolbar } from "./-Toolbar";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}

const AdminSearchParamsSchema = z.object({
  limit: z.number().int().positive().catch(20),
  offset: z.number().int().nonnegative().catch(0),
  sortField: z.string().nullable().catch(null),
  sortOrder: z.enum(["ascend", "descend"]).nullable().catch(null),
  keyword: z.string().catch(""),
  role: z.string().catch("")
});

export const Route = createFileRoute("/_auth/admins/")({
  validateSearch: (search) => AdminSearchParamsSchema.parse(search),
  component: AdminsPage,
});

const paginatedAdminSchema = PaginatedResponseSchema(UserSchema);

function AdminsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { message, modal } = App.useApp();
  const { token } = theme.useToken();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [form] = Form.useForm<AdminFormValues>();
  const hasPermission = useAuthStore((s) => s.hasPermission);
  const canCreate = hasPermission("admin:create");
  const canEdit = hasPermission("admin:edit");
  const canDelete = hasPermission("admin:delete");
  const [keywordInput, setKeywordInput] = useState(search.keyword);
  const currentPage = Math.floor(search.offset / search.limit) + 1;

  useEffect(() => {
    setKeywordInput(search.keyword);
  }, [search.keyword]);

  const { data, isLoading, createMutation, updateMutation, deleteMutation } = useResourceCRUD<
    { list: Admin[]; total: number },
    CreateAdminRequest,
    UpdateAdminRequest & { id: string }
  >({
    queryKey: [
      "admins",
      search.limit,
      search.offset,
      search.keyword,
      search.role,
      search.sortField,
      search.sortOrder,
    ],
    invalidateKey: ["admins"],
    queryFn: () =>
      httpClient.get(ADMIN_ENDPOINTS.list, {
        params: {
          limit: search.limit,
          offset: search.offset,
          keyword: search.keyword || undefined,
          role: search.role || undefined,
        },
      }),
    select: (raw) => paginatedAdminSchema.shape.data.parse(raw),
    createFn: (values) => httpClient.post(ADMIN_ENDPOINTS.create, CreateAdminRequestSchema.parse(values)),
    updateFn: ({ id, ...values }) =>
      httpClient.put(ADMIN_ENDPOINTS.update(id), UpdateAdminRequestSchema.parse(values)),
    deleteFn: (id) => httpClient.delete(ADMIN_ENDPOINTS.delete(id)),
    createLifecycle: {
      onSuccess: () => {
        message.success("Admin created");
        setModalOpen(false);
        form.resetFields();
      },
      onError: (_values, error) => message.error(getErrorMessage(error, "Create admin failed")),
    },
    updateLifecycle: {
      onSuccess: () => {
        message.success("Admin updated");
        setModalOpen(false);
        setEditingAdmin(null);
        form.resetFields();
      },
      onError: (_values, error) => message.error(getErrorMessage(error, "Update admin failed")),
    },
    deleteLifecycle: {
      onSuccess: () => message.success("Admin deleted"),
      onError: (_id, error) => message.error(getErrorMessage(error, "Delete admin failed")),
    },
  });

  const confirmDelete = (record: Admin) => {
    modal.confirm({
      title: "Delete admin?",
      content: `This will remove ${record.username}.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => deleteMutation.mutate(record.id),
    });
  };

  const columns = useMemo(
    () => [
      {
        title: "Admin",
        dataIndex: "username",
        key: "username",
        width: 320,
        render: (_: unknown, record: Admin) => (
          <Flex align="center" gap={token.marginSM} style={{ minWidth: 0 }}>
            <Avatar size={28} src={record.avatar ?? undefined}>
              {record.username?.[0]?.toUpperCase()}
            </Avatar>
            <Flex vertical style={{ minWidth: 0 }}>
              <Link
                to="/admins/$id"
                params={{ id: record.id }}
                style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {record.username}
              </Link>
              <span style={{ color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>
                {record.realName || record.email || "No profile info"}
              </span>
            </Flex>
          </Flex>
        ),
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: 240,
        render: (_: unknown, record: Admin) => (
          <Space wrap>
            {(record.roles ?? []).map((role) => (
              <Tag key={role}>{role}</Tag>
            ))}
          </Space>
        ),
      },
      {
        title: "Permissions",
        dataIndex: "permissions",
        key: "permissions",
        width: 720,
        render: (_: unknown, record: Admin) => {
          const permissions = record.permissions ?? [];
          const isAdmin = (record.roles ?? []).includes("admin");
          if (isAdmin || permissions.includes("*")) {
            return <Tag color="gold">*</Tag>;
          }
          return (
            <Space size={[4, 4]} wrap>
              {permissions.length ? permissions.map((point) => <Tag key={point}>{point}</Tag>) : <Tag>none</Tag>}
            </Space>
          );
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 150,
        render: (status: number | undefined) => (
          <Tag color={status === 1 ? "success" : "default"}>{status === 1 ? "Enabled" : "Disabled"}</Tag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        width: 120,
        align: "right" as const,
        render: (_: unknown, record: Admin) => {
          const items = [
            canEdit
              ? {
                  key: "edit",
                  icon: <Pencil size={token.fontSize} />,
                  label: "Edit",
                  onClick: () => {
                    setEditingAdmin(record);
                    form.setFieldsValue({
                      ...record,
                      password: "",
                      status: record.status === 1,
                    } as AdminFormValues);
                    setModalOpen(true);
                  },
                }
              : null,
            canDelete
              ? {
                  key: "delete",
                  icon: <Trash2 size={token.fontSize} />,
                  label: "Delete",
                  danger: true,
                  onClick: () => confirmDelete(record),
                }
              : null,
          ].filter((item): item is NonNullable<typeof item> => item != null);

          if (!items.length) {
            return <span style={{ color: token.colorTextSecondary }}>—</span>;
          }

          return (
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button type="text" icon={<MoreVertical size={token.fontSize} />} />
            </Dropdown>
          );
        },
      },
    ],
    [
      canDelete,
      canEdit,
      form,
      modal,
      token.colorTextSecondary,
      token.fontSize,
      token.fontSizeSM,
      token.marginSM,
    ],
  );

  const applySearch = (keyword: string) => {
    void navigate({
      search: {
        ...search,
        keyword: keyword.trim(),
        offset: 0,
      },
    });
  };

  const handleSubmit = (values: AdminFormValues) => {
    if (editingAdmin && !canEdit) {
      message.error("No permission to edit admins");
      return;
    }
    if (!editingAdmin && !canCreate) {
      message.error("No permission to create admins");
      return;
    }

    const payload = {
      ...values,
      email: values.email || null,
      realName: values.realName || null,
      nickName: values.nickName || null,
      mobile: values.mobile || null,
      department: values.department || null,
      role: values.role || null,
      remark: values.remark || null,
      status: values.status ? 1 : 0,
      roles: values.roles?.length ? values.roles : ["editor"],
      permissions: values.permissions ?? [],
    };

    if (editingAdmin) {
      const updatePayload = {
        ...payload,
        password: payload.password?.trim() ? payload.password : undefined,
      };
      updateMutation.mutate({ id: editingAdmin.id, ...updatePayload });
      return;
    }
    createMutation.mutate(payload as CreateAdminRequest);
  };

  const pagination: TablePaginationConfig = {
    current: currentPage,
    pageSize: search.limit,
    total: data?.total ?? 0,
    showSizeChanger: true,
    onChange: (page, pageSize) => {
      void navigate({
        search: {
          ...search,
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
      });
    },
  };

  return (
    <Card style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <Flex vertical gap={token.margin} style={{ flex: 1, minHeight: 0 }}>
        <Toolbar
          keywordInput={keywordInput}
          onKeywordChange={setKeywordInput}
          onSearch={applySearch}
          onClearSearch={() => applySearch("")}
          roleValue={search.role || undefined}
          onRoleChange={(role) => {
            void navigate({
              search: {
                ...search,
                role,
                offset: 0,
              },
            });
          }}
          canCreate={canCreate}
          onCreateClick={() => {
            if (!canCreate) return;
            setEditingAdmin(null);
            form.resetFields();
            form.setFieldsValue({ roles: ["admin"], permissions: ["admin:view"], status: true });
            setModalOpen(true);
          }}
        />

        <DataTable<Admin>
          dataSource={data?.list ?? []}
          columns={columns}
          rowKey="id"
          pagination={pagination}
          loading={isLoading}
          size="small"
          scroll={{ x: "max-content" }}
        />
      </Flex>

      <FormModal
        open={modalOpen}
        editingAdmin={editingAdmin}
        form={form}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        onCancel={() => {
          setModalOpen(false);
          setEditingAdmin(null);
          form.resetFields();
        }}
        onFinish={handleSubmit}
      />
    </Card>
  );
}
