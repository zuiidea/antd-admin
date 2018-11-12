# API configuration

## Why

In the use of `redux` or `dva` projects, we often write functions like the following `service` layer to make the code structure clearer, but it is easy to see that we will write a lot of similar code in `antd -admin@5.0`, using the more concise configuration method to achieve the same function.

```javascript
Export async function login(data) {
  Return request({
    Url: '/api/v1/user/login',
    Method: 'post',
    Data,
  })
}
```

## Configuration and use

In the `src/services/api.js` file, you will see the following configuration object, the object's key is used to call the function name, the object's value is the requested `url`, the default request method is `GET`, The format of the value of the other request mode object is `'method url'`.

```javascript
Export default {
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
Import { queryUser } from 'api'

// in the general file
...
queryUser(option).then(data => console.log(data))
...

/ / Model file
...
Yield call(queryUser, option)
...
```

## Method to realize

Refer to the `src/services/index.js` file to traverse the api configuration. Each property returns the corresponding encapsulated request function.

```javascript
Import request from 'utils/request'
Import { apiPrefix } from 'utils/config'

Import api from './api'

Const gen = params => {
  Let url = apiPrefix + params
  Let method = 'GET'

  Const paramsArray = params.split(' ')
  If (paramsArray.length === 2) {
    Method = paramsArray[0]
    Url = apiPrefix + paramsArray[1]
  }

  Return function(data) {
    Return request({
      Url,
      Data,
      Method,
    })
  }
}

Const APIFunction = {}
For (const key in api) {
  APIFunction[key] = gen(api[key])
}

Module.exports = APIFunction

```