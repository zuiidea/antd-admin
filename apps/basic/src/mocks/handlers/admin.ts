import { http } from "msw";
import {
  createAdmin,
  deleteAdmin,
  findAdminById,
  findAdminByUsername,
  findUserById,
  findUserByUsername,
  listAdmins,
  listMenus,
  parseUserIdFromAccessToken,
  saveMenus,
  updateAdmin,
} from "../data";
import { filterUsers, paginateList, parsePaginationParams } from "../utils";
import { withDelay, successResponse, errorResponse, ERROR_CODES } from "../createHandler";

function hasPoint(authHeader: string | null, point: string): boolean {
  const userId = parseUserIdFromAccessToken(authHeader);
  const user = userId ? findUserById(userId) : undefined;
  if (!user) return false;
  return user.permissions.includes("*") || user.permissions.includes(point);
}

export const adminHandlers = [
  http.get("/api/admins", async ({ request }) => {
    await withDelay(180);
    if (!hasPoint(request.headers.get("authorization"), "admin:view")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const url = new URL(request.url);
    const { limit, offset } = parsePaginationParams(url.searchParams);
    const keyword = url.searchParams.get("keyword") ?? "";
    const role = url.searchParams.get("role") ?? "";

    const filtered = filterUsers(listAdmins(), { keyword, role });
    const list = paginateList(filtered, limit, offset);

    return successResponse({ list, total: filtered.length });
  }),

  http.get("/api/admins/:id", async ({ params, request }) => {
    await withDelay(120);
    if (!hasPoint(request.headers.get("authorization"), "admin:view")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const admin = findAdminById(String(params.id));
    if (!admin) {
      return errorResponse(ERROR_CODES.NOT_FOUND, "Admin not found");
    }
    return successResponse(admin);
  }),

  http.post("/api/admins", async ({ request }) => {
    await withDelay(240);
    if (!hasPoint(request.headers.get("authorization"), "admin:create")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const body = (await request.json()) as Record<string, unknown>;
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    if (!username || password.length < 6) {
      return errorResponse(ERROR_CODES.BAD_REQUEST, "Username and password are required");
    }
    if (findAdminByUsername(username) || findUserByUsername(username)) {
      return errorResponse(ERROR_CODES.BAD_REQUEST, "Username already exists");
    }
    const created = createAdmin({
      username,
      password,
      email: typeof body.email === "string" ? body.email : null,
      roles: Array.isArray(body.roles) ? (body.roles as string[]) : ["editor"],
      permissions: Array.isArray(body.permissions) ? (body.permissions as string[]) : [],
      realName: typeof body.realName === "string" ? body.realName : null,
      nickName: typeof body.nickName === "string" ? body.nickName : null,
      mobile: typeof body.mobile === "string" ? body.mobile : null,
      department: typeof body.department === "string" ? body.department : null,
      role: typeof body.role === "string" ? body.role : null,
      remark: typeof body.remark === "string" ? body.remark : null,
      status: typeof body.status === "number" ? body.status : 1,
    });
    return successResponse(created);
  }),

  http.put("/api/admins/:id", async ({ params, request }) => {
    await withDelay(220);
    if (!hasPoint(request.headers.get("authorization"), "admin:edit")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const body = (await request.json()) as Record<string, unknown>;
    const nextUsername = typeof body.username === "string" ? body.username.trim() : undefined;
    const existingAdmin = nextUsername ? findAdminByUsername(nextUsername) : undefined;
    const existingAuth = nextUsername ? findUserByUsername(nextUsername) : undefined;
    if (
      (existingAdmin && existingAdmin.id !== String(params.id)) ||
      (existingAuth && existingAuth.id !== String(params.id))
    ) {
      return errorResponse(ERROR_CODES.BAD_REQUEST, "Username already exists");
    }
    const updated = updateAdmin(String(params.id), {
      username: nextUsername,
      email: typeof body.email === "string" || body.email === null ? (body.email as string | null) : undefined,
      roles: Array.isArray(body.roles) ? (body.roles as string[]) : undefined,
      permissions: Array.isArray(body.permissions) ? (body.permissions as string[]) : undefined,
      realName: typeof body.realName === "string" || body.realName === null ? (body.realName as string | null) : undefined,
      nickName: typeof body.nickName === "string" || body.nickName === null ? (body.nickName as string | null) : undefined,
      mobile: typeof body.mobile === "string" || body.mobile === null ? (body.mobile as string | null) : undefined,
      department:
        typeof body.department === "string" || body.department === null
          ? (body.department as string | null)
          : undefined,
      role: typeof body.role === "string" || body.role === null ? (body.role as string | null) : undefined,
      remark: typeof body.remark === "string" || body.remark === null ? (body.remark as string | null) : undefined,
      status: typeof body.status === "number" ? body.status : undefined,
      password: typeof body.password === "string" && body.password.length > 0 ? body.password : undefined,
    });
    if (!updated) {
      return errorResponse(ERROR_CODES.NOT_FOUND, "Admin not found");
    }
    return successResponse(updated);
  }),

  http.delete("/api/admins/:id", async ({ params, request }) => {
    await withDelay(180);
    if (!hasPoint(request.headers.get("authorization"), "admin:delete")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const ok = deleteAdmin(String(params.id));
    if (!ok) {
      return errorResponse(ERROR_CODES.NOT_FOUND, "Admin not found");
    }
    return successResponse(null);
  }),

  http.get("/api/menus", async ({ request }) => {
    await withDelay(120);
    if (!hasPoint(request.headers.get("authorization"), "admin:view")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    return successResponse(listMenus());
  }),

  http.put("/api/menus", async ({ request }) => {
    await withDelay(220);
    if (!hasPoint(request.headers.get("authorization"), "admin:edit")) {
      return errorResponse(ERROR_CODES.FORBIDDEN, "Forbidden");
    }
    const body = (await request.json()) as { menus?: unknown };
    if (!Array.isArray(body?.menus)) {
      return errorResponse(ERROR_CODES.BAD_REQUEST, "Invalid menus payload");
    }
    return successResponse(saveMenus(body.menus as any));
  }),
];
