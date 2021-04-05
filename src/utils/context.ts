import React from 'react'
import { config } from '@/configs'
import { ISupportedLocales } from '@/typings'

interface IConfigContext {
  language: ISupportedLocales
  setLanguage: (language: ISupportedLocales) => void
}

export const ConfigContext = React.createContext<IConfigContext>({
  language: config.language,
  setLanguage: (language) => null,
})
