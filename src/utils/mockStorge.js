const Mock = require('mockjs')
const Watch = require("watchjs")
import {config} from './index'

export default function mockStorge(name, defaultValue) {
  let key = config.prefix + name
  global[key] = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : defaultValue
  !localStorage.getItem(key)&&localStorage.setItem(key, JSON.stringify(global[key]))

}
