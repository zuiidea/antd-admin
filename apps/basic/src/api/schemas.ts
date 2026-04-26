import { z } from "zod/v4";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().nullable(),
  email: z.string().nullable(),
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
  realName: z.string().nullable().optional(),
  nickName: z.string().nullable().optional(),
  mobile: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  status: z.number().int().optional(),
  remark: z.string().nullable().optional(),
  lastLogin: z.string().nullable().optional(),
  createdBy: z.string().nullable().optional(),
});

export type User = z.infer<typeof UserSchema>;

/** GET `/api/auth/user` body (no `permissions`; load via `/api/auth/permissions`). */
export const AuthUserResponseSchema = UserSchema.omit({ permissions: true });
export type AuthUserResponse = z.infer<typeof AuthUserResponseSchema>;

export const AuthTokensSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type AuthTokens = z.infer<typeof AuthTokensSchema>;

export const LoginRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const RegisterRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  email: z.string().email().optional(),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

const optionalNullableString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (v == null) return null;
    const t = String(v).trim();
    return t === "" ? null : t;
  });

export const CreateAdminRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  email: z.string().email().nullable().optional(),
  realName: optionalNullableString.optional(),
  nickName: optionalNullableString.optional(),
  mobile: optionalNullableString.optional(),
  department: optionalNullableString.optional(),
  role: optionalNullableString.optional(),
  remark: optionalNullableString.optional(),
  status: z.number().int().catch(1),
  permissions: z.array(z.string()).default([]),
  roles: z.array(z.string()).default(["editor"]),
});

export type CreateAdminRequest = z.infer<typeof CreateAdminRequestSchema>;

export const UpdateAdminRequestSchema = CreateAdminRequestSchema.partial();

export type UpdateAdminRequest = z.infer<typeof UpdateAdminRequestSchema>;

export const PermissionsListSchema = z.array(z.string());

export type PermissionsList = z.infer<typeof PermissionsListSchema>;

const BaseMenuNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable(),
  permissions: z.array(z.string()).nullable(),
  sort: z.int(),
  hidden: z.boolean(),
});

export type MenuItem =
  | (z.infer<typeof BaseMenuNodeSchema> & {
      kind: "item";
      path: string;
      children: MenuItem[] | null;
    })
  | (z.infer<typeof BaseMenuNodeSchema> & {
      kind: "group";
      path: null;
      children: MenuItem[];
    });

export const MenuItemSchema: z.ZodType<MenuItem> = z.lazy(() =>
  z.discriminatedUnion("kind", [
    BaseMenuNodeSchema.extend({
      kind: z.literal("item"),
      path: z.string(),
      children: z.array(MenuItemSchema).nullable(),
    }),
    BaseMenuNodeSchema.extend({
      kind: z.literal("group"),
      path: z.null(),
      children: z.array(MenuItemSchema),
    }),
  ]),
);

export function ApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    code: z.int(),
    data: dataSchema,
    message: z.string(),
  });
}

export type ApiResponse<T> = {
  code: number;
  data: T;
  message: string;
};

export function PaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    code: z.int(),
    data: z.object({
      list: z.array(itemSchema),
      total: z.int(),
    }),
    message: z.string(),
  });
}

export type PaginatedData<T> = {
  list: T[];
  total: number;
};

export const SearchParamsSchema = z.object({
  page: z.number().int().positive().catch(1),
  pageSize: z.number().int().positive().catch(10),
  sortField: z.string().nullable().catch(null),
  sortOrder: z.enum(["ascend", "descend"]).nullable().catch(null),
});

export type SearchParams = z.infer<typeof SearchParamsSchema>;

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
  mobile: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((v) => {
      if (v == null) return null;
      const t = String(v).trim();
      return t === "" ? null : t;
    }),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export const UpdateUserRequestSchema = CreateUserRequestSchema.partial();

export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
