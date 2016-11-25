import React, {PropTypes} from 'react'
import {Link} from 'dva/router'
import {Row, Col, Icon, Card} from 'antd'
import NumberCard from '../components/dashboard/numberCard'
import Sales from '../components/dashboard/sales'
import {color} from '../utils'

const numberCardData = [
  {
    icon: 'dot-chart',
    color: color.green,
    title:'Online Review',
    number:'2,781'
  },
  {
    icon: 'pay-circle-o',
    color: color.blue,
    title:'New Customers',
    number:'3,241'
  },
  {
    icon: 'message',
    color: color.purple,
    title:'Active Projects',
    number:'253'
  },
  {
    icon: 'paper-clip',
    color: color.red,
    title:'Referrals',
    number:'4,324'
  }
]

function Dashboard() {
  const numberCards = numberCardData.map((item,key) => <Col  key={key} lg={6} md={12}>
    <NumberCard {...item}/>
  </Col>)
  return (
    <div>
      <Row gutter={24}>
        {numberCards}
      </Row>
      <Row gutter={24}>
        <Col lg={18} md={24}>
          <Card bordered={false} bodyStyle={{padding:'24px 36px 24px 0'}}>
           <Sales />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

Dashboard.propTypes = {
  location: PropTypes.object
}

export default Dashboard
