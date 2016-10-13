import React, { PropTypes } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'

const SubMenu = Menu.SubMenu

function getMenuKeyFromUrl(pathname) {
  let key = ''
  try {
    key = pathname.match(/\/([^\/]*)/i)[1]
    /* eslint no-empty:0 */
  } catch (e) {}
  return key
}

function Header({ location }) {
  console.log(getMenuKeyFromUrl(location.pathname),location.pathname);
  return (
    <div className={styles.header}>
      <Menu className="header-menu" mode="horizontal">
        <SubMenu title={<span><Icon type="user" />吴彦祖</span>}>
          <Menu.Item key="signOut">
            <a>注销</a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

Header.propTypes = {
  location: PropTypes.object,
}

export default Header
