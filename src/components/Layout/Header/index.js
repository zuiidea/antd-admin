import React from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import { config, ajax, signOut } from '../../utils/lib.js'
import './index.less';

const SubMenu = Menu.SubMenu;

const Header = React.createClass({
  signOut(){
    ajax({
      url:config.user.signOut
    })
  },
  render() {
    return (
      <div className='ant-layout-header'>
        <Menu className="header-menu" mode="horizontal">
          <SubMenu title={<span><Icon type="user" />{this.props.userName}</span>}>
            <Menu.Item key="signOut">
              <a onClick={this.signOut}>注销</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
})

module.exports = Header
