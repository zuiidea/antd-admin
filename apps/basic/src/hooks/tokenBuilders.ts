import { theme } from "antd";
import type { ConfigProviderProps, ThemeConfig } from "antd";
import { themeConfig } from "@/theme/theme.config";

const { fontFamily, borderRadius, borderRadiusSM, borderRadiusLG, colorBgLayoutLight } = themeConfig.token;

const sharedSeed = {
  fontFamily,
  borderRadius,
  borderRadiusSM,
  borderRadiusLG,
} as const;

function readOptionalPrimary(): string | undefined {
  if (!("colorPrimary" in themeConfig.token)) return undefined;
  const value = (themeConfig.token as { colorPrimary?: string }).colorPrimary;
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function primaryTokenFields(): Pick<NonNullable<ThemeConfig["token"]>, "colorPrimary" | "colorLink" | "colorInfo"> {
  const colorPrimary = readOptionalPrimary();
  if (!colorPrimary) return {};
  return {
    colorPrimary,
    colorLink: colorPrimary,
    colorInfo: colorPrimary,
  };
}

/**
 * Calculate table row selected color based on theme algorithm
 */
export function buildTableTokens(cfg: ThemeConfig) {
  const rowSelectedBg = theme.getDesignToken(cfg).colorFillAlter;
  return {
    rowSelectedBg,
    rowSelectedHoverBg: rowSelectedBg,
  };
}

/**
 * Build menu tokens for light theme
 */
export const MENU_LIGHT = {
  itemSelectedBg: "rgba(0, 0, 0, 0.06)",
  itemSelectedColor: "rgba(0, 0, 0, 0.88)",
  subMenuItemSelectedColor: "rgba(0, 0, 0, 0.88)",
  itemHoverBg: "rgba(0, 0, 0, 0.04)",
  itemHoverColor: "rgba(0, 0, 0, 0.88)",
  itemActiveBg: "rgba(0, 0, 0, 0.08)",
  itemBorderRadius: borderRadiusSM,
  itemMarginInline: 8,
  horizontalItemSelectedColor: "rgba(0, 0, 0, 0.88)",
  horizontalItemHoverColor: "rgba(0, 0, 0, 0.88)",
} as const;

/**
 * Build menu tokens for dark theme
 */
export const MENU_DARK = {
  itemSelectedBg: "rgba(255, 255, 255, 0.08)",
  itemSelectedColor: "rgba(255, 255, 255, 0.85)",
  subMenuItemSelectedColor: "rgba(255, 255, 255, 0.85)",
  itemHoverBg: "rgba(255, 255, 255, 0.06)",
  itemHoverColor: "rgba(255, 255, 255, 0.85)",
  itemActiveBg: "rgba(255, 255, 255, 0.1)",
  itemBorderRadius: borderRadiusSM,
  itemMarginInline: 8,
  horizontalItemSelectedColor: "rgba(255, 255, 255, 0.85)",
  horizontalItemHoverColor: "rgba(255, 255, 255, 0.85)",
} as const;

/**
 * Build light theme config
 */
export function buildLightThemeConfig(): ConfigProviderProps {
  const lightSeed: ThemeConfig["token"] = {
    colorBgLayout: colorBgLayoutLight,
    ...sharedSeed,
    ...primaryTokenFields(),
  };

  return {
    theme: {
      algorithm: theme.defaultAlgorithm,
      token: lightSeed,
      components: {
        ...themeConfig.controlComponents,
        Table: buildTableTokens({
          algorithm: theme.defaultAlgorithm,
          token: lightSeed,
        }),
        Menu: MENU_LIGHT,
      },
    },
  };
}

/**
 * Build dark theme config
 */
export function buildDarkThemeConfig(): ConfigProviderProps {
  const darkSeed: ThemeConfig["token"] = {
    ...sharedSeed,
    ...primaryTokenFields(),
  };

  return {
    theme: {
      algorithm: theme.darkAlgorithm,
      token: darkSeed,
      components: {
        ...themeConfig.controlComponents,
        Table: buildTableTokens({
          algorithm: theme.darkAlgorithm,
          token: darkSeed,
        }),
        Menu: MENU_DARK,
      },
    },
  };
}
