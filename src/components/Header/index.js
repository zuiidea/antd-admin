import React from 'react';
import {Icon, Menu, Dropdown} from 'antd';
import globalConfig from 'config';
import './index.less';

const SubMenu = Menu.SubMenu;  // 为了使用方便

/**
 * 定义Header组件, 包括登录/注销的链接, 以及一些自定义链接
 */
class Header extends React.Component {

  render() {
    return (
      <div className='ant-layout-header'>
        {/*定义header中的菜单*/}
        <Menu className="header-menu" mode="horizontal">
          <SubMenu title={<span><Icon type="user" />{this.props.userName}</span>}>
            <Menu.Item key="logout">
              <a href={`${globalConfig.getAPIPath()}${globalConfig.login.logout}`}>注销</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }

}

export default Header;
