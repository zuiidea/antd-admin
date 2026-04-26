import { http, HttpResponse, delay } from "msw";
import type { Notification } from "@/api/schemas-ext";

let notifications: Notification[] = [
  {
    id: "n1",
    title: "System update available",
    content: "Version 6.1.0 is now available with performance improvements and bug fixes.",
    type: "system",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    createdBy: "System",
  },
  {
    id: "n2",
    title: "New user registered",
    content: "User 'john_doe' has created an account and is pending approval.",
    type: "mention",
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    createdBy: "admin",
  },
  {
    id: "n3",
    title: "Task assigned: Review PR #42",
    content: "You have been assigned to review 'feat: add export functionality'.",
    type: "task",
    read: false,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    createdBy: "manager",
  },
  {
    id: "n4",
    title: "Backup completed",
    content: "Daily database backup completed successfully. Size: 2.3 GB.",
    type: "system",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    createdBy: "System",
  },
  {
    id: "n5",
    title: "Security alert: Multiple failed logins",
    content: "Detected 15 failed login attempts from IP 192.168.1.100 in the last 5 minutes.",
    type: "alert",
    read: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    createdBy: "System",
  },
  {
    id: "n6",
    title: "Comment on 'Dashboard Redesign'",
    content: "Alice commented: 'The new layout looks great! Let's discuss the chart placement.'",
    type: "mention",
    read: false,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    createdBy: "alice",
  },
  {
    id: "n7",
    title: "Monthly report ready",
    content: "The April 2026 analytics report has been generated and is ready for review.",
    type: "system",
    read: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    createdBy: "System",
  },
  {
    id: "n8",
    title: "Deployment to production",
    content: "Release v6.0.0 has been deployed to production environment at 14:30 UTC.",
    type: "system",
    read: true,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    createdBy: "admin",
  },
];

export const notificationHandlers = [
  http.get("/api/notifications", async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const unreadOnly = url.searchParams.get("unreadOnly") === "true";

    let list = notifications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    if (type) {
      list = list.filter((n) => n.type === type);
    }
    if (unreadOnly) {
      list = list.filter((n) => !n.read);
    }

    return HttpResponse.json({
      code: 0,
      data: list,
      message: "OK",
    });
  }),

  http.put("/api/notifications/:id/read", async ({ params }) => {
    await delay(200);
    const n = notifications.find((n) => n.id === params.id);
    if (n) n.read = true;
    return HttpResponse.json({ code: 0, data: null, message: "OK" });
  }),

  http.put("/api/notifications/read-all", async () => {
    await delay(300);
    notifications.forEach((n) => (n.read = true));
    return HttpResponse.json({ code: 0, data: null, message: "OK" });
  }),

  http.delete("/api/notifications/:id", async ({ params }) => {
    await delay(200);
    notifications = notifications.filter((n) => n.id !== params.id);
    return HttpResponse.json({ code: 0, data: null, message: "OK" });
  }),
];
