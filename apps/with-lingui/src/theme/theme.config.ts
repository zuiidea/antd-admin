import type { ThemeConfig } from "antd";

type ThemeTokenSeeds = {
  fontFamily: string;
  borderRadius: number;
  borderRadiusSM: number;
  borderRadiusLG: number;
  /** Light layout background only; dark uses algorithm default */
  colorBgLayoutLight: string;
  /** Optional brand primary; omit to use Ant Design default / env override */
  colorPrimary?: string;
};

/**
 * Project theme seeds. Only place for intentional brand/theme literals.
 * Customize per project here (e.g. uncomment colorPrimary), or set `VITE_BRAND_PRIMARY`.
 */
export const themeConfig = {
  token: {
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    borderRadius: 8,
    borderRadiusSM: 6,
    borderRadiusLG: 12,
    colorBgLayoutLight: "#ffffff",
    // colorPrimary: "#1677ff",
  } satisfies ThemeTokenSeeds,
  controlComponents: {
    Button: {
      primaryShadow: "none",
      defaultShadow: "none",
      dangerShadow: "none",
    },
    Input: {
      activeShadow: "none",
    },
  } satisfies NonNullable<ThemeConfig["components"]>,
} as const;

/**
 * Resolve brand primary: `VITE_BRAND_PRIMARY` wins, then optional `themeConfig.token.colorPrimary`,
 * then Ant Design-like default `#1677ff`.
 */
export function readBrandPrimary(): string {
  const raw = import.meta.env.VITE_BRAND_PRIMARY as string | undefined;
  if (raw && /^#[0-9a-fA-F]{6}$/.test(raw.trim())) {
    return raw.trim();
  }
  const staticPrimary =
    "colorPrimary" in themeConfig.token
      ? (themeConfig.token as ThemeTokenSeeds).colorPrimary
      : undefined;
  if (typeof staticPrimary === "string" && staticPrimary.length > 0) {
    return staticPrimary;
  }
  return "#1677ff";
}
