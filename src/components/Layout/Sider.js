import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch, Layout } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { config } from 'utils'
import Menus from './Menu'
import styles from './Sider.less'

@withI18n()
class Sider extends PureComponent {
  render() {
    const {
      i18n,
      menus,
      theme,
      collapsed,
      onThemeChange,
      onCollapseChange,
    } = this.props

    return (
      <Layout.Sider
        theme={theme}
        breakpoint="md"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={onCollapseChange}
      >
        <div className={styles.logoContainer}>
          <img alt="logo" src={config.logoPath} />
          {collapsed ? null : <h1>{config.siteName}</h1>}
        </div>
        <div className={styles.menuContainer}>
          <Menus menus={menus} theme={theme} collapsed={collapsed} />
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
  collapsed: PropTypes.bool,
  onThemeChange: PropTypes.func,
  onCollapseChange: PropTypes.func,
}

export default Sider
