import { z } from "zod/v4";
import { defineApi } from "@/api/request";
import { IdParamsSchema } from "@/api/shared/params";
import { PaginatedDataSchema } from "@/api/shared/pagination";
import {
  CreateUserRequestSchema,
  ListUsersQuerySchema,
  UpdateUserRequestSchema,
  UserSchema,
} from "@/api/users/schemas";
import type {
  CreateUserRequest,
  ListUsersQuery,
  UpdateUserRequest,
  User,
} from "@/api/users/schemas";
import { API_PREFIX } from "@/api/shared/prefix";

export const USERS_PATH = `${API_PREFIX}/users`;
export const USERS_MEMBER_PATH = `${USERS_PATH}/:id`;

export const userQueryKeys = {
  all: ["users"] as const,
  list: (query: ListUsersQuery) => [...userQueryKeys.all, "list", query] as const,
};

export const listUsers = defineApi({
  path: USERS_PATH,
  query: ListUsersQuerySchema,
  output: PaginatedDataSchema(UserSchema),
});

export const createUser = defineApi({
  method: "POST",
  path: USERS_PATH,
  body: CreateUserRequestSchema,
  output: UserSchema,
});

export const updateUser = defineApi({
  method: "PUT",
  path: USERS_MEMBER_PATH,
  params: IdParamsSchema,
  body: UpdateUserRequestSchema,
  output: UserSchema,
});

export const deleteUser = defineApi({
  method: "DELETE",
  path: USERS_MEMBER_PATH,
  params: IdParamsSchema,
  output: z.null(),
});

export type { CreateUserRequest, ListUsersQuery, UpdateUserRequest, User };
