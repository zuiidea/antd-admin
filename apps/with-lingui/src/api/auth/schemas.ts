import { z } from "zod/v4";
import { UserSchema } from "@/api/users/schemas";

/** GET `/api/auth/user` body (no `permissions`; load via `/api/auth/permissions`). */
export const AuthUserResponseSchema = UserSchema.omit({ permissions: true });
export type AuthUserResponse = z.infer<typeof AuthUserResponseSchema>;

export const AuthTokensSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type AuthTokens = z.infer<typeof AuthTokensSchema>;

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

export const LoginRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

/** Ant Design Form may submit `""` for an empty optional email */
const registerOptionalEmailSchema = z
  .union([z.string(), z.undefined()])
  .transform((v) => {
    if (v === undefined) return undefined;
    const t = String(v).trim();
    return t === "" ? undefined : t;
  })
  .pipe(z.union([z.string().email(), z.undefined()]));

export const RegisterRequestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  email: registerOptionalEmailSchema,
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const PermissionsListSchema = z.array(z.string());

export type PermissionsList = z.infer<typeof PermissionsListSchema>;
