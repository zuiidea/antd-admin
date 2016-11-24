import React, { PropTypes } from 'react'
import { Icon } from 'antd'
import styles from './numberCard.less'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

function Sales(props) {
  const { icon, color, title, number } = props
  return (
    <div className={styles.numberCard}>
      <Icon className={styles.iconWarp} style={{ color }} type={icon} />
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>{number || '10,000'}</p>
      </div>
    </div>
  )
}

export default Sales
