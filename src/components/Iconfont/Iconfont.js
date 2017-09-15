import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './iconfont.less'

const Iconfont = ({ type, colorful = false, className }) => {
  if (colorful) {
    return (
      <svg className={classnames('colorful-icon', className)} aria-hidden="true">
        <use xlinkHref={`#${type.startsWith('#') ? type.replace(/#/, '') : type}`} />
      </svg>
    )
  }

  return <i className={classnames('antdadmin', [`icon-${type}`], className)} />
}

Iconfont.propTypes = {
  type: PropTypes.string.isRequired,
  colorful: PropTypes.bool,
  className: PropTypes.string,
}

export default Iconfont
