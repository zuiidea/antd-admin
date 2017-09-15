import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer } from 'recharts'
import styles from './Container.less'

const Container = ({ children, ratio = 5 / 2, minHeight = 250, maxHeight = 350 }) => (<div className={styles.container} style={{ minHeight, maxHeight }}>
  <div style={{ marginTop: `${100 / ratio}%` || '100%' }} />
  <div className={styles.content} style={{ minHeight, maxHeight }}>
    <ResponsiveContainer>
      {children}
    </ResponsiveContainer>
  </div>
</div>)

Container.propTypes = {
  children: PropTypes.element.isRequired,
  ratio: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
}

export default Container
