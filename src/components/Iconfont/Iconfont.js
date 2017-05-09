import React from 'react'
import PropTypes from 'prop-types'
import './iconfont.less'

const Iconfont = ({ type, colorful }) => {
  if (colorful) {
    return (<span
      dangerouslySetInnerHTML={{
        __html: `<svg class="colorful-icon" aria-hidden="true"><use xlink:href="#${type.startsWith('#') ? type.replace(/#/, '') : type}"></use></svg>`,
      }}
    />)
  }
  return <i className={`antdadmin icon-${type}`} />
}

Iconfont.propTypes = {
  type: PropTypes.string,
  colorful: PropTypes.bool,
}

export default Iconfont
