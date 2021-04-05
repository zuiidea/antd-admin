import React from 'react'
import classNames from 'classnames'
import styles from './index.less'

interface LoaderProps {
  spinning?: boolean
  fullScreen?: boolean
}

const Loader: React.FC<LoaderProps> = ({ spinning = false, fullScreen }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.hidden]: !spinning,
        [styles.fullScreen]: fullScreen,
      })}
    >
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>LOADING</div>
      </div>
    </div>
  )
}

export default Loader
