import React, { Component } from 'react'
import { withRouter } from 'umi'
import { ConfigProvider } from 'antd'
import { i18n } from "@lingui/core"
import { I18nProvider } from '@lingui/react'
import { getLocale } from 'utils'
import { zh, en, pt } from 'make-plural/plurals'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import ptBR from 'antd/lib/locale/pt_BR'

import BaseLayout from './BaseLayout'

i18n.loadLocaleData({
  en: { plurals: en },
  zh: { plurals: zh },
  'pt-br': { plurals: pt }
})

// antd
const languages = {
  zh: zhCN,
  en: enUS,
  'pt-br': ptBR
}

const { defaultLanguage } = i18n

@withRouter
class Layout extends Component {
  state = {
  }

  componentDidMount() {
  }

  loadCatalog = async (lan) => {
    const catalog = await import(
      `../locales/${lan}/messages.json`
    )

    i18n.load(lan, catalog)
    i18n.activate(lan)
  }

  render() {
    const { children } = this.props

    let language = getLocale()

    if (!languages[language]) language = defaultLanguage

    this.loadCatalog(language)

    return (
      <ConfigProvider locale={languages[language]}>
        <I18nProvider i18n={i18n}>
          <BaseLayout>{children}</BaseLayout>
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default Layout
