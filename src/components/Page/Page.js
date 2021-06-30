import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Loader from '../Loader'
import styles from './Page.less'

export default class Page extends Component {
  render() {
    const { className, children, loading = false, inner = false } = this.props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
    }
    return (
      <div
        className={classnames(className, {
          [styles.contentInner]: inner,
        })}
        style={loading ? loadingStyle : null}
      >
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    )
  }
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  inner: PropTypes.bool,
}
