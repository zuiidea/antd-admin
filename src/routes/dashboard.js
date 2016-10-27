import React, { PropTypes } from 'react'
import { Link } from 'dva/router'

function Dashboard() {
  return (
    <div>
      <h1>Hello Antd.</h1>
      <hr />
      <ul>
        <li>You can go to <Link to="/users">/users</Link></li>
      </ul>
    </div>
  )
}

Dashboard.propTypes = {
  location: PropTypes.object,
}

export default Dashboard
