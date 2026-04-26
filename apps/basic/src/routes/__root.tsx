import { useEffect, useLayoutEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ConfigProvider, App } from "antd";
import enUS from "antd/locale/en_US";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSettingsStore } from "@/stores/settings";
import { useAppTheme } from "@/hooks/useAppTheme";
import { NotFound } from "@/components/NotFound";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "@/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

function RootComponent() {
  const darkMode = useSettingsStore((s) => s.darkMode);
  const configProviderProps = useAppTheme();

  useLayoutEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider {...configProviderProps} locale={enUS}>
        <App>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </App>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
