import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Avatar } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { setLocale } from 'utils'
import classnames from 'classnames'
import config from 'config'
import styles from './Header.less'

const { SubMenu } = Menu
@withI18n()
class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const { username, avatar, collapsed, onCollapseChange, i18n } = this.props

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                <Trans>Hi,</Trans>
              </span>
              <span>{username}</span>
              <Avatar style={{ marginLeft: 8 }} src={avatar} />
            </Fragment>
          }
        >
          <Menu.Item key="SignOut">
            <Trans>Sign out</Trans>
          </Menu.Item>
        </SubMenu>
      </Menu>,
    ]

    if (config.i18n) {
      const { languages } = config.i18n
      const currentLanguage = languages.find(
        item => item.key === i18n._language
      )

      rightContent.unshift(
        <Menu
          key="language"
          selectedKeys={[currentLanguage.key]}
          onClick={data => {
            setLocale(data.key)
          }}
          mode="horizontal"
        >
          <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
            {languages.map(item => (
              <Menu.Item key={item.key}>
                <Avatar
                  size="small"
                  style={{ marginRight: 8 }}
                  src={item.flag}
                />
                {item.title}
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      )
    }
    return (
      <Layout.Header className={styles.header}>
        <div
          className={styles.button}
          onClick={onCollapseChange.bind(this, !collapsed)}
        >
          <Icon
            type={classnames({
              'menu-unfold': collapsed,
              'menu-fold': !collapsed,
            })}
          />
        </div>

        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  menus: PropTypes.array,
  user: PropTypes.object,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  onCollapseChange: PropTypes.func,
}

export default Header
