import React from 'react'
import { history } from 'umi'
import { ConfigProvider } from 'antd'
import { I18nProvider } from '@lingui/react'
import {
  useIntlProvider,
  useRequest,
} from '@/hooks'
// @ts-ignore
import { Outlet } from 'umi'
import { ConfigContext } from '@/utils/context'
import request from '@/utils/request'
import { queryUserInfo, IUserInfo } from '@/services'
import BaseLayout from './BaseLayout'

const Layout: React.FC = (props) => {
  const { language, setLanguage, i18n, locale } = useIntlProvider()

  const {
    data: userInfo,
    run: runQueryUserInfo,
    loading,
  } = useRequest<IUserInfo>(queryUserInfo, {
    onError: (data: any) => {
      if (data.statusCode === 401) {
        history.push('/login')
      }
    },
  })

  const globalConfig = {
    language,
    setLanguage,
    userInfo: userInfo as IUserInfo,
    queryUserInfo: runQueryUserInfo,
  }

  if (loading) {
    return <div>loading</div>
  }

  return (
    <ConfigContext.Provider value={globalConfig}>
      <I18nProvider i18n={i18n}>
        <ConfigProvider locale={locale}>
          <BaseLayout><Outlet /></BaseLayout>
        </ConfigProvider>
      </I18nProvider>
    </ConfigContext.Provider>
  )
}

export default Layout
