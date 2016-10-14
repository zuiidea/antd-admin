import React, {PropTypes} from 'react'
import {Breadcrumb, Icon} from 'antd'
import {Link} from 'dva/router'
import styles from './main.less'
import {config, menu} from '../../utils'

let pathSet = []
const getPathSet = function (menuArray, parentPath) {
  parentPath = parentPath || '/'
  menuArray.map(item => {
    pathSet[(parentPath + item.key).replace(/\//g, "-").hyphenToHump()] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || ''
    }
    if (!!item.child) {
      getPathSet(item.child, parentPath + item.key + '/')
    }
  })
}
getPathSet(menu)

function Bread({location}) {
  let pathNames = []
  location.pathname.substr(1).split('/').map((item, key) => {
    if (key > 0) {
      pathNames.push((pathNames[key - 1] + "-" + item).hyphenToHump())
    } else {
      pathNames.push(("-" + item).hyphenToHump())
    }
  })
  const breads = pathNames.map((item, key) => {
    return (
      <Breadcrumb.Item key={key}>
        <Link to={pathSet[item].path}>
          {pathSet[item].icon
            ? <Icon type={pathSet[item].icon}/>
            : ''}
          {pathSet[item].name}
        </Link>
      </Breadcrumb.Item>
    )
  })

  return (
    <div className={styles.bread}>
      <Breadcrumb>
        <Breadcrumb.Item>仪表盘</Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object
}

export default Bread
