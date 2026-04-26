/**
 * 全局异常上报工具
 *
 * 能力：
 * - 分级记录错误（INFO / WARN / ERROR / FATAL）
 * - 捕获 window.onerror / unhandledrejection
 * - 支持自定义上报回调（接入 Sentry / 自建平台）
 * - 在 ErrorBoundary 内复用
 */

export const ErrorSeverity = {
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  FATAL: "fatal",
} as const;
export type ErrorSeverity = (typeof ErrorSeverity)[keyof typeof ErrorSeverity];

interface ErrorContext {
  componentStack?: string;
  url?: string;
  timestamp?: number;
  [key: string]: unknown;
}

type ReportCallback = (
  error: Error | string,
  severity: ErrorSeverity,
  context?: ErrorContext,
) => void;

let reportFn: ReportCallback | null = null;

/**
 * 注册自定义上报回调。
 * 不调用则默认只 console 输出。
 */
export function registerErrorReporter(fn: ReportCallback): void {
  reportFn = fn;
}

/** 上报一个异常 */
export function reportError(
  error: Error | string,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  context?: ErrorContext,
): void {
  const err = typeof error === "string" ? new Error(error) : error;
  const ctx: ErrorContext = {
    url: typeof window !== "undefined" ? window.location.href : undefined,
    timestamp: Date.now(),
    ...context,
  };

  // 默认 console 兜底
  const consoleFn =
    severity === ErrorSeverity.FATAL || severity === ErrorSeverity.ERROR
      ? console.error
      : severity === ErrorSeverity.WARN
        ? console.warn
        : console.info;

  consoleFn("[ErrorReporter]", err, ctx);

  reportFn?.(err, severity, ctx);
}

/** 上报一个 warning 级别的消息（不会打断用户交互） */
export function reportWarning(message: string, context?: ErrorContext): void {
  reportError(message, ErrorSeverity.WARN, context);
}

/** 上报 info 级别的日志 */
export function reportInfo(message: string, context?: ErrorContext): void {
  reportError(message, ErrorSeverity.INFO, context);
}

// —— 全局兜底捕获 ——

const WINDOW_CAPTURED_KEY = "__antd_admin_error_captured__";

function installGlobalErrorHandlers(): void {
  if (typeof window === "undefined") return;
  if ((window as unknown as Record<string, unknown>)[WINDOW_CAPTURED_KEY]) return;
  (window as unknown as Record<string, unknown>)[WINDOW_CAPTURED_KEY] = true;

  // 捕获未被 try-catch 覆盖的同步/异步错误
  window.addEventListener("error", (event) => {
    // 跳过资源加载错误（如图片 404），只处理 JS 异常
    if (event.error) {
      reportError(event.error, ErrorSeverity.FATAL, {
        url: event.filename,
        line: event.lineno,
        col: event.colno,
        message: event.message,
      });
    }
  });

  // 捕获未被 catch 的 Promise reject
  window.addEventListener("unhandledrejection", (event) => {
    const error =
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));
    reportError(error, ErrorSeverity.FATAL, {
      message: "Unhandled Promise Rejection",
    });
  });
}

export { installGlobalErrorHandlers };
