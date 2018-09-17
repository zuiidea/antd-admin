import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import Link from 'umi/navlink'
import pathToRegexp from 'path-to-regexp'
import { queryArray, addLangPrefix, pathMatchRegexp, deLangPrefix } from 'utils'
import { withI18n } from '@lingui/react'
import styles from './Layout.less'

@withI18n()
class Bread extends PureComponent {
  render() {
    const { menuList, location, i18n } = this.props
    // 匹配当前路由
    let pathArray = []
    let current
    for (let index in menuList) {
      if (
        menuList[index].route &&
        pathMatchRegexp(menuList[index].route, location.pathname)
      ) {
        current = menuList[index]
        break
      }
    }

    const getPathArray = item => {
      pathArray.unshift(item)
      if (item.breadcrumbParentId) {
        getPathArray(queryArray(menuList, 'id', item.breadcrumbParentId))
      }
    }

    let paramMap = {}
    if (!current) {
      pathArray.push(
        menuList[0] || {
          id: 1,
          icon: 'laptop',
          name: i18n.t`Dashboard`,
        }
      )
      pathArray.push({
        id: 404,
        name: i18n.t`Not Found`,
      })
    } else {
      getPathArray(current)

      let keys = []
      let values = pathToRegexp(current.route, keys).exec(
        deLangPrefix(location.pathname)
      )
      if (keys.length) {
        keys.forEach((currentValue, index) => {
          if (typeof currentValue.name !== 'string') {
            return
          }
          paramMap[currentValue.name] = values[index + 1]
        })
      }
    }

    // 递归查找父级
    const breads = pathArray.map((item, key) => {
      const content = (
        <span>
          {item.icon ? (
            <Icon type={item.icon} style={{ marginRight: 4 }} />
          ) : (
            ''
          )}
          {item.name}
        </span>
      )
      return (
        <Breadcrumb.Item key={key}>
          {pathArray.length - 1 !== key ? (
            <Link
              to={
                addLangPrefix(
                  pathToRegexp.compile(item.route || '')(paramMap)
                ) || '#'
              }
            >
              {content}
            </Link>
          ) : (
            content
          )}
        </Breadcrumb.Item>
      )
    })

    return (
      <div className={styles.bread}>
        <Breadcrumb>{breads}</Breadcrumb>
      </div>
    )
  }
}

Bread.propTypes = {
  menu: PropTypes.array,
  location: PropTypes.object,
}

export default Bread
