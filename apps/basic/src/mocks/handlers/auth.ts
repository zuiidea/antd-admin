import { http } from "msw";
import {
  authenticateUser,
  findUserById,
  findUserByUsername,
  issueMockTokens,
  parseUserIdFromAccessToken,
  parseUserIdFromRefreshToken,
  registerUser,
  toPublicUser,
} from "../data";
import { withDelay, successResponse, errorResponse, ERROR_CODES } from "../createHandler";

export const authHandlers = [
  http.post("/api/auth/login", async ({ request }) => {
    await withDelay(300);
    const body = (await request.json()) as {
      username: string;
      password: string;
    };
    const user = authenticateUser(body.username, body.password);
    if (user) {
      return successResponse(issueMockTokens(user.id));
    }
    return errorResponse(ERROR_CODES.INVALID_CREDENTIALS, "Invalid username or password");
  }),

  http.post("/api/auth/register", async ({ request }) => {
    await withDelay(350);
    const body = (await request.json()) as {
      username?: string;
      password?: string;
      email?: string;
    };

    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const email = typeof body.email === "string" ? body.email.trim() : undefined;

    if (!username || password.length < 6) {
      return errorResponse(ERROR_CODES.BAD_REQUEST, "Invalid register payload");
    }
    if (findUserByUsername(username)) {
      return errorResponse(ERROR_CODES.BAD_REQUEST, "Username already exists");
    }

    const user = registerUser({ username, password, email });
    return successResponse(issueMockTokens(user.id));
  }),

  http.post("/api/auth/refresh", async ({ request }) => {
    await withDelay(100);
    const body = (await request.json().catch(() => ({}))) as { refreshToken?: string };
    const userId = parseUserIdFromRefreshToken(body.refreshToken);
    if (!userId || !findUserById(userId)) {
      return errorResponse(ERROR_CODES.UNAUTHORIZED, "Invalid refresh token");
    }
    return successResponse(issueMockTokens(userId));
  }),

  http.post("/api/auth/logout", () => successResponse(null)),

  http.get("/api/auth/user", ({ request }) => {
    const userId = parseUserIdFromAccessToken(request.headers.get("authorization"));
    const user = userId ? findUserById(userId) : undefined;
    if (!user) {
      return errorResponse(ERROR_CODES.UNAUTHORIZED, "Unauthorized");
    }
    const { permissions: _permissions, ...userWithoutPermissions } = toPublicUser(user);
    return successResponse(userWithoutPermissions);
  }),

  http.get("/api/auth/permissions", ({ request }) => {
    const userId = parseUserIdFromAccessToken(request.headers.get("authorization"));
    const user = userId ? findUserById(userId) : undefined;
    if (!user) {
      return errorResponse(ERROR_CODES.UNAUTHORIZED, "Unauthorized");
    }
    return successResponse(user.permissions);
  }),
];
