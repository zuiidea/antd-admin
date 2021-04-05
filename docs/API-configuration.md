# API configuration

## Why

In the use of `redux` or `dva` projects, we often write functions like the following `service` layer to make the code structure clearer, but it is easy to see that we will write a lot of similar code in `antd -admin@5.0`, using the more concise configuration method to achieve the same function.

```javascript
export async function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data,
  })
}
```

## Configuration and use

In the `src/services/api.js` file, you will see the following configuration object, the object's key is used to call the function name, the object's value is the requested `url`, the default request method is `GET`, The format of the value of the other request mode object is `'method url'`.

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

Used in other files

```javascript
import { queryUser } from 'api'

// in the general file
...
queryUser(option).then(data => console.log(data))
...

/ / Model file
...
yield call(queryUser, option)
...
```

## Method to realize

Refer to the `src/services/index.js` file to traverse the api configuration. Each property returns the corresponding encapsulated request function.

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