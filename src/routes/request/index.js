import React from 'react'
import styles from './index.less'
import Mock from 'mockjs'
import { request, config } from '../../utils'
import {
  Row,
  Col,
  Card,
  Select,
  Input,
  Button,
} from 'antd'
const { api } = config
const { dashboard, users, userLogin, user, v1test, v2test } = api

const requestOptions = [
  {
    url: user.replace('/:id', ''),
    desc: 'intercept request by mock.js',
  },
  {
    url: dashboard,
    desc: 'intercept request by mock.js',
  },
  {
    url: userLogin,
    method: 'post',
    data: {
      username: 'guest',
      password: 'guest',
    },
    desc: 'intercept request by mock.js',
  },
  {
    url: users,
    desc: 'intercept request by mock.js',
  },
  {
    url: user,
    desc: 'intercept request by mock.js',
    data: Mock.mock({
      id: '@id',
    }),
  },
  {
    url: user.replace('/:id', ''),
    desc: 'intercept request by mock.js',
    method: 'post',
    data: Mock.mock({
      name: '@cname',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    }),
  },
  {
    url: user,
    desc: 'intercept request by mock.js',
    method: 'patch',
    data: Mock.mock({
      id: '@id',
      name: '@cname',
    }),
  },
  {
    url: user,
    desc: 'intercept request by mock.js',
    method: 'delete',
    data: Mock.mock({
      id: '@id',
    }),
  },
  {
    url: v1test,
    desc: 'intercept request by mock.js',
    method: 'get',
  },
  {
    url: v2test,
    desc: 'intercept request by mock.js',
    method: 'get',
  },
  {
    url: 'http://api.asilu.com/weather/',
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
    const curretUrl = value.split('?')[0]
    const curretMethod = value.split('?')[1]
    const currntItem = requestOptions.filter(item => {
      const { method = 'get' } = item
      return curretUrl === item.url && curretMethod === method
    })
    state.currntRequest = currntItem[0]
    this.setState(state)
  }

  render () {
    const colProps = {
      lg: 12,
      md: 24,
    }
    const { result, currntRequest } = this.state
    const { method = 'get' } = currntRequest

    return (
      <div className="content-inner">
        <Row gutter={32}>
          <Col {...colProps}>
            <Card title="Request" style={{
              overflow: 'visible',
            }}>
              <div className={styles.option}>
                <Select style={{
                  width: '100%',
                  flex: 1,
                }} defaultValue={`${method.toLocaleUpperCase()}   ${requestOptions[0].url}`}
                  size="large"
                  onChange={this.handeleURLChange}
                >
                  {requestOptions.map((item, index) => {
                    const m = item.method || 'get'
                    return (<Select.Option key={index} value={`${item.url}?${m}`}>
                      {`${m.toLocaleUpperCase()}    `}{item.url}
                    </Select.Option>)
                  })}
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
