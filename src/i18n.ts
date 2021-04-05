import { config } from '@/configs/default'
import { setupI18n, I18n } from '@lingui/core'
import { en, zh, pt } from 'make-plural/plurals'
import { messages as zhMessages } from '@/locales/zh/messages.po'
import { messages as enMessages } from '@/locales/en/messages.po'
import { messages as ptMessages } from '@/locales/pt-br/messages.po'

const i18nBase: I18n = setupI18n()

i18nBase.loadLocaleData({
  en: {
    plurals: en,
  },
  zh: {
    plurals: zh,
  },
  'pt-br': {
    plurals: pt,
  },
})

i18nBase.load({
  zh: zhMessages,
  en: enMessages,
  'pt-br': ptMessages,
})

i18nBase.activate(config.language)

export const i18n = i18nBase
