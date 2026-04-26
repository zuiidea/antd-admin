import { authHandlers } from "./auth";
import { adminHandlers } from "./admin";
import { userHandlers } from "./user";
import { notificationHandlers } from "./notification";
import { logHandlers } from "./log";

export const handlers = [
  ...authHandlers,
  ...adminHandlers,
  ...userHandlers,
  ...notificationHandlers,
  ...logHandlers,
];
