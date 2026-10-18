import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth";
import { MainLayout } from "@/components/Layout/MainLayout";
import { canAccessPath, normalizeAppPath } from "@/utils/appMenu";
import { hydrateSession } from "@/api/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated, user, tokens } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }

    if (tokens && !user) {
      try {
        await hydrateSession();
      } catch {
        useAuthStore.getState().logout();
        throw redirect({ to: "/login" });
      }
    }

    const { user: nextUser } = useAuthStore.getState();
    const path = normalizeAppPath(location.pathname);
    if (path === "/403") return;

    if (!canAccessPath(location.pathname, nextUser?.permissions)) {
      throw redirect({ to: "/403" });
    }
  },
  component: MainLayout,
});
