export type ISupportedLocales = 'en' | 'zh'

export interface IConfigContext {
  language: ISupportedLocales
  setLanguage: (language: ISupportedLocales) => void
}

export interface ILanguageItem {
  flag: string
  value: string
}

export interface ILanguage {
  [key: string]: ILanguageItem
}

export interface ILanguages {
  key: string
  flag: string
  value: string
}

export interface IAntdI18nMap {
  [key: string]: string
}

export interface ILayouItem {
  name: string
  include?: any[]
  exlude?: any[]
}

export interface IConfig {
  language: ISupportedLocales
  title: string
  logo: string
  copyright: string
  layouts: ILayouItem[]
}
