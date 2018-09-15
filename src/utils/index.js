import { cloneDeep, isString, flow, curry } from 'lodash'
import umiRouter from 'umi/router'
import pathToRegexp from 'path-to-regexp'
import { i18n } from './config'

export classnames from 'classnames'
export config from './config'
export request from './request'
export { Color } from './theme'

export const { languages, defaultLanguage } = i18n

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|null}   Return frist object when query success.
 */
export function queryArray(array, key, value) {
  if (!Array.isArray(array)) {
    return null
  }
  const item = array.filter(_ => _[key] === value)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    pid       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array,
  id = 'id',
  pid = 'pid',
  children = 'children'
) {
  const result = []
  const hash = {}
  const data = cloneDeep(array)

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach(item => {
    const hashParent = hash[item[pid]]
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

export const addLangPrefix = curry(
  /**
   * Add the language prefix in pathname.
   * @param   {array}     prefix     Specify the language you need to add.
   * @param   {string}    pathname   Add the language prefix in the pathname.
   * @return  {string}    Return the pathname after adding the language prefix.
   */
  (prefix, pathname) => `/${prefix}${deLangPrefix(pathname)}`
)(langFromPath(window.location.pathname))

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
export const pathMatchRegexp = (regexp, pathname) => {
  return pathToRegexp(regexp).exec(deLangPrefix(pathname))
}
