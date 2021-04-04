import { ILanguage, IAntdI18nMap } from '@/typings'

export const language: ILanguage = {
  en: {
    flag: '/america.svg',
    value: 'English',
  },
  zh: {
    flag: '/china.svg',
    value: '简体中文',
  },
}

export const languages = Object.entries(language).map(([key, value]: any) => ({
  key,
  ...value,
}))

export const antdI18nMap: IAntdI18nMap = {
  zh: 'zh_CN',
  en: 'en_US',
}
