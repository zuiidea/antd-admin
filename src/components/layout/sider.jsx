import React, {PropTypes} from 'react'
import {Menu, Icon} from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'
import {config, menu} from '../../utils'

const getMenus = function (menuArray,parentPath){
  parentPath = parentPath || '/'
  return menuArray.map(item =>{
    if(!!item.child){
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon}/>: ''} {item.name}</span>}>
          {getMenus(item.child,parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    }else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon}/>: ''}
            {item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Sider({location}) {
  return (
    <div>
      <div className={styles.logo}>
        <img src={config.logoSrc}/>
        <span>{config.logoText}</span>
      </div>
      <Menu mode="inline" theme="dark" defaultSelectedKeys={['dashboard']}>
        {getMenus(menu)}
      </Menu>
    </div>
  )
}

Sider.propTypes = {
  location: PropTypes.object
}

export default Sider
