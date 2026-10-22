import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { Form, Input, Button, Card, App, theme, Typography, Flex, Checkbox } from "antd";
import type { CSSProperties } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLingui } from "@lingui/react/macro";
import { useAuthStore } from "@/stores/auth";
import { useSettingsStore } from "@/stores/settings";
import { hydrateSession, login } from "@/api/auth";
import { LoginRequestSchema } from "@/api/schemas";
import type { LoginRequest } from "@/api/schemas";
import { APP_BRAND_NAME, APP_FAVICON_SRC } from "@/utils/constants";
import { AppFooter } from "@/components/Layout/AppFooter";
import { Aurora } from "@/components/Aurora";
import "./index.css";

export const Route = createFileRoute("/login/")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { t } = useLingui();
  const setTokens = useAuthStore((s) => s.setTokens);
  const darkMode = useSettingsStore((s) => s.darkMode);
  const { token } = theme.useToken();

  const loginMutation = useMutation({
    mutationFn: async (values: LoginRequest) => {
      const tokens = await login(values);
      setTokens(tokens);
      await hydrateSession();
    },
    onSuccess: () => {
      message.success(t`Login successful`);
      void navigate({ to: "/dashboard" });
    },
    onError: (err) => {
      message.error(err instanceof Error ? err.message : t`Login failed`);
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

  const glassMix = darkMode ? "52%" : "42%";
  const backdrop = darkMode ? "blur(22px) saturate(1.2)" : "blur(18px) saturate(1.35)";

  const cardStyle: CSSProperties = {
    width: "100%",
    maxWidth: 384,
    background: `color-mix(in srgb, ${token.colorBgContainer} ${glassMix}, transparent)`,
    backdropFilter: backdrop,
    WebkitBackdropFilter: backdrop,
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
                loginMutation.mutate(LoginRequestSchema.parse(values));
              }}
              initialValues={{ username: "admin", password: "admin", remember: true }}
              requiredMark={false}
            >
              <Form.Item
                name="username"
                label={<span>{t`Username`}</span>}
                rules={[{ required: true, message: t`Please enter username` }]}
              >
                <Input
                  id="login-username"
                  aria-label={t`Username`}
                  placeholder="admin"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={<span>{t`Password`}</span>}
                rules={[{ required: true, message: t`Please enter password` }]}
                style={{ marginBottom: token.marginLG }}
              >
                <Input.Password
                  id="login-password"
                  aria-label={t`Password`}
                  placeholder="admin"
                  size="large"
                />
              </Form.Item>

              <Flex
                justify="space-between"
                align="center"
                style={{ marginBottom: token.marginLG }}
                wrap="wrap"
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>{t`Auto login`}</Checkbox>
                </Form.Item>
                <Typography.Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{ fontSize: token.fontSizeSM }}
                >
                  {t`Forgot password?`}
                </Typography.Link>
              </Flex>

              <Form.Item style={{ marginBottom: 0, marginTop: token.marginLG }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loginMutation.isPending}
                  block
                  size="large"
                >
                  {t`Sign In`}
                </Button>
              </Form.Item>
            </Form>
            <Flex justify="center" style={{ marginTop: token.margin }}>
              <Typography.Text type="secondary">
                {t`Don't have an account?`}{" "}
                <Link to="/register" style={{ color: token.colorPrimary }}>
                  {t`Sign up`}
                </Link>
              </Typography.Text>
            </Flex>
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
