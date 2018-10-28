import React from 'react'
import PropTypes from 'prop-types'
import { Button, Avatar } from 'antd'
import CountUp from 'react-countup'
import { Color } from 'utils'
import styles from './user.less'

const countUpProps = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ',',
}

function User({ avatar, username, sales = 0, sold = 0 }) {
  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <div className={styles.headerinner}>
          <Avatar size="large" src={avatar} />
          <h5 className={styles.name}>{username}</h5>
        </div>
      </div>
      <div className={styles.number}>
        <div className={styles.item}>
          <p>EARNING SALES</p>
          <p style={{ color: Color.green }}>
            <CountUp end={sales} prefix="$" {...countUpProps} />
          </p>
        </div>
        <div className={styles.item}>
          <p>ITEM SOLD</p>
          <p style={{ color: Color.blue }}>
            <CountUp end={sold} {...countUpProps} />
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        <Button type="ghost" size="large">
          View Profile
        </Button>
      </div>
    </div>
  )
}

User.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  sales: PropTypes.number,
  sold: PropTypes.number,
}

export default User
