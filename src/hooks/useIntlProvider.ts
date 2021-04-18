import { useEffect, useContext, useState, useCallback } from 'react'
import { ConfigContext } from '@/utils/context'
import { LOCALE_LANGUAGE } from '@/configs'
import { ISupportedLocales } from '@/typings'
import { ConfigProviderProps } from 'antd/lib/config-provider'
import { antdI18nMap } from '@/configs'
import { i18n } from '@/i18n'
import zh_CN from 'antd/lib/locale/zh_CN'
import en_US from 'antd/lib/locale/en_US'
import pt_BR from 'antd/lib/locale/pt_BR'

const antdLocaleMap = {
  zh_CN,
  en_US,
  pt_BR
}

const useIntlProvider = () => {
  const { language } = useContext(ConfigContext)
  const [locale, setLocale] = useState<ConfigProviderProps['locale']>()

  useEffect(() => {
    setLocale(antdLocaleMap[antdI18nMap[language]])
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
