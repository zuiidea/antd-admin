const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
]

export default {
  entry: 'src/index.js',
  publicPath: "http://47.92.30.98:8000",
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "src/theme.js",
  // "proxy": {
  //   "/api": {
  //     "target": "http://localhost:7001/api/v1/",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api" : "" }
  //   }
  // },
  "env": {
      "development": {
        "extraBabelPlugins": [
          "dva-hmr",
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true }]
        ]
      },
      "production": {
        "extraBabelPlugins": [
          "transform-runtime",
  		    ["import", { "libraryName": "antd", "style": true}]
        ]
      }
  }
}
