const Watch = require('watchjs')
const config = require('./config')

export default function mockStorge (name, defaultValue) {
  let key = config.prefix + name
  global[key] = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue
  !localStorage.getItem(key) && localStorage.setItem(key, JSON.stringify(global[key]))
  Watch.watch(global[key], () => {
    localStorage.setItem(key, JSON.stringify(global[key]))
  })
  return key
}
