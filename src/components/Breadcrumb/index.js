import React from 'react';
import {Breadcrumb, Icon} from 'antd';
import items from 'menu.js';
import Logger from '../../utils/Logger';

const Item = Breadcrumb.Item;
const logger = Logger.getLogger('Breadcrumb');

/**
 * 定义面包屑导航, 由于和已有的组件重名, 所以改个类名
 */
class Bread extends React.Component {

  static inited = false;  // 表示下面两个map是否初始化
  static iconMap = new Map();  // 暂存menu.js中key->icon的对应关系
  static nameMap = new Map();  // 暂存menu.js中key->name的对应关系

  // 初始化iconMap和nameMap
  static init() {
    // 箭头函数还是很好用的
    items.forEach((level1) => {
      Bread.nameMap.set(level1.key, level1.name);
      logger.debug('nameMap add entry: key=%s, value=%s', level1.key, level1.name);
      Bread.iconMap.set(level1.key, level1.icon);
      logger.debug('iconMap add entry: key=%s, value=%s', level1.key, level1.icon);

      if (level1.child) {
        level1.child.forEach((level2) => {
          Bread.nameMap.set(level2.key, level2.name);
          logger.debug('nameMap add entry: key=%s, value=%s', level2.key, level2.name);

          if (level2.child) {
            level2.child.forEach((level3)=> {
              Bread.nameMap.set(level3.key, level3.name);
              logger.debug('nameMap add entry: key=%s, value=%s', level3.key, level3.name);
            });
          }
        });
      }
    });
  }

  render() {
    // render之前判断是否要初始化
    if (!Bread.inited) {
      logger.debug('not inited, calling init method');
      Bread.init();
      Bread.inited = true;
    }

    const itemArray = [];

    // 面包屑导航的最开始都是一个home图标, 并且这个图标时可以点击的
    itemArray.push(<Item key="systemHome" href="#"><Icon type="home"/></Item>);

    for (const route of this.props.routes) {
      logger.debug('path=%s, route=%o', route.path, route);
      const name = Bread.nameMap.get(route.path);

      if (name) {
        const icon = Bread.iconMap.get(route.path);
        if (icon) {
          itemArray.push(<Item key={name}><Icon type={icon}/> {name}</Item>);  // 有图标的话带上图标
        } else {
          // 这个key属性不是antd需要的, 只是react要求同一个array中各个元素要是不同的, 否则有warning
          itemArray.push(<Item key={name}>{name}</Item>);
        }
      }
    }

    // 这个面包屑是不可点击的(除了第一级的home图标), 只是给用户一个提示
    return (
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>{itemArray}</Breadcrumb>
      </div>
    );
  }

}

export default Bread;
