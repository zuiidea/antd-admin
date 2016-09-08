import React from 'react';
import {Link} from 'react-router';
import {Menu, Icon} from 'antd';
import Logo from '../Logo';
import Logger from '../../utils/Logger';
import items from 'menu.js';  // 由于webpack中的设置, 不用写完整路径

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

const logger = Logger.getLogger('Sidebar');

/**
 * 定义sidebar组件
 */
class Sidebar extends React.Component {

  /**
   * 将菜单项配置转换为对应的MenuItem组件
   *
   * @param obj sidebar菜单配置项
   * @param paths 父级目录, array
   * @returns {XML}
   */
  transFormMenuItem(obj, paths) {
    const parentPath = paths.join('/');   // 将各级父目录组合成完整的路径
    logger.debug('transform %o to path %s', obj, parentPath);

    // 这个表达式还是有点恶心的...
    // JSX虽然方便, 但是很容易被滥用, ES6也是
    return (
      <MenuItem key={obj.key}>
        {obj.child ? obj.name : <Link to={`/${parentPath}`}>{obj.name}</Link> }
      </MenuItem>
    );
  }

  // 在每次组件挂载的时候parse一次菜单, 不用每次render都解析
  componentWillMount() {
    const paths = [];  // 暂存各级路径, 当作stack用
    const defaultOpenKeys = [];

    // 菜单项是从配置中读取的, parse过程还是有点复杂的
    // map函数很好用
    const menu = items.map((level1) => {
      // parse一级菜单
      paths.push(level1.key);
      if (defaultOpenKeys.length === 0) {
        defaultOpenKeys.push(level1.key);  // 默认展开第一个菜单
      }

      // 是否有子菜单?
      if (level1.child) {
        const level2menu = level1.child.map((level2) => {
          // parse二级菜单
          paths.push(level2.key);
          if (level2.child) {
            const level3menu = level2.child.map((level3) => {
              // parse三级菜单, 不可能再有子菜单了
              paths.push(level3.key);
              const tmp = this.transFormMenuItem(level3, paths);
              paths.pop();
              return tmp;
            });

            paths.pop();
            return (
              <SubMenu key={level2.key} title={level2.name}>
                {level3menu}
              </SubMenu>
            );

          } else {
            const tmp = this.transFormMenuItem(level2, paths);
            paths.pop();
            return tmp;
          }
        });

        paths.pop();
        return (
          <SubMenu key={level1.key} title={<span><Icon type={level1.icon} />{level1.name}</span>}>
            {level2menu}
          </SubMenu>
        )
      }
      // 没有子菜单, 直接转换为MenuItem
      else {
        const tmp = this.transFormMenuItem(level1, paths);
        paths.pop();  // return之前别忘了pop
        return tmp;
      }
    });

    this.menu = menu;
    this.defaultOpenKeys = defaultOpenKeys;
  }

  render() {
    // 这些样式其实是在App/index.less中定义的
    return (
      <aside className="ant-layout-sider">
        <Logo />
        <Menu theme="dark" mode="inline" defaultOpenKeys={this.defaultOpenKeys}>
          {this.menu}
        </Menu>
      </aside>
    );
  }

}

export default Sidebar;
