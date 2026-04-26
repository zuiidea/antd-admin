import { http } from "msw";
import { createUser, deleteUser, listUsers, updateUser } from "../data";
import { filterUsers, paginateList, parsePaginationParams } from "../utils";
import { withDelay, successResponse, errorResponse, ERROR_CODES } from "../createHandler";
import { findUserById, parseUserIdFromAccessToken } from "../data";

function hasPoint(authHeader: string | null, point: string): boolean {
  const userId = parseUserIdFromAccessToken(authHeader);
  const user = userId ? findUserById(userId) : undefined;
  if (!user) return false;
  return user.permissions.includes("*") || user.permissions.includes(point);
}

export const userHandlers = [
  http.get("/api/users", async ({ request }) => {
    await withDelay(200);
    if (!hasPoint(request.headers.get("authorization"), "user:view")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const url = new URL(request.url);
    const { limit, offset } = parsePaginationParams(url.searchParams);
    const keyword = url.searchParams.get("keyword") ?? "";
    const role = url.searchParams.get("role") ?? "";

    const filtered = filterUsers(listUsers(), { keyword, role });
    const list = paginateList(filtered, limit, offset);

    return successResponse({ list, total: filtered.length });
  }),

  http.post("/api/users", async ({ request }) => {
    await withDelay(200);
    if (!hasPoint(request.headers.get("authorization"), "user:create")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const body = (await request.json()) as Record<string, unknown>;
    const newUser = createUser({
      username: String(body.username ?? ""),
      email: typeof body.email === "string" ? body.email : null,
      mobile: typeof body.mobile === "string" ? body.mobile : null,
    });
    return successResponse(newUser);
  }),

  http.put("/api/users/:id", async ({ params, request }) => {
    await withDelay(200);
    if (!hasPoint(request.headers.get("authorization"), "user:edit")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const body = (await request.json()) as Record<string, unknown>;
    const updated = updateUser(String(params.id), body);
    if (!updated) {
      return errorResponse(ERROR_CODES.NOT_FOUND, "User not found");
    }
    return successResponse(updated);
  }),

  http.delete("/api/users/:id", async ({ params, request }) => {
    await withDelay(200);
    if (!hasPoint(request.headers.get("authorization"), "user:delete")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    deleteUser(String(params.id));
    return successResponse(null);
  }),
];
