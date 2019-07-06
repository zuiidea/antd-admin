import { cloneDeep, isString, flow, curry } from 'lodash'
import umiRouter from 'umi/router'
import pathToRegexp from 'path-to-regexp'
import { i18n } from './config'
import moment from 'moment'
import 'moment/locale/zh-cn'

export classnames from 'classnames'
export config from './config'
export request from './request'
export { Color } from './theme'

export const { defaultLanguage } = i18n
export const languages = i18n.languages.map(item => item.key)

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export function queryArray(array, key, value) {
  if (!Array.isArray(array)) {
    return
  }
  return array.find(_ => _[key] === value)
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array,
  id = 'id',
  parentId = 'pid',
  children = 'children'
) {
  const result = []
  const hash = {}
  const data = cloneDeep(array)

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach(item => {
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export const langFromPath = curry(
  /**
   * Query language from pathname.
   * @param   {array}     languages         Specify which languages are currently available.
   * @param   {string}    defaultLanguage   Specify the default language.
   * @param   {string}    pathname          Pathname to be queried.
   * @return  {string}    Return the queryed language.
   */
  (languages, defaultLanguage, pathname) => {
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return item
      }
    }
    return defaultLanguage
  }
)(languages)(defaultLanguage)

export const deLangPrefix = curry(
  /**
   * Remove the language prefix in pathname.
   * @param   {array}     languages  Specify which languages are currently available.
   * @param   {string}    pathname   Remove the language prefix in the pathname.
   * @return  {string}    Return the pathname after removing the language prefix.
   */
  (languages, pathname) => {
    if (!pathname) {
      return
    }
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return pathname.replace(`/${item}/`, '/')
      }
    }

    return pathname
  }
)(languages)

/**
 * Add the language prefix in pathname.
 * @param   {string}    pathname   Add the language prefix in the pathname.
 * @return  {string}    Return the pathname after adding the language prefix.
 */
export function addLangPrefix(pathname) {
  const prefix = langFromPath(window.location.pathname)
  return `/${prefix}${deLangPrefix(pathname)}`
}

const routerAddLangPrefix = params => {
  if (isString(params)) {
    params = addLangPrefix(params)
  } else {
    params.pathname = addLangPrefix(params.pathname)
  }
  return params
}

/**
 * Adjust the router to automatically add the current language prefix before the pathname in push and replace.
 */
const myRouter = { ...umiRouter }

myRouter.push = flow(
  routerAddLangPrefix,
  umiRouter.push
)

myRouter.replace = flow(
  routerAddLangPrefix,
  myRouter.replace
)

export const router = myRouter

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(deLangPrefix(pathname))
}

/**
 * In an array object, traverse all parent IDs based on the value of an object.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the value of the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryPathKeys(array, current, parentId, id = 'id') {
  const result = [current]
  const hashMap = new Map()
  array.forEach(item => hashMap.set(item[id], item))

  const getPath = current => {
    const currentParentId = hashMap.get(current)[parentId]
    if (currentParentId) {
      result.push(currentParentId)
      getPath(currentParentId)
    }
  }

  getPath(current)
  return result
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors(array, current, parentId, id = 'id') {
  const result = [current]
  const hashMap = new Map()
  array.forEach(item => hashMap.set(item[id], item))

  const getPath = current => {
    const currentParentId = hashMap.get(current[id])[parentId]
    if (currentParentId) {
      result.push(hashMap.get(currentParentId))
      getPath(hashMap.get(currentParentId))
    }
  }

  getPath(current)
  return result
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
export function queryLayout(layouts, pathname) {
  let result = 'public'

  const isMatch = regepx => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathMatchRegexp(regepx, pathname)
  }

  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true
          break
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true
          break
        }
      }
    }

    if (include && !exclude) {
      result = item.name
      break
    }
  }

  return result
}

export function getLocale() {
  return langFromPath(window.location.pathname)
}

export function setLocale(language) {
  if (getLocale() !== language) {
    moment.locale(language === 'zh' ? 'zh-cn' : language)
    umiRouter.push({
      pathname: `/${language}${deLangPrefix(window.location.pathname)}`,
      search: window.location.search,
    })
  }
}
