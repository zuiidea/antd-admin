import React from 'react'
import { config } from '@/configs'
import { IConfigContext } from '@/typings'

export const ConfigContext = React.createContext<IConfigContext>({
  language: config.language,
  setLanguage: language => null,
})
