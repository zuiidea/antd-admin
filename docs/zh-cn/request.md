# HTTP请求

本项目使用了axios提供http请求服务，文件在src/utils/request.js

## 自定义Header

为了提供鉴权、修改cookie等服务，可以手动修改Header

```
axios.defaults.headers.common['Authorization'] = 'token'
```

或者

```
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.token = window.localStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});
```