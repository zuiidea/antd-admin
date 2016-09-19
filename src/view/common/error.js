import React from 'react'
import { Icon } from 'antd'
import './error.less'

const Error = React.createClass({
  render() {
    return (
      <div className="not-found">
        <div style={{ fontSize:32 }}><Icon type="frown"/></div>
        <h1>{this.props.errorMsg || '404 Not Found'}</h1>
      </div>
    );
  }
})

module.exports = Error
