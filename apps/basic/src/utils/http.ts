import { API_BASE_URL } from "./constants";
import { useAuthStore } from "@/stores/auth";
import { reportWarning } from "@/utils/errorReporter";

// ── Error types ────────────────────────────────────────

export class ApiError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

// ── Types ──────────────────────────────────────────────

export interface RequestOptions extends Omit<RequestInit, "method" | "body" | "signal"> {
  params?: Record<string, string | number | null | undefined>;
  /**
   * Number of retry attempts for transient failures (5xx, network errors).
   * Default: 0 (no retry). Set to 1-3 for idempotent GET requests.
   */
  retry?: number;
  /** Base delay in ms for exponential backoff. Default: 1000. */
  retryBaseMs?: number;
  /**
   * AbortController signal for request cancellation.
   * Also available as `options.signal` (standard fetch).
   */
  signal?: AbortSignal;
  /** Skip automatic token refresh on 401. Default: false. */
  skipAuthRefresh?: boolean;
}

// ── Token management ───────────────────────────────────

interface StoredAuth {
  state?: {
    tokens?: { accessToken: string; refreshToken: string } | null;
  };
}

function readAuthFromStorage() {
  try {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

function getAccessToken(): string | null {
  return readAuthFromStorage()?.state?.tokens?.accessToken ?? null;
}

function getRefreshToken(): string | null {
  return readAuthFromStorage()?.state?.tokens?.refreshToken ?? null;
}

function writeTokens(accessToken: string, refreshToken: string) {
  const stored = readAuthFromStorage() ?? {};
  stored.state = { ...stored.state, tokens: { accessToken, refreshToken } };
  localStorage.setItem("auth-storage", JSON.stringify(stored));
}

/**
 * Shared in-flight refresh promise.
 * Multiple concurrent 401s should share one refresh call.
 */
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const url = API_BASE_URL
      ? `${API_BASE_URL}/api/auth/refresh`
      : "/api/auth/refresh";

    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (err) {
      // Network error during refresh → can't recover
      useAuthStore.getState().logout();
      throw err;
    }

    if (!res.ok) {
      useAuthStore.getState().logout();
      throw new HttpError(res.status, `Token refresh failed: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.code !== undefined && json.code !== 0) {
      useAuthStore.getState().logout();
      throw new ApiError(json.code, json.message ?? "Token refresh failed");
    }

    const data = json.data ?? json;
    const { accessToken, refreshToken: newRefreshToken } = data as {
      accessToken: string;
      refreshToken: string;
    };

    writeTokens(accessToken, newRefreshToken);

    // Also update in-memory store so Zustand subscribers are aware
    const authStore = useAuthStore.getState();
    authStore.setTokens({ accessToken, refreshToken: newRefreshToken });

    return accessToken;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

// ── Helpers ────────────────────────────────────────────

function buildUrl(
  path: string,
  params?: RequestOptions["params"],
): string {
  const base = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  if (!params) return base;
  const url = new URL(base, window.location.origin);
  for (const [key, value] of Object.entries(params)) {
    if (value != null) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

function getAuthHeaders(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Whether this fetch error is transient (retryable) */
function isTransientError(err: unknown): boolean {
  if (err instanceof HttpError) {
    // 5xx server errors are transient
    return err.status >= 500 && err.status < 600;
  }
  if (err instanceof TypeError) {
    // Network errors (fetch throws TypeError for network failures)
    return true;
  }
  return false;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Core request function ──────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> {
  const {
    params,
    retry = 0,
    retryBaseMs = 1000,
    signal,
    skipAuthRefresh = false,
    headers: extraHeaders,
    ...restOptions
  } = options ?? {};

  const url = buildUrl(path, params);
  const maxAttempts = retry + 1;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...(extraHeaders as Record<string, string>),
    };

    let res: Response;
    try {
      res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal, // Standard AbortSignal, fetch will throw AbortError on cancel
        ...restOptions,
      });
    } catch (err) {
      // AbortError → rethrow immediately without retry
      if (err instanceof DOMException && err.name === "AbortError") {
        throw err;
      }

      const fetchErr =
        err instanceof TypeError
          ? new HttpError(0, `Network error: ${(err as Error).message}`)
          : err;

      // Retry transient errors, but only on remaining attempts
      if (attempt < maxAttempts - 1 && isTransientError(fetchErr)) {
        const backoff = retryBaseMs * Math.pow(2, attempt);
        reportWarning(
          `Request failed (attempt ${attempt + 1}/${maxAttempts}), retrying in ${backoff}ms:\n` +
            `${method} ${url}`,
        );
        await delay(backoff);
        continue;
      }
      throw fetchErr;
    }

    // ── 401 → try refresh, then retry ──
    if (res.status === 401 && !skipAuthRefresh) {
      try {
        const newToken = await refreshAccessToken();
        // Retry with fresh token
        const retryHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...(extraHeaders as Record<string, string>),
        };

        const retryRes = await fetch(url, {
          method,
          headers: retryHeaders,
          body: body ? JSON.stringify(body) : undefined,
          signal,
          ...restOptions,
        });

        if (!retryRes.ok) {
          throw new HttpError(
            retryRes.status,
            `HTTP ${retryRes.status}: ${retryRes.statusText}`,
          );
        }

        const retryJson = await retryRes.json();
        if (retryJson.code !== undefined && retryJson.code !== 0) {
          throw new ApiError(
            retryJson.code,
            retryJson.message ?? "Unknown error",
          );
        }

        return retryJson.data !== undefined ? retryJson.data : retryJson;
      } catch (refreshErr) {
        // refreshAccessToken calls logout() internally on failure
        throw refreshErr;
      }
    }

    // ── Non-401 error ──
    if (!res.ok) {
      const httpErr = new HttpError(
        res.status,
        `HTTP ${res.status}: ${res.statusText}`,
      );

      if (attempt < maxAttempts - 1 && isTransientError(httpErr)) {
        const backoff = retryBaseMs * Math.pow(2, attempt);
        reportWarning(
          `Request failed (attempt ${attempt + 1}/${maxAttempts}), retrying in ${backoff}ms:\n` +
            `${method} ${url}`,
        );
        await delay(backoff);
        continue;
      }
      throw httpErr;
    }

    // ── Parse response ──
    const json = await res.json();

    if (json.code !== undefined && json.code !== 0) {
      throw new ApiError(json.code, json.message ?? "Unknown error");
    }

    return json.data !== undefined ? json.data : json;
  }

  // Should never reach here, but TypeScript needs it
  throw new HttpError(0, "Max retries exceeded");
}

// ── Public API ─────────────────────────────────────────

export const httpClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, undefined, options),

  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),

  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, body, options),

  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, body, options),

  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};
