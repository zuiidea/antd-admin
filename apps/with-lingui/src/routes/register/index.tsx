import { Link, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Form, Input, Button, Card, App, theme, Typography, Flex } from "antd";
import type { CSSProperties } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLingui } from "@lingui/react/macro";
import { useAuthStore } from "@/stores/auth";
import { hydrateSession, register } from "@/api/auth";
import { RegisterRequestSchema } from "@/api/schemas";
import type { RegisterRequest } from "@/api/auth";
import { APP_BRAND_NAME, APP_FAVICON_SRC } from "@/utils/constants";
import { Aurora } from "@/components/Aurora";
import { AppFooter } from "@/components/Layout/AppFooter";
import "../login/index.css";

export const Route = createFileRoute("/register/")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { t } = useLingui();
  const setTokens = useAuthStore((s) => s.setTokens);
  const { token } = theme.useToken();

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterRequest) => {
      const tokens = await register(values);
      setTokens(tokens);
      await hydrateSession();
    },
    onSuccess: () => {
      message.success(t`Account created successfully`);
      void navigate({ to: "/dashboard" });
    },
    onError: (err) => {
      message.error(err instanceof Error ? err.message : t`Registration failed`);
    },
  });

  const shellStyle: CSSProperties = {
    position: "relative",
    isolation: "isolate",
    minHeight: "100vh",
    backgroundColor: token.colorBgLayout,
    color: token.colorText,
  };

  const contentStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    flex: "1 1 0%",
    minWidth: 0,
    minHeight: 0,
    overflow: "hidden",
  };

  const cardStyle: CSSProperties = {
    width: "100%",
    maxWidth: 384,
    background: `color-mix(in srgb, ${token.colorBgContainer} 44%, transparent)`,
    backdropFilter: "blur(18px) saturate(1.35)",
    WebkitBackdropFilter: "blur(18px) saturate(1.35)",
    borderColor: token.colorBorderSecondary,
    boxShadow: token.boxShadow,
    ["--login-card-fallback-bg" as string]: token.colorBgElevated,
  };

  return (
    <Flex vertical style={shellStyle}>
      <Aurora />
      <Flex vertical style={contentStyle}>
        <Flex
          flex={1}
          align="center"
          justify="center"
          style={{ padding: token.padding, minHeight: 0 }}
        >
          <Card
            className="login-page__card"
            style={cardStyle}
            styles={{
              body: { padding: token.paddingLG, background: "transparent" },
            }}
          >
            <Flex
              align="center"
              justify="center"
              gap={token.margin}
              wrap="wrap"
              style={{ marginBottom: token.marginLG }}
            >
              <img
                src={APP_FAVICON_SRC}
                alt=""
                width={32}
                height={32}
                draggable={false}
                style={{ display: "block", flexShrink: 0 }}
              />
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                }}
              >
                {APP_BRAND_NAME}
              </Typography.Title>
            </Flex>

            <Form
              layout="vertical"
              onFinish={(values) => {
                const payload = RegisterRequestSchema.parse(values);
                registerMutation.mutate(payload);
              }}
              initialValues={{ username: "", password: "", confirmPassword: "", email: "" }}
              validateTrigger={"onBlur"}
              requiredMark={false}
            >
              <Form.Item
                name="username"
                label={<span>{t`Username`}</span>}
                rules={[{ required: true, message: t`Please enter your username` }]}
              >
                <Input placeholder="new-user" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label={<span>{t`Email address`}</span>}
                rules={[{ type: "email", message: t`Please enter a valid email address` }]}
              >
                <Input placeholder="you@example.com" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span>{t`Password`}</span>}
                rules={[
                  { required: true, message: t`Please enter your password` },
                  { min: 6, message: t`Password must be at least 6 characters long` },
                ]}
              >
                <Input.Password placeholder={t`Enter at least 6 characters`} size="large" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={<span>{t`Confirm password`}</span>}
                dependencies={["password"]}
                rules={[
                  { required: true, message: t`Please confirm your password` },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t`Passwords do not match`));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t`Re-enter your password`} size="large" />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0, marginTop: token.marginLG }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={registerMutation.isPending}
                  block
                  size="large"
                >
                  {t`Create account`}
                </Button>
              </Form.Item>

              <Flex justify="center" style={{ marginTop: token.margin }}>
                <Typography.Text type="secondary">
                  {t`Already have an account?`}{" "}
                  <Link to="/login" style={{ color: token.colorPrimary }}>
                    {t`Sign in`}
                  </Link>
                </Typography.Text>
              </Flex>
            </Form>
          </Card>
        </Flex>
        <Flex
          vertical
          align="center"
          style={{
            padding: `${token.paddingSM}px ${token.padding}px`,
            textAlign: "center",
          }}
        >
          <AppFooter />
        </Flex>
      </Flex>
    </Flex>
  );
}
