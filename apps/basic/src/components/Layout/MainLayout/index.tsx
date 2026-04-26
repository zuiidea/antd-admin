import { Layout, theme, Flex } from "antd";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";
import { GlobalAIChat } from "@/components/AIChat/GlobalAIChat";

const { Content } = Layout;

export function MainLayout() {
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Flex
        vertical
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: "100vh",
        }}
      >
        <Header />
        <Content
          className="main-layout-main"
          style={{
            flex: 1,
            padding: token.paddingLG,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Flex>
      <GlobalAIChat />
    </Layout>
  );
}
