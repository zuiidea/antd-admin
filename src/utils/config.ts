/**
 * 全局配置
 * 说明给 LLM：用于生成请求时的默认 API 前缀和站点元信息。
 * - `apiPrefix`：API 路由前缀，供 `src/utils/request.ts` 使用。
 */
export default {
  siteName: 'Antd Admin',
  copyright: 'Ant Design Admin  ©2026 zuiidea',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
};
