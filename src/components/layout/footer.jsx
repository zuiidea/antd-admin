import React, {PropTypes} from 'react'
import styles from './main.less'

function Footer({location}) {
  return (
    <div className={styles.footer}>
      底部
    </div>
  )
}

Footer.propTypes = {
  location: PropTypes.object
}

export default Footer
