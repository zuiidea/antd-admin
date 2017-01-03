import React, { PropTypes } from 'react'
import { Button } from 'antd'
import styles from './user.less'
import CountUp from 'react-countup'
import { color } from '../../utils'
const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ','
}

function User (props) {
  const {avatar, name, email} = props
  return <div className={styles.user}>
    <div className={styles.header}>
      <div className={styles.headerinner}>
        <div className={styles.avatar} style={{backgroundImage: `url(${avatar})`}} />
        <h5 className={styles.name}>{name}</h5>
        <p>{email}</p>
      </div>
    </div>
    <div className={styles.number}>
      <div className={styles.item}>
        <p>EARNING SALES</p>
        <p style={{color: color.green}}><CountUp
          end={props.sales}
          prefix='$'
          {...countUpProps}
           /></p>
      </div>
      <div className={styles.item}>
        <p>ITEM SOLD</p>
        <p style={{color: color.blue}}><CountUp
          end={props.sold}
          {...countUpProps}
           /></p>
      </div>
    </div>
    <div className={styles.footer}>
      <Button type='ghost' size='large'>View Profile</Button>
    </div>
  </div>
}

User.propTypes = {
  props: PropTypes.object
}

export default User
