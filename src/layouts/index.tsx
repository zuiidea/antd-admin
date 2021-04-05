import React from 'react'
import { ConfigProvider } from 'antd'
import { I18nProvider } from '@lingui/react'
import { useIntlProvider } from '@/hooks'
import { ConfigContext } from '@/utils/context'
import BaseLayout from './BaseLayout'

const Layout: React.FC = (props) => {
  const { language, setLanguage, i18n, locale } = useIntlProvider()
  const globalConfig = {
    language,
    setLanguage,
  }
  return (
    <ConfigContext.Provider value={globalConfig}>
      <I18nProvider i18n={i18n}>
        <ConfigProvider locale={locale}>
          <BaseLayout>{props.children}</BaseLayout>
        </ConfigProvider>
      </I18nProvider>
    </ConfigContext.Provider>
  )
}

export default Layout
