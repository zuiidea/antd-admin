import React, {PropTypes} from 'react'
import {Link} from 'dva/router'
import {Row, Col, Icon} from 'antd'
import NumberCard from '../components/dashboard/numberCard'

const [colorGreen,
  colorBlue,
  colorPurple,
  colorRed] = ['#64ea91', '#8fc9fb', '#d897eb', '#f69899']

const numberCardData = [
  {
    icon: 'dot-chart',
    color: colorGreen,
    title:'Online Review',
    number:'2,781'
  },
  {
    icon: 'dot-chart',
    color: colorBlue,
    title:'New Customers',
    number:'3,241'
  },
  {
    icon: 'dot-chart',
    color: colorPurple,
    title:'Active Projects',
    number:'253'
  },
  {
    icon: 'dot-chart',
    color: colorRed,
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
    </div>
  )
}

Dashboard.propTypes = {
  location: PropTypes.object
}

export default Dashboard
