import React from 'react'
import { config } from '@/configs'
import { ISupportedLocales } from '@/typings'
import { IUserInfo } from '@/services'

interface IConfigContext {
  language: ISupportedLocales
  setLanguage: (language: ISupportedLocales) => void
  userInfo: IUserInfo | null
  queryUserInfo: () => void
}

export const ConfigContext = React.createContext<IConfigContext>({
  language: config.language,
  setLanguage: (language) => null,
  userInfo: null,
  queryUserInfo: () => null,
})
