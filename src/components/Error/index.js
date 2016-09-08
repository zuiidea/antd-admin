import React from 'react';
import {Icon} from 'antd';
import './index.less';

/**
 * 显示错误信息
 * 可以当404页来用
 */
class Error extends React.Component {

  render() {
    return (
      <div className="not-found">
        <div style={{ fontSize:32 }}><Icon type="frown"/></div>
        <h1>{this.props.errorMsg || '404 Not Found'}</h1>
      </div>
    );
  }

}

export default Error;
