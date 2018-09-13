import React, { PureComponent } from 'react'
import withRouter from 'umi/withRouter'
import { LocaleProvider } from 'antd'
import { I18nProvider } from '@lingui/react'
import { catalogs, langFromPath } from 'utils/i18n'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import BaseLayout from './BaseLayout'

const languages = {
  zh: zh_CN,
  en: en_US,
}
@withRouter
class Layout extends PureComponent {
  render() {
    const { location, children } = this.props
    const lang = langFromPath(location.pathname)

    return (
      <LocaleProvider locale={languages[lang]}>
        <I18nProvider language={lang} catalogs={catalogs}>
          <BaseLayout>{children}</BaseLayout>
        </I18nProvider>
      </LocaleProvider>
    )
  }
}

export default Layout
