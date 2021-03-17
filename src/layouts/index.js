import React, { Component } from 'react'
import { withRouter } from 'umi'
import { ConfigProvider } from 'antd'
import { i18n } from "@lingui/core"
import { I18nProvider } from '@lingui/react'
import { getLocale } from 'utils'
import { zh, en, pt } from 'make-plural/plurals'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import pt_BR from 'antd/lib/locale-provider/pt_BR'

import BaseLayout from './BaseLayout'

const plurals =  {
  zh,
  en,
  'pt-br': pt,
}

const languages = {
  zh: zh_CN,
  en: en_US,
  'pt-br': pt_BR,
}
const { defaultLanguage } = i18n

@withRouter
class Layout extends Component {
  state = {
  }

  language = defaultLanguage

  componentDidMount() {
    const language = getLocale()
    this.language = language
    language && this.loadCatalog(language)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const language = getLocale()
    const preLanguage = this.language

    if (preLanguage !== language && !languages[language]) {
      language && this.loadCatalog(language)
      this.language = language
      return false
    }
    this.language = language

    return true
  }

  loadCatalog = async language => {
    const catalog = await import(
      `../locales/${language}/messages.json`
    )

    i18n.load(language, catalog)
    i18n.activate(language)
  }

  render() {
    const { children } = this.props

    let language = getLocale()
    // If the language pack is not loaded or is loading, use the default language
    if (!languages[language]) language = defaultLanguage

    i18n.loadLocaleData(language, { plurals: plurals[language] })
    i18n.load(language, languages[language])
    i18n.activate(language)

    return (
      <ConfigProvider locale={language}>
        <I18nProvider i18n={i18n}>
          <BaseLayout>{children}</BaseLayout>
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default Layout
