# 接口配置

## 为什么

在使用了`redux`或者`dva`项目中，我们经常会写类似下面的`service`层的函数，使代码结构更清晰，但是很容易看出，我们会写很多相似的代码，在`antd-admin@5.0`中，使用了更加简洁的配置方式实现了相同的功能。

```javascript
export async function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data,
  })
}
```

## 配置和使用

在`src/services/api.js`文件中，你会看到如下配置对象，对象的键用于调用时的函数名称，对象的值为请求的`url`，默认请求方式为`GET`，如果是其他请求方式对象的值的格式则为`'method url'`。

```javascript
export default {
  ...
  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user/:id',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',
  ...
}
```

在其他文件中使用

```javascript
import { queryUser } from 'api'

// 一般文件中
...
queryUser(option).then(data => console.log(data))
...

// model文件中
...
yield call(queryUser, option)
...
```

## 实现方式

参考`src/services/index.js`文件，对api配置进行遍历，每个属性都返回对应的封装后的request函数。

```javascript
import request from 'utils/request'
import { apiPrefix } from 'utils/config'

import api from './api'

const gen = params => {
  let url = apiPrefix + params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = apiPrefix + paramsArray[1]
  }

  return function(data) {
    return request({
      url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

module.exports = APIFunction

```