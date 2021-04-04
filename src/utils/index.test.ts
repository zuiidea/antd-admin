import { pathMatchRegexp } from './index'
import pathToRegexp from 'path-to-regexp'

describe('test pathMatchRegexp', () => {
  it('get right', () => {
    expect(pathMatchRegexp('/user', '/zh/user')).toEqual(
      pathToRegexp('/user').exec('/user')
    )
    expect(pathMatchRegexp('/user', '/user')).toEqual(
      pathToRegexp('/user').exec('/user')
    )

    expect(pathMatchRegexp('/user/:id', '/zh/user/1')).toEqual(
      pathToRegexp('/user/:id').exec('/user/1')
    )
    expect(pathMatchRegexp('/user/:id', '/user/1')).toEqual(
      pathToRegexp('/user/:id').exec('/user/1')
    )
  })
})
