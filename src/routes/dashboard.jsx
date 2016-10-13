import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import Main from '../components/layout/main'
import styles from './app.less'

function Dashboard() {
  return (
    <div className={styles.normal}>
      <h1>Hello Antd.</h1>
      <hr />
      <ul className={styles.list}>
        <li>You can go to <Link to="/users">/users</Link></li>
      </ul>
    </div>
  )
}

Dashboard.propTypes = {
  location: PropTypes.object,
}

export default Dashboard
