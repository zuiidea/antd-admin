import { http, HttpResponse, delay } from "msw";
import type { AuditLog } from "@/api/schemas-ext";

const ACTIONS = ["create", "update", "delete", "login", "logout", "export", "import", "approve"];
const RESOURCES = ["user", "role", "menu", "file", "system", "notification", "report"];
const USERS = ["admin", "manager", "alice", "bob", "john_doe", "system"];

function genLogs(): AuditLog[] {
  const logs: AuditLog[] = [];
  for (let i = 0; i < 42; i++) {
    const action = ACTIONS[i % ACTIONS.length];
    const resource = RESOURCES[i % RESOURCES.length];
    logs.push({
      id: `log-${i}`,
      user: USERS[i % USERS.length],
      action,
      resource,
      resourceId: `res-${(i % 20) + 1}`,
      detail: `${action} ${resource} record #${(i % 20) + 1}`,
      ip: `192.168.1.${(i % 254) + 1}`,
      status: i % 7 === 0 ? "failure" : "success",
      createdAt: new Date(Date.now() - (i * 7200000)).toISOString(),
    });
  }
  return logs;
}

const logs = genLogs();

export const logHandlers = [
  http.get("/api/logs", async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);
    const user = url.searchParams.get("user");
    const action = url.searchParams.get("action");
    const status = url.searchParams.get("status");
    const keyword = url.searchParams.get("keyword");

    let list = [...logs];

    if (user) list = list.filter((l) => l.user === user);
    if (action) list = list.filter((l) => l.action === action);
    if (status) list = list.filter((l) => l.status === status);
    if (keyword) {
      const kw = keyword.toLowerCase();
      list = list.filter(
        (l) =>
          l.detail?.toLowerCase().includes(kw) ||
          l.resource.toLowerCase().includes(kw) ||
          l.user.toLowerCase().includes(kw),
      );
    }

    // Return list directly (standard pattern for list APIs)
    return HttpResponse.json(list);
  }),
];
