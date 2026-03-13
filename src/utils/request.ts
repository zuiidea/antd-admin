import { message } from 'antd';

import config from './config';

/** 原始值类型 */
export type Primitive = string | number | boolean;

/**
 * 请求选项
 * - `params` 会被序列化为查询字符串
 * - `body` 会在非 FormData 情况下 JSON 序列化并设置 Content-Type
 */
export type ApiOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, Primitive>;
  body?: unknown;
};

/** 约定的后端返回格式 */
export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data: T;
};

/**
 * 统一的 fetch 封装
 *
 * 行为说明（对 LLM/开发者友好说明）：
 * - 将 `config.apiPrefix` 与 `path` 拼接为最终 URL。
 * - 当 `options.params` 存在时，转为查询字符串并添加到 URL 上。
 * - `body` 处理：
 *   - 如果是 FormData，直接交给 fetch 处理（不要手动设置 Content-Type）。
 *   - 如果是字符串或 Blob，直接发送。
 *   - 其他对象会被 JSON.stringify，并默认设置 `Content-Type: application/json`（除非已在 headers 中指定）。
 * - 当响应状态为 204 时返回空对象；否则尝试解析响应为 JSON。
 * - 当响应不 OK（res.ok === false）时抛出 Error，优先使用响应体的 `message` 字段作为错误信息。
 *
 * 使用示例：
 * ```ts
 * const data = await api<{ id: number }>(`/items`, { method: 'POST', body: { name: 'a' } });
 * ```
 */
export async function api<T = unknown>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const { params, body, headers: customHeaders, ...rest } = options;

  // 构建 url 并附加查询参数
  let url = `${config.apiPrefix}${path}`;
  if (params && Object.keys(params).length) {
    const qp: Record<string, string> = {};
    Object.entries(params).forEach(([k, v]) => {
      qp[k] = String(v);
    });
    const qs = new URLSearchParams(qp).toString();
    url += url.includes('?') ? `&${qs}` : `?${qs}`;
  }

  const headers: Record<string, string> = {
    ...((customHeaders as Record<string, string>) || {}),
  };
  let bodyToSend: BodyInit | undefined;
  if (body !== undefined) {
    // If body is FormData, let fetch handle headers.
    if (typeof FormData !== 'undefined' && body instanceof FormData) {
      bodyToSend = body as BodyInit;
    } else if (typeof body === 'string' || body instanceof Blob) {
      bodyToSend = body as BodyInit;
    } else {
      // For object payloads, default to JSON content-type
      headers['Content-Type'] = headers['Content-Type'] || 'application/json';
      try {
        bodyToSend = JSON.stringify(body);
      } catch (e) {
        bodyToSend = undefined;
      }
    }
  }

  // inject auth token if present
  try {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('app-auth-token')
        : null;
    if (token && !headers.Authorization && !headers.authorization) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore storage access errors
  }

  // perform request with network error handling
  let res: Response;
  try {
    res = await fetch(url, { headers, body: bodyToSend, ...rest });
  } catch (err: any) {
    const netMsg = err?.message || 'Network error';
    message.error(netMsg);
    throw new Error(netMsg);
  }

  const json = await res.json().catch(() => null);

  // 后端返回固定格式：{ success: boolean, message?: string, data: T }
  if (
    !json ||
    typeof json !== 'object' ||
    typeof (json as any).success !== 'boolean'
  ) {
    const invalidMsg = 'Invalid API response format';
    message.error(invalidMsg);
    throw new Error(invalidMsg);
  }
  const parsed = json as ApiResponse<T>;

  if (!res.ok || !parsed.success) {
    const msg = parsed.message || `Request failed: ${res.status}`;
    message.error(msg);
    throw new Error(msg);
  }

  return parsed.data as T;
}

export default api;
