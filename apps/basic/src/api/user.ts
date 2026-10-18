import { z } from "zod/v4";
import { defineApi } from "@/api/request";
import {
  CreateUserRequestSchema,
  IdParamsSchema,
  ListUsersQuerySchema,
  PaginatedDataSchema,
  UpdateUserRequestSchema,
  UserSchema,
} from "@/api/schemas";
import type { CreateUserRequest, ListUsersQuery, UpdateUserRequest, User } from "@/api/schemas";

export const USER_ENDPOINTS = {
  list: "/api/users",
  create: "/api/users",
  update: (id: string) => `/api/users/${id}`,
  delete: (id: string) => `/api/users/${id}`,
} as const;

export const userQueryKeys = {
  all: ["users"] as const,
  list: (query: ListUsersQuery) => [...userQueryKeys.all, "list", query] as const,
};

export const listUsers = defineApi({
  path: USER_ENDPOINTS.list,
  query: ListUsersQuerySchema,
  output: PaginatedDataSchema(UserSchema),
});

export const createUser = defineApi({
  method: "POST",
  path: USER_ENDPOINTS.list,
  body: CreateUserRequestSchema,
  output: UserSchema,
});

export const updateUser = defineApi({
  method: "PUT",
  path: "/api/users/:id",
  params: IdParamsSchema,
  body: UpdateUserRequestSchema,
  output: UserSchema,
});

export const deleteUser = defineApi({
  method: "DELETE",
  path: "/api/users/:id",
  params: IdParamsSchema,
  output: z.null(),
});

export type { CreateUserRequest, ListUsersQuery, UpdateUserRequest, User };
