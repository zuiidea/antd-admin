import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { z } from "zod/v4";
import { API_BASE_URL } from "@/utils/constants";
import { AuthTokensSchema, RefreshTokenRequestSchema } from "@/api/auth/schemas";
import { getAccessToken, useAuthStore } from "@/stores/auth";

import { AUTH_ENDPOINTS } from "@/api/auth/paths";

/** Avoid importing `@/api/auth` index here (circular with `defineApi` consumers). */
const REFRESH_PATH = AUTH_ENDPOINTS.refresh;

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

type HttpRouter = {
  navigate: (opts: { to: string }) => void | Promise<void>;
};

let httpRouter: HttpRouter | null = null;

export function installHttpRouter(router: HttpRouter): void {
  httpRouter = router;
}

function navigateTo403(): void {
  void httpRouter?.navigate({ to: "/403" });
}

function navigateToLogin(): void {
  void httpRouter?.navigate({ to: "/login" });
}

type RequestConfig = InternalAxiosRequestConfig & {
  skipAuthRefresh?: boolean;
  _retry?: boolean;
};

export type CallOptions = {
  signal?: AbortSignal;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Envelope = {
  code?: number;
  data?: unknown;
  message?: string;
};

function cleanParams(params?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!params) return undefined;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value != null) out[key] = value;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function unwrapEnvelope(json: unknown): unknown {
  if (json == null || typeof json !== "object") return json;
  const envelope = json as Envelope;
  if (envelope.code !== undefined && envelope.code !== 0) {
    throw new ApiError(envelope.code, envelope.message ?? "Unknown error");
  }
  if (envelope.code !== undefined && envelope.data !== undefined) {
    return envelope.data;
  }
  return json;
}

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let inflightRefresh: Promise<boolean> | null = null;

async function doRefreshSessionTokens(): Promise<boolean> {
  const { tokens, setTokens, logout } = useAuthStore.getState();
  const refreshToken = tokens?.refreshToken;
  if (!refreshToken) {
    logout();
    navigateToLogin();
    return false;
  }

  const body = RefreshTokenRequestSchema.parse({ refreshToken });

  try {
    const res = await client.post(REFRESH_PATH, body, {
      skipAuthRefresh: true,
    } as RequestConfig);
    const next = AuthTokensSchema.parse(res.data);
    setTokens(next);
    return true;
  } catch {
    logout();
    navigateToLogin();
    return false;
  }
}

async function refreshSessionTokens(): Promise<boolean> {
  if (inflightRefresh) return inflightRefresh;
  inflightRefresh = doRefreshSessionTokens().finally(() => {
    inflightRefresh = null;
  });
  return inflightRefresh;
}

client.interceptors.response.use(
  (response) => {
    response.data = unwrapEnvelope(response.data);
    return response;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;
    const config = error.config as RequestConfig | undefined;

    if (
      status === 401 &&
      config &&
      !config._retry &&
      !config.skipAuthRefresh &&
      config.url !== REFRESH_PATH &&
      !config.url?.endsWith(REFRESH_PATH)
    ) {
      config._retry = true;
      const refreshed = await refreshSessionTokens();
      if (refreshed) {
        return client.request(config);
      }
      throw new HttpError(401, "Unauthorized");
    }

    if (status === 403) {
      navigateTo403();
      throw new HttpError(403, "Forbidden");
    }

    if (status != null) {
      throw new HttpError(status, `HTTP ${status}: ${error.response?.statusText ?? "Error"}`);
    }

    throw error;
  },
);

async function transportRequest<T>(opts: {
  method: HttpMethod;
  url: string;
  params?: Record<string, unknown>;
  body?: unknown;
  signal?: AbortSignal;
  skipAuthRefresh?: boolean;
}): Promise<T> {
  const res = await client.request<T>({
    method: opts.method,
    url: opts.url,
    params: cleanParams(opts.params),
    data: opts.body,
    signal: opts.signal,
    skipAuthRefresh: opts.skipAuthRefresh,
  } as RequestConfig);
  return res.data;
}

type ApiDefConfig<
  TParams extends z.ZodType | undefined,
  TQuery extends z.ZodType | undefined,
  TBody extends z.ZodType | undefined,
  TOut extends z.ZodType,
> = {
  method?: HttpMethod;
  path: string;
  params?: TParams;
  query?: TQuery;
  body?: TBody;
  output: TOut;
};

type CallArgs<
  TParams extends z.ZodType | undefined,
  TQuery extends z.ZodType | undefined,
  TBody extends z.ZodType | undefined,
> = TParams extends z.ZodType
  ? TQuery extends z.ZodType
    ? TBody extends z.ZodType
      ? { params: z.infer<TParams>; query: z.infer<TQuery>; body: z.infer<TBody> }
      : { params: z.infer<TParams>; query: z.infer<TQuery> }
    : TBody extends z.ZodType
      ? { params: z.infer<TParams>; body: z.infer<TBody> }
      : z.infer<TParams>
  : TQuery extends z.ZodType
    ? TBody extends z.ZodType
      ? { query: z.infer<TQuery>; body: z.infer<TBody> }
      : z.infer<TQuery>
    : TBody extends z.ZodType
      ? z.infer<TBody>
      : void;

function renderPath(path: string, params?: Record<string, unknown>): string {
  if (!params) return path;
  let url = path;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, encodeURIComponent(String(value)));
  }
  return url;
}

export function defineApi<
  TParams extends z.ZodType | undefined = undefined,
  TQuery extends z.ZodType | undefined = undefined,
  TBody extends z.ZodType | undefined = undefined,
  TOut extends z.ZodType = z.ZodType,
>(
  def: ApiDefConfig<TParams, TQuery, TBody, TOut>,
): (
  ...args: CallArgs<TParams, TQuery, TBody> extends void
    ? [options?: CallOptions]
    : [args: CallArgs<TParams, TQuery, TBody>, options?: CallOptions]
) => Promise<z.infer<TOut>> {
  const method: HttpMethod = def.method ?? "GET";
  const segmentCount = (def.params ? 1 : 0) + (def.query ? 1 : 0) + (def.body ? 1 : 0);

  return async (...allArgs: unknown[]): Promise<z.infer<TOut>> => {
    let callArgs: unknown;
    let options: CallOptions | undefined;

    if (segmentCount === 0) {
      options = allArgs[0] as CallOptions | undefined;
    } else {
      callArgs = allArgs[0];
      options = allArgs[1] as CallOptions | undefined;
    }

    let params: Record<string, unknown> | undefined;
    let query: Record<string, unknown> | undefined;
    let body: unknown;

    if (segmentCount === 0) {
      // no input segments
    } else if (segmentCount === 1) {
      if (def.params) {
        params = def.params.parse(callArgs) as Record<string, unknown>;
      } else if (def.query) {
        query = def.query.parse(callArgs) as Record<string, unknown>;
      } else if (def.body) {
        body = def.body.parse(callArgs);
      }
    } else {
      const shaped = (callArgs ?? {}) as {
        params?: unknown;
        query?: unknown;
        body?: unknown;
      };
      if (def.params) {
        params = def.params.parse(shaped.params) as Record<string, unknown>;
      }
      if (def.query) {
        query = def.query.parse(shaped.query) as Record<string, unknown>;
      }
      if (def.body) {
        body = def.body.parse(shaped.body);
      }
    }

    const data = await transportRequest<unknown>({
      method,
      url: renderPath(def.path, params),
      params: query,
      body: def.body ? body : undefined,
      signal: options?.signal,
    });

    return def.output.parse(data) as z.infer<TOut>;
  };
}
