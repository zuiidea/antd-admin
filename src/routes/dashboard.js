import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Row, Col, Icon } from 'antd'
import NumberCard from '../components/dashboard/numberCard'

function Dashboard() {
  return (
    <div>
      <Row type="flex" justify="space-between">
       <Col span={5}>
         <NumberCard icon='dot-chart' />
       </Col>
       <Col span={5}>
         <NumberCard icon='dot-chart' />
       </Col>
       <Col span={5}>
         <NumberCard icon='dot-chart' />
       </Col>
       <Col span={5}>
         <NumberCard icon='dot-chart' />
       </Col>
     </Row>
    </div>
  )
}

Dashboard.propTypes = {
  location: PropTypes.object,
}

export default Dashboard
