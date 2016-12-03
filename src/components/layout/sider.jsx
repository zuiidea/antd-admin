import React, { PropTypes } from 'react'
import { Menu, Icon, Switch } from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'
import { config, menu } from '../../utils'


const topMenus = menu.map( item => item.key)
const getMenus = function (menuArray,siderFold,parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (!!item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold&&topMenus.indexOf(item.key)>=0 ? '' : item.name}</span>}>
          {getMenus(item.child,siderFold,parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold&&topMenus.indexOf(item.key)>=0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Sider({ siderFold,darkTheme,location,changeTheme }) {
  console.log(location);
  return (
    <div>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
        {siderFold?'':<span>{config.logoText}</span>}
      </div>
      <Menu
        mode={siderFold?"vertical":"inline"}
        theme={darkTheme?"dark":"light"}
        defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1]||'dashboard']}>
        {getMenus(menu,siderFold)}
      </Menu>
      {!siderFold?<div className={styles.switchtheme}>
        <span><Icon type="bulb" />切换主题</span>
        <Switch onChange={changeTheme} defaultChecked={true} checkedChildren="黑" unCheckedChildren="白" />
      </div>:''}
    </div>
  )
}

export default Sider
