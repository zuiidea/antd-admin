
export default {
  plugins: [
    'umi-plugin-dva',
    [
      'umi-plugin-routes',
      {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
          /chart\/Container\.js$/,
        ],
      },
    ],
    [
      'umi-plugin-dll',
      {
        exclude: [],
        include: ["dva", "dva/router", "dva/saga", "dva/fetch", "antd/es"],
      },
    ],
  ],
}
