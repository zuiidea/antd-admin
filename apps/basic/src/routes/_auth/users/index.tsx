import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Avatar, Button, Space, Form, App, Dropdown, theme, Tag, Flex } from "antd";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { useMemo, useRef, useState } from "react";
import { createUser, deleteUser, listUsers, updateUser, userQueryKeys } from "@/api/users";
import type { User, CreateUserRequest } from "@/api/schemas";
import { z } from "zod/v4";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { useResourceCRUD } from "@/hooks/useResourceCRUD";
import { useTableFitHeight } from "@/hooks/useTableFitHeight";
import { useCrudToasts } from "@/hooks/useCrudToasts";
import { useUrlSearchState } from "@/hooks/useUrlSearchState";
import { Toolbar } from "./-Toolbar";
import { FormModal } from "./-FormModal";

const UserSearchParamsSchema = z.object({
  limit: z.number().int().positive().catch(100),
  offset: z.number().int().nonnegative().catch(0),
  sortField: z.string().nullable().catch(null),
  sortOrder: z.enum(["ascend", "descend"]).nullable().catch(null),
  keyword: z.string().catch(""),
  role: z.string().catch(""),
});

type UserSearch = z.infer<typeof UserSearchParamsSchema>;

export const Route = createFileRoute("/_auth/users/")({
  validateSearch: (search) => UserSearchParamsSchema.parse(search),
  component: UsersPage,
});

function UsersPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { message, modal } = App.useApp();
  const { token } = theme.useToken();
  const [modalOpen, setModalOpen] = useState(false);
  const pageShellRef = useRef<HTMLDivElement>(null);
  const toolbarRowRef = useRef<HTMLDivElement>(null);
  const middleSectionRef = useRef<HTMLDivElement>(null);
  const tableFrameRef = useRef<HTMLDivElement>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const currentPage = Math.floor(search.offset / search.limit) + 1;

  const setSearch = (next: UserSearch) => {
    void navigate({ search: next });
  };

  const { keywordInput, setKeywordInput, applyKeyword } = useUrlSearchState({
    search,
    setSearch,
  });

  const crudToasts = useCrudToasts<CreateUserRequest, CreateUserRequest & { id: string }>({
    message,
    resourceKey: "users",
  });

  const listQuery = {
    limit: search.limit,
    offset: search.offset,
    keyword: search.keyword || undefined,
    role: search.role || undefined,
    sortField: search.sortField ?? undefined,
    sortOrder: search.sortOrder ?? undefined,
  };

  const { data, isLoading, createMutation, updateMutation, deleteMutation } = useResourceCRUD<
    { list: User[]; total: number },
    CreateUserRequest,
    CreateUserRequest & { id: string }
  >({
    queryKey: userQueryKeys.list(listQuery),
    queryFn: () => listUsers(listQuery),
    select: (raw) => raw as { list: User[]; total: number },
    createFn: (values) => createUser(values),
    updateFn: ({ id, ...values }) => updateUser({ params: { id }, body: values }),
    deleteFn: (id) => deleteUser({ id }),
    optimistic: { update: true, delete: true },
    createLifecycle: {
      onSuccess: (values) => {
        crudToasts.createLifecycle?.onSuccess?.(values);
        setModalOpen(false);
        form.resetFields();
      },
      onError: crudToasts.createLifecycle?.onError,
    },
    updateLifecycle: {
      onMutate: crudToasts.updateLifecycle?.onMutate,
      onSuccess: (values) => {
        crudToasts.updateLifecycle?.onSuccess?.(values);
        setModalOpen(false);
        setEditingUser(null);
        form.resetFields();
      },
      onError: crudToasts.updateLifecycle?.onError,
    },
    deleteLifecycle: {
      onMutate: crudToasts.deleteLifecycle?.onMutate,
      onSuccess: crudToasts.deleteLifecycle?.onSuccess,
      onError: crudToasts.deleteLifecycle?.onError,
    },
  });

  const confirmDelete = (record: User) => {
    modal.confirm({
      title: "Are you absolutely sure?",
      content: "This action cannot be undone. This will permanently delete the user.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => deleteMutation.mutate(record.id),
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder: search.sortField === "id" ? search.sortOrder : null,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
      sortOrder: search.sortField === "username" ? search.sortOrder : null,
      render: (_: unknown, record: User) => {
        const src = (record.avatar ?? "").trim() || undefined;
        return (
          <Flex align="center" gap={token.marginSM} style={{ minWidth: 0 }}>
            <Avatar size={24} src={src} shape="circle" style={{ flexShrink: 0 }}>
              {record.username?.[0]?.toUpperCase()}
            </Avatar>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {record.username}
            </span>
          </Flex>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortOrder: search.sortField === "email" ? search.sortOrder : null,
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      sorter: true,
      sortOrder: search.sortField === "roles" ? search.sortOrder : null,
      render: (roles: string[]) => (
        <Space wrap>
          {roles.map((role) => (
            <Tag
              key={role}
              variant="outlined"
              styles={{
                root: {
                  borderRadius: 9999,
                  background: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              {role}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 60,
      align: "right" as const,
      sorter: false,
      render: (_: unknown, record: User) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                icon: <Pencil size={token.fontSize} />,
                label: "Edit",
                onClick: () => {
                  setEditingUser(record);
                  form.setFieldsValue(record);
                  setModalOpen(true);
                },
              },
              {
                key: "delete",
                icon: <Trash2 size={token.fontSize} />,
                label: "Delete",
                danger: true,
                onClick: () => confirmDelete(record),
              },
            ],
          }}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreVertical size={token.fontSize} />}
            aria-label="Row actions"
          />
        </Dropdown>
      ),
    },
  ];

  const showPagination = (data?.total ?? 0) > search.limit;

  const { tableAreaMaxHeight, tableScrollY, lockScrollHeight } = useTableFitHeight({
    pageShellRef,
    toolbarRef: toolbarRowRef,
    middleRef: middleSectionRef,
    tableFrameRef,
    marginLG: token.marginLG,
    rowCount: data?.list?.length ?? 0,
    isLoading,
    showPagination,
  });

  const tablePagination: false | TablePaginationConfig = useMemo(
    () =>
      showPagination
        ? {
            total: data?.total ?? 0,
            current: currentPage,
            pageSize: search.limit,
            showSizeChanger: true,
            showTotal: (total) => `${total} rows`,
            onChange: (page, pageSize) => {
              void navigate({
                search: {
                  ...search,
                  limit: pageSize ?? search.limit,
                  offset: (page - 1) * (pageSize ?? search.limit),
                },
              });
            },
          }
        : false,
    [showPagination, data?.total, currentPage, search, navigate],
  );

  return (
    <Flex
      ref={pageShellRef}
      vertical
      gap={token.marginMD}
      style={{ flex: "1 1 0%", minHeight: 0, overflow: "hidden" }}
    >
      <Toolbar
        ref={toolbarRowRef}
        keywordInput={keywordInput}
        onKeywordChange={setKeywordInput}
        onSearch={applyKeyword}
        onClearSearch={() => {
          setKeywordInput("");
          setSearch({ ...search, keyword: "", offset: 0 });
        }}
        roleValue={search.role || undefined}
        onRoleChange={(role) =>
          void navigate({
            search: {
              ...search,
              role,
              offset: 0,
            },
          })
        }
        onCreateClick={() => {
          setEditingUser(null);
          form.resetFields();
          setModalOpen(true);
        }}
      />

      <DataTable<User>
        layoutRef={middleSectionRef}
        frameRef={tableFrameRef}
        lockScrollHeight={lockScrollHeight}
        maxHeight={tableAreaMaxHeight}
        frameHeight={
          tableScrollY != null && tableAreaMaxHeight != null ? tableAreaMaxHeight : undefined
        }
        rowKey="id"
        size="small"
        columns={columns}
        dataSource={data?.list ?? []}
        loading={isLoading}
        pagination={tablePagination}
        style={{ flex: 1, minHeight: 0 }}
        scroll={tableScrollY != null ? { x: "max-content", y: tableScrollY } : { x: "max-content" }}
        onChange={(_pagination, _filters, sorter) => {
          if (Array.isArray(sorter)) return;
          const nextSortField = sorter.order ? String(sorter.field) : "username";
          const nextSortOrder = sorter.order ? sorter.order : "descend";
          void navigate({
            search: {
              ...search,
              sortField: nextSortField,
              sortOrder: nextSortOrder,
            },
          });
        }}
      />

      <FormModal
        open={modalOpen}
        editingUser={editingUser}
        form={form}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        onCancel={() => {
          setModalOpen(false);
          setEditingUser(null);
          form.resetFields();
        }}
        onFinish={(values) => {
          if (editingUser) {
            updateMutation.mutate({ ...values, id: editingUser.id });
          } else {
            createMutation.mutate(values);
          }
        }}
      />
    </Flex>
  );
}
