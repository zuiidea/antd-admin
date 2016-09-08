import React from 'react';
import {BackTop} from 'antd';
import globalConfig from 'config.js';

/**
 * 定义Footer组件
 */
class Footer extends React.Component {

  render() {
    // FIXME: gross hack
    // footer组件第一次render的时候, 不能返回BackTop, 因为main-content-div还没render
    if (this.inited) {
      return (
        <div>
          <BackTop target={() => document.getElementById('main-content-div')}/>
          <div className="ant-layout-footer">
            {globalConfig.footer || 'footer被弄丢啦!'}
          </div>
        </div>
      );
    } else {
      this.inited = true;
      return (
        <div>
          <div className="ant-layout-footer">
            {globalConfig.footer || 'footer被弄丢啦!'}
          </div>
        </div>
      );
    }

  }

}

export default Footer;
