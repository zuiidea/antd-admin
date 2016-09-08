import React from 'react';
import './index.less';

/**
 * 展示欢迎界面
 */
class Welcome extends React.Component {

  render() {
    return (
      <div>
        <h1 className="welcome">
          Welcome, 这里是欢迎界面, 欢迎访问我的<a target="_blank" href="http://jxy.me">blog</a>.
          <br />
          项目地址: <a target="_blank" href="https://github.com/jiangxy/react-antd-admin">https://github.com/jiangxy/react-antd-admin</a>
        </h1>
      </div>
    );
  }

}

export default Welcome;
