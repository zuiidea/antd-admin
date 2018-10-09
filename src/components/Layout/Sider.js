import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch, Layout, Drawer } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { config } from 'utils'
import SiderMenu from './Menu'
import styles from './Sider.less'

@withI18n()
class Sider extends PureComponent {
  render() {
    const {
      i18n,
      menus,
      theme,
      isMobile,
      collapsed,
      onThemeChange,
      onCollapseChange,
    } = this.props

    return (
      <Layout.Sider
        theme={theme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={isMobile ? null : onCollapseChange}
      >
        <div className={styles.logoContainer}>
          <img alt="logo" src={config.logoPath} />
          {collapsed ? null : <h1>{config.siteName}</h1>}
        </div>
        <div className={styles.menuContainer}>
          <SiderMenu
            menus={menus}
            theme={theme}
            isMobile={isMobile}
            collapsed={collapsed}
            onCollapseChange={onCollapseChange}
          />
        </div>
        {collapsed ? null : (
          <div className={styles.switchTheme}>
            <span>
              <Icon type="bulb" />
              <Trans>Switch Theme</Trans>
            </span>
            <Switch
              onChange={onThemeChange.bind(
                this,
                theme === 'dark' ? 'light' : 'dark'
              )}
              defaultChecked={theme === 'dark'}
              checkedChildren={i18n.t`Dark`}
              unCheckedChildren={i18n.t`Light`}
            />
          </div>
        )}
      </Layout.Sider>
    )
  }
}

Sider.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  onThemeChange: PropTypes.func,
  onCollapseChange: PropTypes.func,
}

export default Sider
