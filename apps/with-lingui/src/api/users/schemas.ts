import { z } from "zod/v4";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().nullable(),
  email: z.string().nullable(),
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;

export const ListUsersQuerySchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
  keyword: z.string().optional(),
  role: z.string().optional(),
  sortField: z.string().optional(),
  sortOrder: z.enum(["ascend", "descend"]).optional(),
});

export type ListUsersQuery = z.infer<typeof ListUsersQuerySchema>;

/** Ant Design Input submits `""` when empty; treat as null for optional email */
const createUserEmailSchema = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (v == null) return null;
    const t = String(v).trim();
    return t === "" ? null : t;
  })
  .pipe(z.union([z.string().email(), z.null()]));

export const CreateUserRequestSchema = z.object({
  username: z.string().min(1),
  email: createUserEmailSchema,
  roles: z.array(z.string()).min(1),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export const UpdateUserRequestSchema = CreateUserRequestSchema.partial();

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
