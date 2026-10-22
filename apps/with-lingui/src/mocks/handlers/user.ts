import { http, HttpResponse } from "msw";
import { UserSchema } from "@/api/schemas";
import { MOCK_USERS } from "../data";
import { filterUsers, paginateList, parsePaginationParams } from "../utils";
import {
  withDelay,
  errorResponse,
  ERROR_CODES,
  paginatedWithSchema,
  successWithSchema,
  successWithNullBody,
} from "../createHandler";
import { USERS_MEMBER_PATH, USERS_PATH } from "@/api/users";

let users = [...MOCK_USERS];

export const EXPIRED_ACCESS_TOKEN = "__EXPIRED_ACCESS__";

export const userHandlers = [
  http.get(USERS_PATH, async ({ request }) => {
    await withDelay(200);
    const auth = request.headers.get("authorization");
    if (auth === `Bearer ${EXPIRED_ACCESS_TOKEN}`) {
      return new HttpResponse(null, { status: 401 });
    }
    const url = new URL(request.url);
    const { limit, offset } = parsePaginationParams(url.searchParams);
    const keyword = url.searchParams.get("keyword") ?? "";
    const role = url.searchParams.get("role") ?? "";

    const filtered = filterUsers(users, { keyword, role });
    const list = paginateList(filtered, limit, offset);

    return paginatedWithSchema(UserSchema, { list, total: filtered.length });
  }),

  http.post(USERS_PATH, async ({ request }) => {
    await withDelay(200);
    const body = (await request.json()) as Record<string, unknown>;
    const newUser = {
      id: String(users.length + 1),
      username: String(body.username),
      avatar: null,
      email: typeof body.email === "string" ? body.email : null,
      roles: (body.roles as string[]) ?? [],
      permissions: [] as string[],
    };
    users.push(newUser);
    return successWithSchema(UserSchema, newUser);
  }),

  http.put(USERS_MEMBER_PATH, async ({ params, request }) => {
    await withDelay(200);
    const body = (await request.json()) as Record<string, unknown>;
    const idx = users.findIndex((u) => u.id === params.id);
    if (idx === -1) {
      return errorResponse(ERROR_CODES.NOT_FOUND, "User not found");
    }
    users[idx] = { ...users[idx], ...body } as (typeof users)[number];
    return successWithSchema(UserSchema, users[idx]);
  }),

  http.delete(USERS_MEMBER_PATH, async ({ params }) => {
    await withDelay(200);
    users = users.filter((u) => u.id !== params.id);
    return successWithNullBody();
  }),
];
