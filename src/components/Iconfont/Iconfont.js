import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './iconfont.less'

const Iconfont = ({ type, colorful, spin, ...props }) => {
  if (colorful) {
    return (<span
      className={classNames({
        'antdadminicon-spin': !!spin || type === 'loading',
      })}
      {...props}
      dangerouslySetInnerHTML={{
        __html: `<svg class="colorful-icon" aria-hidden="true"><use xlink:href="#${type.startsWith('#') ? type.replace(/#/, '') : type}"></use></svg>`,
      }}
    />)
  }
  return (
    <i className={classNames(`antdadmin icon-${type}`, {
      'antdadminicon-spin': !!spin || type === 'loading',
    })} {...props} />
  )
}

Iconfont.propTypes = {
  type: PropTypes.string,
  colorful: PropTypes.bool,
  spin: PropTypes.bool,
}

export default Iconfont
