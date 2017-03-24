import React from 'react'
import styles from './index.less'
import { request, config } from '../../utils'
import {
  Row,
  Col,
  Card,
  Select,
  Input,
  Button,
} from 'antd'

const requestOptions = [
  {
    url: `${location.origin}/api/users`,
    desc: 'intercept request by mock.js',
  },
  {
    url: `${config.baseURL}/admin/order`,
    desc: 'cross-domain request, but match config.baseURL(./src/utils/config.js)',
  },
  {
    url: 'http://www.zuimeitianqi.com/zuimei/queryWeather',
    data: {
      cityCode: '01010101',
    },
    desc: 'cross-domain request by yahoo\'s yql',
  }]

export default class RequestPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currntRequest: requestOptions[0],
      method: 'get',
      result: '',
    }
  }
  componentDidMount () {
    this.handleRequest()
  }

  handleRequest = () => {
    const { currntRequest } = this.state
    const { desc, ...requestParams } = currntRequest
    this.setState({
      ...this.state,
      result: <div key="sending">
        请求中<br />
        url:{currntRequest.url}<br />
        method:{currntRequest.method}<br />
        params:{currntRequest.data ? JSON.stringify(currntRequest.data) : 'null'}<br />
      </div>,
    })
    request({ ...requestParams }).then((data) => {
      const state = this.state
      state.result = [this.state.result, <div key="complete"><div>请求完成</div>{JSON.stringify(data)}</div>]
      this.setState(state)
    })
  }

  handeleURLChange = (value) => {
    const state = this.state
    const currntItem = requestOptions.filter(item => value === item.url)
    state.currntRequest = currntItem[0]
    this.setState(state)
  }

  render () {
    const colProps = {
      lg: 12,
      md: 24,
    }
    const { result, currntRequest } = this.state
    const { methoad = 'get' } = currntRequest

    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="Request" style={{
              overflow: 'visible',
            }}>
              <div className={styles.option}>
                <Input disabled value={methoad.toLocaleUpperCase()} size="large" style={{ width: 100 }} placeholder="GET" />
                <Select style={{
                  width: '100%',
                  flex: 1,
                }} defaultValue={requestOptions[0].url}
                  size="large"
                  onChange={this.handeleURLChange}
                >
                  {requestOptions.map(item => <Select.Option key={item.url} value={item.url}>
                    {item.url}
                  </Select.Option>)}
                </Select>
                <Button type="primary" style={{ width: 100, marginLeft: 16 }} onClick={this.handleRequest}>发送</Button>
              </div>
              <div className={styles.params}>
                <div className={styles.label}>Params：</div>
                <Input disabled value={currntRequest.data ? JSON.stringify(currntRequest.data) : 'null'} size="large" style={{ width: 200 }} placeholder="null" />
                <div style={{ flex: 1, marginLeft: 16 }}>{currntRequest.desc}</div>
              </div>
              <div className={styles.result}>
                {result}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
