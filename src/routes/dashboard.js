import React, {PropTypes} from 'react'
import {connect} from 'dva'
import {Link} from 'dva/router'
import {Row, Col, Icon, Card} from 'antd'
import NumberCard from '../components/dashboard/numberCard'
import Quote from '../components/dashboard/quote'
import Sales from '../components/dashboard/sales'
import Weather from '../components/dashboard/weather'
import styles from './dashboard.less'
import {color} from '../utils'

const numberCardData = [
  {
    icon: 'dot-chart',
    color: color.green,
    title: 'Online Review',
    number: 2781
  }, {
    icon: 'pay-circle-o',
    color: color.blue,
    title: 'New Customers',
    number: 3241
  }, {
    icon: 'message',
    color: color.purple,
    title: 'Active Projects',
    number: 253
  }, {
    icon: 'paper-clip',
    color: color.red,
    title: 'Referrals',
    number: 4324
  }
]

const quoteProps = {
  name: 'Joho Doe',
  title: 'Graphic Designer',
  content: `I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.`,
  avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236'
}

function Dashboard({dashboard}) {
  const {weather,sales,quote} = dashboard
  const numberCards = numberCardData.map((item, key) => <Col key={key} lg={6} md={12}>
    <NumberCard {...item}/>
  </Col>)

  return (
    <Row gutter={24}>
      {numberCards}
      <Col lg={18} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: '24px 36px 24px 0'
        }}>
          <Sales  data={sales}/>
        </Card>
      </Col>
      <Col lg={6} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card bordered={false} bodyStyle={{
              padding: 0,
              height: 204,
              background: color.blue
            }}>
              <Weather {...weather}/>
            </Card>
          </Col>
          <Col lg={24} md={12}>
            <Card bordered={false} bodyStyle={{
              padding: 0,
              height: 204,
              background: color.red
            }}>
              <Quote {...quote}/>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: 0,
          height: 432,
          background: '#fff'
        }}></Card>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: 0,
          height: 432,
          background: '#fff'
        }}></Card>
      </Col>
      <Col lg={24} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: 0,
          height: 432,
          background: '#fff'
        }}></Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: 0,
          height: 432,
          background: '#fff'
        }}></Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: 0,
          height: 432,
          background: '#fff'
        }}></Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} bodyStyle={{
          padding: 0,
          height: 432,
          background: '#fff'
        }}></Card>
      </Col>
    </Row>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object
}

function mapStateToProps({dashboard}) {
  return {dashboard}
}

export default connect(mapStateToProps)(Dashboard)
