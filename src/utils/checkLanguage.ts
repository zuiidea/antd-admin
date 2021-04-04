import { language } from '@/configs/languages'

const checkLanguage = (lang: string): string => {
  const navigatorLanguageCodeMap = {
    'zh-CN': 'zh',
  }

  if (Boolean(language[navigatorLanguageCodeMap[lang]])) {
    return navigatorLanguageCodeMap[lang]
  }

  if (Boolean(language[lang])) {
    return lang
  }

  return ''
}

export default checkLanguage
