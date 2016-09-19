import React from 'react';
import {BackTop} from 'antd';
import {config} from '../../utils/lib.js'

const Footer = React.createClass({
  render() {
    return (
      <div>
        <div className="ant-layout-footer">
          {config.footer}
        </div>
      </div>
    )
  }
})

export default Footer;
