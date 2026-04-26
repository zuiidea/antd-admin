export const NOTIFICATION_ENDPOINTS = {
  list: "/api/notifications",
  markRead: (id: string) => `/api/notifications/${id}/read`,
  markAllRead: "/api/notifications/read-all",
  delete: (id: string) => `/api/notifications/${id}`,
} as const;
