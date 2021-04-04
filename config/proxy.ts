export default {
  '/api/v1/weather': {
    target: 'https://api.seniverse.com/',
    changeOrigin: true,
    pathRewrite: { '^/api/v1/weather': '/v3/weather' },
  },
}
