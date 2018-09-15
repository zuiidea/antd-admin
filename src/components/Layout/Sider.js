import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { config } from 'utils'
import styles from './Layout.less'
import Menus from './Menu'

@withI18n()
class Sider extends PureComponent {
  render() {
    const {
      siderFold,
      darkTheme,
      location,
      changeTheme,
      navOpenKeys,
      changeOpenKeys,
      menu,
      i18n,
    } = this.props

    const menusProps = {
      menu,
      siderFold,
      darkTheme,
      location,
      navOpenKeys,
      changeOpenKeys,
    }
    return (
      <div>
        <div className={styles.logo}>
          <img alt="logo" src={config.logoPath} />
          {siderFold ? '' : <span>{config.siteName}</span>}
        </div>
        <Menus {...menusProps} />
        {!siderFold ? (
          <div className={styles.switchtheme}>
            <span>
              <Icon type="bulb" />
              <Trans>Switch Theme</Trans>
            </span>
            <Switch
              onChange={changeTheme}
              defaultChecked={darkTheme}
              checkedChildren={i18n.t`Dark`}
              unCheckedChildren={i18n.t`Light`}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

Sider.propTypes = {
  menu: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  changeTheme: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Sider
