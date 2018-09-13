const catalogs = {
  en: { messages: require('../locales/en/messages.json') },
  zh: { messages: require('../locales/zh/messages.json') },
}

const defaultLanguage = 'en'

const languages = []
for (const key in catalogs) {
  languages.push(key)
}

/**
 * Remove the language prefix in pathname.
 * @param   {string}    pathname   Remove the language prefix in pathname.
 * @return  {string}    Return the pathname after removing the language prefix.
 */
const deLangPrefix = pathname => {
  for (const item of languages) {
    if (pathname.startsWith(`/${item}/`)) {
      return pathname.replace(`/${item}/`, '/')
    }
  }

  return pathname
}

/**
 * Query language from pathname.
 * @param   {string}    pathname   Pathname to be queried.
 * @return  {string}    Return the queryed language.
 */
const langFromPath = pathname => {
  for (const item of languages) {
    if (pathname.startsWith(`/${item}/`)) {
      return item
    }
  }
  return defaultLanguage
}

export { languages, catalogs, langFromPath, deLangPrefix, defaultLanguage }
