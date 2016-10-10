import React from 'react'
import items from 'menu.js'
import {Breadcrumb, Icon} from 'antd'
import {Logger} from '../../utils/lib.js'

const logger = Logger.getLogger('Breadcrumb')

const Bread = React.createClass({
  getInitialState() {
    let iconMap = new Map()
    let nameMap = new Map()
    items.forEach((level1) => {
      nameMap.set(level1.key, level1.name)
      iconMap.set(level1.key, level1.icon)
      if (level1.child) {
        level1.child.forEach((level2) => {
          nameMap.set(level2.key, level2.name)
          if (level2.child) {
            level2.child.forEach((level3) => {
              nameMap.set(level3.key, level3.name)
            })
          }
        })
      }
    })
    iconMap.set("error", "frown")
    nameMap.set("error", "页面未找到")
    return {iconMap, nameMap}
  },
  render() {
    let itemArray = []
    const _this = this
    itemArray.push(
      <Breadcrumb.Item key="systemHome" href="javascript:;"><Icon type="home"/></Breadcrumb.Item>
    )
    for (const route of this.props.routes) {
      const name = _this.state.nameMap.get(route.path)
      if (name) {
        const icon = _this.state.iconMap.get(route.path)
        if (icon) {
          itemArray.push(
            <Breadcrumb.Item key={name}><Icon type={icon}/> {name}</Breadcrumb.Item>
          )
        } else {
          itemArray.push(
            <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>
          )
        }
      }
    }
    return (
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          {itemArray}
        </Breadcrumb>
      </div>
    )
  }
})

export default Bread
