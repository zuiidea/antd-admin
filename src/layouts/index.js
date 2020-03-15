import React, { Component } from 'react'
import { withRouter, setLocale } from 'umi'
import { ConfigProvider } from 'antd'
import { langFromPath, defaultLanguage } from 'utils'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import pt_BR from 'antd/lib/locale-provider/pt_BR'

import BaseLayout from './BaseLayout'

const languages = {
  zh: zh_CN,
  en: en_US,
  'pt-br': pt_BR,
}

@withRouter
class Layout extends Component {
  state = {
    catalogs: {},
  }

  language = defaultLanguage

  componentDidMount() {
  }

  shouldComponentUpdate(nextProps, nextState) {
  }

  loadCatalog = async language => {
    // false means no refresh
    setLocale(language, false)
  }

  render() {
    const { location, children } = this.props
    const { catalogs } = this.state

    let language = langFromPath(location.pathname)
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
