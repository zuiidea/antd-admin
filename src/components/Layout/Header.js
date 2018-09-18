import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout } from 'antd'
import { Trans } from '@lingui/react'
import classnames from 'classnames'
import styles from './Header.less'

const { SubMenu } = Menu

class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const { user, collapsed, onCollapseChange } = this.props

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

        <div className={styles.rightContainer}>
          <Menu mode="horizontal" onClick={this.handleClickMenu}>
            <SubMenu
              title={
                <Fragment>
                  <Icon type="user" />
                  {user.username}
                </Fragment>
              }
            >
              <Menu.Item key="SignOut">
                <Trans>Sign out</Trans>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
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
