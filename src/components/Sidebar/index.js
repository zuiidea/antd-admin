import React from 'react'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'
import Logger from '../../utils/logger'
import items from 'menu.js'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const logger = Logger.getLogger('Sidebar')

const Sider = React.createClass({
  getInitialState() {
    let fixed=false;
    let fixedText="固定";
    if(window.localStorage.getItem("mgFixedSider")&&window.localStorage.getItem("mgFixedSider")=="true"){
      fixed=true;
      fixedText="取消";
    }
    return {
      fixed:fixed,
      collapse: true,
      fixedText:fixedText
    }
  },
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  },
  switchFixed(){
    window.localStorage.setItem("mgFixedSider",!this.state.fixed);
    this.setState({
      fixed: !this.state.fixed
    });
    if(this.state.fixedText=="固定"){
      this.setState({
        fixed: !this.state.fixed,
        fixedText:"取消"
      });
    } else {
      this.setState({
        fixed: !this.state.fixed,
        fixedText:"固定"
      });
    }
  },
  transFormMenuItem(obj, paths) {
    const parentPath = paths.join('/')
    return (
      <MenuItem key={obj.key}>
        {obj.child ? obj.name : <Link to={`/${parentPath}`}>{obj.name}</Link> }
      </MenuItem>
    )
  },
  componentWillMount() {
    const paths = []
    const defaultOpenKeys = []
    const menu = items.map((level1) => {
      paths.push(level1.key)
      if (defaultOpenKeys.length === 0) {
        defaultOpenKeys.push(level1.key)
      }
      if (level1.child) {
        const level2menu = level1.child.map((level2) => {
          paths.push(level2.key)
          if (level2.child) {
            const level3menu = level2.child.map((level3) => {
              paths.push(level3.key)
              const tmp = this.transFormMenuItem(level3, paths)
              paths.pop()
              return tmp
            })
            paths.pop()
            return (
              <SubMenu key={level2.key} title={level2.name}>
                {level3menu}
              </SubMenu>
            )
          } else {
            const tmp = this.transFormMenuItem(level2, paths)
            paths.pop()
            return tmp
          }
        })
        paths.pop()
        return (
          <SubMenu key={level1.key} title={<span><Icon type={level1.icon} />{level1.name}</span>}>
            {level2menu}
          </SubMenu>
        )
      }
      else {
        const tmp = this.transFormMenuItem(level1, paths)
        paths.pop()
        return tmp
      }
    })
    this.menu = menu
    this.defaultOpenKeys = defaultOpenKeys
  },
  render() {
    const collapse = this.state.collapse
    return (
        <div>
          <div className="ant-layout-logo m-y">
            <img src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
            <span>Ant Design</span>
         </div>
          <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
            {this.menu}
          </Menu>
          <div className="ant-aside-action" onClick={this.onCollapseChange}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </div>
    )
  }
})

module.exports = Sider
