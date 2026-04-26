import { z } from "zod/v4";

// ── Notification ───────────────────────────────────────

export const NotificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  type: z.enum(["system", "mention", "task", "alert"]),
  read: z.boolean(),
  createdAt: z.string(),
  createdBy: z.string().nullable().optional(),
});

export type Notification = z.infer<typeof NotificationSchema>;

// ── Audit Log ──────────────────────────────────────────

export const AuditLogSchema = z.object({
  id: z.string(),
  user: z.string(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().nullable(),
  detail: z.string().nullable(),
  ip: z.string().nullable(),
  status: z.enum(["success", "failure"]),
  createdAt: z.string(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;

// ── Profile ────────────────────────────────────────────

export const UpdateProfileSchema = z.object({
  realName: z.string().optional(),
  nickName: z.string().optional(),
  email: z.string().email().optional(),
  mobile: z.string().optional(),
  department: z.string().optional(),
  remark: z.string().optional(),
  avatar: z.string().optional(),
});

export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] },
);

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
