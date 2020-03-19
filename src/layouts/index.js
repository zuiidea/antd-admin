import React, { Component } from 'react'
import { withRouter } from 'umi'
import { ConfigProvider } from 'antd'
import { I18nProvider } from '@lingui/react'
import { getLocale } from 'utils'
const { i18n } = require('../../src/utils/config')
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import pt_BR from 'antd/lib/locale-provider/pt_BR'

import BaseLayout from './BaseLayout'

const languages = {
  zh: zh_CN,
  en: en_US,
  'pt-br': pt_BR,
}
const { defaultLanguage } = i18n

@withRouter
class Layout extends Component {
  state = {
    catalogs: {},
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
    const { catalogs } = nextState

    if (preLanguage !== language && !catalogs[language]) {
      language && this.loadCatalog(language)
      this.language = language
      return false
    }
    this.language = language

    return true
  }

  loadCatalog = async language => {
    const catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `@lingui/loader!../locales/${language}/messages.json`
    )

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalog,
      },
    }))
  }

  render() {
    const { children } = this.props
    const { catalogs } = this.state

    let language = getLocale()
    // If the language pack is not loaded or is loading, use the default language
    if (!catalogs[language]) language = defaultLanguage

    return (
      <ConfigProvider locale={languages[language]}>
        <I18nProvider language={language} catalogs={catalogs}>
          <BaseLayout>{children}</BaseLayout>
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default Layout
