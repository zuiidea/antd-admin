import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import Navlink from 'umi/navlink'
import { arrayToTree, queryArray, pathMatchRegexp, addLangPrefix } from 'utils'
import styles from './Layout.less'

const { SubMenu } = Menu
let openKeysFlag = false
class Menus extends PureComponent {
  render() {
    const {
      siderFold,
      darkTheme,
      navOpenKeys,
      changeOpenKeys,
      menuList,
      location,
    } = this.props
    // 生成树状
    const menuTree = arrayToTree(
      menuList.filter(_ => _.menuParentId !== '-1'),
      'id',
      'menuParentId'
    )
    const levelMap = {}

    // 递归生成菜单
    const getMenus = (menuTreeN, siderFoldN) => {
      return menuTreeN.map(item => {
        if (item.children) {
          if (item.menuParentId) {
            levelMap[item.id] = item.menuParentId
          }
          return (
            <SubMenu
              key={item.id}
              title={
                <span>
                  {item.icon && <Icon type={item.icon} />}
                  {(!siderFoldN || !menuTree.includes(item)) && item.name}
                </span>
              }
            >
              {getMenus(item.children, siderFoldN)}
            </SubMenu>
          )
        }
        return (
          <Menu.Item key={item.id}>
            <Navlink
              to={addLangPrefix(item.route) || '#'}
              style={siderFoldN ? { width: 10 } : {}}
            >
              {item.icon && <Icon type={item.icon} />}
              {item.name}
            </Navlink>
          </Menu.Item>
        )
      })
    }
    const menuItems = getMenus(menuTree, siderFold)

    // 保持选中
    const getAncestorKeys = key => {
      let map = {}
      const getParent = index => {
        const result = [String(levelMap[index])]
        if (levelMap[result[0]]) {
          result.unshift(getParent(result[0])[0])
        }
        return result
      }
      for (let index in levelMap) {
        if ({}.hasOwnProperty.call(levelMap, index)) {
          map[index] = getParent(index)
        }
      }
      return map[key] || []
    }

    const onOpenChange = openKeys => {
      if (navOpenKeys.length) {
        changeOpenKeys([])
        openKeysFlag = true
      }
      const latestOpenKey = openKeys.find(key => !navOpenKeys.includes(key))
      const latestCloseKey = navOpenKeys.find(key => !openKeys.includes(key))
      let nextOpenKeys = []
      if (latestOpenKey) {
        nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
      }
      if (latestCloseKey) {
        nextOpenKeys = getAncestorKeys(latestCloseKey)
      }
      changeOpenKeys(nextOpenKeys)
    }

    let menuProps = !siderFold
      ? {
          onOpenChange,
          openKeys: navOpenKeys,
        }
      : {}

    // 寻找选中路由
    let currentMenu
    let defaultSelectedKeys
    for (let item of menuList) {
      if (item.route && pathMatchRegexp(item.route, location.pathname)) {
        if (!navOpenKeys.length && item.menuParentId && !openKeysFlag)
          changeOpenKeys([String(item.menuParentId)])
        currentMenu = item
        break
      }
    }
    const getPathArray = (array, current, pid, id) => {
      let result = [String(current[id])]
      const getPath = item => {
        if (item && item[pid]) {
          if (item[pid] === '-1') {
            result.unshift(String(item['breadcrumbParentId']))
          } else {
            result.unshift(String(item[pid]))
            getPath(queryArray(array, id, item[pid]))
          }
        }
      }
      getPath(current)
      return result
    }
    if (currentMenu) {
      defaultSelectedKeys = getPathArray(
        menuList,
        currentMenu,
        'menuParentId',
        'id'
      )
    }

    if (!defaultSelectedKeys) {
      defaultSelectedKeys = ['1']
    }

    return (
      <Menu
        {...menuProps}
        mode={siderFold ? 'vertical' : 'inline'}
        theme={darkTheme ? 'dark' : 'light'}
        selectedKeys={defaultSelectedKeys}
        className={styles.sidemenu}
      >
        {menuItems}
      </Menu>
    )
  }
}
Menus.propTypes = {
  menuList: PropTypes.array,
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
  location: PropTypes.object,
}

export default Menus
