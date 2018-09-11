import { requestOptions } from './index'

describe('test requestOptions', () => {
  it('get right desc', () => {
    expect(requestOptions[1].desc).toEqual('intercept request by mock.js')
  })
})
