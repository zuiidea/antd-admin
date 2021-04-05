import { ILanguage, ILanguages, IAntdI18nMap } from '@/typings'

/**
 * Countrys flags: https://www.flaticon.com/packs/countrys-flags
 */
export const language: ILanguage = {
  en: {
    flag: '/america.svg',
    value: 'English',
  },
  zh: {
    flag: '/china.svg',
    value: '简体中文',
  },
  'pt-br': {
    flag: '/portugal.svg',
    value: 'Português',
  },
}

export const languages: ILanguages[] = Object.entries(language).map(
  ([key, value]: any) => ({
    key,
    ...value,
  })
)

export const antdI18nMap: IAntdI18nMap = {
  zh: 'zh_CN',
  en: 'en_US',
  'pt-br': 'pt_PT',
}
