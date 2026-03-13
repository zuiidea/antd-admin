import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@umijs/plugins/dist/antd', '@umijs/plugins/dist/locale'],
  esbuildMinifyIIFE: true,
  locale: {
    antd: true,
    default: 'zh-CN',
    baseNavigator: true,
    useLocalStorage: true,
    baseSeparator: '-',
    title: true,
  },
  npmClient: 'pnpm',
});
