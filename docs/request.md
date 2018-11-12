# HTTP request

this project use axios for http service, file located in src/utils/request.js

## Custom Header

As for privilege access or modify cookie, you could add header param by yourself

```
axios.defaults.headers.common['Authorization'] = 'token'
```

Or

```
axios.interceptors.request.use(function (config) {
  config.headers.token = window.localStorage.getItem('token');
  return config;
}, function (error) {
  return Promise.reject(error);
});
```