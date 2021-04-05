export type ISupportedLocales = 'en' | 'zh' | 'pt-br'

export interface ILanguageItem {
  flag: string
  value: string
}

export interface ILanguage {
  [key: string]: ILanguageItem
}

export interface ILanguages {
  key: ISupportedLocales
  flag: string
  value: string
}

export interface IAntdI18nMap {
  [key: string]: string
}
