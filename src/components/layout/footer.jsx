import React, {PropTypes} from 'react'
import styles from './main.less'
import {config} from '../../utils'

function Footer({location}) {
  return (
    <div className={styles.footer}>
      {config.footerText}
    </div>
  )
}

Footer.propTypes = {
  location: PropTypes.object
}

export default Footer
