import React, { Component } from 'react'
import classnames from 'classnames'
import Loader from '../Loader'

export default class Page extends Component {
  render () {
    const { className, children, loading = false } = this.props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
    }
    return (
      <div className={classnames(className)} style={loading ? loadingStyle : null}>
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    )
  }
}
