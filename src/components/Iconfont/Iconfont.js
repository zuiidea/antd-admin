import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './iconfont.less'

const Iconfont = ({ type, colorful, className }) => {
  const propsClassName = className;

  const csSvg = classnames(
    { 'colorful-icon': true },
    { [`${propsClassName}`]: className !== undefined },
  );

  if (colorful) {
    return (
      <svg className={csSvg} aria-hidden="true">
        <use xlinkHref={`#${type.startsWith('#') ? type.replace(/#/, '') : type}`} />
      </svg>
    );
  }
  const csFont = classnames(
    { antdadmin: true },
    { [`icon-${type}`]: true },
    { [`${propsClassName}`]: className !== undefined },
  );
  return <i className={csFont} />;
}

Iconfont.propTypes = {
  type: PropTypes.string.isRequired,
  colorful: PropTypes.bool,
}

Iconfont.defaultProps = {
  colorful: false,
}

export default Iconfont
