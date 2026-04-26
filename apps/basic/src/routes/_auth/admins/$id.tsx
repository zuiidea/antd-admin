import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { App, Avatar, Button, Card, Col, Descriptions, Flex, Row, Space, Spin, Tag, theme } from "antd";
import { httpClient } from "@/utils/http";
import { ADMIN_ENDPOINTS } from "@/api/admin";
import { UserSchema } from "@/api/schemas";

export const Route = createFileRoute("/_auth/admins/$id")({
  component: AdminDetailPage,
});

function AdminDetailPage() {
  const { id } = Route.useParams();
  const { message } = App.useApp();
  const { token } = theme.useToken();

  const adminQuery = useQuery({
    queryKey: ["admin-detail", id],
    queryFn: async () => {
      const raw = await httpClient.get(ADMIN_ENDPOINTS.detail(id));
      return UserSchema.parse(raw);
    },
  });

  if (adminQuery.isLoading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: 240 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (adminQuery.isError || !adminQuery.data) {
    return <Card>Admin not found.</Card>;
  }

  const admin = adminQuery.data;

  return (
    <Card>
      <Row gutter={[24, 24]} align="middle" style={{ marginBottom: token.marginLG }}>
        <Col>
          <Avatar src={admin.avatar ?? undefined} size={96}>
            {admin.username?.[0]?.toUpperCase()}
          </Avatar>
        </Col>
        <Col flex="auto">
          <Flex vertical gap={token.marginXS}>
            <div>
              <strong>Username:</strong> {admin.username}
            </div>
            <div>
              <strong>Real Name:</strong> {admin.realName || "-"}
            </div>
            <div>
              <strong>Nick Name:</strong> {admin.nickName || "-"}
            </div>
            <Space wrap>
              <Tag color={admin.status === 1 ? "success" : "default"}>
                {admin.status === 1 ? "Enabled" : "Disabled"}
              </Tag>
              <Tag>{admin.role || "No title"}</Tag>
              {admin.department ? <Tag color="processing">{admin.department}</Tag> : null}
            </Space>
            <Space style={{ marginTop: token.marginSM }}>
              <Button type="primary" onClick={() => message.info("Password reset simulated")}>Reset Password</Button>
              <Button
                onClick={() => message.info(`${admin.status === 1 ? "Disable" : "Enable"} action simulated`)}
              >
                {admin.status === 1 ? "Disable Account" : "Enable Account"}
              </Button>
            </Space>
          </Flex>
        </Col>
        <Col style={{ width: 260 }}>
          <div>
            <strong>Last Login:</strong>
          </div>
          <div style={{ color: token.colorTextSecondary }}>{admin.lastLogin || "-"}</div>
          <div style={{ marginTop: token.marginSM }}>
            <strong>Created By:</strong> {admin.createdBy || "-"}
          </div>
        </Col>
      </Row>

      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{admin.id}</Descriptions.Item>
        <Descriptions.Item label="Email">{admin.email || "-"}</Descriptions.Item>
        <Descriptions.Item label="Mobile">{admin.mobile || "-"}</Descriptions.Item>
        <Descriptions.Item label="Remark">{admin.remark || "-"}</Descriptions.Item>
      </Descriptions>

      <Card type="inner" title="Permission List" style={{ marginTop: token.marginLG }}>
        {admin.permissions.length ? (
          <Space size={[8, 8]} wrap>
            {admin.permissions.map((permission) => (
              <Tag key={permission} color="blue">
                {permission}
              </Tag>
            ))}
          </Space>
        ) : (
          <div style={{ color: token.colorTextSecondary }}>No permissions</div>
        )}
      </Card>
    </Card>
  );
}
