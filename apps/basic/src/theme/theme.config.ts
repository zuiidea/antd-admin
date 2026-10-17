import type { ThemeConfig } from "antd";

type ThemeTokenSeeds = {
  fontFamily: string;
  borderRadius: number;
  borderRadiusSM: number;
  borderRadiusLG: number;
  /** Light layout background only; dark uses algorithm default */
  colorBgLayoutLight: string;
  /** Optional brand primary; omit to use Ant Design default */
  colorPrimary?: string;
};

/**
 * Project theme seeds. Only place for intentional brand/theme literals.
 * Customize per project here (e.g. uncomment colorPrimary).
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
