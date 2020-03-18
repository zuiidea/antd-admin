const { pathToRegexp } = require("path-to-regexp")

describe('test pathToRegexp', () => {
  it('get right', () => {
    expect(pathToRegexp('/user', '/zh/user')).toEqual(
      pathToRegexp('/user').exec('/user')
    )
    expect(pathToRegexp('/user', '/user')).toEqual(
      pathToRegexp('/user').exec('/user')
    )

    expect(pathToRegexp('/user/:id', '/zh/user/1')).toEqual(
      pathToRegexp('/user/:id').exec('/user/1')
    )
    expect(pathToRegexp('/user/:id', '/user/1')).toEqual(
      pathToRegexp('/user/:id').exec('/user/1')
    )
  })
})
