import { theme } from "antd";
import type { ConfigProviderProps, ThemeConfig } from "antd";
import { readBrandPrimary, themeConfig } from "@/theme/theme.config";

const { fontFamily, borderRadius, borderRadiusSM, borderRadiusLG, colorBgLayoutLight } = themeConfig.token;

const BRAND_PRIMARY = readBrandPrimary();

const sharedSeed = {
  fontFamily,
  borderRadius,
  borderRadiusSM,
  borderRadiusLG,
} as const;

export function buildTableTokens(cfg: ThemeConfig) {
  const rowSelectedBg = theme.getDesignToken(cfg).colorFillAlter;
  return {
    rowSelectedBg,
    rowSelectedHoverBg: rowSelectedBg,
  };
}

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

export function buildLightThemeConfig(): ConfigProviderProps {
  const lightSeed: ThemeConfig["token"] = {
    colorBgLayout: colorBgLayoutLight,
    colorPrimary: BRAND_PRIMARY,
    colorLink: BRAND_PRIMARY,
    colorInfo: BRAND_PRIMARY,
    ...sharedSeed,
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

export function buildDarkThemeConfig(): ConfigProviderProps {
  const darkSeed: ThemeConfig["token"] = {
    colorPrimary: BRAND_PRIMARY,
    colorLink: BRAND_PRIMARY,
    colorInfo: BRAND_PRIMARY,
    ...sharedSeed,
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
