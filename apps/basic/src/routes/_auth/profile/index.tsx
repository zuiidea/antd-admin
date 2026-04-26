import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import {
  App, Button, Card, Col, Divider, Flex, Form, Input, Row, Typography,
  theme, Descriptions, Tag, Avatar, Tabs, Space, Upload
} from "antd";
import {
  Mail, Phone, Building, Shield, Clock, Upload as UploadIcon,
  Save, Key
} from "lucide-react";
import { useState } from "react";
import { httpClient } from "@/utils/http";
import { PROFILE_ENDPOINTS } from "@/api/profile";
import { useAuthStore } from "@/stores/auth";
import { UpdateProfileSchema, ChangePasswordSchema } from "@/api/schemas-ext";
import type { UpdateProfile, ChangePassword } from "@/api/schemas-ext";
import { UserSchema } from "@/api/schemas";

export const Route = createFileRoute("/_auth/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editing, setEditing] = useState(false);

  const profileMutation = useMutation({
    mutationFn: (values: UpdateProfile) =>
      httpClient.put(PROFILE_ENDPOINTS.update, UpdateProfileSchema.parse(values)),
    onSuccess: (data) => {
      const validated = UserSchema.parse(data);
      setUser(validated);
      setEditing(false);
      message.success("Profile updated");
    },
    onError: (err) => {
      message.error(err instanceof Error ? err.message : "Update failed");
    },
  });

  const passwordMutation = useMutation({
    mutationFn: (values: ChangePassword) =>
      httpClient.put(
        PROFILE_ENDPOINTS.changePassword,
        ChangePasswordSchema.parse(values),
      ),
    onSuccess: () => {
      message.success("Password changed");
      passwordForm.resetFields();
    },
    onError: (err) => {
      message.error(err instanceof Error ? err.message : "Change password failed");
    },
  });

  const avatarMutation = useMutation({
    mutationFn: async (file: File) => {
      // Simulated upload
      await new Promise((r) => setTimeout(r, 1000));
      return { url: URL.createObjectURL(file) };
    },
    onSuccess: (data) => {
      // Optimistically update avatar
      if (user) {
        setUser({ ...user, avatar: data.url });
      }
      message.success("Avatar updated");
    },
  });

  if (!user) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 200 }}>
        <Typography.Text type="secondary">Loading profile...</Typography.Text>
      </Flex>
    );
  }

  const tabItems = [
    {
      key: "info",
      label: "Profile",
      children: (
        <Flex vertical gap={token.marginMD}>
          <Flex align="center" gap={token.marginLG} wrap="wrap">
            <Upload
              showUploadList={false}
              accept="image/*"
              customRequest={({ file }) => {
                avatarMutation.mutate(file as File);
              }}
            >
              <div style={{ position: "relative", cursor: "pointer" }}>
                <Avatar
                  size={80}
                  src={user.avatar}
                  shape="circle"
                  style={{
                    border: `2px solid ${token.colorBorderSecondary}`,
                  }}
                >
                  {user.username?.[0]?.toUpperCase()}
                </Avatar>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    background: token.colorPrimary,
                    borderRadius: "50%",
                    padding: 4,
                    display: "flex",
                  }}
                >
                  <UploadIcon size={12} style={{ color: "#fff" }} />
                </div>
              </div>
            </Upload>
            <Flex vertical gap={4}>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {user.realName || user.username}
              </Typography.Title>
              <Typography.Text type="secondary">
                @{user.username}
              </Typography.Text>
              <Space size={4}>
                {user.roles.map((r) => (
                  <Tag key={r} color="blue" style={{ textTransform: "capitalize" }}>
                    {r}
                  </Tag>
                ))}
              </Space>
            </Flex>
          </Flex>

          <Divider style={{ margin: 0 }} />

          {!editing ? (
            <>
              <Descriptions size="small" column={{ xs: 1, sm: 2 }} bordered>
                <Descriptions.Item label={<><Mail size={12} /> Email</>}>
                  {user.email || "—"}
                </Descriptions.Item>
                <Descriptions.Item label={<><Phone size={12} /> Mobile</>}>
                  {user.mobile || "—"}
                </Descriptions.Item>
                <Descriptions.Item label={<><Building size={12} /> Department</>}>
                  {user.department || "—"}
                </Descriptions.Item>
                <Descriptions.Item label={<><Shield size={12} /> Role</>}>
                  {user.role || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Nickname">
                  {user.nickName || "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Remark">
                  {user.remark || "—"}
                </Descriptions.Item>
                <Descriptions.Item label={<><Clock size={12} /> Last Login</>}>
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "—"}
                </Descriptions.Item>
                <Descriptions.Item label="Created By">
                  {user.createdBy || "—"}
                </Descriptions.Item>
              </Descriptions>
              <Button
                type="primary"
                onClick={() => {
                  profileForm.setFieldsValue({
                    email: user.email,
                    mobile: user.mobile,
                    department: user.department,
                    nickName: user.nickName,
                    realName: user.realName,
                    remark: user.remark,
                  });
                  setEditing(true);
                }}
                style={{ width: "fit-content" }}
              >
                Edit Profile
              </Button>
            </>
          ) : (
            <Form
              form={profileForm}
              layout="vertical"
              onFinish={(values) => profileMutation.mutate(values)}
              style={{ maxWidth: 480 }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="realName" label="Real Name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="nickName" label="Nickname">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="mobile" label="Mobile">
                <Input />
              </Form.Item>
              <Form.Item name="department" label="Department">
                <Input />
              </Form.Item>
              <Form.Item name="remark" label="Remark">
                <Input.TextArea rows={2} />
              </Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={profileMutation.isPending}
                  icon={<Save size={token.fontSize} />}
                >
                  Save
                </Button>
                <Button onClick={() => {
                  setEditing(false);
                  profileForm.resetFields();
                }}>
                  Cancel
                </Button>
              </Space>
            </Form>
          )}
        </Flex>
      ),
    },
    {
      key: "password",
      label: "Change Password",
      children: (
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={(values) => passwordMutation.mutate(values)}
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name="oldPassword"
            label="Current Password"
            rules={[{ required: true, message: "Please enter current password" }]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
          >
            <Input.Password placeholder="At least 6 characters" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ required: true, message: "Please confirm new password" }]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={passwordMutation.isPending}
            icon={<Key size={token.fontSize} />}
          >
            Change Password
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <Flex vertical gap={token.marginMD} style={{ flex: 1, minHeight: 0 }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        Profile
      </Typography.Title>
      <Card>
        <Tabs items={tabItems} />
      </Card>
    </Flex>
  );
}
