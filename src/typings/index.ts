import { ISupportedLocales } from '@/typings'
export * from './language'
export * from './menu'
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
  apiPrefix: string
  layouts: ILayouItem[]
}
