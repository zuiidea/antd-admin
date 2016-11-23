import React, {PropTypes} from 'react'
import {Icon} from 'antd'
import styles from './numberCard.less'

function NumberCard(props) {
  const {icon, color, title, number} = props
  return (
    <div className={styles.numberCard}>
      <Icon className={styles.iconWarp} type={icon}/>
      <div className={styles.content}>
        <p className={styles.title}>{title||'Online Review'}</p>
        <p className={styles.number}>{number||'1654,563'}</p>
      </div>
    </div>
  )
}

export default NumberCard
