import React from 'react'
import { Dropdown, Menu, Avatar } from 'antd'
import { language, languages } from '@/configs'
import { ISupportedLocales } from '@/typings'
import { Trans } from '@lingui/macro'
import { history } from 'umi'
import { useRequest, useConfig } from '@/hooks'
import { logoutUser } from '@/services'
import styles from './index.less'

const { SubMenu } = Menu

const NotFoundPage: React.FC = () => {
  const { language: locale, setLanguage, userInfo } = useConfig()
  const currentLanguage = language[locale]
  const { run: runLogoutUser } = useRequest(logoutUser, {
    manual: true,
    onSuccess: () => history.push('/login'),
  })

  return (
    <>
      <Dropdown
        overlay={
          <Menu
            selectedKeys={[currentLanguage.value]}
            onClick={(data) => {
              setLanguage(data.key as ISupportedLocales)
            }}
          >
            {languages.map((item) => (
              <Menu.Item key={item.key}>
                <Avatar
                  size="small"
                  style={{ marginRight: 8 }}
                  src={item.flag}
                />
                {item.value}
              </Menu.Item>
            ))}
          </Menu>
        }
      >
        <div className={styles.headerButton}>
          <Avatar size="small" src={currentLanguage.flag} />
        </div>
      </Dropdown>
      <Menu key="user" mode="horizontal">
        <SubMenu
          title={
            <>
              <span style={{ color: '#999', marginRight: 4 }}>
                <Trans>Hi,</Trans>
              </span>
              <span>{userInfo?.username}</span>
              <Avatar style={{ marginLeft: 8 }} src={userInfo?.avatar} />
            </>
          }
        >
          <Menu.Item key="SignOut" onClick={() => runLogoutUser()}>
            <Trans>Sign out</Trans>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  )
}

export default NotFoundPage
