import { resolve } from 'path';

export default {
  theme: "./theme.config.js",
  // 接口代理示例
  proxy: {
    "/api/v1/weather": {
      "target": "https://api.seniverse.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/weather": "/v3/weather" }
    },
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
  },
  alias: {
    themes: resolve(__dirname, './src/themes'),
  },
  urlLoaderExcludes: [
    /\.svg$/,
  ],
}
