import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./stores/auth";
import { fetchSessionAndApplyToStore } from "./utils/session";
import { installGlobalErrorHandlers } from "./utils/errorReporter";

// 全局兜底异常捕获（window.onerror / unhandledrejection）
installGlobalErrorHandlers();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}


async function enableMocking() {
  const enableMockInBuild = import.meta.env.VITE_ENABLE_MOCK === "true";
  if (!import.meta.env.DEV && !enableMockInBuild) return;
  const { worker } = await import("./mocks/browser");
  worker.start({
    onUnhandledRequest(_, print) {
      if (import.meta.env.DEV) {
        // 开发环境下 warn
        print.warning();
      } else {
        // 生产/构建 mock 环境下 error
        print.error();
      }
    },
  });
}

enableMocking()
  .then(async () => {
    await useAuthStore.persist.rehydrate();
    const { isAuthenticated, tokens } = useAuthStore.getState();
    if (isAuthenticated && tokens) {
      try {
        await fetchSessionAndApplyToStore();
      } catch {
        useAuthStore.getState().logout();
      }
    }

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    );
  })
  .catch((err) => {
    console.error("Failed to initialize app:", err);
  });
