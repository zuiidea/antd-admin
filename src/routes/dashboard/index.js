import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { color } from 'utils'
import { Page } from 'components'
import { NumberCard, Quote, Sales, Weather, RecentSales, Comments, Completed, Browser, Cpu, User } from './components'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard, loading }) {
  const {
    weather, sales, quote, numbers, recentSales, comments, completed, browser, cpu, user,
  } = dashboard
  const numberCards = numbers.map((item, key) => (<Col key={key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>))

  return (
    <Page loading={loading.models.dashboard && sales.length === 0} className={styles.dashboard}>
      <Row gutter={24}>
        {numberCards}
        <Col lg={18} md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Sales data={sales} />
          </Card>
        </Col>
        <Col lg={6} md={24}>
          <Row gutter={24}>
            <Col lg={24} md={12}>
              <Card bordered={false}
                className={styles.weather}
                bodyStyle={{
                  padding: 0,
                  height: 204,
                  background: color.blue,
                }}
              >
                <Weather {...weather} loading={loading.effects['dashboard/queryWeather']} />
              </Card>
            </Col>
            <Col lg={24} md={12}>
              <Card bordered={false}
                className={styles.quote}
                bodyStyle={{
                  padding: 0,
                  height: 204,
                  background: color.peach,
                }}
              >
                <Quote {...quote} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <RecentSales data={recentSales} />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <Comments data={comments} />
          </Card>
        </Col>
        <Col lg={24} md={24}>
          <Card bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Completed data={completed} />
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <Browser data={browser} />
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} {...bodyStyle}>
            <Cpu {...cpu} />
          </Card>
        </Col>
        <Col lg={8} md={24}>
          <Card bordered={false} bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}>
            <User {...user} />
          </Card>
        </Col>
      </Row>
    </Page>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
