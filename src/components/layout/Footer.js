import React from 'react'
import styles from './Layout.less'
import { config } from '../../utils'

const Footer = () => <div className={styles.footer}>
  {config.footerText}
</div>

export default Footer
