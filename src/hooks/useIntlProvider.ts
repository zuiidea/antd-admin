import { useEffect, useContext, useState, useCallback } from 'react'
import { ConfigContext } from '@/utils/context'
import { LOCALE_LANGUAGE } from '@/configs'
import { ISupportedLocales } from '@/typings'
import { ConfigProviderProps } from 'antd/lib/config-provider'
import { antdI18nMap } from '@/configs'
import { i18n } from '@/i18n'

const useIntlProvider = () => {
  const { language } = useContext(ConfigContext)
  const [locale, setLocale] = useState<ConfigProviderProps['locale']>()

  useEffect(() => {
    const path = antdI18nMap[language]
    import(`antd/lib/locale/${path}.js`).then((data) => {
      setLocale(data.default)
    })
    localStorage.setItem(LOCALE_LANGUAGE, language)
  }, [language])

  const setLanguage = useCallback((language: ISupportedLocales) => {
    if (language !== i18n.locale) {
      localStorage.setItem(LOCALE_LANGUAGE, language)
      window.location.reload()
    }
  }, [])

  return {
    language,
    setLanguage,
    locale,
    i18n,
  }
}

export default useIntlProvider
